// ============================================================================
// OKLCH Color Palette Generator — Public API
// ============================================================================
//
// Usage:
//   import { generatePalette, paletteToCssVars } from "@/lib/color-system"
//
//   const palette = generatePalette({
//     accentColor: { l: 0.55, c: 0.24, h: 264 },
//     tint: 30,
//     chroma: 80,
//   })
//
//   const cssVars = paletteToCssVars(palette)
//   // cssVars.light → Record<string, string> with CSS variable values
//   // cssVars.dark  → Record<string, string> with CSS variable values
//
// ============================================================================

export { generatePalette, getResolvedHues } from "./palette-generator"

export {
  validateModePalette,
  isModePaletteValid,
  getContrastFailures,
  CONTRAST_THRESHOLDS,
} from "./contrast"

export {
  formatOklch,
  parseOklch,
  oklch,
  hueDistance,
  normalizeHue,
  contrastScore,
} from "./oklch"

export { resolveHues, getMinPairwiseDistance } from "./hue-resolver"

export type {
  OklchColor,
  PaletteInput,
  ColorSetTokens,
  ColorSetName,
  ModePalette,
  GeneratedPalette,
  ResolvedHues,
  CssVariableMap,
  PaletteCssVars,
} from "./types"

import type {
  GeneratedPalette,
  PaletteCssVars,
  CssVariableMap,
  ColorSetName,
  ColorSetTokens,
  ModePalette,
} from "./types"

// ============================================================================
// CSS Variable Conversion
// ============================================================================

/**
 * Token names in the order they appear in ColorSetTokens.
 */
const TOKEN_NAMES: Array<keyof ColorSetTokens> = [
  "surface",
  "surfaceAlt",
  "interactive",
  "interactiveHover",
  "interactiveActive",
  "interactiveFocus",
  "fill",
  "fillHover",
  "fillActive",
  "text",
  "textSecondary",
  "textMuted",
  "onFill",
]

/**
 * Convert a token name to a CSS variable name.
 * e.g. "primary" + "surfaceAlt" → "--primary-surface-alt"
 *      "neutral" + "text"       → "--neutral-text"
 */
function toCssVarName(setName: ColorSetName, tokenName: string): string {
  // Convert camelCase to kebab-case
  const kebab = tokenName.replace(
    /[A-Z]/g,
    (char) => `-${char.toLowerCase()}`
  )
  return `--${setName}-${kebab}`
}

/**
 * Convert a mode palette to a flat CSS variable map.
 */
function modePaletteToCssVars(palette: ModePalette): CssVariableMap {
  const vars: CssVariableMap = {}

  const setNames = Object.keys(palette) as ColorSetName[]
  for (const setName of setNames) {
    const tokens = palette[setName]
    for (const tokenName of TOKEN_NAMES) {
      const varName = toCssVarName(setName, tokenName)
      vars[varName] = tokens[tokenName]
    }
  }

  return vars
}

/**
 * Convert a complete generated palette to CSS variable maps for light and dark.
 *
 * Output can be directly spread into the `cssVars` property of a
 * `ColorThemeConfig` or injected as inline styles / `<style>` blocks.
 *
 * @example
 * ```ts
 * const vars = paletteToCssVars(palette)
 * // vars.light["--primary-fill"] → "oklch(0.50 0.20 264)"
 * // vars.dark["--danger-text"]   → "oklch(0.94 0.10 25)"
 * ```
 */
export function paletteToCssVars(palette: GeneratedPalette): PaletteCssVars {
  return {
    light: modePaletteToCssVars(palette.light),
    dark: modePaletteToCssVars(palette.dark),
  }
}

/**
 * Generate a CSS string with custom properties for both modes.
 *
 * @param palette - Generated palette
 * @param lightSelector - CSS selector for light mode (default: `:root`)
 * @param darkSelector - CSS selector for dark mode (default: `.dark`)
 * @returns A complete CSS string with all variables declared
 *
 * @example
 * ```ts
 * const css = paletteToCssString(palette)
 * // Injects as: <style>{css}</style>
 * ```
 */
export function paletteToCssString(
  palette: GeneratedPalette,
  lightSelector: string = ":root",
  darkSelector: string = ".dark"
): string {
  const lightVars = modePaletteToCssVars(palette.light)
  const darkVars = modePaletteToCssVars(palette.dark)

  const formatBlock = (selector: string, vars: CssVariableMap): string => {
    const entries = Object.entries(vars)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n")
    return `${selector} {\n${entries}\n}`
  }

  return [
    formatBlock(lightSelector, lightVars),
    formatBlock(darkSelector, darkVars),
  ].join("\n\n")
}
