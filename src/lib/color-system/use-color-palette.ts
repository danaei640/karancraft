// ============================================================================
// useColorPalette — React hook for dynamic OKLCH palette generation
// ============================================================================
//
// Generates and injects a complete 6×13×2 OKLCH color palette as CSS
// custom properties, driven by three simple inputs: accent color, tint, chroma.
//
// Usage:
//   import { useColorPalette } from "@/lib/color-system/use-color-palette"
//
//   function App() {
//     const { palette, cssVars, style, setAccent, setTint, setChroma } =
//       useColorPalette({
//         accentColor: { l: 0.55, c: 0.24, h: 264 },
//         tint: 30,
//         chroma: 80,
//       })
//
//     return <div style={style}>{/* all 156 CSS vars are now available */}</div>
//   }
//
// ============================================================================

"use client"

import * as React from "react"
import {
  generatePalette,
  paletteToCssVars,
  paletteToCssString,
  getResolvedHues,
  validateModePalette,
  type OklchColor,
  type PaletteInput,
  type GeneratedPalette,
  type PaletteCssVars,
  type ResolvedHues,
  type CssVariableMap,
} from "./index"
import type { ContrastCheckResult } from "./contrast"

// ============================================================================
// Types
// ============================================================================

export interface UseColorPaletteOptions extends PaletteInput {
  /**
   * CSS selector for light mode variables.
   * Only used when injecting a `<style>` tag via `styleElement`.
   * @default ":root"
   */
  lightSelector?: string

  /**
   * CSS selector for dark mode variables.
   * Only used when injecting a `<style>` tag via `styleElement`.
   * @default ".dark"
   */
  darkSelector?: string

  /**
   * When true, automatically injects a `<style>` element into `<head>`
   * with the generated CSS variables for both modes.
   * @default false
   */
  injectGlobal?: boolean
}

export interface UseColorPaletteReturn {
  /** The raw generated palette object (light + dark, 6 sets × 13 tokens) */
  palette: GeneratedPalette

  /** CSS variable maps for light and dark modes */
  cssVars: PaletteCssVars

  /** Resolved hue angles for all 6 sets (after conflict resolution) */
  resolvedHues: ResolvedHues

  /**
   * React CSSProperties object containing ALL light-mode variables.
   * Apply this as `style` on a container to make all tokens available
   * via `var(--primary-fill)` etc. within that subtree.
   */
  lightStyle: React.CSSProperties

  /**
   * React CSSProperties object containing ALL dark-mode variables.
   */
  darkStyle: React.CSSProperties

  /**
   * Convenience: the full CSS string for both modes.
   * Suitable for injection into a `<style>` tag.
   */
  cssString: string

  /**
   * Contrast validation results for both modes.
   * Empty arrays = all checks pass.
   */
  validation: {
    light: ContrastCheckResult[]
    dark: ContrastCheckResult[]
  }

  /** Update the accent color */
  setAccentColor: (color: OklchColor) => void

  /** Update the tint percentage (0–100) */
  setTint: (tint: number) => void

  /** Update the chroma percentage (0–100) */
  setChroma: (chroma: number) => void

  /** Update all inputs at once */
  setInput: (input: Partial<PaletteInput>) => void

  /** Current input values */
  input: PaletteInput
}

// ============================================================================
// Hook Implementation
// ============================================================================

/**
 * React hook that generates and manages an OKLCH color palette.
 *
 * The palette is recomputed (memoized) whenever the inputs change.
 * Optionally injects CSS variables globally via a `<style>` tag.
 */
export function useColorPalette(
  initialOptions: UseColorPaletteOptions
): UseColorPaletteReturn {
  const {
    lightSelector = ":root",
    darkSelector = ".dark",
    injectGlobal = false,
  } = initialOptions

  // ── Controlled input state ──
  const [input, setInputState] = React.useState<PaletteInput>({
    accentColor: initialOptions.accentColor,
    tint: initialOptions.tint,
    chroma: initialOptions.chroma,
  })

  // ── Derived palette (memoized) ──
  const palette = React.useMemo(
    () => generatePalette(input),
    [input.accentColor.l, input.accentColor.c, input.accentColor.h, input.tint, input.chroma]
  )

  const resolvedHues = React.useMemo(
    () => getResolvedHues(input.accentColor),
    [input.accentColor.l, input.accentColor.c, input.accentColor.h]
  )

  const cssVars = React.useMemo(
    () => paletteToCssVars(palette),
    [palette]
  )

  const cssString = React.useMemo(
    () => paletteToCssString(palette, lightSelector, darkSelector),
    [palette, lightSelector, darkSelector]
  )

  // ── CSSProperties objects for inline style application ──
  const lightStyle = React.useMemo(
    () => cssVarsToStyle(cssVars.light),
    [cssVars.light]
  )

  const darkStyle = React.useMemo(
    () => cssVarsToStyle(cssVars.dark),
    [cssVars.dark]
  )

  // ── Contrast validation ──
  const validation = React.useMemo(
    () => ({
      light: validateModePalette(palette.light),
      dark: validateModePalette(palette.dark),
    }),
    [palette]
  )

  // ── Global style injection ──
  React.useEffect(() => {
    if (!injectGlobal) return

    const id = "karan-color-palette"
    let styleEl = document.getElementById(id) as HTMLStyleElement | null

    if (!styleEl) {
      styleEl = document.createElement("style")
      styleEl.id = id
      styleEl.setAttribute("data-karan-palette", "")
      document.head.appendChild(styleEl)
    }

    styleEl.textContent = cssString

    return () => {
      // Cleanup on unmount
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [cssString, injectGlobal])

  // ── Updaters ──
  const setAccentColor = React.useCallback((color: OklchColor) => {
    setInputState((prev) => ({ ...prev, accentColor: color }))
  }, [])

  const setTint = React.useCallback((tint: number) => {
    setInputState((prev) => ({ ...prev, tint }))
  }, [])

  const setChroma = React.useCallback((chroma: number) => {
    setInputState((prev) => ({ ...prev, chroma }))
  }, [])

  const setInput = React.useCallback((partial: Partial<PaletteInput>) => {
    setInputState((prev) => ({
      ...prev,
      ...partial,
      accentColor: partial.accentColor
        ? { ...prev.accentColor, ...partial.accentColor }
        : prev.accentColor,
    }))
  }, [])

  return {
    palette,
    cssVars,
    resolvedHues,
    lightStyle,
    darkStyle,
    cssString,
    validation,
    setAccentColor,
    setTint,
    setChroma,
    setInput,
    input,
  }
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Convert a CSS variable map to a React CSSProperties object.
 * Keys like `--primary-fill` become CSS custom properties usable via `style`.
 */
function cssVarsToStyle(vars: CssVariableMap): React.CSSProperties {
  const style: Record<string, string> = {}
  for (const [key, value] of Object.entries(vars)) {
    style[key] = value
  }
  return style as React.CSSProperties
}
