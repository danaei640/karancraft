// ============================================================================
// Core Palette Generator
// ============================================================================
//
// Generates 13 color tokens for each of the 6 semantic sets in both
// light and dark modes. All math is done in OKLCH space for perceptual
// uniformity.
//
// Token layout per set:
//   surface, surfaceAlt                     — 2 surface colors
//   interactive, interactiveHover,
//   interactiveActive, interactiveFocus     — 4 interactive colors
//   fill, fillHover, fillActive             — 3 fill colors
//   text, textSecondary, textMuted          — 3 text colors
//   onFill                                  — 1 contrast text on fill
// ============================================================================

import type {
  OklchColor,
  PaletteInput,
  ColorSetTokens,
  ColorSetName,
  ModePalette,
  GeneratedPalette,
  ResolvedHues,
} from "./types"
import { resolveHues } from "./hue-resolver"
import {
  clamp,
  formatOklch,
  oklch,
  gamutClampChroma,
  bestOnFillLightness,
  lerp,
} from "./oklch"

// ============================================================================
// Lightness scales for token generation
// ============================================================================

/**
 * Lightness values for the 13 tokens in LIGHT mode.
 *
 * These are ordered from lightest (surface) to darkest (text),
 * with fill colors in the mid-range for prominence.
 */
const LIGHT_LIGHTNESS = {
  surface: 0.985,
  surfaceAlt: 0.95,
  interactive: 0.91,
  interactiveHover: 0.87,
  interactiveActive: 0.83,
  interactiveFocus: 0.50,
  fill: 0.45,
  fillHover: 0.38,
  fillActive: 0.32,
  text: 0.18,
  textSecondary: 0.38,
  textMuted: 0.53,
} as const

/**
 * Lightness values for the 13 tokens in DARK mode.
 *
 * Surfaces are dark, text is light, fill colors shift brighter
 * for visibility against dark backgrounds.
 */
const DARK_LIGHTNESS = {
  surface: 0.15,
  surfaceAlt: 0.195,
  interactive: 0.25,
  interactiveHover: 0.31,
  interactiveActive: 0.37,
  interactiveFocus: 0.58,
  fill: 0.65,
  fillHover: 0.72,
  fillActive: 0.78,
  text: 0.95,
  textSecondary: 0.76,
  textMuted: 0.62,
} as const

// ============================================================================
// Chroma scales per token role
// ============================================================================

/**
 * Maximum chroma reached by neutral tokens at 100% tint.
 * - At 0% tint, every neutral token has chroma = 0 (pure achromatic grayscale).
 * - At 100% tint, tokens reach these rich peaks so the tint slider is expressive & meaningful.
 */
const NEUTRAL_PEAK_CHROMA = {
  surface: 0.028,
  surfaceAlt: 0.038,
  interactive: 0.058,
  interactiveHover: 0.072,
  interactiveActive: 0.088,
  interactiveFocus: 0.12,
  fill: 0.08,
  fillHover: 0.095,
  fillActive: 0.11,
  text: 0.04,
  textSecondary: 0.032,
  textMuted: 0.024,
} as const

/**
 * Chroma multipliers per token role (applied to the set's base chroma).
 *
 * Surfaces and text have low chroma for readability.
 * Fills have the highest chroma for visual prominence and intensify slightly
 * from rest -> hover -> active for harmonic state progression.
 * Interactive elements sit in between.
 */
const CHROMA_MULTIPLIERS = {
  surface: 0.05,
  surfaceAlt: 0.08,
  interactive: 0.12,
  interactiveHover: 0.18,
  interactiveActive: 0.25,
  interactiveFocus: 0.75,
  fill: 0.92,
  fillHover: 1.0,
  fillActive: 1.08,
  text: 0.45,
  textSecondary: 0.35,
  textMuted: 0.20,
} as const

/**
 * Maximum chroma ceilings per semantic set.
 * Different hue regions have different gamut extents in sRGB.
 */
const SET_MAX_CHROMA: Record<ColorSetName, number> = {
  primary: 0.25,
  neutral: 0.08,  // Neutral scales with tint
  info: 0.20,
  success: 0.19,
  warning: 0.18,
  danger: 0.24,
}

// ============================================================================
// Main generation functions
// ============================================================================

/**
 * Generate the complete 6×13×2 palette from user inputs.
 */
export function generatePalette(input: PaletteInput): GeneratedPalette {
  // Validate and normalize inputs
  const chromaScale = clamp(input.chroma, 0, 100) / 100
  const tintScale = clamp(input.tint, 0, 100) / 100
  const accent = input.accentColor

  // Step 1: Resolve hues (conflict detection & resolution)
  const hues = resolveHues(accent)

  // Step 2: Generate each set for both modes
  const setNames: ColorSetName[] = [
    "primary",
    "neutral",
    "info",
    "success",
    "warning",
    "danger",
  ]

  const light: Partial<ModePalette> = {}
  const dark: Partial<ModePalette> = {}

  for (const setName of setNames) {
    const isNeutral = setName === "neutral"
    const setHue = hues[setName]
    const maxChroma = SET_MAX_CHROMA[setName]

    // For neutral set: chroma is controlled by tint
    // For other sets: chroma is controlled by the global chroma slider
    const effectiveChromaScale = isNeutral ? tintScale : chromaScale

    // For neutral, max chroma scales from 0 (achromatic) up to peak tint
    const effectiveMaxChroma = isNeutral
      ? lerp(0, 0.09, tintScale)
      : maxChroma

    light[setName] = generateSetTokens({
      setName,
      hue: setHue,
      chromaScale: effectiveChromaScale,
      maxChroma: effectiveMaxChroma,
      mode: "light",
      accent,
      isNeutral,
    })

    dark[setName] = generateSetTokens({
      setName,
      hue: setHue,
      chromaScale: effectiveChromaScale,
      maxChroma: effectiveMaxChroma,
      mode: "dark",
      accent,
      isNeutral,
    })
  }

  return {
    light: light as ModePalette,
    dark: dark as ModePalette,
  }
}

/**
 * Internal: generate 13 tokens for a single set in a single mode.
 */
function generateSetTokens(config: {
  setName: ColorSetName
  hue: number
  chromaScale: number
  maxChroma: number
  mode: "light" | "dark"
  accent: OklchColor
  isNeutral: boolean
}): ColorSetTokens {
  const { setName, hue, chromaScale, maxChroma, mode, accent, isNeutral } = config
  const isLight = mode === "light"
  const lightnessMap = isLight ? LIGHT_LIGHTNESS : DARK_LIGHTNESS

  // 1. Determine fill lightness (fillL) and base chroma
  let fillL: number
  let fillC: number

  if (setName === "primary") {
    if (isLight) {
      // Light mode: respect the user's accent lightness directly while keeping room for hover/active steps
      fillL = clamp(accent.l, 0.36, 0.95)
    } else {
      // Dark mode: if accent is bright (like yellow), keep it bright; if dark/mid, use crisp button lightness
      fillL = accent.l >= 0.70 ? clamp(accent.l, 0.75, 0.90) : clamp(accent.l, 0.52, 0.60)
    }
    fillC = clamp(accent.c * chromaScale, 0, 0.35)
  } else if (setName === "warning") {
    // Warning is amber/yellow: naturally bright with black onFill
    fillL = 0.80
    fillC = 0.18 * chromaScale
  } else if (setName === "neutral") {
    fillL = isLight ? 0.16 : 0.88
    fillC = NEUTRAL_PEAK_CHROMA.fill * chromaScale
  } else {
    // Semantic sets (info, success, danger)
    if (setName === "success") {
      fillL = 0.54
      fillC = 0.18 * chromaScale
    } else if (setName === "info") {
      fillL = 0.52
      fillC = 0.20 * chromaScale
    } else {
      // danger
      fillL = 0.52
      fillC = 0.24 * chromaScale
    }
  }

  // Calculate harmonic hover and active lightness relative to fillL
  // For neutral, contrast decreases from idle -> hover -> active (darkest to lighter in light mode, brightest to darker in dark mode)
  const isLightFill = fillL >= 0.60
  const fillStep = isNeutral && isLight ? 0.07 : -0.07
  const fillHoverL = clamp(fillL + fillStep, 0.15, 0.95)
  const fillActiveL = clamp(fillL + fillStep * 2, 0.12, 0.95)

  // Determine interactive focus ring lightness
  const interactiveFocusL = isLightFill && isLight
    ? clamp(fillL - 0.20, 0.45, 0.65) // Ensure focus ring is visible on light surfaces
    : lightnessMap.interactiveFocus

  const tokens: Record<string, string> = {}

  const tokenNames = Object.keys(CHROMA_MULTIPLIERS) as Array<
    keyof typeof CHROMA_MULTIPLIERS
  >

  for (const tokenName of tokenNames) {
    let l: number
    let c: number

    if (tokenName === "fill") {
      l = fillL
      c = isNeutral ? NEUTRAL_PEAK_CHROMA.fill * chromaScale : fillC * CHROMA_MULTIPLIERS.fill
    } else if (tokenName === "fillHover") {
      l = fillHoverL
      c = isNeutral ? NEUTRAL_PEAK_CHROMA.fillHover * chromaScale : fillC * CHROMA_MULTIPLIERS.fillHover
    } else if (tokenName === "fillActive") {
      l = fillActiveL
      c = isNeutral ? NEUTRAL_PEAK_CHROMA.fillActive * chromaScale : fillC * CHROMA_MULTIPLIERS.fillActive
    } else if (tokenName === "interactiveFocus") {
      l = interactiveFocusL
      c = isNeutral
        ? NEUTRAL_PEAK_CHROMA.interactiveFocus * chromaScale
        : maxChroma * chromaScale * CHROMA_MULTIPLIERS.interactiveFocus
    } else {
      l = lightnessMap[tokenName]
      if (isNeutral) {
        c = (NEUTRAL_PEAK_CHROMA[tokenName] ?? 0.03) * chromaScale
      } else {
        c = maxChroma * chromaScale * CHROMA_MULTIPLIERS[tokenName]
      }
    }

    // Gamut clamp to stay within true sRGB bounds
    c = gamutClampChroma(l, c, hue)
    tokens[tokenName] = formatOklch(oklch(l, c, hue))
  }

  // Generate onFill with sharp step at 0.60 lightness:
  // Before 0.60: onFill is WHITE (0.98)
  // At or after 0.60: onFill is BLACK (0.12)
  const onFillL = bestOnFillLightness(fillL)
  const onFillC = isNeutral
    ? (fillL >= 0.60 ? 0.015 * chromaScale : 0.005 * chromaScale)
    : (fillL >= 0.60 ? 0.02 : 0.005)
  tokens.onFill = formatOklch(oklch(onFillL, onFillC, hue))

  return tokens as unknown as ColorSetTokens
}

/**
 * Get the resolved hues for inspection/debugging.
 */
export function getResolvedHues(accent: OklchColor): ResolvedHues {
  return resolveHues(accent)
}
