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

    if (exportFormat === 'props') {
      return `<ThemeProvider\n  accentColor={{ l: ${l}, c: ${c}, h: ${h} }}\n  tint={${currentInput.tint}}\n  chroma={${currentInput.chroma}}\n>\n  {children}\n</ThemeProvider>`;
    }
    if (exportFormat === 'json') {
      return JSON.stringify(
        {
          accentColor: { l, c, h },
          tint: currentInput.tint,
          chroma: currentInput.chroma,
        },
        null,
        2
      );
    }
    return `/* OKLCH Custom Palette Definition */\n:root {\n  --accent-lightness: ${l};\n  --accent-chroma: ${c};\n  --accent-hue: ${h};\n  --palette-tint: ${currentInput.tint}%;\n  --palette-chroma: ${currentInput.chroma}%;\n}`;
  }, [currentAccent, currentInput, exportFormat]);

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
                onClick={() => resetPalette()}
                className="size-7 rounded-full flex items-center justify-center text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/50 transition-colors"
                title="Reset to default theme"
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
          <div className="flex items-center border-b border-neutral-interactive/40 px-3 pt-2 bg-neutral-surface-alt/20">
            <button
              onClick={() => setActiveTab('tuning')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border-b-2 transition-all ${
                activeTab === 'tuning'
                  ? 'border-primary-fill text-neutral-text'
                  : 'border-transparent text-neutral-text-muted hover:text-neutral-text'
              }`}
            >
              <Sliders className="size-3" />
              <span>Palette Sliders</span>
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border-b-2 transition-all ${
                activeTab === 'export'
                  ? 'border-primary-fill text-neutral-text'
                  : 'border-transparent text-neutral-text-muted hover:text-neutral-text'
              }`}
            >
              <Code2 className="size-3" />
              <span>Export Props</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border-b-2 transition-all ${
                activeTab === 'preview'
                  ? 'border-primary-fill text-neutral-text'
                  : 'border-transparent text-neutral-text-muted hover:text-neutral-text'
              }`}
            >
              <Eye className="size-3" />
              <span>Mini Preview</span>
            </button>
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
                    <label htmlFor="hue-slider" className="font-semibold text-neutral-text">Hue Angle</label>
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
                    <label htmlFor="accent-chroma-slider" className="font-semibold text-neutral-text">Accent Chroma</label>
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
                    <label htmlFor="accent-lightness-slider" className="font-semibold text-neutral-text">Accent Lightness</label>
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
                      <span className="text-[10px] text-neutral-text-muted">Primary tint in neutral set</span>
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
                      <span className="text-[10px] text-neutral-text-muted">Global color saturation</span>
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
                <div className="flex gap-1.5 p-1 rounded-full bg-neutral-interactive/40 border border-neutral-interactive/50">
                  <button
                    onClick={() => setExportFormat('props')}
                    className={`flex-1 py-1 text-[11px] rounded-full font-medium transition-all ${
                      exportFormat === 'props'
                        ? 'bg-neutral-surface text-neutral-text shadow-xs'
                        : 'text-neutral-text-muted hover:text-neutral-text'
                    }`}
                  >
                    JSX Props
                  </button>
                  <button
                    onClick={() => setExportFormat('json')}
                    className={`flex-1 py-1 text-[11px] rounded-full font-medium transition-all ${
                      exportFormat === 'json'
                        ? 'bg-neutral-surface text-neutral-text shadow-xs'
                        : 'text-neutral-text-muted hover:text-neutral-text'
                    }`}
                  >
                    JSON Config
                  </button>
                  <button
                    onClick={() => setExportFormat('css')}
                    className={`flex-1 py-1 text-[11px] rounded-full font-medium transition-all ${
                      exportFormat === 'css'
                        ? 'bg-neutral-surface text-neutral-text shadow-xs'
                        : 'text-neutral-text-muted hover:text-neutral-text'
                    }`}
                  >
                    CSS Vars
                  </button>
                </div>

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
                    Test the response of components using the new tokens in realtime:
                  </p>
                </div>

                {/* Live Buttons */}
                <div className="space-y-2">
                  <span className="text-[10px] font-medium text-neutral-text-muted uppercase tracking-wider block">Buttons</span>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary-fill text-primary-on-fill hover:bg-primary-fill-hover shadow-xs transition-colors">
                      Primary
                    </button>
                    <button className="px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-interactive bg-neutral-surface hover:bg-neutral-interactive text-neutral-text transition-colors">
                      Outline
                    </button>
                    <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-interactive hover:bg-neutral-interactive-hover text-neutral-text transition-colors">
                      Secondary
                    </button>
                    <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-danger-fill text-danger-on-fill hover:bg-danger-fill-hover shadow-xs transition-colors">
                      Danger
                    </button>
                  </div>
                </div>

                {/* Live Badges */}
                <div className="space-y-2">
                  <span className="text-[10px] font-medium text-neutral-text-muted uppercase tracking-wider block">Badges</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary-fill text-primary-on-fill">
                      Primary
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-info-fill text-info-on-fill">
                      Info
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-success-fill text-success-on-fill">
                      Success
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-warning-fill text-warning-on-fill">
                      Warning
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-danger-fill text-danger-on-fill">
                      Danger
                    </span>
                  </div>
                </div>

                {/* Live Alert Box */}
                <div className="p-3 rounded-2xl border border-primary-interactive/50 bg-primary-surface text-primary-text space-y-1">
                  <div className="font-semibold text-xs flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-primary-fill" />
                    <span>Realtime Palette Active</span>
                  </div>
                  <p className="text-[11px] text-primary-text-secondary leading-relaxed">
                    This card uses <code className="font-mono text-[10px] bg-primary-surface-alt px-1 py-0.5 rounded">bg-primary-surface</code> and <code className="font-mono text-[10px] bg-primary-surface-alt px-1 py-0.5 rounded">text-primary-text</code>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
