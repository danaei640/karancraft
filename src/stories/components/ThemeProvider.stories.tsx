import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  ThemeProvider,
  useTheme,
  useTypeset,
  useColorTheme,
  useComponentTheme,
  useThemeGeometry,
  Typeset,
  toast,
} from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const meta: Meta<typeof ThemeProvider> = {
  title: "Components/ThemeProvider",
  component: ThemeProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof ThemeProvider>

/**
 * Inner component to demonstrate theme switching, toast, tooltip, typeset, and geometry controls
 */
function ThemeControlsDemo() {
  const { theme, resolvedTheme, setTheme, themes } = useTheme()
  const { measurements, preset, setPreset, setMeasurements } = useTypeset()
  const { colorTheme, setColorTheme } = useColorTheme()
  const { whitespace, setWhitespace, radius, setRadius, resetGeometry } = useThemeGeometry()

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header Info */}
      <div className="flex flex-col gap-2 border-b pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">Karan UI ThemeProvider</h1>
          <Badge variant="outline" className="text-xs">Base UI + @wrksz/themes</Badge>
        </div>
        <p className="text-neutral-text-muted text-sm">
          Unified provider combining <code className="bg-neutral-surface-alt px-1 py-0.5 rounded">@wrksz/themes</code>, Base UI Toast, Base UI Tooltip, Shadcn Typeset rhythm measurements, and ColorTheme slot.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Theme (Dark/Light/Custom) Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">1. Theme (Dark / Light / Custom)</CardTitle>
            <CardDescription>
              Powered by @wrksz/themes with custom themes array support
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm">
              <span className="text-neutral-text-muted">Active Theme:</span>{" "}
              <span className="font-semibold text-primary-text">{theme ?? "system"}</span>{" "}
              <span className="text-xs text-neutral-text-muted">(Resolved: {resolvedTheme})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {themes.map((t) => (
                <Button
                  key={t}
                  size="sm"
                  variant={theme === t ? "default" : "outline"}
                  onClick={() => setTheme(t)}
                >
                  {t}
                </Button>
              ))}
              <Button
                size="sm"
                variant={theme === "system" ? "default" : "outline"}
                onClick={() => setTheme("system")}
              >
                System
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 2. Toast & Tooltip Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">2. Toast & Tooltip Providers</CardTitle>
            <CardDescription>
              Automatic Base UI Toaster and TooltipProvider
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button
                size="sm"
                onClick={() => {
                  toast.add({
                    title: "Action Successful",
                    description: `Current theme: ${resolvedTheme}. Toast provider is active!`,
                  })
                }}
              >
                Trigger Base UI Toast
              </Button>

              <Tooltip>
                <TooltipTrigger render={<Button size="sm" variant="secondary" />}>
                  Hover for Tooltip
                </TooltipTrigger>
                <TooltipContent>
                  Global TooltipProvider is active without local wrapper!
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-xs text-neutral-text-muted">
              Notice that no separate &lt;Toaster&gt; or &lt;TooltipProvider&gt; had to be written inside this demo.
            </p>
          </CardContent>
        </Card>

        {/* 3. Typeset Measurements Controls */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">3. Typeset Rhythm Measurements (Shadcn Typeset)</CardTitle>
            <CardDescription>
              Three core controls (size, leading, flow) + measure dynamically adjusting reading rhythm
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium mr-2">Presets:</span>
              {(["default", "docs", "chat", "reading", "compact", "large"] as const).map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={preset === p ? "default" : "outline"}
                  onClick={() => setPreset(p)}
                >
                  {p}
                </Button>
              ))}
            </div>

            {/* Custom Rhythm Sliders / Inputs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-neutral-interactive/40 border text-xs">
              <div>
                <span className="text-neutral-text-muted block font-mono">--typeset-size</span>
                <span className="font-semibold text-sm">{measurements.size}</span>
              </div>
              <div>
                <span className="text-neutral-text-muted block font-mono">--typeset-leading</span>
                <span className="font-semibold text-sm">{measurements.leading}</span>
              </div>
              <div>
                <span className="text-neutral-text-muted block font-mono">--typeset-flow</span>
                <span className="font-semibold text-sm">{measurements.flow}</span>
              </div>
              <div>
                <span className="text-neutral-text-muted block font-mono">--typeset-measure</span>
                <span className="font-semibold text-sm">{measurements.measure}</span>
              </div>
            </div>

            {/* Typeset Preview Box */}
            <div className="border rounded-xl p-6 bg-neutral-surface-alt">
              <Typeset className="border-l-2 border-primary-interactive-focus pl-4">
                <h3 className="font-bold text-lg">Typeset Typography Preview</h3>
                <p>
                  Typeset brings intentional typography and proportional vertical rhythm to rendered content, prose, and chat bubbles.
                </p>
                <p className="text-neutral-text-muted">
                  When you switch presets above (e.g. from <strong>compact</strong> to <strong>reading</strong>), the line height, block spacing, and base size adjust instantaneously via CSS variables.
                </p>
              </Typeset>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-neutral-text-muted">
            Current Active Color Theme: <strong className="ml-1 text-neutral-text">{colorTheme}</strong>
          </CardFooter>
        </Card>

        {/* 4. Geometry & Density Multipliers (Whitespace & Radius) */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">4. Geometry & Density Multipliers (Whitespace & Radius)</CardTitle>
                <CardDescription>
                  Realtime global scaling multipliers for element sizing/spacing and border radius
                </CardDescription>
              </div>
              <Button size="sm" variant="ghost" onClick={() => resetGeometry()}>
                Reset 1.0x
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Whitespace / Density Slider */}
              <div className="space-y-3 p-4 rounded-xl bg-neutral-surface-alt border">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold block">White-Space & Sizing Multiplier</span>
                    <span className="text-xs text-neutral-text-muted">Scales padding, margin, gap & dimensions (no text)</span>
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {whitespace.toFixed(2)}x
                  </Badge>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.6"
                  step="0.05"
                  value={whitespace}
                  onChange={(e) => setWhitespace(Number(e.target.value))}
                  className="w-full accent-primary-fill cursor-pointer"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { label: "Compact", val: 0.8 },
                    { label: "Default", val: 1.0 },
                    { label: "Relaxed", val: 1.25 },
                    { label: "Airy", val: 1.5 },
                  ].map((preset) => (
                    <Button
                      key={preset.label}
                      size="sm"
                      variant={Math.abs(whitespace - preset.val) < 0.04 ? "default" : "outline"}
                      onClick={() => setWhitespace(preset.val)}
                      className="text-xs"
                    >
                      {preset.label} ({preset.val}x)
                    </Button>
                  ))}
                </div>
              </div>

              {/* Radius Multiplier Slider */}
              <div className="space-y-3 p-4 rounded-xl bg-neutral-surface-alt border">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold block">Border Radius Multiplier</span>
                    <span className="text-xs text-neutral-text-muted">Scales rounded-* values proportionally (excl. none/full)</span>
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {radius.toFixed(1)}x
                  </Badge>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2.5"
                  step="0.1"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full accent-primary-fill cursor-pointer"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { label: "Sharp", val: 0 },
                    { label: "Subtle", val: 0.5 },
                    { label: "Default", val: 1.0 },
                    { label: "Curved", val: 1.5 },
                    { label: "Ultra", val: 2.0 },
                  ].map((preset) => (
                    <Button
                      key={preset.label}
                      size="sm"
                      variant={Math.abs(radius - preset.val) < 0.06 ? "default" : "outline"}
                      onClick={() => setRadius(preset.val)}
                      className="text-xs"
                    >
                      {preset.label} ({preset.val}x)
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Component Reactivity Sample */}
            <div className="p-6 rounded-2xl border bg-primary-surface text-primary-text space-y-4">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Interactive Elements Reacting Live</span>
                <span className="text-xs text-primary-text-secondary">
                  Whitespace: {whitespace.toFixed(2)}x | Radius: {radius.toFixed(1)}x
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" className="rounded-md">rounded-md Button</Button>
                <Button size="sm" variant="outline" className="rounded-lg">rounded-lg Button</Button>
                <Button size="sm" variant="secondary" className="rounded-xl">rounded-xl Button</Button>
                <Button size="sm" variant="destructive" className="rounded-full">rounded-full Button</Button>
                <Badge variant="default" className="rounded-sm">rounded-sm Badge</Badge>
                <Badge variant="outline" className="rounded-full">Pill Badge</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-neutral-text-muted">
            All components automatically respect geometry multipliers without manual styling overrides.
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

/**
 * Default Story with standard ["light", "dark"] themes
 */
export const Default: Story = {
  args: {
    themes: ["light", "dark"],
    defaultTheme: "system",
    enableSystem: true,
    typeset: "default",
  },
  render: (args: any) => (
    <ThemeProvider {...args}>
      <ThemeControlsDemo />
    </ThemeProvider>
  ),
}

/**
 * Custom themes array: e.g. ["dark-modern", "light-vintage", "dark-neon", "light-minimal"]
 */
export const CustomThemes: Story = {
  render: () => (
    <ThemeProvider
      themes={["dark-modern", "light-vintage", "dark-neon", "light-minimal"]}
      defaultTheme="dark-modern"
      typeset="docs"
    >
      <ThemeControlsDemo />
    </ThemeProvider>
  ),
}

/**
 * Reading preset typeset measurements
 */
export const ReadingTypeset: Story = {
  render: () => (
    <ThemeProvider
      typeset={{
        preset: "reading",
        size: "18px",
        leading: 1.9,
        flow: "2em",
        measure: "68ch",
      }}
    >
      <ThemeControlsDemo />
    </ThemeProvider>
  ),
}

/**
 * Custom Geometry Multipliers (e.g. Relaxed Whitespace + Curved Radius)
 */
export const CustomGeometry: Story = {
  render: () => (
    <ThemeProvider
      whitespace={1.25}
      radius={1.6}
    >
      <ThemeControlsDemo />
    </ThemeProvider>
  ),
}

