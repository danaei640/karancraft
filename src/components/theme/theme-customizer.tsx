'use client';

import * as React from 'react';
import { useColorTheme } from '@/registry/bases/base/ui/theme-provider';
import { useTheme } from '@wrksz/themes/client';
import { formatOklch, type OklchColor } from '@/lib/color-system';
import {
  Palette,
  Sun,
  Moon,
  RotateCcw,
  X,
  Copy,
  Check,
  Code2,
  Sliders,
  Sparkles,
  Eye,
} from 'lucide-react';
import { toast } from '@/registry/bases/base/ui/toast';
import { Tabs, TabsList, TabsTrigger } from '@/registry/bases/base/ui/tabs';

interface PresetTheme {
  name: string;
  colorName: string;
  accentColor: OklchColor;
  tint: number;
  chroma: number;
}

const PRESETS: PresetTheme[] = [
  {
    name: 'Canary Yellow',
    colorName: 'Canary',
    accentColor: { l: 0.88, c: 0.20, h: 96 },
    tint: 20,
    chroma: 90,
  },
  {
    name: 'Iris Violet',
    colorName: 'Violet',
    accentColor: { l: 0.55, c: 0.24, h: 264 },
    tint: 20,
    chroma: 80,
  },
  {
    name: 'Sapphire',
    colorName: 'Royal Blue',
    accentColor: { l: 0.55, c: 0.20, h: 240 },
    tint: 25,
    chroma: 85,
  },
  {
    name: 'Cyan Teal',
    colorName: 'Cyan',
    accentColor: { l: 0.60, c: 0.17, h: 195 },
    tint: 30,
    chroma: 80,
  },
  {
    name: 'Emerald',
    colorName: 'Vivid Green',
    accentColor: { l: 0.58, c: 0.19, h: 150 },
    tint: 20,
    chroma: 75,
  },
  {
    name: 'Warm Amber',
    colorName: 'Gold Amber',
    accentColor: { l: 0.65, c: 0.18, h: 75 },
    tint: 15,
    chroma: 85,
  },
  {
    name: 'Crimson',
    colorName: 'Bold Red',
    accentColor: { l: 0.52, c: 0.24, h: 25 },
    tint: 20,
    chroma: 90,
  },
  {
    name: 'Rose Magenta',
    colorName: 'Rose',
    accentColor: { l: 0.56, c: 0.23, h: 345 },
    tint: 20,
    chroma: 85,
  },
  {
    name: 'Amethyst',
    colorName: 'Purple',
    accentColor: { l: 0.54, c: 0.26, h: 295 },
    tint: 25,
    chroma: 90,
  },
];

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'tuning' | 'export' | 'preview'>('tuning');
  const [exportFormat, setExportFormat] = React.useState<'props' | 'json' | 'css'>('props');
  const [copied, setCopied] = React.useState(false);

  const { theme, setTheme } = useTheme();
  const {
    paletteInput,
    setAccentColor,
    setTint,
    setChroma,
    resetPalette,
    resolvedHues,
    whitespace,
    setWhitespace,
    radius,
    setRadius,
    resetGeometry,
  } = useColorTheme();

  const currentInput = paletteInput ?? {
    accentColor: { l: 0.55, c: 0.24, h: 264 },
    tint: 20,
    chroma: 80,
  };

  const currentAccent = currentInput.accentColor;
  const currentOklchString = formatOklch(currentAccent);

  // Generate code export strings
  const codeSnippet = React.useMemo(() => {
    const l = Number(currentAccent.l.toFixed(3));
    const c = Number(currentAccent.c.toFixed(3));
    const h = Math.round(currentAccent.h);
    const ws = Number(whitespace.toFixed(2));
    const rad = Number(radius.toFixed(2));

    if (exportFormat === 'props') {
      return `<ThemeProvider
  // 1. Base accent color in OKLCH: Lightness (0–1), Chroma (0–0.35), Hue (0–360°)
  accentColor={{ l: ${l}, c: ${c}, h: ${h} }}
  // 2. Neutral surface tint: 0% = pure gray → 100% = richly tinted slate
  tint={${currentInput.tint}}
  // 3. Global vibrancy scale across all functional color sets (0–100%)
  chroma={${currentInput.chroma}}
  // 4. White-space / density multiplier: scales paddings, gaps, and dimensions (no text)
  whitespace={${ws}}
  // 5. Border radius multiplier: scales rounded-* variants proportionally (except none & full)
  radius={${rad}}
>
  {children}
</ThemeProvider>`;
    }
    if (exportFormat === 'json') {
      return JSON.stringify(
        {
          accentColor: { l, c, h },
          tint: currentInput.tint,
          chroma: currentInput.chroma,
          whitespace: ws,
          radius: rad,
        },
        null,
        2
      );
    }
    return `/* OKLCH Custom Palette & Geometry Definition */\n:root {\n  --accent-lightness: ${l};\n  --accent-chroma: ${c};\n  --accent-hue: ${h};\n  --palette-tint: ${currentInput.tint}%;\n  --palette-chroma: ${currentInput.chroma}%;\n  --theme-whitespace: ${ws};\n  --theme-radius: ${rad};\n}`;
  }, [currentAccent, currentInput, exportFormat, whitespace, radius]);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      toast.add({
        title: 'Copied to clipboard!',
        description: 'Code snippet ready to paste into your app.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [codeSnippet]);

  return (
    <>
      {/* Sticky Floating Trigger Pill */}
      <aside aria-label="Theme Customizer" className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-medium select-none shadow-xl border transition-all duration-200 cursor-pointer ${
            isOpen
              ? 'bg-neutral-text text-neutral-surface border-neutral-text shadow-2xl scale-105'
              : 'bg-neutral-surface/90 text-neutral-text hover:bg-neutral-surface border-neutral-interactive hover:border-primary-interactive-focus/50 backdrop-blur-xl hover:shadow-2xl hover:scale-102'
          }`}
          title="Customize OKLCH Theme & Export Code"
        >
          {/* Glowing live accent color dot */}
          <span
            className="size-3.5 rounded-full shadow-inner ring-2 ring-neutral-surface shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: currentOklchString }}
          />
          <span className="hidden sm:inline font-semibold">Customize Theme</span>
          <span className="sm:hidden font-semibold">Theme</span>
          <Sparkles className="size-3.5 opacity-70 shrink-0" />
        </button>
      </aside>

      {/* Popover Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Theme Customizer"
          className="fixed bottom-20 right-6 z-50 w-[380px] max-w-[calc(100vw-2.5rem)] max-h-[82vh] flex flex-col bg-neutral-surface/95 text-neutral-text backdrop-blur-2xl border border-neutral-interactive rounded-3xl shadow-2xl overflow-hidden transition-all duration-200 animate-in fade-in zoom-in-95"
        >
          {/* Popover Header */}
          <div className="p-4 border-b border-neutral-interactive/50 flex items-center justify-between gap-3 bg-neutral-surface-alt/40">
            <div className="flex items-center gap-2.5">
              <div
                className="size-4 rounded-full ring-2 ring-neutral-surface shrink-0"
                style={{ backgroundColor: currentOklchString }}
              />
              <div>
                <h3 className="text-sm font-bold tracking-tight">Theme Engine</h3>
                <p className="text-[11px] text-neutral-text-muted">Realtime OKLCH Generator</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Light / Dark Mode Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="size-7 rounded-full flex items-center justify-center text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/50 transition-colors"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                {theme === 'dark' ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
              </button>

              {/* Reset to Default */}
              <button
                onClick={() => {
                  resetPalette();
                  resetGeometry();
                }}
                className="size-7 rounded-full flex items-center justify-center text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/50 transition-colors cursor-pointer"
                title="Reset to default theme & geometry"
              >
                <RotateCcw className="size-3.5" />
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="size-7 rounded-full flex items-center justify-center text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/50 transition-colors"
                title="Close Customizer"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="px-4 pt-2 bg-neutral-surface-alt/20">
            <Tabs
              value={activeTab}
              onValueChange={(val) => setActiveTab(val as 'tuning' | 'export' | 'preview')}
            >
              <TabsList variant="line" className="gap-4">
                <TabsTrigger value="tuning" className="flex items-center gap-1.5 text-xs">
                  <Sliders className="size-3" />
                  <span>Palette Sliders</span>
                </TabsTrigger>
                <TabsTrigger value="export" className="flex items-center gap-1.5 text-xs">
                  <Code2 className="size-3" />
                  <span>Export Props</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-1.5 text-xs">
                  <Eye className="size-3" />
                  <span>Mini Preview</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
            {activeTab === 'tuning' && (
              <>
                {/* Curated Presets Grid */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-neutral-text">Curated Accents</span>
                    <span className="text-[10px] text-neutral-text-muted">Instant OKLCH Presets</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {PRESETS.map((preset) => {
                      const bg = formatOklch(preset.accentColor);
                      const isSelected =
                        Math.abs(currentAccent.h - preset.accentColor.h) < 4 &&
                        Math.abs(currentAccent.c - preset.accentColor.c) < 0.05;
                      return (
                        <button
                          key={preset.name}
                          onClick={() => {
                            setAccentColor(preset.accentColor);
                            setTint(preset.tint);
                            setChroma(preset.chroma);
                          }}
                          className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-primary-fill bg-neutral-interactive/50 ring-2 ring-primary-interactive-focus/30 font-semibold'
                              : 'border-neutral-interactive/50 hover:border-neutral-interactive hover:bg-neutral-interactive/30'
                          }`}
                        >
                          <span
                            className="size-5 rounded-full shadow-sm ring-1 ring-black/10 dark:ring-white/20"
                            style={{ backgroundColor: bg }}
                          />
                          <span className="text-[10px] truncate max-w-full text-neutral-text">
                            {preset.colorName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hue Slider (0° - 360°) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="hue-slider" className="font-semibold text-neutral-text block">Accent Hue</label>
                      <span className="text-[10px] text-neutral-text-muted">Base color angle on 360° wheel</span>
                    </div>
                    <span className="font-mono text-neutral-text-muted">{Math.round(currentAccent.h)}°</span>
                  </div>
                  <input
                    id="hue-slider"
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={Math.round(currentAccent.h)}
                    onChange={(e) =>
                      setAccentColor({
                        ...currentAccent,
                        h: Number(e.target.value),
                      })
                    }
                    className="w-full h-3 rounded-full appearance-none cursor-pointer outline-none shadow-inner"
                    style={{
                      background:
                        'linear-gradient(to right, oklch(0.6 0.25 0), oklch(0.6 0.25 60), oklch(0.6 0.25 120), oklch(0.6 0.25 180), oklch(0.6 0.25 240), oklch(0.6 0.25 300), oklch(0.6 0.25 360))',
                    }}
                  />
                </div>

                {/* Chroma Slider (0.02 - 0.35) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="accent-chroma-slider" className="font-semibold text-neutral-text block">Accent Chroma</label>
                      <span className="text-[10px] text-neutral-text-muted">Primary saturation intensity (0.02 – 0.35)</span>
                    </div>
                    <span className="font-mono text-neutral-text-muted">{currentAccent.c.toFixed(2)}</span>
                  </div>
                  <input
                    id="accent-chroma-slider"
                    type="range"
                    min="0.02"
                    max="0.35"
                    step="0.01"
                    value={currentAccent.c}
                    onChange={(e) =>
                      setAccentColor({
                        ...currentAccent,
                        c: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-neutral-interactive accent-primary-fill outline-none"
                  />
                </div>

                {/* Lightness Slider (0.20 - 0.95) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="accent-lightness-slider" className="font-semibold text-neutral-text block">Accent Lightness</label>
                      <span className="text-[10px] text-neutral-text-muted">Deep tones to vivid Canary Yellow (20% – 95%)</span>
                    </div>
                    <span className="font-mono text-neutral-text-muted">{Math.round(currentAccent.l * 100)}%</span>
                  </div>
                  <input
                    id="accent-lightness-slider"
                    type="range"
                    min="0.20"
                    max="0.95"
                    step="0.01"
                    value={currentAccent.l}
                    onChange={(e) =>
                      setAccentColor({
                        ...currentAccent,
                        l: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-neutral-interactive accent-primary-fill outline-none"
                  />
                </div>

                {/* Neutral Tint Slider (0% - 100%) */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-interactive/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="neutral-tint-slider" className="font-semibold text-neutral-text block">Neutral Tint</label>
                      <span className="text-[10px] text-neutral-text-muted">0% = pure gray (0 sat) → 100% = richly tinted slate</span>
                    </div>
                    <span className="font-mono text-neutral-text-muted">{currentInput.tint}%</span>
                  </div>
                  <input
                    id="neutral-tint-slider"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={currentInput.tint}
                    onChange={(e) => setTint(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-neutral-interactive accent-primary-fill outline-none"
                  />
                </div>

                {/* Global Chroma Scale (0% - 100%) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="palette-chroma-slider" className="font-semibold text-neutral-text block">Palette Chroma Scale</label>
                      <span className="text-[10px] text-neutral-text-muted">Global vibrancy across all 6 functional sets</span>
                    </div>
                    <span className="font-mono text-neutral-text-muted">{currentInput.chroma}%</span>
                  </div>
                  <input
                    id="palette-chroma-slider"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={currentInput.chroma}
                    onChange={(e) => setChroma(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-neutral-interactive accent-primary-fill outline-none"
                  />
                </div>

                {/* Resolved Functional Sets Strip */}
                <div className="p-3 rounded-2xl bg-neutral-surface-alt/60 border border-neutral-interactive/50 space-y-2">
                  <span className="text-[11px] font-semibold text-neutral-text block">6 Derived Functional Sets</span>
                  <div className="grid grid-cols-6 gap-1.5 text-center">
                    <div>
                      <div className="h-6 rounded-lg bg-primary-fill mb-1 shadow-xs" />
                      <span className="text-[9px] text-neutral-text-muted truncate block">Primary</span>
                    </div>
                    <div>
                      <div className="h-6 rounded-lg bg-neutral-interactive mb-1 border border-neutral-interactive shadow-xs" />
                      <span className="text-[9px] text-neutral-text-muted truncate block">Neutral</span>
                    </div>
                    <div>
                      <div className="h-6 rounded-lg bg-info-fill mb-1 shadow-xs" />
                      <span className="text-[9px] text-neutral-text-muted truncate block">Info</span>
                    </div>
                    <div>
                      <div className="h-6 rounded-lg bg-success-fill mb-1 shadow-xs" />
                      <span className="text-[9px] text-neutral-text-muted truncate block">Success</span>
                    </div>
                    <div>
                      <div className="h-6 rounded-lg bg-warning-fill mb-1 shadow-xs" />
                      <span className="text-[9px] text-neutral-text-muted truncate block">Warning</span>
                    </div>
                    <div>
                      <div className="h-6 rounded-lg bg-danger-fill mb-1 shadow-xs" />
                      <span className="text-[9px] text-neutral-text-muted truncate block">Danger</span>
                    </div>
                  </div>
                </div>

                {/* ── Geometry & Density Multipliers ── */}
                <div className="pt-3 border-t border-neutral-interactive/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-neutral-text text-xs flex items-center gap-1.5">
                        <Sparkles className="size-3 text-primary-fill" />
                        <span>Geometry & Density Multipliers</span>
                      </h4>
                      <p className="text-[10px] text-neutral-text-muted">
                        Scales all component sizing and corner curvature
                      </p>
                    </div>
                    <button
                      onClick={() => resetGeometry()}
                      className="text-[10px] text-primary-text hover:underline cursor-pointer"
                      title="Reset geometry to 1.0x"
                    >
                      Reset 1.0x
                    </button>
                  </div>

                  {/* 1. White-Space / Density Multiplier */}
                  <div className="space-y-2 p-3 rounded-2xl bg-neutral-surface-alt/60 border border-neutral-interactive/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <label htmlFor="whitespace-slider" className="font-semibold text-neutral-text block text-xs">
                          White-Space / Sizing
                        </label>
                        <span className="text-[10px] text-neutral-text-muted">
                          Paddings, margins, gaps & sizes (typography preserved)
                        </span>
                      </div>
                      <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-neutral-interactive font-semibold text-neutral-text">
                        {whitespace.toFixed(2)}x
                      </span>
                    </div>

                    <input
                      id="whitespace-slider"
                      type="range"
                      min="0.6"
                      max="1.6"
                      step="0.05"
                      value={whitespace}
                      onChange={(e) => setWhitespace(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-neutral-interactive accent-primary-fill outline-none"
                    />

                    {/* Quick Presets */}
                    <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                      {[
                        { label: 'Compact', val: 0.8 },
                        { label: 'Default', val: 1.0 },
                        { label: 'Relaxed', val: 1.25 },
                        { label: 'Airy', val: 1.5 },
                      ].map((preset) => {
                        const isSelected = Math.abs(whitespace - preset.val) < 0.04;
                        return (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => setWhitespace(preset.val)}
                            className={`py-1 px-1.5 rounded-lg text-[10px] font-medium border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-primary-fill text-primary-on-fill border-primary-fill shadow-xs font-semibold'
                                : 'bg-neutral-surface hover:bg-neutral-interactive/50 border-neutral-interactive/60 text-neutral-text'
                            }`}
                          >
                            <span>{preset.label}</span>
                            <span className="block text-[9px] opacity-80">{preset.val}x</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Border Radius Multiplier */}
                  <div className="space-y-2 p-3 rounded-2xl bg-neutral-surface-alt/60 border border-neutral-interactive/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <label htmlFor="radius-slider" className="font-semibold text-neutral-text block text-xs">
                          Border Radius
                        </label>
                        <span className="text-[10px] text-neutral-text-muted">
                          Scales rounded-* values (except none & full)
                        </span>
                      </div>
                      <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-neutral-interactive font-semibold text-neutral-text">
                        {radius.toFixed(1)}x
                      </span>
                    </div>

                    <input
                      id="radius-slider"
                      type="range"
                      min="0"
                      max="2.5"
                      step="0.1"
                      value={radius}
                      onChange={(e) => setRadius(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-neutral-interactive accent-primary-fill outline-none"
                    />

                    {/* Quick Presets */}
                    <div className="grid grid-cols-5 gap-1 pt-0.5">
                      {[
                        { label: 'Sharp', val: 0 },
                        { label: 'Subtle', val: 0.5 },
                        { label: 'Default', val: 1.0 },
                        { label: 'Curved', val: 1.5 },
                        { label: 'Ultra', val: 2.0 },
                      ].map((preset) => {
                        const isSelected = Math.abs(radius - preset.val) < 0.06;
                        return (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => setRadius(preset.val)}
                            className={`py-1 px-1 rounded-lg text-[10px] font-medium border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-primary-fill text-primary-on-fill border-primary-fill shadow-xs font-semibold'
                                : 'bg-neutral-surface hover:bg-neutral-interactive/50 border-neutral-interactive/60 text-neutral-text'
                            }`}
                          >
                            <span>{preset.label}</span>
                            <span className="block text-[9px] opacity-80">{preset.val}x</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'export' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-semibold text-neutral-text">Direct ThemeProvider Props</h4>
                  <p className="text-[11px] text-neutral-text-muted">
                    Copy and pass directly into your root ThemeProvider:
                  </p>
                </div>

                {/* Format Selector */}
                <Tabs
                  value={exportFormat}
                  onValueChange={(v) => setExportFormat(v as 'props' | 'json' | 'css')}
                >
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="props" className="text-[11px]">
                      JSX Props
                    </TabsTrigger>
                    <TabsTrigger value="json" className="text-[11px]">
                      JSON Config
                    </TabsTrigger>
                    <TabsTrigger value="css" className="text-[11px]">
                      CSS Vars
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Code Box */}
                <div className="relative group">
                  <pre className="p-3.5 rounded-2xl bg-neutral-surface-alt border border-neutral-interactive text-[11px] font-mono text-neutral-text overflow-x-auto max-h-48 leading-relaxed">
                    {codeSnippet}
                  </pre>
                  <button
                    onClick={handleCopy}
                    className="absolute top-2.5 right-2.5 size-7 rounded-lg bg-neutral-surface border border-neutral-interactive/60 flex items-center justify-center text-neutral-text hover:border-primary-interactive-focus transition-all shadow-xs cursor-pointer"
                    title="Copy snippet"
                  >
                    {copied ? (
                      <Check className="size-3.5 text-success-text" />
                    ) : (
                      <Copy className="size-3.5 text-neutral-text-muted" />
                    )}
                  </button>
                </div>

                {/* Quick Copy Action */}
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-primary-fill text-primary-on-fill hover:bg-primary-fill-hover font-semibold transition-all shadow-sm cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-4" />
                      <span>Copied Props!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      <span>Copy ThemeProvider Props</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {activeTab === 'preview' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-semibold text-neutral-text">Interactive Live Components</h4>
                  <p className="text-[11px] text-neutral-text-muted">
                    See colors, density (white-space) & corner radiuses dynamically update:
                  </p>
                </div>

                {/* Live Banner showing active multipliers */}
                <div className="p-3 rounded-2xl bg-neutral-surface-alt/80 border border-neutral-interactive/60 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Live Geometry State</span>
                    <span className="text-[10px] text-neutral-text-muted">Active in Realtime</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-center">
                    <div className="p-2 rounded-xl bg-neutral-surface border border-neutral-interactive/40">
                      <span className="text-[10px] text-neutral-text-muted block">Whitespace Multiplier</span>
                      <span className="font-mono font-bold text-xs text-primary-text">{whitespace.toFixed(2)}x</span>
                    </div>
                    <div className="p-2 rounded-xl bg-neutral-surface border border-neutral-interactive/40">
                      <span className="text-[10px] text-neutral-text-muted block">Radius Multiplier</span>
                      <span className="font-mono font-bold text-xs text-primary-text">{radius.toFixed(1)}x</span>
                    </div>
                  </div>
                </div>

                {/* Live Buttons showing border radius scaling */}
                <div className="space-y-2">
                  <span className="text-[10px] font-medium text-neutral-text-muted uppercase tracking-wider block">
                    Buttons (rounded-md / rounded-lg / rounded-full)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 rounded-md text-xs font-semibold bg-primary-fill text-primary-on-fill hover:bg-primary-fill-hover shadow-xs transition-colors">
                      rounded-md
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-interactive bg-neutral-surface hover:bg-neutral-interactive text-neutral-text transition-colors">
                      rounded-lg
                    </button>
                    <button className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-interactive hover:bg-neutral-interactive-hover text-neutral-text transition-colors">
                      rounded-xl
                    </button>
                    <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-danger-fill text-danger-on-fill hover:bg-danger-fill-hover shadow-xs transition-colors">
                      rounded-full
                    </button>
                  </div>
                </div>

                {/* Live Badges showing rounded-sm and rounded-full */}
                <div className="space-y-2">
                  <span className="text-[10px] font-medium text-neutral-text-muted uppercase tracking-wider block">
                    Badges & Tags (rounded-sm vs pill)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-primary-fill text-primary-on-fill">
                      Primary (sm)
                    </span>
                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-medium bg-info-fill text-info-on-fill">
                      Info (sm)
                    </span>
                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-medium bg-success-fill text-success-on-fill">
                      Success (sm)
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-interactive text-neutral-text">
                      Pill (full)
                    </span>
                  </div>
                </div>

                {/* Live Card Container showing density and corner scaling */}
                <div className="p-3.5 rounded-2xl border border-primary-interactive/50 bg-primary-surface text-primary-text space-y-2">
                  <div className="font-semibold text-xs flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-primary-fill" />
                      <span>Card Container (rounded-2xl)</span>
                    </div>
                    <span className="text-[10px] text-primary-text-secondary">Density-reactive</span>
                  </div>
                  <p className="text-[11px] text-primary-text-secondary leading-relaxed">
                    Inner spacing and padding react to the white-space multiplier, while corner curvature smoothly scales.
                  </p>
                  <input
                    type="text"
                    readOnly
                    value="Input field (rounded-md)"
                    className="w-full px-3 py-1.5 text-xs rounded-md bg-neutral-surface text-neutral-text border border-neutral-interactive outline-none shadow-xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
