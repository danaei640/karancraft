// ============================================================================
// OKLCH Color Palette Generator — Type Definitions
// ============================================================================

/**
 * OKLCH color representation.
 * @see https://www.w3.org/TR/css-color-4/#ok-lab
 */
export interface OklchColor {
  /** Lightness: 0 (black) to 1 (white) */
  l: number
  /** Chroma: 0 (gray) to ~0.4 (max saturation, gamut-dependent) */
  c: number
  /** Hue: 0–360 degrees */
  h: number
}

/**
 * User inputs for palette generation.
 */
export interface PaletteInput {
  /** The accent / brand color in OKLCH */
  accentColor: OklchColor
  /**
   * How much the accent hue tints the neutral set (0–100).
   * 0 = pure achromatic neutrals, 100 = neutrals are fully tinted with accent hue.
   */
  tint: number
  /**
   * Global chroma intensity multiplier (0–100).
   * 0 = completely desaturated palette, 100 = full vivid saturation.
   */
  chroma: number
}

// ============================================================================
// Token Structure — 13 tokens per set
// ============================================================================

/**
 * A single color set containing 13 semantic tokens.
 *
 * Layout:
 *  - 2 surface colors (background layers)
 *  - 4 interactive colors (button/link states)
 *  - 3 fill colors (solid fills for emphasis)
 *  - 3 text colors (hierarchy)
 *  - 1 onFill (contrast text on fill)
 */
export interface ColorSetTokens {
  // ── Surfaces (2) ──
  /** Page / card background */
  surface: string
  /** Elevated / nested surface (e.g. sidebar, inset card) */
  surfaceAlt: string

  // ── Interactives (4) ──
  /** Default interactive background (e.g. ghost button, subtle hover zone) */
  interactive: string
  /** Hover state for interactive elements */
  interactiveHover: string
  /** Active / pressed state */
  interactiveActive: string
  /** Focus ring / outline color */
  interactiveFocus: string

  // ── Fills (3) ──
  /** Primary solid fill (e.g. default button bg, badge bg) */
  fill: string
  /** Solid fill hover */
  fillHover: string
  /** Solid fill active / pressed */
  fillActive: string

  // ── Text (3) ──
  /** High-contrast primary text */
  text: string
  /** Secondary text */
  textSecondary: string
  /** Muted / placeholder text */
  textMuted: string

  // ── On Fill (1) ──
  /** Contrasting text rendered on top of fill colors */
  onFill: string
}

/**
 * The 6 semantic color set names.
 */
export type ColorSetName =
  | "primary"
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"

/**
 * A mode-specific palette: all 6 sets resolved for a single mode.
 */
export type ModePalette = Record<ColorSetName, ColorSetTokens>

/**
 * The complete generated palette: light + dark.
 */
export interface GeneratedPalette {
  light: ModePalette
  dark: ModePalette
}

/**
 * Resolved hue map after conflict resolution.
 */
export type ResolvedHues = Record<ColorSetName, number>

/**
 * Internal set generation config passed to the per-set generator.
 */
export interface SetGenerationConfig {
  /** The resolved hue for this set */
  hue: number
  /** Chroma multiplier (0–1, derived from user chroma%) */
  chromaScale: number
  /** Whether this is the neutral set (uses tint-derived chroma instead) */
  isNeutral: boolean
  /** Tint-derived chroma for neutral set (0–1) */
  neutralChroma: number
  /** The base chroma ceiling for this set (semantic sets have different natural chroma ranges) */
  maxChroma: number
}

/**
 * Flat CSS variable map for a single mode.
 */
export type CssVariableMap = Record<string, string>

/**
 * Complete CSS variable output.
 */
export interface PaletteCssVars {
  light: CssVariableMap
  dark: CssVariableMap
}
