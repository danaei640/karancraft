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
}

const ColorThemeContext = React.createContext<ColorThemeContextValue | null>(null)

export function useColorTheme(): ColorThemeContextValue {
  const context = React.useContext(ColorThemeContext)
  if (!context) {
    throw new Error("useColorTheme must be used within a ThemeProvider.")
  }
  return context
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
   * Direct accent color in OKLCH for dynamic palette generation.
   * e.g. `{ l: 0.55, c: 0.24, h: 264 }`
   */
  accentColor?: OklchColor

  /**
   * Direct tint percentage (0–100) defining how much primary accent impacts neutral surfaces & text.
   * @default 20
   */
  tint?: number

  /**
   * Direct chroma percentage (0–100) defining how saturated and sharp the palette is.
   * @default 80
   */
  chroma?: number

  /**
   * Complete PaletteInput configuration.
   */
  palette?: PaletteInput

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

  // 3b. OKLCH Palette Generation
  const paletteConfig = colorThemeConfig?.palette

  const DEFAULT_PALETTE_INPUT: PaletteInput = React.useMemo(() => ({
    accentColor: accentColorProp ?? paletteProp?.accentColor ?? paletteConfig?.accentColor ?? { l: 0.55, c: 0.24, h: 264 },
    tint: tintProp ?? paletteProp?.tint ?? paletteConfig?.tint ?? 20,
    chroma: chromaProp ?? paletteProp?.chroma ?? paletteConfig?.chroma ?? 80,
  }), [accentColorProp, paletteProp, paletteConfig, tintProp, chromaProp])

  const [paletteInputState, setPaletteInputState] = React.useState<PaletteInput>(DEFAULT_PALETTE_INPUT)

  // Sync palette from props or localStorage
  React.useEffect(() => {
    if (accentColorProp || paletteProp || paletteConfig) {
      setPaletteInputState({
        accentColor: accentColorProp ?? paletteProp?.accentColor ?? paletteConfig?.accentColor ?? DEFAULT_PALETTE_INPUT.accentColor,
        tint: tintProp ?? paletteProp?.tint ?? paletteConfig?.tint ?? DEFAULT_PALETTE_INPUT.tint,
        chroma: chromaProp ?? paletteProp?.chroma ?? paletteConfig?.chroma ?? DEFAULT_PALETTE_INPUT.chroma,
      })
    } else {
      try {
        const saved = localStorage.getItem("karan-palette-custom")
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed?.accentColor?.l !== undefined && parsed?.accentColor?.h !== undefined) {
            setPaletteInputState(parsed)
          }
        }
      } catch {}
    }
  }, [
    accentColorProp,
    paletteProp,
    paletteConfig,
    tintProp,
    chromaProp,
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
      try {
        localStorage.setItem("karan-palette-custom", JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

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
    try {
      localStorage.setItem("karan-palette-custom", JSON.stringify(input))
    } catch {}
  }, [])

  const resetPalette = React.useCallback(() => {
    try {
      localStorage.removeItem("karan-palette-custom")
    } catch {}
    setPaletteInputState(DEFAULT_PALETTE_INPUT)
  }, [DEFAULT_PALETTE_INPUT])

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
