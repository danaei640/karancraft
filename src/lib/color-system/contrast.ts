// ============================================================================
// Contrast Checking Utilities
// ============================================================================
//
// Provides validation functions to verify that generated palette tokens
// meet minimum contrast requirements for accessibility.
// ============================================================================

import type { ColorSetTokens, ModePalette, ColorSetName } from "./types"
import { parseOklch, contrastScore } from "./oklch"

/**
 * APCA-like contrast thresholds (using OKLCH lightness proxy).
 */
export const CONTRAST_THRESHOLDS = {
  /** Body text on surface: needs high contrast */
  bodyText: 70,
  /** Secondary / large text: moderate contrast */
  largeText: 55,
  /** Decorative / UI chrome: minimum contrast */
  decorative: 45,
  /** Text on fills: needs good contrast */
  onFill: 55,
  /** Interactive vs surface: very subtle distinction (borders/hover handle the rest) */
  interactiveOnSurface: 10,
} as const

/**
 * Result of a single contrast check.
 */
export interface ContrastCheckResult {
  set: ColorSetName
  pair: string
  score: number
  threshold: number
  passes: boolean
}

/**
 * Extract lightness from an oklch() CSS string.
 */
function getLightness(cssColor: string): number | null {
  const parsed = parseOklch(cssColor)
  return parsed ? parsed.l : null
}

/**
 * Run all contrast checks for a single set.
 */
function checkSet(
  setName: ColorSetName,
  tokens: ColorSetTokens
): ContrastCheckResult[] {
  const results: ContrastCheckResult[] = []

  const check = (
    pair: string,
    bgToken: string,
    fgToken: string,
    threshold: number
  ) => {
    const bgL = getLightness(bgToken)
    const fgL = getLightness(fgToken)
    if (bgL === null || fgL === null) {
      results.push({ set: setName, pair, score: 0, threshold, passes: false })
      return
    }
    const score = contrastScore(bgL, fgL)
    results.push({
      set: setName,
      pair,
      score: Math.round(score * 10) / 10,
      threshold,
      passes: score >= threshold,
    })
  }

  // Text on surface
  check("text / surface", tokens.surface, tokens.text, CONTRAST_THRESHOLDS.bodyText)
  check("textSecondary / surface", tokens.surface, tokens.textSecondary, CONTRAST_THRESHOLDS.largeText)
  check("textMuted / surface", tokens.surface, tokens.textMuted, CONTRAST_THRESHOLDS.decorative)

  // Text on surfaceAlt
  check("text / surfaceAlt", tokens.surfaceAlt, tokens.text, CONTRAST_THRESHOLDS.bodyText)
  check("textSecondary / surfaceAlt", tokens.surfaceAlt, tokens.textSecondary, CONTRAST_THRESHOLDS.largeText)

  // onFill on fill
  check("onFill / fill", tokens.fill, tokens.onFill, CONTRAST_THRESHOLDS.onFill)
  check("onFill / fillHover", tokens.fillHover, tokens.onFill, CONTRAST_THRESHOLDS.onFill)
  check("onFill / fillActive", tokens.fillActive, tokens.onFill, CONTRAST_THRESHOLDS.onFill)

  // Interactive elements should be distinguishable from surface
  check("interactive / surface", tokens.surface, tokens.interactive, CONTRAST_THRESHOLDS.interactiveOnSurface)

  return results
}

/**
 * Run contrast validation across an entire mode palette.
 *
 * @returns All check results, including pass/fail for each pair.
 */
export function validateModePalette(
  palette: ModePalette
): ContrastCheckResult[] {
  const allResults: ContrastCheckResult[] = []
  const setNames = Object.keys(palette) as ColorSetName[]

  for (const setName of setNames) {
    allResults.push(...checkSet(setName, palette[setName]))
  }

  return allResults
}

/**
 * Check if an entire mode palette passes all contrast requirements.
 */
export function isModePaletteValid(palette: ModePalette): boolean {
  return validateModePalette(palette).every((r) => r.passes)
}

/**
 * Get a summary of contrast failures for debugging.
 */
export function getContrastFailures(
  palette: ModePalette
): ContrastCheckResult[] {
  return validateModePalette(palette).filter((r) => !r.passes)
}
