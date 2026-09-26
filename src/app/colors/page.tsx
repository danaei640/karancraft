'use client';

import * as React from 'react';
import Link from 'next/link';
import { useColorTheme } from '@/registry/bases/base/ui/theme-provider';
import { useTheme } from '@wrksz/themes/client';
import {
  formatOklch,
  CONTRAST_THRESHOLDS,
  contrastScore,
  type ColorSetName,
  type ColorSetTokens,
} from '@/lib/color-system';
import {
  Palette,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  Copy,
  Check,
  Code2,
  Layers,
  Sliders,
  ShieldCheck,
  Compass,
  Contrast,
  Sun,
  Moon,
} from 'lucide-react';
import { toast } from '@/registry/bases/base/ui/toast';

const SET_NAMES: ColorSetName[] = ['primary', 'neutral', 'info', 'success', 'warning', 'danger'];

const SET_DESCRIPTIONS: Record<ColorSetName, string> = {
  primary: 'Core brand identity, primary call-to-actions, focus rings, and active states.',
  neutral: 'Backgrounds, surfaces, borders, dividers, body copy, and secondary captions.',
  info: 'Informational callouts, status indicators, guidance messages, and blue accents.',
  success: 'Positive affirmations, completed tasks, validation success, and green indicators.',
  warning: 'Cautionary alerts, pending operations, warnings, and warm gold/amber accents.',
  danger: 'Destructive triggers, error states, critical validation warnings, and red accents.',
};

interface TokenMeta {
  key: keyof ColorSetTokens;
  name: string;
  cssSuffix: string;
  role: string;
  isText?: boolean;
}

const TOKENS_META: TokenMeta[] = [
  { key: 'surface', name: 'Surface', cssSuffix: 'surface', role: 'Base background for page or low-elevation cards' },
  { key: 'surfaceAlt', name: 'Surface Alt', cssSuffix: 'surface-alt', role: 'Elevated surfaces, card panels, modals, dropdowns' },
  { key: 'interactive', name: 'Interactive', cssSuffix: 'interactive', role: 'Default state for inputs, borders, dividers, secondary elements' },
  { key: 'interactiveHover', name: 'Interactive Hover', cssSuffix: 'interactive-hover', role: 'Hover state for secondary controls, list items, menus' },
  { key: 'interactiveActive', name: 'Interactive Active', cssSuffix: 'interactive-active', role: 'Active / pressed state for secondary controls' },
  { key: 'interactiveFocus', name: 'Interactive Focus', cssSuffix: 'interactive-focus', role: 'Focus rings, indicator dots, outline highlights' },
  { key: 'fill', name: 'Solid Fill', cssSuffix: 'fill', role: 'Solid background for primary buttons, switches, active checkboxes' },
  { key: 'fillHover', name: 'Fill Hover', cssSuffix: 'fill-hover', role: 'Hover state for solid buttons and controls' },
  { key: 'fillActive', name: 'Fill Active', cssSuffix: 'fill-active', role: 'Pressed state for solid buttons and controls' },
  { key: 'text', name: 'Text', cssSuffix: 'text', role: 'High-contrast primary text, headings, icons', isText: true },
  { key: 'textSecondary', name: 'Text Secondary', cssSuffix: 'text-' + 'secondary', role: 'Secondary readable body copy, descriptions', isText: true },
  { key: 'textMuted', name: 'Text Muted', cssSuffix: 'text-' + 'muted', role: 'De-emphasized text, placeholders, disabled indicators', isText: true },
  { key: 'onFill', name: 'On Fill', cssSuffix: 'on-fill', role: 'Contrasting text or icon overlaid on solid Fill (guaranteed AAA)', isText: true },
];

export default function ColorsPage() {
  const { palette, paletteInput, resolvedHues } = useColorTheme();
  const { theme, setTheme } = useTheme();
  const [selectedSet, setSelectedSet] = React.useState<ColorSetName>('primary');
  const [copiedCode, setCopiedCode] = React.useState(false);

  const isDark = theme === 'dark';
  const currentModePalette = isDark ? palette?.dark : palette?.light;
  const currentInput = paletteInput ?? {
    accentColor: { l: 0.55, c: 0.24, h: 264 },
    tint: 20,
    chroma: 80,
  };

  const copySnippet = React.useCallback(async () => {
    const l = Number(currentInput.accentColor.l.toFixed(3));
    const c = Number(currentInput.accentColor.c.toFixed(3));
    const h = Math.round(currentInput.accentColor.h);
    const code = `<ThemeProvider\n  accentColor={{ l: ${l}, c: ${c}, h: ${h} }}\n  tint={${currentInput.tint}}\n  chroma={${currentInput.chroma}}\n>\n  <App />\n</ThemeProvider>`;
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      toast.add({
        title: 'Copied ThemeProvider Code!',
        description: 'Snippet ready to paste in your layout.',
      });
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {}
  }, [currentInput]);

  return (
    <div className="min-h-screen bg-neutral-surface text-neutral-text flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-interactive/40 bg-neutral-surface/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold font-heading text-lg tracking-tight hover:opacity-80 transition-opacity"
            >
              <div className="size-8 rounded-full bg-neutral-text text-neutral-surface flex items-center justify-center font-bold text-xs">
                K
              </div>
              <span>karan-ui</span>
            </Link>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-surface text-primary-text font-mono font-medium border border-primary-interactive">
              OKLCH Color Engine
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/components"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive transition-colors"
            >
              <Layers className="size-3.5" />
              <span>Components</span>
            </Link>
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="size-8 rounded-full flex items-center justify-center text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive transition-colors"
              title="Toggle Light/Dark"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              onClick={copySnippet}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary-fill text-primary-on-fill hover:bg-primary-fill-hover shadow-xs transition-colors"
            >
              {copiedCode ? <Check className="size-3.5" /> : <Code2 className="size-3.5" />}
              <span>Copy Props</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-10 border-b border-neutral-interactive/30 bg-neutral-surface-alt/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-neutral-interactive text-neutral-text border border-neutral-interactive">
              <Sparkles className="size-3.5 text-primary-fill" />
              <span>6 Functional Sets × 13 Tokens × 2 Modes = 156 CSS Tokens</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-neutral-text">
              OKLCH Mathematical Color System
            </h1>
            <p className="text-base sm:text-lg text-neutral-text-muted leading-relaxed">
              Fully integrated across every component. Never any legacy CSS variables. Standardized on OKLCH for perceptual uniformity, automatic hue conflict resolution, and guaranteed WCAG AAA contrast ratios.
            </p>
          </div>

          {/* Realtime Live Engine Status Strip */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Accent Card */}
            <div className="p-4 rounded-3xl bg-neutral-surface-alt/70 border border-neutral-interactive/60 flex items-center gap-3 shadow-xs">
              <div
                className="size-10 rounded-2xl shadow-sm ring-2 ring-neutral-surface shrink-0"
                style={{ backgroundColor: formatOklch(currentInput.accentColor) }}
              />
              <div className="min-w-0">
                <span className="text-[11px] text-neutral-text-muted font-medium block">Current Accent Input</span>
                <span className="text-sm font-bold font-mono text-neutral-text truncate block">
                  oklch({Math.round(currentInput.accentColor.l * 100)}% {currentInput.accentColor.c.toFixed(2)} {Math.round(currentInput.accentColor.h)}°)
                </span>
              </div>
            </div>

            {/* Tint Card */}
            <div className="p-4 rounded-3xl bg-neutral-surface-alt/70 border border-neutral-interactive/60 flex items-center gap-3 shadow-xs">
              <div className="size-10 rounded-2xl bg-neutral-interactive flex items-center justify-center text-neutral-text font-bold text-xs shrink-0">
                {currentInput.tint}%
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-neutral-text-muted font-medium block">Neutral Tint Factor</span>
                <span className="text-xs text-neutral-text font-medium block">
                  Influences surface & border undertones
                </span>
              </div>
            </div>

            {/* Chroma Card */}
            <div className="p-4 rounded-3xl bg-neutral-surface-alt/70 border border-neutral-interactive/60 flex items-center gap-3 shadow-xs">
              <div className="size-10 rounded-2xl bg-primary-fill text-primary-on-fill flex items-center justify-center font-bold text-xs shrink-0">
                {currentInput.chroma}%
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-neutral-text-muted font-medium block">Global Chroma Saturation</span>
                <span className="text-xs text-neutral-text font-medium block">
                  Vibrancy scaling across all 6 sets
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-14 flex-1">
        {/* 1. Full 6-Set Interactive Token Matrix */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-heading text-neutral-text tracking-tight flex items-center gap-2">
                <Palette className="size-6 text-primary-fill" />
                <span>Token Matrix (6 Sets × 13 Tokens)</span>
              </h2>
              <p className="text-sm text-neutral-text-muted mt-1">
                Click any functional set to inspect all 13 derived tokens, CSS variables, and OKLCH values in realtime.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-neutral-text-muted">
              <span>Mode:</span>
              <span className="px-2.5 py-1 rounded-full bg-neutral-interactive text-neutral-text font-semibold capitalize">
                {theme || 'system'}
              </span>
            </div>
          </div>

          {/* Set Selector Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-neutral-interactive/30 border border-neutral-interactive/40 w-fit">
            {SET_NAMES.map((name) => {
              const isSelected = selectedSet === name;
              const hue = resolvedHues ? Math.round(resolvedHues[name]) : null;
              return (
                <button
                  key={name}
                  onClick={() => setSelectedSet(name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-surface text-neutral-text shadow-sm border border-neutral-interactive'
                      : 'text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/40'
                  }`}
                >
                  <span
                    className={`size-2.5 rounded-full ${
                      name === 'primary'
                        ? 'bg-primary-fill'
                        : name === 'neutral'
                        ? 'bg-neutral-interactive border border-neutral-text/20'
                        : name === 'info'
                        ? 'bg-info-fill'
                        : name === 'success'
                        ? 'bg-success-fill'
                        : name === 'warning'
                        ? 'bg-warning-fill'
                        : 'bg-danger-fill'
                    }`}
                  />
                  <span>{name}</span>
                  {hue !== null && (
                    <span className="text-[10px] font-mono opacity-60">{hue}°</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Set Description Callout */}
          <div className="p-4 rounded-3xl bg-neutral-surface-alt/50 border border-neutral-interactive/50 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-neutral-text uppercase tracking-wider block">
                {selectedSet} Set Purpose
              </span>
              <p className="text-xs text-neutral-text-muted mt-0.5">
                {SET_DESCRIPTIONS[selectedSet]}
              </p>
            </div>
            {resolvedHues && (
              <div className="text-right shrink-0">
                <span className="text-[10px] text-neutral-text-muted block">Resolved Hue Angle</span>
                <span className="text-sm font-bold font-mono text-neutral-text">
                  {Math.round(resolvedHues[selectedSet])}°
                </span>
              </div>
            )}
          </div>

          {/* Tokens Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {TOKENS_META.map((meta) => {
              const varName = `--${selectedSet}-${meta.cssSuffix}`;
              const rawOklch = currentModePalette?.[selectedSet]?.[meta.key] || '';
              const isTextToken = meta.isText;

              return (
                <div
                  key={meta.key}
                  className="p-3.5 rounded-3xl bg-neutral-surface-alt/40 border border-neutral-interactive/50 flex flex-col justify-between gap-3 transition-all hover:border-neutral-interactive hover:shadow-xs group"
                >
                  {/* Top Swatch Box */}
                  <div
                    className="h-16 rounded-2xl flex items-center justify-center p-3 shadow-inner relative overflow-hidden transition-transform group-hover:scale-[1.02]"
                    style={{
                      backgroundColor: isTextToken ? 'var(--neutral-surface)' : `var(${varName})`,
                      color: isTextToken ? `var(${varName})` : `var(--${selectedSet}-on-fill)`,
                      border: '1px solid var(--neutral-interactive)',
                    }}
                  >
                    {isTextToken ? (
                      <span className="font-bold text-base tracking-tight">Sample Typography Aa</span>
                    ) : (
                      <span className="text-[10px] font-mono opacity-80 px-2 py-0.5 rounded-full bg-black/20 text-white backdrop-blur-xs">
                        {meta.name}
                      </span>
                    )}
                  </div>

                  {/* Token Details */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-neutral-text">{meta.name}</span>
                      <span className="text-[10px] font-mono text-neutral-text-muted bg-neutral-interactive/50 px-1.5 py-0.5 rounded-md">
                        {varName}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-text-muted line-clamp-2 leading-relaxed">
                      {meta.role}
                    </p>
                  </div>

                  {/* OKLCH Value Readout */}
                  <div className="pt-2 border-t border-neutral-interactive/40 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-neutral-text-muted">Value</span>
                    <span className="text-neutral-text font-medium truncate max-w-[180px]">
                      {rawOklch || 'calculating...'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Live Integrated Components Showcase */}
        <section className="space-y-6 pt-6 border-t border-neutral-interactive/30">
          <div>
            <h2 className="text-2xl font-bold font-heading text-neutral-text tracking-tight flex items-center gap-2">
              <Layers className="size-6 text-primary-fill" />
              <span>Live Components Integrated with Tokens</span>
            </h2>
            <p className="text-sm text-neutral-text-muted mt-1">
              All UI components react instantly to any adjustments made via the Theme Customizer popover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Buttons & Actions */}
            <div className="p-6 rounded-4xl bg-neutral-surface-alt/40 border border-neutral-interactive/50 space-y-4 shadow-xs">
              <h3 className="font-bold text-sm text-neutral-text flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary-fill" />
                <span>Interactive Button Hierarchy</span>
              </h3>
              <p className="text-xs text-neutral-text-muted">
                Constructed using <code className="font-mono text-[11px] bg-neutral-interactive px-1.5 py-0.5 rounded">bg-primary-fill</code>, <code className="font-mono text-[11px] bg-neutral-interactive px-1.5 py-0.5 rounded">bg-neutral-interactive</code>, and <code className="font-mono text-[11px] bg-neutral-interactive px-1.5 py-0.5 rounded">bg-danger-fill</code>.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button className="px-4 py-2 rounded-full text-xs font-semibold bg-primary-fill text-primary-on-fill hover:bg-primary-fill-hover shadow-sm transition-all cursor-pointer">
                  Primary Action
                </button>
                <button className="px-4 py-2 rounded-full text-xs font-semibold border border-neutral-interactive bg-neutral-surface hover:bg-neutral-interactive text-neutral-text transition-all cursor-pointer">
                  Outline Neutral
                </button>
                <button className="px-4 py-2 rounded-full text-xs font-semibold bg-neutral-interactive hover:bg-neutral-interactive-hover text-neutral-text transition-all cursor-pointer">
                  Secondary
                </button>
                <button className="px-4 py-2 rounded-full text-xs font-semibold bg-danger-fill text-danger-on-fill hover:bg-danger-fill-hover shadow-sm transition-all cursor-pointer">
                  Destructive
                </button>
                <button className="px-4 py-2 rounded-full text-xs font-semibold hover:bg-neutral-interactive text-neutral-text transition-all cursor-pointer">
                  Ghost
                </button>
              </div>
            </div>

            {/* Card 2: Status Badges */}
            <div className="p-6 rounded-4xl bg-neutral-surface-alt/40 border border-neutral-interactive/50 space-y-4 shadow-xs">
              <h3 className="font-bold text-sm text-neutral-text flex items-center gap-2">
                <span className="size-2 rounded-full bg-success-fill" />
                <span>6 Functional Status Badges</span>
              </h3>
              <p className="text-xs text-neutral-text-muted">
                Each badge utilizes its dedicated functional set tokens with guaranteed AAA on-fill contrast.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-fill text-primary-on-fill shadow-xs">
                  Primary Brand
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-interactive text-neutral-text border border-neutral-interactive shadow-xs">
                  Neutral Muted
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-info-fill text-info-on-fill shadow-xs">
                  Info Guidance
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success-fill text-success-on-fill shadow-xs">
                  Success Approved
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-warning-fill text-warning-on-fill shadow-xs">
                  Warning Caution
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-danger-fill text-danger-on-fill shadow-xs">
                  Danger Error
                </span>
              </div>
            </div>

            {/* Card 3: Alert Callouts */}
            <div className="p-6 rounded-4xl bg-neutral-surface-alt/40 border border-neutral-interactive/50 space-y-4 shadow-xs">
              <h3 className="font-bold text-sm text-neutral-text flex items-center gap-2">
                <AlertCircle className="size-4 text-info-fill" />
                <span>Semantic Alerts & Notices</span>
              </h3>
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-2xl bg-info-surface border border-info-interactive/60 text-info-text flex items-start gap-3">
                  <Info className="size-4 text-info-fill shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold block">Information Note</span>
                    <span className="text-info-text-secondary">Info set derived with safe 40° angular hue distance.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-success-surface border border-success-interactive/60 text-success-text flex items-start gap-3">
                  <CheckCircle2 className="size-4 text-success-fill shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold block">Operation Successful</span>
                    <span className="text-success-text-secondary">All contrast requirements met across light and dark.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-warning-surface border border-warning-interactive/60 text-warning-text flex items-start gap-3">
                  <AlertTriangle className="size-4 text-warning-fill shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold block">Warning Advisory</span>
                    <span className="text-warning-text-secondary">Amber hue preserved without colliding with primary.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-danger-surface border border-danger-interactive/60 text-danger-text flex items-start gap-3">
                  <AlertCircle className="size-4 text-danger-fill shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold block">Critical Alert</span>
                    <span className="text-danger-text-secondary">Clear, unambiguous warning state for destructive actions.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Form Inputs & Fields */}
            <div className="p-6 rounded-4xl bg-neutral-surface-alt/40 border border-neutral-interactive/50 space-y-4 shadow-xs">
              <h3 className="font-bold text-sm text-neutral-text flex items-center gap-2">
                <Sliders className="size-4 text-primary-fill" />
                <span>Form Controls & Focus States</span>
              </h3>
              <p className="text-xs text-neutral-text-muted">
                Inputs consume <code className="font-mono text-[11px] bg-neutral-interactive px-1.5 py-0.5 rounded">bg-neutral-interactive/50</code> and <code className="font-mono text-[11px] bg-neutral-interactive px-1.5 py-0.5 rounded">focus:border-primary-interactive-focus</code>.
              </p>
              <div className="space-y-3 pt-2">
                <div>
                  <label htmlFor="example-email" className="text-xs font-semibold text-neutral-text mb-1 block">Email Address</label>
                  <input
                    id="example-email"
                    type="email"
                    placeholder="name@example.com"
                    defaultValue="user@karancraft.dev"
                    className="w-full px-3.5 py-2 rounded-2xl bg-neutral-interactive/50 border border-neutral-interactive text-xs text-neutral-text focus:outline-none focus:border-primary-interactive-focus focus:ring-3 focus:ring-primary-interactive-focus/20 transition-all placeholder:text-neutral-text-muted"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label htmlFor="agree-checkbox" className="flex items-center gap-2 text-xs text-neutral-text cursor-pointer select-none">
                    <input
                      id="agree-checkbox"
                      type="checkbox"
                      defaultChecked
                      className="size-4 rounded-md accent-primary-fill cursor-pointer"
                    />
                    <span>Active Checkbox</span>
                  </label>

                  <label htmlFor="radio-sample" className="flex items-center gap-2 text-xs text-neutral-text cursor-pointer select-none">
                    <input
                      id="radio-sample"
                      type="radio"
                      name="sample-radio"
                      defaultChecked
                      className="size-4 accent-primary-fill cursor-pointer"
                    />
                    <span>Selected Radio</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Mathematical Architecture & Guarantees */}
        <section className="space-y-6 pt-6 border-t border-neutral-interactive/30">
          <div>
            <h2 className="text-2xl font-bold font-heading text-neutral-text tracking-tight flex items-center gap-2">
              <ShieldCheck className="size-6 text-primary-fill" />
              <span>Mathematical Architecture & Guarantees</span>
            </h2>
            <p className="text-sm text-neutral-text-muted mt-1">
              How the OKLCH engine achieves contrast safety and perceptual beauty automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-neutral-surface-alt/30 border border-neutral-interactive/50 space-y-2">
              <div className="size-8 rounded-full bg-primary-surface text-primary-text flex items-center justify-center font-bold text-xs mb-2">
                1
              </div>
              <h4 className="font-bold text-sm text-neutral-text">Perceptual Uniformity</h4>
              <p className="text-xs text-neutral-text-muted leading-relaxed">
                Unlike legacy sRGB or HSL, a lightness value in OKLCH looks equally bright across all hues. Green at L=0.55 does not overpower yellow or blue at L=0.55.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-neutral-surface-alt/30 border border-neutral-interactive/50 space-y-2">
              <div className="size-8 rounded-full bg-primary-surface text-primary-text flex items-center justify-center font-bold text-xs mb-2">
                2
              </div>
              <h4 className="font-bold text-sm text-neutral-text">Hue Conflict Resolution</h4>
              <p className="text-xs text-neutral-text-muted leading-relaxed">
                If the user inputs an accent color close to blue (Info), green (Success), yellow (Warning), or red (Danger), the engine smoothly shifts the semantic hue to maintain a minimum 40° angular distance.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-neutral-surface-alt/30 border border-neutral-interactive/50 space-y-2">
              <div className="size-8 rounded-full bg-primary-surface text-primary-text flex items-center justify-center font-bold text-xs mb-2">
                3
              </div>
              <h4 className="font-bold text-sm text-neutral-text">Guaranteed WCAG AAA Contrast</h4>
              <p className="text-xs text-neutral-text-muted leading-relaxed">
                Every text token is mathematically matched against its respective surface. <code className="font-mono text-[10px]">onFill</code> is guaranteed to provide at least 7:1 (AAA) contrast against <code className="font-mono text-[10px]">fill</code>.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-neutral-surface-alt/30 border border-neutral-interactive/50 space-y-2">
              <div className="size-8 rounded-full bg-primary-surface text-primary-text flex items-center justify-center font-bold text-xs mb-2">
                4
              </div>
              <h4 className="font-bold text-sm text-neutral-text">Adaptive onFill Step (L = 0.60)</h4>
              <p className="text-xs text-neutral-text-muted leading-relaxed">
                To support vivid sets like <strong>Canary Yellow</strong> (L ≈ 0.88), a sharp step threshold triggers at L = 0.60: dark/mid fills use crisp white text (L = 0.98), while light/vivid fills automatically flip to deep black text (L = 0.12).
              </p>
            </div>
          </div>
        </section>

        {/* 4. Code Export & Usage */}
        <section className="p-8 rounded-4xl bg-neutral-surface-alt/60 border border-neutral-interactive/60 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-heading text-neutral-text">Ready to integrate in your application?</h3>
              <p className="text-xs text-neutral-text-muted mt-1">
                Pass these exact props to your ThemeProvider or configure your tailwind stylesheet.
              </p>
            </div>
            <button
              onClick={copySnippet}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-fill text-primary-on-fill hover:bg-primary-fill-hover font-semibold text-xs shadow-sm transition-all cursor-pointer shrink-0"
            >
              {copiedCode ? <Check className="size-4" /> : <Copy className="size-4" />}
              <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy ThemeProvider Props'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-3xl bg-neutral-surface text-neutral-text border border-neutral-interactive font-mono text-xs overflow-x-auto leading-relaxed">
{`import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      accentColor={{ l: ${Number(currentInput.accentColor.l.toFixed(3))}, c: ${Number(currentInput.accentColor.c.toFixed(3))}, h: ${Math.round(currentInput.accentColor.h)} }}
      tint={${currentInput.tint}}
      chroma={${currentInput.chroma}}
    >
      {children}
    </ThemeProvider>
  )
}`}
          </pre>
        </section>
      </main>
    </div>
  );
}
