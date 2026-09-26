"use client"

import * as React from "react"
import { ClientThemeProvider, useTheme, useThemeValue, useHydrated } from "@wrksz/themes/client"
import {
  generatePalette,
  paletteToCssVars,
  paletteToCssString,
  getResolvedHues,
  type OklchColor,
  type PaletteInput,
  type GeneratedPalette,
  type PaletteCssVars,
  type ResolvedHues,
  type ColorSetName,
  type ColorSetTokens,
} from "@/lib/color-system"
import { ThemeScript } from "@wrksz/themes/script"
import type {
  Attribute,
  DefaultTheme,
  StorageType,
  ThemeColor,
  ThemeScriptAttributes,
  ThemeSelection,
  ThemeValueObject,
} from "@wrksz/themes"

import { TooltipProvider } from "@/registry/bases/base/ui/tooltip"
import {
  Toaster,
  ToastProvider,
  createToastManager,
  toast,
  useToastManager,
} from "@/registry/bases/base/ui/toast"

// ============================================================================
// Typeset Measurements Specification (shadcn typeset: https://ui.shadcn.com/docs/typeset)
// ============================================================================

export type TypesetPresetName =
  | "default"
  | "docs"
  | "chat"
  | "reading"
  | "compact"
  | "large"

export interface TypesetMeasurements {
  /**
   * Base font size (`--typeset-size`).
   * Follows surrounding layout by default (`1em`), or an explicit measurement (`14px`, `15px`, `16px`, `18px`, etc.).
   * @default "1em"
   */
  size?: string

  /**
   * Line height (`--typeset-leading`).
   * Space between lines for optimal reading rhythm.
   * @default 1.75
   */
  leading?: number | string

  /**
   * Space between blocks (`--typeset-flow`).
   * Headings, lists, rules, and other blocks derive vertical rhythm from this.
   * @default "1.25em"
   */
  flow?: string

  /**
   * Line measure / max width (`--typeset-measure`).
   * Optimal line length for readability (e.g. `65ch`, `72ch`, `100%`).
   * @default "65ch"
   */
  measure?: string

  /**
   * Body font family (`--typeset-font-body`).
   * @default "inherit"
   */
  fontBody?: string

  /**
   * Heading font family (`--typeset-font-heading`).
   * @default "inherit"
   */
  fontHeading?: string

  /**
   * Monospace font family (`--typeset-font-mono`).
   * @default "inherit"
   */
  fontMono?: string
}

export interface TypesetConfig extends TypesetMeasurements {
  /**
   * Preset name to base the typeset on.
   * @default "default"
   */
  preset?: TypesetPresetName
}

/**
 * Standard Shadcn Typeset presets as defined in https://ui.shadcn.com/docs/typeset
 */
export const TYPESET_PRESETS: Record<TypesetPresetName, Required<TypesetMeasurements>> = {
  default: {
    size: "1em",
    leading: 1.75,
    flow: "1.25em",
    measure: "65ch",
    fontBody: "inherit",
    fontHeading: "inherit",
    fontMono: "inherit",
  },
  docs: {
    size: "15px",
    leading: 1.75,
    flow: "1.5em",
    measure: "72ch",
    fontBody: "inherit",
    fontHeading: "inherit",
    fontMono: "inherit",
  },
  chat: {
    size: "1em",
    leading: 1.6,
    flow: "1em",
    measure: "60ch",
    fontBody: "inherit",
    fontHeading: "inherit",
    fontMono: "inherit",
  },
  reading: {
    size: "18px",
    leading: 1.9,
    flow: "2em",
    measure: "68ch",
    fontBody: "inherit",
    fontHeading: "inherit",
    fontMono: "inherit",
  },
  compact: {
    size: "14px",
    leading: 1.6,
    flow: "1em",
    measure: "60ch",
    fontBody: "inherit",
    fontHeading: "inherit",
    fontMono: "inherit",
  },
  large: {
    size: "16px",
    leading: 2,
    flow: "2em",
    measure: "70ch",
    fontBody: "inherit",
    fontHeading: "inherit",
    fontMono: "inherit",
  },
}

export interface TypesetContextValue {
  /** Current active measurements */
  measurements: Required<TypesetMeasurements>
  /** Current active preset name or 'custom' */
  preset: TypesetPresetName | "custom"
  /** Update measurements dynamically at runtime */
  setMeasurements: (
    updater:
      | Partial<TypesetMeasurements>
      | ((prev: Required<TypesetMeasurements>) => Partial<TypesetMeasurements>)
  ) => void
  /** Switch to one of the built-in presets */
  setPreset: (preset: TypesetPresetName) => void
  /** React inline CSSProperties object with all `--typeset-*` variables ready to apply */
  style: React.CSSProperties
  /** Class name helper (e.g. `typeset typeset-docs`) */
  className: string
}

const TypesetContext = React.createContext<TypesetContextValue | null>(null)

export function useTypeset(): TypesetContextValue {
  const context = React.useContext(TypesetContext)
  if (!context) {
    throw new Error("useTypeset must be used within a ThemeProvider or TypesetProvider.")
  }
  return context
}

// ============================================================================
// Color Theme Types & Specification — OKLCH Palette System
// ============================================================================

/**
 * Palette generation inputs.
 * When provided, the ThemeProvider will automatically generate 6×13×2 OKLCH
 * color tokens and inject them as CSS custom properties.
 */
export interface PaletteConfig {
  /** The accent / brand color in OKLCH */
  accentColor: OklchColor
  /**
   * How much the accent hue tints the neutral set (0–100).
   * 0 = pure achromatic neutrals, 100 = fully tinted with accent hue.
   * @default 20
   */
  tint?: number
  /**
   * Global chroma intensity multiplier (0–100).
   * 0 = completely desaturated, 100 = full vivid saturation.
   * @default 80
   */
  chroma?: number
}

export interface ColorThemeConfig {
  /** Color theme identifier (e.g. 'neutral', 'zinc', 'slate', 'rose', etc.) */
  name?: string
  /** Custom CSS variables for light and dark modes */
  cssVars?: {
    light?: Record<string, string>
    dark?: Record<string, string>
  }
  /**
   * OKLCH palette generation configuration.
   * When provided, generates 6×13×2 color tokens automatically.
   */
  palette?: PaletteConfig
  [key: string]: unknown
}

export interface ColorThemeContextValue {
  /** Active color theme name */
  colorTheme: string
  /** Update the active color theme */
  setColorTheme: (colorTheme: string) => void
  /** Current color theme configuration if provided */
  config?: ColorThemeConfig

  // ── Palette system ──
  /** Generated palette (null if no palette config is provided) */
  palette: GeneratedPalette | null
  /** CSS variable maps for both modes (null if no palette) */
  paletteCssVars: PaletteCssVars | null
  /** Resolved hue angles for all 6 sets after conflict resolution */
  resolvedHues: ResolvedHues | null
  /** Update accent color at runtime */
  setAccentColor: (color: OklchColor) => void
  /** Update tint at runtime (0–100) */
  setTint: (tint: number) => void
  /** Update chroma at runtime (0–100) */
  setChroma: (chroma: number) => void
  /** Reset palette to default or initial settings */
  resetPalette: () => void
  /** Set all palette input values at once */
  setPaletteInput: (input: PaletteInput) => void
  /** Current palette input values */
  paletteInput: PaletteInput | null

  // ── Geometry & Density Multipliers ──
  /** Spacing and sizing multiplier (default 1). Scales paddings, margins, gaps, element dimensions */
  whitespace: number
  /** Update whitespace multiplier (0.4 to 2.5) */
  setWhitespace: (val: number) => void
  /** Border radius multiplier (default 1). Scales rounded-* corners except none and full */
  radius: number
  /** Update radius multiplier (0 to 3.0) */
  setRadius: (val: number) => void
  /** Reset geometry multipliers to 1.0 */
  resetGeometry: () => void
}

const ColorThemeContext = React.createContext<ColorThemeContextValue | null>(null)

export function useColorTheme(): ColorThemeContextValue {
  const context = React.useContext(ColorThemeContext)
  if (!context) {
    throw new Error("useColorTheme must be used within a ThemeProvider.")
  }
  return context
}

/**
 * Hook to access and customize theme geometry multipliers:
 * - `whitespace`: spacing/density multiplier (paddings, margins, gaps, component sizes)
 * - `radius`: corner curvature multiplier (scales rounded-* variants proportionally)
 */
export function useThemeGeometry() {
  const { whitespace, setWhitespace, radius, setRadius, resetGeometry } = useColorTheme()
  return { whitespace, setWhitespace, radius, setRadius, resetGeometry }
}


// ============================================================================
// ThemeProvider Component & Props
// ============================================================================

export const DEFAULT_THEMES = ["light", "dark"] as const

export interface ThemeProviderProps<Themes extends string = string> {
  children: React.ReactNode

  /**
   * Available themes for the application.
   * Defaults to `["light", "dark"]`, but can be customized to any string array,
   * e.g. `["dark-modern", "light-vintage"]` or `["light", "dark", "high-contrast"]`.
   * @default ["light", "dark"]
   */
  themes?: readonly Themes[] | Themes[]

  /**
   * Default theme used when no preference is stored in localStorage.
   * @default "system" (or first theme in `themes` if light/dark are absent)
   */
  defaultTheme?: Themes | "system"

  /**
   * Force a specific theme, ignoring user preference and system detection.
   */
  forcedTheme?: Themes

  /**
   * Detect system preference via `prefers-color-scheme`.
   * @default true
   */
  enableSystem?: boolean

  /**
   * Set native CSS `color-scheme` property on document element.
   * @default true
   */
  enableColorScheme?: boolean

  /**
   * HTML attribute(s) to set on the target element.
   * @default "class"
   */
  attribute?: Attribute | readonly Attribute[]

  /**
   * Map theme names to custom attribute values or class names.
   * e.g. `{ "dark-modern": "dark dark-modern", "light-vintage": "light vintage" }`
   */
  value?: ThemeValueObject<Themes>

  /**
   * Element to apply theme to.
   * @default "html"
   */
  target?: "html" | "body" | string

  /**
   * Storage type for persisting theme preference.
   * @default "localStorage"
   */
  storage?: StorageType

  /**
   * Storage key name.
   * @default "theme"
   */
  storageKey?: string

  /**
   * Disable CSS transitions on initial load and theme change to prevent transition flashes.
   * Pass `true` to disable all transitions or a custom transition string.
   * @default false
   */
  disableTransitionOnChange?: boolean | string

  /**
   * Called whenever the theme changes.
   */
  onThemeChange?: (theme: ThemeSelection<Themes>) => void

  /**
   * Theme color meta tag configuration.
   */
  themeColor?: ThemeColor<Themes>

  /**
   * Always follow system preference changes even after user selection.
   * @default false
   */
  followSystem?: boolean

  /**
   * Initial theme passed from server (e.g. server cookies or user profile in database).
   */
  initialTheme?: ThemeSelection<Themes>

  /**
   * CSP nonce for the inline pre-hydration script.
   */
  nonce?: string

  /**
   * Extra attributes for the pre-hydration bootstrap script.
   */
  scriptProps?: ThemeScriptAttributes

  /**
   * Enable or customize the Base UI Toast Provider & Viewport (`Toaster`).
   * When `true`, automatically renders Base UI's `<Toaster>` so toasts can be dispatched
   * anywhere via `toast.create(...)` or `useToastManager()`.
   * Pass `false` to disable.
   * @default true
   */
  toast?: boolean | Partial<React.ComponentProps<typeof Toaster>>

  /**
   * Enable or configure the Base UI Tooltip Provider (`TooltipProvider`).
   * When `true`, wraps the children with `<TooltipProvider delay={0}>`.
   * Pass `false` to disable.
   * @default true
   */
  tooltip?: boolean | Partial<React.ComponentProps<typeof TooltipProvider>>

  /**
   * Typeset measurements configuration according to Shadcn Typeset specification.
   * Allows setting rhythm (`size`, `leading`, `flow`), reading measure, font families,
   * or selecting a preset (`"default" | "docs" | "chat" | "reading" | "compact" | "large"`).
   * Automatically sets `--typeset-*` CSS variables on `:root` and `.typeset`.
   * @default "default"
   */
  typeset?: TypesetConfig | TypesetPresetName

  /**
   * Color theme configuration (extensible slot for upcoming color themes feature).
   * Can be a theme name (e.g. `"neutral"`, `"zinc"`) or full configuration object.
   * @default "neutral"
   */
  colorTheme?: string | ColorThemeConfig

  /**
   * Default color theme when no colorTheme is specified.
   * @default "neutral"
   */
  defaultColorTheme?: string

  /**
   * 1. Primary brand accent color in OKLCH ({ l: lightness, c: chroma, h: hue }).
   * e.g. `{ l: 0.88, c: 0.20, h: 96 }` for vivid Canary Yellow, or `{ l: 0.55, c: 0.24, h: 264 }` for Iris Violet.
   * Drives the entire 6×13×2 mathematical color token system.
   */
  accentColor?: OklchColor

  /**
   * 2. Neutral Surface Tint Factor (0–100%).
   * - 0% = pure achromatic grayscale (zero saturation in neutral surfaces & text).
   * - 100% = rich, deeply tinted slate/graphite surfaces and borders infused with the accent color.
   * @default 20
   */
  tint?: number

  /**
   * 3. Global Palette Vibrancy Scale (0–100%).
   * Scales color saturation across all 6 functional color sets (Primary, Neutral, Info, Success, Warning, Danger).
   * @default 80
   */
  chroma?: number

  /**
   * Complete PaletteInput configuration.
   */
  palette?: PaletteInput

  /**
   * Spacing and sizing multiplier (white-space / density factor).
   * Proportionally scales all component padding, margin, gap, and dimension sizings
   * without affecting typography or font sizes.
   * - 0.8 = Compact / High-density
   * - 1.0 = Default Standard Balanced
   * - 1.2 = Relaxed / Spacious
   * - 1.5 = Extra Roomy
   * @default 1
   */
  whitespace?: number

  /**
   * Alias for `whitespace` (camelCase variant).
   */
  whiteSpace?: number

  /**
   * Border radius multiplier.
   * Proportionally scales all component rounded-* corner curvatures (from rounded-xs to rounded-4xl)
   * except none (0px) and full (pill/circle/infinite radius).
   * - 0 = Sharp Square / Brutalist
   * - 0.5 = Subtle / Crisp
   * - 1.0 = Default Signature Smooth Curves
   * - 1.5 = Bubbly / Ultra-Soft Curves
   * - 2.0 = Maximum Curvature
   * @default 1
   */
  radius?: number

  /**
   * Callback fired when color theme changes.
   */
  onColorThemeChange?: (colorTheme: string) => void
}

/**
 * General ThemeProvider for the component system.
 *
 * Integrates:
 * 1. `@wrksz/themes` for modern, flicker-free dark/light/custom theme management.
 * 2. Base UI `Toaster` & `ToastProvider` for rich accessible toast notifications.
 * 3. Base UI `TooltipProvider` for global tooltip timing and positioning.
 * 4. Shadcn Typeset Measurements (`--typeset-size`, `--typeset-leading`, `--typeset-flow`, etc.).
 * 5. Extensible Color Theme foundation.
 * 6. Dynamic Whitespace (density) & Corner Radius multipliers.
 */
export function ThemeProvider<Themes extends string = string>({
  children,
  themes = DEFAULT_THEMES as unknown as readonly Themes[],
  defaultTheme,
  forcedTheme,
  enableSystem = true,
  enableColorScheme = true,
  attribute = "class",
  value,
  target = "html",
  storage = "localStorage",
  storageKey = "theme",
  disableTransitionOnChange = false,
  onThemeChange,
  themeColor,
  followSystem = false,
  initialTheme,
  nonce,
  scriptProps,
  toast: toastConfig = true,
  tooltip: tooltipConfig = true,
  typeset: typesetConfig = "default",
  colorTheme: colorThemeProp,
  defaultColorTheme = "neutral",
  onColorThemeChange,
  accentColor: accentColorProp,
  tint: tintProp,
  chroma: chromaProp,
  palette: paletteProp,
  whitespace: whitespaceProp,
  whiteSpace: whiteSpaceProp,
  radius: radiusProp,
}: ThemeProviderProps<Themes>) {
  // 1. Resolve defaultTheme intelligently if not explicitly set
  const resolvedDefaultTheme = React.useMemo(() => {
    if (defaultTheme) return defaultTheme
    const themeList = themes as readonly string[]
    if (themeList.includes("light") || themeList.includes("dark")) {
      return "system"
    }
    return (themeList[0] as Themes) || "light"
  }, [defaultTheme, themes])

  // 2. Typeset State & Measurements Resolution
  const initialTypesetPreset: TypesetPresetName = React.useMemo(() => {
    if (typeof typesetConfig === "string") return typesetConfig
    return typesetConfig?.preset || "default"
  }, [typesetConfig])

  const [activePreset, setActivePreset] = React.useState<TypesetPresetName | "custom">(initialTypesetPreset)

  const [typesetOverrides, setTypesetOverrides] = React.useState<Partial<TypesetMeasurements>>(() => {
    if (typeof typesetConfig === "object" && typesetConfig !== null) {
      const { preset: _, ...rest } = typesetConfig
      return rest
    }
    return {}
  })

  // Synchronize when typeset prop changes
  React.useEffect(() => {
    if (typeof typesetConfig === "string") {
      setActivePreset(typesetConfig)
      setTypesetOverrides({})
    } else if (typeof typesetConfig === "object" && typesetConfig !== null) {
      if (typesetConfig.preset) {
        setActivePreset(typesetConfig.preset)
      }
      const { preset: _, ...rest } = typesetConfig
      setTypesetOverrides(rest)
    }
  }, [typesetConfig])

  const resolvedMeasurements: Required<TypesetMeasurements> = React.useMemo(() => {
    const base = TYPESET_PRESETS[activePreset === "custom" ? "default" : activePreset] || TYPESET_PRESETS.default
    return {
      size: typesetOverrides.size ?? base.size,
      leading: typesetOverrides.leading ?? base.leading,
      flow: typesetOverrides.flow ?? base.flow,
      measure: typesetOverrides.measure ?? base.measure,
      fontBody: typesetOverrides.fontBody ?? base.fontBody,
      fontHeading: typesetOverrides.fontHeading ?? base.fontHeading,
      fontMono: typesetOverrides.fontMono ?? base.fontMono,
    }
  }, [activePreset, typesetOverrides])

  const setMeasurements = React.useCallback(
    (
      updater:
        | Partial<TypesetMeasurements>
        | ((prev: Required<TypesetMeasurements>) => Partial<TypesetMeasurements>)
    ) => {
      setActivePreset("custom")
      setTypesetOverrides((prev) => {
        const currentFull = {
          ...(TYPESET_PRESETS[activePreset === "custom" ? "default" : activePreset] || TYPESET_PRESETS.default),
          ...prev,
        }
        const updates = typeof updater === "function" ? updater(currentFull) : updater
        return { ...prev, ...updates }
      })
    },
    [activePreset]
  )

  const setPreset = React.useCallback((presetName: TypesetPresetName) => {
    setActivePreset(presetName)
    setTypesetOverrides({})
  }, [])

  const typesetStyle: React.CSSProperties = React.useMemo(
    () =>
      ({
        "--typeset-size": resolvedMeasurements.size,
        "--typeset-leading": String(resolvedMeasurements.leading),
        "--typeset-flow": resolvedMeasurements.flow,
        "--typeset-measure": resolvedMeasurements.measure,
        "--typeset-font-body": resolvedMeasurements.fontBody,
        "--typeset-font-heading": resolvedMeasurements.fontHeading,
        "--typeset-font-mono": resolvedMeasurements.fontMono,
      }) as React.CSSProperties,
    [resolvedMeasurements]
  )

  const typesetClassName = React.useMemo(
    () => `typeset ${activePreset !== "custom" ? `typeset-${activePreset}` : ""}`.trim(),
    [activePreset]
  )

  const typesetContextValue: TypesetContextValue = React.useMemo(
    () => ({
      measurements: resolvedMeasurements,
      preset: activePreset,
      setMeasurements,
      setPreset,
      style: typesetStyle,
      className: typesetClassName,
    }),
    [resolvedMeasurements, activePreset, setMeasurements, setPreset, typesetStyle, typesetClassName]
  )

  // 3. Color Theme State
  const initialColorThemeName = React.useMemo(() => {
    if (typeof colorThemeProp === "string") return colorThemeProp
    if (typeof colorThemeProp === "object" && colorThemeProp?.name) return colorThemeProp.name
    return defaultColorTheme
  }, [colorThemeProp, defaultColorTheme])

  const [activeColorTheme, setActiveColorTheme] = React.useState<string>(initialColorThemeName)

  React.useEffect(() => {
    if (typeof colorThemeProp === "string") {
      setActiveColorTheme(colorThemeProp)
    } else if (typeof colorThemeProp === "object" && colorThemeProp?.name) {
      setActiveColorTheme(colorThemeProp.name)
    }
  }, [colorThemeProp])

  const handleSetColorTheme = React.useCallback(
    (newTheme: string) => {
      setActiveColorTheme(newTheme)
      onColorThemeChange?.(newTheme)
    },
    [onColorThemeChange]
  )

  const colorThemeConfig = typeof colorThemeProp === "object" ? colorThemeProp : undefined

function safeParseAccentColor(input: any): OklchColor | undefined {
  if (!input) return undefined
  if (
    typeof input === "object" &&
    typeof input.l === "number" &&
    !isNaN(input.l) &&
    typeof input.h === "number" &&
    !isNaN(input.h)
  ) {
    return {
      l: input.l,
      c: typeof input.c === "number" && !isNaN(input.c) ? input.c : 0.2,
      h: input.h,
    }
  }
  if (typeof input === "string") {
    try {
      const jsonStr = input.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
      const parsed = JSON.parse(jsonStr)
      if (
        typeof parsed.l === "number" &&
        !isNaN(parsed.l) &&
        typeof parsed.h === "number" &&
        !isNaN(parsed.h)
      ) {
        return {
          l: parsed.l,
          c: typeof parsed.c === "number" && !isNaN(parsed.c) ? parsed.c : 0.2,
          h: parsed.h,
        }
      }
    } catch {}
  }
  return undefined
}

  // 3b. OKLCH Palette Generation
  const paletteConfig = colorThemeConfig?.palette

  // Check if nested inside another ThemeProvider
  const parentColorTheme = React.useContext(ColorThemeContext)
  const isNested = parentColorTheme !== null

  const resolvedAccent = React.useMemo(() => {
    return safeParseAccentColor(accentColorProp) ??
      safeParseAccentColor(paletteProp?.accentColor) ??
      safeParseAccentColor(paletteConfig?.accentColor) ??
      { l: 0.55, c: 0.24, h: 264 }
  }, [accentColorProp, paletteProp, paletteConfig])

  const DEFAULT_PALETTE_INPUT: PaletteInput = React.useMemo(() => ({
    accentColor: resolvedAccent,
    tint: typeof tintProp === "number" && !isNaN(tintProp) ? tintProp : paletteProp?.tint ?? paletteConfig?.tint ?? 20,
    chroma: typeof chromaProp === "number" && !isNaN(chromaProp) ? chromaProp : paletteProp?.chroma ?? paletteConfig?.chroma ?? 80,
  }), [resolvedAccent, tintProp, chromaProp, paletteProp, paletteConfig])

  const [paletteInputState, setPaletteInputState] = React.useState<PaletteInput>(DEFAULT_PALETTE_INPUT)

  // Sync palette from props or localStorage (only root provider reads/writes localStorage)
  React.useEffect(() => {
    if (isNested) {
      setPaletteInputState(DEFAULT_PALETTE_INPUT)
      return
    }

    if (accentColorProp || paletteProp || paletteConfig) {
      setPaletteInputState(DEFAULT_PALETTE_INPUT)
    } else {
      try {
        const saved = localStorage.getItem("karan-palette-custom")
        if (saved) {
          const parsed = JSON.parse(saved)
          if (
            parsed?.accentColor?.l !== undefined &&
            !isNaN(parsed.accentColor.l) &&
            parsed?.accentColor?.h !== undefined &&
            !isNaN(parsed.accentColor.h)
          ) {
            setPaletteInputState(parsed)
          } else {
            localStorage.removeItem("karan-palette-custom")
          }
        }
      } catch {
        localStorage.removeItem("karan-palette-custom")
      }
    }
  }, [
    isNested,
    accentColorProp,
    paletteProp,
    paletteConfig,
    DEFAULT_PALETTE_INPUT,
  ])

  const generatedPalette = React.useMemo(() => {
    return generatePalette(paletteInputState)
  }, [paletteInputState])

  const paletteCssVarsResult = React.useMemo(() => {
    if (!generatedPalette) return null
    return paletteToCssVars(generatedPalette)
  }, [generatedPalette])

  const resolvedHuesResult = React.useMemo(() => {
    return getResolvedHues(paletteInputState.accentColor)
  }, [paletteInputState])

  const paletteCssString = React.useMemo(() => {
    if (!generatedPalette) return ""
    return paletteToCssString(generatedPalette)
  }, [generatedPalette])

  const updatePaletteInput = React.useCallback((updater: (prev: PaletteInput) => PaletteInput) => {
    setPaletteInputState((prev) => {
      const next = updater(prev)
      if (!isNested) {
        try {
          localStorage.setItem("karan-palette-custom", JSON.stringify(next))
        } catch {}
      }
      return next
    })
  }, [isNested])

  const setAccentColor = React.useCallback((color: OklchColor) => {
    updatePaletteInput((prev) => ({ ...prev, accentColor: color }))
  }, [updatePaletteInput])

  const setPaletteTint = React.useCallback((tint: number) => {
    updatePaletteInput((prev) => ({ ...prev, tint }))
  }, [updatePaletteInput])

  const setPaletteChroma = React.useCallback((chroma: number) => {
    updatePaletteInput((prev) => ({ ...prev, chroma }))
  }, [updatePaletteInput])

  const setPaletteInput = React.useCallback((input: PaletteInput) => {
    setPaletteInputState(input)
    if (!isNested) {
      try {
        localStorage.setItem("karan-palette-custom", JSON.stringify(input))
      } catch {}
    }
  }, [isNested])

  const resetPalette = React.useCallback(() => {
    if (!isNested) {
      try {
        localStorage.removeItem("karan-palette-custom")
      } catch {}
    }
    setPaletteInputState(DEFAULT_PALETTE_INPUT)
  }, [isNested, DEFAULT_PALETTE_INPUT])

  // ── Geometry Multipliers State (whitespace & radius) ──
  const explicitWhitespace = whitespaceProp ?? whiteSpaceProp
  const hasExplicitWhitespace =
    typeof explicitWhitespace === "number" && !isNaN(explicitWhitespace) && explicitWhitespace >= 0

  const initialWhitespace = React.useMemo(() => {
    if (hasExplicitWhitespace) return explicitWhitespace!
    if (isNested && parentColorTheme) return parentColorTheme.whitespace
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("karan-theme-whitespace")
        if (saved) {
          const num = parseFloat(saved)
          if (!isNaN(num) && num > 0) return num
        }
      } catch {}
    }
    return 1
  }, [hasExplicitWhitespace, explicitWhitespace, isNested, parentColorTheme])

  const [currentWhitespace, setCurrentWhitespace] = React.useState<number>(initialWhitespace)

  const hasExplicitRadius = typeof radiusProp === "number" && !isNaN(radiusProp) && radiusProp >= 0

  const initialRadius = React.useMemo(() => {
    if (hasExplicitRadius) return radiusProp!
    if (isNested && parentColorTheme) return parentColorTheme.radius
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("karan-theme-radius")
        if (saved) {
          const num = parseFloat(saved)
          if (!isNaN(num) && num >= 0) return num
        }
      } catch {}
    }
    return 1
  }, [hasExplicitRadius, radiusProp, isNested, parentColorTheme])

  const [currentRadius, setCurrentRadius] = React.useState<number>(initialRadius)

  // Synchronize when explicit props change or when parent theme changes (if not explicitly overridden)
  React.useEffect(() => {
    if (hasExplicitWhitespace) {
      setCurrentWhitespace(explicitWhitespace!)
    } else if (isNested && parentColorTheme) {
      setCurrentWhitespace(parentColorTheme.whitespace)
    }
  }, [hasExplicitWhitespace, explicitWhitespace, isNested, parentColorTheme?.whitespace])

  React.useEffect(() => {
    if (hasExplicitRadius) {
      setCurrentRadius(radiusProp!)
    } else if (isNested && parentColorTheme) {
      setCurrentRadius(parentColorTheme.radius)
    }
  }, [hasExplicitRadius, radiusProp, isNested, parentColorTheme?.radius])

  // Realtime synchronization to documentElement CSS custom properties for root provider
  React.useEffect(() => {
    if (isNested || typeof document === "undefined") return
    const root = document.documentElement
    root.style.setProperty("--theme-whitespace", String(currentWhitespace))
    root.style.setProperty("--theme-radius", String(currentRadius))
    root.style.setProperty("--spacing", `calc(0.25rem * ${currentWhitespace})`)
    root.style.setProperty("--radius", `calc(0.625rem * ${currentRadius})`)
    root.style.setProperty("--radius-xs", `calc(0.625rem * ${currentRadius} * 0.4)`)
    root.style.setProperty("--radius-sm", `calc(0.625rem * ${currentRadius} * 0.6)`)
    root.style.setProperty("--radius-md", `calc(0.625rem * ${currentRadius} * 0.8)`)
    root.style.setProperty("--radius-lg", `calc(0.625rem * ${currentRadius})`)
    root.style.setProperty("--radius-xl", `calc(0.625rem * ${currentRadius} * 1.4)`)
    root.style.setProperty("--radius-2xl", `calc(0.625rem * ${currentRadius} * 1.8)`)
    root.style.setProperty("--radius-3xl", `calc(0.625rem * ${currentRadius} * 2.2)`)
    root.style.setProperty("--radius-4xl", `calc(0.625rem * ${currentRadius} * 2.6)`)
  }, [isNested, currentWhitespace, currentRadius])

  const handleSetWhitespace = React.useCallback(
    (val: number) => {
      const clamped = Math.max(0.4, Math.min(2.5, Number(val.toFixed(2))))
      setCurrentWhitespace(clamped)
      if (!isNested && typeof window !== "undefined") {
        try {
          localStorage.setItem("karan-theme-whitespace", clamped.toString())
        } catch {}
      }
    },
    [isNested]
  )

  const handleSetRadius = React.useCallback(
    (val: number) => {
      const clamped = Math.max(0, Math.min(3, Number(val.toFixed(2))))
      setCurrentRadius(clamped)
      if (!isNested && typeof window !== "undefined") {
        try {
          localStorage.setItem("karan-theme-radius", clamped.toString())
        } catch {}
      }
    },
    [isNested]
  )

  const handleResetGeometry = React.useCallback(() => {
    setCurrentWhitespace(1)
    setCurrentRadius(1)
    if (!isNested && typeof window !== "undefined") {
      try {
        localStorage.removeItem("karan-theme-whitespace")
        localStorage.removeItem("karan-theme-radius")
      } catch {}
    }
  }, [isNested])

  const colorThemeContextValue: ColorThemeContextValue = React.useMemo(
    () => ({
      colorTheme: activeColorTheme,
      setColorTheme: handleSetColorTheme,
      config: colorThemeConfig,
      palette: generatedPalette,
      paletteCssVars: paletteCssVarsResult,
      resolvedHues: resolvedHuesResult,
      setAccentColor,
      setTint: setPaletteTint,
      setChroma: setPaletteChroma,
      resetPalette,
      setPaletteInput,
      paletteInput: paletteInputState,
      whitespace: currentWhitespace,
      setWhitespace: handleSetWhitespace,
      radius: currentRadius,
      setRadius: handleSetRadius,
      resetGeometry: handleResetGeometry,
    }),
    [
      activeColorTheme,
      handleSetColorTheme,
      colorThemeConfig,
      generatedPalette,
      paletteCssVarsResult,
      resolvedHuesResult,
      setAccentColor,
      setPaletteTint,
      setPaletteChroma,
      resetPalette,
      setPaletteInput,
      paletteInputState,
      currentWhitespace,
      handleSetWhitespace,
      currentRadius,
      handleSetRadius,
      handleResetGeometry,
    ]
  )

  // 4. Toast & Tooltip Props Resolution
  const isToastEnabled = toastConfig !== false
  const toastProps = typeof toastConfig === "object" ? toastConfig : {}

  const isTooltipEnabled = tooltipConfig !== false
  const tooltipProps = typeof tooltipConfig === "object" ? tooltipConfig : {}

  // 5. Build Content with Tooltip and Toast wrappers
  let content = children

  // Wrap with Base UI TooltipProvider if enabled
  if (isTooltipEnabled) {
    content = (
      <TooltipProvider delay={0} {...tooltipProps}>
        {content}
      </TooltipProvider>
    )
  }

  // Wrap with Base UI Toaster / ToastProvider if enabled
  if (isToastEnabled) {
    content = <Toaster {...toastProps}>{content}</Toaster>
  }

  // Injected CSS variables stylesheet for typeset root cascading
  const typesetCssVars = `
:root, .typeset {
  --typeset-size: ${resolvedMeasurements.size};
  --typeset-leading: ${resolvedMeasurements.leading};
  --typeset-flow: ${resolvedMeasurements.flow};
  --typeset-measure: ${resolvedMeasurements.measure};
  --typeset-font-body: ${resolvedMeasurements.fontBody};
  --typeset-font-heading: ${resolvedMeasurements.fontHeading};
  --typeset-font-mono: ${resolvedMeasurements.fontMono};
}
`

  // Injected CSS variables stylesheet for geometry (whitespace & radius) cascading
  const geometryCssString = `
:root {
  --theme-whitespace: ${currentWhitespace};
  --theme-radius: ${currentRadius};
  --spacing: calc(0.25rem * ${currentWhitespace});
  --radius: calc(0.625rem * ${currentRadius});
  --radius-xs: calc(0.625rem * ${currentRadius} * 0.4);
  --radius-sm: calc(0.625rem * ${currentRadius} * 0.6);
  --radius-md: calc(0.625rem * ${currentRadius} * 0.8);
  --radius-lg: calc(0.625rem * ${currentRadius});
  --radius-xl: calc(0.625rem * ${currentRadius} * 1.4);
  --radius-2xl: calc(0.625rem * ${currentRadius} * 1.8);
  --radius-3xl: calc(0.625rem * ${currentRadius} * 2.2);
  --radius-4xl: calc(0.625rem * ${currentRadius} * 2.6);
}
`

  const nestedGeometryStyle: React.CSSProperties = {
    // @ts-expect-error CSS custom properties
    "--theme-whitespace": String(currentWhitespace),
    "--theme-radius": String(currentRadius),
    "--spacing": `calc(0.25rem * ${currentWhitespace})`,
    "--radius": `calc(0.625rem * ${currentRadius})`,
    "--radius-xs": `calc(0.625rem * ${currentRadius} * 0.4)`,
    "--radius-sm": `calc(0.625rem * ${currentRadius} * 0.6)`,
    "--radius-md": `calc(0.625rem * ${currentRadius} * 0.8)`,
    "--radius-lg": `calc(0.625rem * ${currentRadius})`,
    "--radius-xl": `calc(0.625rem * ${currentRadius} * 1.4)`,
    "--radius-2xl": `calc(0.625rem * ${currentRadius} * 1.8)`,
    "--radius-3xl": `calc(0.625rem * ${currentRadius} * 2.2)`,
    "--radius-4xl": `calc(0.625rem * ${currentRadius} * 2.6)`,
  }

  // When nested inside another ThemeProvider (e.g. inside a preview or story),
  // DO NOT inject styles into :root or run scripts that hijack the global document.
  if (isNested) {
    return (
      <ColorThemeContext.Provider value={colorThemeContextValue}>
        <TypesetContext.Provider value={typesetContextValue}>
          <div data-color-theme={activeColorTheme} style={nestedGeometryStyle} className="contents">
            {content}
          </div>
        </TypesetContext.Provider>
      </ColorThemeContext.Provider>
    )
  }

  return (
    <>
      {/* Theme pre-hydration bootstrap script from @wrksz/themes */}
      <ThemeScript<Themes>
        themes={themes as readonly Themes[]}
        defaultTheme={resolvedDefaultTheme as Themes | "system"}
        forcedTheme={forcedTheme}
        enableSystem={enableSystem}
        attribute={attribute}
        value={value}
        target={target}
        storage={storage}
        storageKey={storageKey}
        enableColorScheme={enableColorScheme}
        disableTransitionOnChange={disableTransitionOnChange}
        nonce={nonce}
        scriptProps={scriptProps}
        themeColor={themeColor}
        followSystem={followSystem}
        initialTheme={initialTheme}
      />

      {/* Global CSS variables injection for typeset rhythm */}
      <style
        data-karan-typeset=""
        dangerouslySetInnerHTML={{ __html: typesetCssVars }}
      />

      {/* OKLCH Palette CSS variables injection */}
      {paletteCssString && (
        <style
          data-karan-palette=""
          dangerouslySetInnerHTML={{ __html: paletteCssString }}
        />
      )}

      {/* Global CSS variables injection for geometry (whitespace & radius) */}
      <style
        data-karan-geometry=""
        dangerouslySetInnerHTML={{ __html: geometryCssString }}
      />

      {/* Modern @wrksz/themes client provider */}
      <ClientThemeProvider<Themes>
        themes={themes as readonly Themes[]}
        defaultTheme={resolvedDefaultTheme as Themes | "system"}
        forcedTheme={forcedTheme}
        enableSystem={enableSystem}
        attribute={attribute}
        value={value}
        target={target}
        storage={storage}
        storageKey={storageKey}
        enableColorScheme={enableColorScheme}
        disableTransitionOnChange={disableTransitionOnChange}
        themeColor={themeColor}
        followSystem={followSystem}
        initialTheme={initialTheme}
        onThemeChange={onThemeChange}
      >
        <ColorThemeContext.Provider value={colorThemeContextValue}>
          <TypesetContext.Provider value={typesetContextValue}>
            <div data-color-theme={activeColorTheme} className="contents">
              {content}
            </div>
          </TypesetContext.Provider>
        </ColorThemeContext.Provider>
      </ClientThemeProvider>
    </>
  )
}

// ============================================================================
// Typeset Component Helper
// ============================================================================

export interface TypesetProps
  extends React.HTMLAttributes<HTMLElement>,
    Partial<TypesetMeasurements> {
  as?: React.ElementType
  preset?: TypesetPresetName
}

/**
 * Typeset container component helper.
 * Applies the typeset rhythm (size, leading, flow, measure, fonts) to rendered
 * markdown, prose, chat bubbles, or documentation articles.
 */
export function Typeset({
  as: Component = "article",
  preset,
  size,
  leading,
  flow,
  measure,
  fontBody,
  fontHeading,
  fontMono,
  className = "",
  style,
  children,
  ...props
}: TypesetProps) {
  const typesetCtx = React.useContext(TypesetContext)

  const activePreset = preset || typesetCtx?.preset || "default"
  const base = TYPESET_PRESETS[activePreset === "custom" ? "default" : activePreset] || TYPESET_PRESETS.default

  const localStyle: React.CSSProperties = {
    ...typesetCtx?.style,
    ...(size ? { "--typeset-size": size } : {}),
    ...(leading ? { "--typeset-leading": String(leading) } : {}),
    ...(flow ? { "--typeset-flow": flow } : {}),
    ...(measure ? { "--typeset-measure": measure } : {}),
    ...(fontBody ? { "--typeset-font-body": fontBody } : {}),
    ...(fontHeading ? { "--typeset-font-heading": fontHeading } : {}),
    ...(fontMono ? { "--typeset-font-mono": fontMono } : {}),
    ...style,
  } as React.CSSProperties

  const classNames = ["typeset", preset ? `typeset-${preset}` : typesetCtx?.className, className]
    .filter(Boolean)
    .join(" ")

  return (
    <Component className={classNames} style={localStyle} {...props}>
      {children}
    </Component>
  )
}

// ============================================================================
// Unified Theme Hook
// ============================================================================

export interface ComponentThemeValue<Themes extends string = string> {
  /** Current active theme (e.g. 'light', 'dark', 'dark-modern', etc., or 'system') */
  theme: ThemeSelection<Themes> | undefined
  /** Resolved active theme ('light', 'dark', etc.) - never 'system' */
  resolvedTheme: string | undefined
  /** System color scheme preference */
  systemTheme: "light" | "dark" | undefined
  /** Forced theme if set */
  forcedTheme: Themes | undefined
  /** All available themes */
  themes: readonly Themes[]
  /** Set theme */
  setTheme: (theme: ThemeSelection<Themes> | ((current: ThemeSelection<Themes> | undefined) => ThemeSelection<Themes>)) => void
  /** Typeset controls */
  typeset: TypesetContextValue
  /** Color theme controls */
  colorTheme: ColorThemeContextValue
  /** Base UI toast manager instance */
  toast: typeof toast
}

/**
 * Unified hook giving access to all ThemeProvider tools:
 * - Color scheme theme (`theme`, `resolvedTheme`, `setTheme`, `themes`)
 * - Typeset rhythm measurements (`typeset.measurements`, `typeset.setPreset`, etc.)
 * - Color theme (`colorTheme.colorTheme`, `colorTheme.setColorTheme`)
 * - Base UI Toast notifications (`toast.create(...)`)
 */
export function useComponentTheme<Themes extends string = string>(): ComponentThemeValue<Themes> {
  const theme = useTheme() as unknown as {
    theme: ThemeSelection<Themes> | undefined
    resolvedTheme: string | undefined
    systemTheme: "light" | "dark" | undefined
    forcedTheme: Themes | undefined
    themes: readonly Themes[]
    setTheme: (theme: ThemeSelection<Themes> | ((current: ThemeSelection<Themes> | undefined) => ThemeSelection<Themes>)) => void
  }
  const typeset = useTypeset()
  const colorTheme = useColorTheme()

  return {
    ...theme,
    typeset,
    colorTheme,
    toast,
  }
}

// ============================================================================
// Re-exports
// ============================================================================

export {
  // @wrksz/themes
  useTheme,
  useThemeValue,
  useHydrated,
  // Base UI Toast
  toast,
  useToastManager,
  createToastManager,
  Toaster,
  ToastProvider,
  // Base UI Tooltip
  TooltipProvider,
}

// Color system re-exports
export type {
  OklchColor,
  PaletteInput,
  GeneratedPalette,
  PaletteCssVars,
  ResolvedHues,
  ColorSetName,
  ColorSetTokens,
}
