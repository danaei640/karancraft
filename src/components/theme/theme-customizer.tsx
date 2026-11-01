'use client';

import * as React from 'react';
import {
  useColorTheme,
  useTypeset,
  TYPESET_PRESETS,
  type TypesetPresetName,
} from '@/registry/bases/base/ui/theme-provider';
import { useTheme } from '@wrksz/themes/client';
import { formatOklch, type OklchColor } from '@/lib/color-system';
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  RotateCcw,
  X,
  Copy,
  Check,
  Code2,
  SlidersHorizontal,
  Ruler,
  Pencil,
} from 'lucide-react';
import { toast } from '@/registry/bases/base/ui/toast';
import { Button } from '@/registry/bases/base/ui/button';
import { Slider } from '@/registry/bases/base/ui/slider';
import { Separator } from '@/registry/bases/base/ui/separator';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/registry/bases/base/ui/tabs';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/registry/bases/base/ui/tooltip';

interface PresetTheme {
  name: string;
  colorName: string;
  accentColor: OklchColor;
  tint: number;
  chroma: number;
}

const PRESETS: PresetTheme[] = [
  {
    name: 'Iris Violet',
    colorName: 'Violet',
    accentColor: { l: 0.55, c: 0.24, h: 264 },
    tint: 20,
    chroma: 80,
  },
  {
    name: 'Sapphire',
    colorName: 'Sapphire',
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
    colorName: 'Emerald',
    accentColor: { l: 0.58, c: 0.19, h: 150 },
    tint: 20,
    chroma: 75,
  },
  {
    name: 'Canary Yellow',
    colorName: 'Canary',
    accentColor: { l: 0.88, c: 0.20, h: 96 },
    tint: 20,
    chroma: 90,
  },
  {
    name: 'Warm Amber',
    colorName: 'Amber',
    accentColor: { l: 0.65, c: 0.18, h: 75 },
    tint: 15,
    chroma: 85,
  },
  {
    name: 'Crimson',
    colorName: 'Crimson',
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
    colorName: 'Amethyst',
    accentColor: { l: 0.54, c: 0.26, h: 295 },
    tint: 25,
    chroma: 90,
  },
];

// Base --radius is 0.625rem = 10px
const BASE_RADIUS_PX = 10;
const RADIUS_PRESETS = [
  { label: 'Sharp', val: 0 },
  { label: 'Subtle', val: 0.5 },
  { label: 'Default', val: 1 },
  { label: 'Round', val: 1.5 },
  { label: 'Full', val: 2 },
] as const;

// Base --spacing unit is 0.25rem = 4px
const BASE_SPACING_PX = 4;
const DENSITY_PRESETS = [
  { label: 'Compact', val: 0.75 },
  { label: 'Default', val: 1 },
  { label: 'Relaxed', val: 1.25 },
  { label: 'Spacious', val: 1.5 },
] as const;

const HUE_QUICK_PRESETS = [0, 35, 96, 150, 195, 264, 320] as const;
const LIGHTNESS_QUICK_PRESETS = [0.4, 0.55, 0.7, 0.85] as const;
const CHROMA_QUICK_PRESETS = [0.08, 0.16, 0.24, 0.32] as const;
const TINT_QUICK_PRESETS = [0, 20, 40, 70, 100] as const;
const VIBRANCY_QUICK_PRESETS = [40, 65, 80, 90, 100] as const;

const TYPESET_LIST: { id: TypesetPresetName; label: string }[] = [
  { id: 'default', label: 'Default' },
  { id: 'docs', label: 'Docs' },
  { id: 'reading', label: 'Reading' },
  { id: 'chat', label: 'Chat' },
  { id: 'compact', label: 'Compact' },
  { id: 'large', label: 'Large' },
];

function extractSliderNumber(val: number | readonly number[], fallback: number): number {
  if (Array.isArray(val)) {
    return typeof val[0] === 'number' && !Number.isNaN(val[0]) ? val[0] : fallback;
  }
  return typeof val === 'number' && !Number.isNaN(val) ? val : fallback;
}

/**
 * Formats a number up to `maxDecimals` without unnecessary trailing zeros,
 * while preserving exact user inputs like 0.625.
 */
function formatCleanNumber(val: number, maxDecimals = 3): string {
  if (Number.isNaN(val)) return '0';
  return Number(val.toFixed(maxDecimals)).toString();
}

function formatPxValue(px: number): string {
  return `${Number(px.toFixed(2))}px`;
}

interface EditableValueProps {
  value: number;
  onChange: (nextVal: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  maxDecimals?: number;
  ariaLabel: string;
  computedHint?: string;
}

/**
 * Click-to-edit numeric badge.
 * Allows clicking on any parameter value in Theme Studio to type a precise decimal (e.g. 0.625).
 */
function EditableValue({
  value,
  onChange,
  min,
  max,
  step = 0.001,
  suffix = '',
  maxDecimals = 3,
  ariaLabel,
  computedHint,
}: EditableValueProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(() => formatCleanNumber(value, maxDecimals));
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isEditing) {
      setDraft(formatCleanNumber(value, maxDecimals));
    }
  }, [value, isEditing, maxDecimals]);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const commit = React.useCallback(() => {
    const parsed = parseFloat(draft);
    if (!Number.isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, Number(parsed.toFixed(4))));
      onChange(clamped);
      setDraft(formatCleanNumber(clamped, maxDecimals));
    } else {
      setDraft(formatCleanNumber(value, maxDecimals));
    }
    setIsEditing(false);
  }, [draft, min, max, onChange, value, maxDecimals]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setDraft(formatCleanNumber(value, maxDecimals));
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="inline-flex items-center gap-1">
        {computedHint && (
          <span className="text-[10px] font-mono tabular-nums text-neutral-text-muted">
            {computedHint}
          </span>
        )}
        <input
          ref={inputRef}
          type="number"
          step={step}
          min={min}
          max={max}
          aria-label={ariaLabel}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          className="w-18 h-6 px-1.5 rounded-lg bg-neutral-surface border border-primary-fill text-xs font-mono tabular-nums font-semibold text-neutral-text text-right outline-none ring-2 ring-primary-interactive-focus/30"
        />
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 shrink-0">
      {computedHint && (
        <span className="text-[10px] font-mono tabular-nums text-neutral-text-muted">
          ({computedHint})
        </span>
      )}
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        aria-label={`Edit ${ariaLabel}`}
        title="Click to input exact value (e.g. 0.625)"
        className="group/edit inline-flex items-center gap-1 h-6 px-2 rounded-lg bg-neutral-surface-alt hover:bg-neutral-interactive/70 border border-neutral-interactive/60 hover:border-primary-fill/60 text-xs font-mono tabular-nums font-semibold text-primary-text transition-colors cursor-text"
      >
        <span>
          {formatCleanNumber(value, maxDecimals)}
          {suffix}
        </span>
        <Pencil className="size-2.5 text-neutral-text-muted opacity-60 group-hover/edit:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'colors' | 'geometry' | 'code'>('colors');
  const [exportFormat, setExportFormat] = React.useState<'props' | 'css' | 'json'>('props');
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

  const {
    preset: typesetPreset,
    setPreset: setTypesetPreset,
    measurements,
    setMeasurements,
  } = useTypeset();

  // Close on Escape key when not editing an input
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.activeElement?.tagName !== 'INPUT') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const currentInput = paletteInput ?? {
    accentColor: { l: 0.55, c: 0.24, h: 264 },
    tint: 20,
    chroma: 80,
  };

  const currentAccent = currentInput.accentColor;
  const currentOklchString = formatOklch(currentAccent);

  const matchedPreset = React.useMemo(() => {
    return PRESETS.find(
      (p) =>
        Math.abs(currentAccent.h - p.accentColor.h) < 4 &&
        Math.abs(currentAccent.c - p.accentColor.c) < 0.04 &&
        Math.abs(currentAccent.l - p.accentColor.l) < 0.06
    );
  }, [currentAccent]);

  const currentTypesetPx = React.useMemo(() => {
    const raw = String(measurements.size || '16px').trim();
    if (raw.endsWith('px')) {
      const n = parseFloat(raw);
      if (!Number.isNaN(n)) return n;
    }
    if (raw.endsWith('em') || raw.endsWith('rem')) {
      const n = parseFloat(raw);
      if (!Number.isNaN(n)) return Number((n * 16).toFixed(2));
    }
    return 16;
  }, [measurements.size]);

  const codeSnippet = React.useMemo(() => {
    const l = Number(currentAccent.l.toFixed(3));
    const c = Number(currentAccent.c.toFixed(3));
    const h = Number(currentAccent.h.toFixed(1));
    const ws = Number(whitespace.toFixed(3));
    const rad = Number(radius.toFixed(3));
    const ts = typesetPreset === 'custom' ? 'default' : typesetPreset;

    if (exportFormat === 'props') {
      return `<ThemeProvider
  accentColor={{ l: ${l}, c: ${c}, h: ${h} }}
  tint={${currentInput.tint}}
  chroma={${currentInput.chroma}}
  whitespace={${ws}}
  radius={${rad}}
  typeset="${ts}"
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
          typeset: ts,
        },
        null,
        2
      );
    }
    return `:root {
  --accent-lightness: ${l};
  --accent-chroma: ${c};
  --accent-hue: ${h};
  --palette-tint: ${currentInput.tint}%;
  --palette-chroma: ${currentInput.chroma}%;
  --theme-whitespace: ${ws};
  --theme-radius: ${rad};
  --radius: ${formatPxValue(rad * BASE_RADIUS_PX)};
  --spacing: ${formatPxValue(ws * BASE_SPACING_PX)};
  --typeset-size: ${measurements.size};
  --typeset-leading: ${measurements.leading};
}`;
  }, [currentAccent, currentInput, exportFormat, whitespace, radius, typesetPreset, measurements]);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      toast.add({
        title: 'Theme configuration copied',
        description: 'Ready to paste into your root layout.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [codeSnippet]);

  const handleResetAll = React.useCallback(() => {
    resetPalette();
    resetGeometry();
    setTypesetPreset('default');
    toast.add({
      title: 'Theme reset to defaults',
      description: 'Restored Iris Violet palette, 1x geometry, and 16px default typeset.',
    });
  }, [resetPalette, resetGeometry, setTypesetPreset]);

  const functionalSets = [
    { key: 'primary', label: 'Primary', bgClass: 'bg-primary-fill', hue: resolvedHues?.primary },
    { key: 'neutral', label: 'Neutral', bgClass: 'bg-neutral-fill', hue: resolvedHues?.neutral },
    { key: 'info', label: 'Info', bgClass: 'bg-info-fill', hue: resolvedHues?.info },
    { key: 'success', label: 'Success', bgClass: 'bg-success-fill', hue: resolvedHues?.success },
    { key: 'warning', label: 'Warning', bgClass: 'bg-warning-fill', hue: resolvedHues?.warning },
    { key: 'danger', label: 'Danger', bgClass: 'bg-danger-fill', hue: resolvedHues?.danger },
  ] as const;

  return (
    <>
      {/* Floating Trigger Button */}
      <aside aria-label="Theme Customizer" className="fixed bottom-5 right-5 z-50" data-theme-studio="">
        <Button
          variant={isOpen ? 'default' : 'outline'}
          size="default"
          onClick={() => setIsOpen((prev) => !prev)}
          className="h-10 gap-2.5 rounded-full px-4 shadow-lg backdrop-blur-xl bg-neutral-surface/95 hover:bg-neutral-surface-alt border-neutral-interactive text-neutral-text cursor-pointer"
          title="Customize Theme"
        >
          <span
            className="size-3.5 rounded-full ring-2 ring-neutral-interactive shrink-0"
            style={{ backgroundColor: currentOklchString }}
          />
          <span className="text-xs font-semibold tracking-tight">Customize Theme</span>
          <SlidersHorizontal className="size-3.5 text-neutral-text-muted shrink-0" />
        </Button>
      </aside>

      {/* Theme Studio Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Theme Customizer"
          data-theme-studio=""
          className="fixed bottom-18 right-5 z-50 w-[404px] max-w-[calc(100vw-2.5rem)] max-h-[min(680px,calc(100vh-6rem))] flex flex-col bg-neutral-surface/98 text-neutral-text backdrop-blur-2xl border border-neutral-interactive rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* 1. Pinned Header */}
          <div className="px-5 pt-4 pb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="size-4 rounded-full ring-2 ring-neutral-interactive shrink-0"
                style={{ backgroundColor: currentOklchString }}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold tracking-tight text-neutral-text truncate">
                    Theme Studio
                  </h2>
                  <span className="text-[11px] text-neutral-text-muted font-mono tabular-nums">
                    {matchedPreset ? matchedPreset.colorName : `${Math.round(currentAccent.h)}°`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="xs"
                onClick={handleResetAll}
                className="gap-1 text-neutral-text-muted hover:text-neutral-text cursor-pointer"
                title="Reset palette, geometry, and typography to defaults"
              >
                <RotateCcw className="size-3" />
                <span>Reset</span>
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setIsOpen(false)}
                className="text-neutral-text-muted hover:text-neutral-text cursor-pointer"
                aria-label="Close Theme Studio"
              >
                <X className="size-3.5" />
              </Button>
            </div>
          </div>

          {/* 2. Pinned Appearance Mode Switcher + Navigation Tabs */}
          <div className="px-5 pb-3.5 space-y-3 border-b border-neutral-interactive/60">
            {/* Appearance Mode Row */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-neutral-text-secondary">Appearance</span>
              <div className="inline-flex items-center rounded-full bg-neutral-surface-alt p-1 border border-neutral-interactive/60 h-8">
                {(
                  [
                    { id: 'light', label: 'Light', icon: Sun },
                    { id: 'dark', label: 'Dark', icon: Moon },
                    { id: 'system', label: 'Auto', icon: Monitor },
                  ] as const
                ).map(({ id, label, icon: Icon }) => {
                  const active = (theme ?? 'system') === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setTheme(id)}
                      className={`h-full inline-flex items-center justify-center gap-1.5 px-2.5 rounded-full text-[11px] leading-none font-medium transition-all cursor-pointer whitespace-nowrap border ${
                        active
                          ? 'bg-neutral-surface text-neutral-text border-neutral-interactive/70 shadow-2xs font-semibold dark:bg-neutral-interactive dark:border-neutral-interactive-hover'
                          : 'border-transparent text-neutral-text-muted hover:text-neutral-text'
                      }`}
                    >
                      <Icon className="size-3" />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3-Tab Pill Navigation (Default Tabs Variant) */}
            <Tabs
              value={activeTab}
              onValueChange={(val) => setActiveTab(val as 'colors' | 'geometry' | 'code')}
              className="gap-0"
            >
              <TabsList className="grid w-full grid-cols-3 h-9">
                <TabsTrigger value="colors" className="text-xs gap-1.5">
                  <Palette className="size-3.5" />
                  <span>Colors</span>
                </TabsTrigger>
                <TabsTrigger value="geometry" className="text-xs gap-1.5">
                  <Ruler className="size-3.5" />
                  <span>Geometry</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="text-xs gap-1.5">
                  <Code2 className="size-3.5" />
                  <span>Code</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* 3. Scrollable Tab Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {activeTab === 'colors' && (
              <>
                {/* Section A: Curated 3x3 Presets */}
                <section className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-neutral-text block">
                        Curated Harmonies
                      </span>
                      <span className="text-[11px] text-neutral-text-muted">
                        Balanced OKLCH brand palettes
                      </span>
                    </div>
                    <span className="text-[11px] font-mono tabular-nums text-neutral-text-muted">
                      oklch({formatCleanNumber(currentAccent.l, 2)} {formatCleanNumber(currentAccent.c, 2)} {Math.round(currentAccent.h)}°)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {PRESETS.map((preset) => {
                      const bg = formatOklch(preset.accentColor);
                      const isSelected = matchedPreset?.name === preset.name;
                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setAccentColor(preset.accentColor);
                            setTint(preset.tint);
                            setChroma(preset.chroma);
                          }}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-primary-fill bg-primary-surface text-neutral-text font-semibold shadow-2xs'
                              : 'border-neutral-interactive/60 bg-neutral-surface-alt/40 hover:bg-neutral-interactive/40 text-neutral-text-secondary hover:text-neutral-text'
                          }`}
                        >
                          <span
                            className="size-3.5 rounded-full shrink-0 ring-1 ring-black/10 dark:ring-white/20"
                            style={{ backgroundColor: bg }}
                          />
                          <span className="text-xs truncate">{preset.colorName}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <Separator className="bg-neutral-interactive/50" />

                {/* Section B: Brand Accent Fine-Tuning (Label + Description + Editable Value + Quick Change + Slider) */}
                <section className="space-y-4">
                  {/* 1. Hue Angle */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-neutral-text block">
                          Hue Angle
                        </span>
                        <span className="text-[11px] text-neutral-text-muted">
                          360° OKLCH color wheel position
                        </span>
                      </div>
                      <EditableValue
                        value={currentAccent.h}
                        min={0}
                        max={360}
                        step={1}
                        maxDecimals={1}
                        suffix="°"
                        ariaLabel="Hue Angle"
                        onChange={(val) => setAccentColor({ ...currentAccent, h: val })}
                      />
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {HUE_QUICK_PRESETS.map((hVal) => {
                        const isSelected = Math.abs(currentAccent.h - hVal) < 2;
                        return (
                          <button
                            key={hVal}
                            type="button"
                            onClick={() => setAccentColor({ ...currentAccent, h: hVal })}
                            className={`py-1 rounded-lg border text-[10px] font-mono tabular-nums transition-colors cursor-pointer ${
                              isSelected
                                ? 'border-primary-fill bg-primary-surface text-neutral-text font-semibold'
                                : 'border-neutral-interactive/50 bg-neutral-surface-alt/40 hover:bg-neutral-interactive/40 text-neutral-text-muted hover:text-neutral-text'
                            }`}
                          >
                            {hVal}°
                          </button>
                        );
                      })}
                    </div>
                    <Slider
                      min={0}
                      max={360}
                      step={1}
                      value={[currentAccent.h]}
                      onValueChange={(val) =>
                        setAccentColor({
                          ...currentAccent,
                          h: extractSliderNumber(val, currentAccent.h),
                        })
                      }
                      className="[&_[data-slot=slider-track]]:h-2.5 [&_[data-slot=slider-track]]:bg-[linear-gradient(to_right,oklch(0.65_0.22_0),oklch(0.65_0.22_60),oklch(0.65_0.22_120),oklch(0.65_0.22_180),oklch(0.65_0.22_240),oklch(0.65_0.22_300),oklch(0.65_0.22_360))] [&_[data-slot=slider-range]]:bg-transparent"
                    />
                  </div>

                  {/* 2. Lightness */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-neutral-text block">
                          Accent Lightness
                        </span>
                        <span className="text-[11px] text-neutral-text-muted">
                          Perceptual luminance (0.20 – 0.95)
                        </span>
                      </div>
                      <EditableValue
                        value={currentAccent.l}
                        min={0.2}
                        max={0.95}
                        step={0.005}
                        maxDecimals={3}
                        ariaLabel="Accent Lightness"
                        onChange={(val) => setAccentColor({ ...currentAccent, l: val })}
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {LIGHTNESS_QUICK_PRESETS.map((lVal) => {
                        const isSelected = Math.abs(currentAccent.l - lVal) < 0.01;
                        return (
                          <button
                            key={lVal}
                            type="button"
                            onClick={() => setAccentColor({ ...currentAccent, l: lVal })}
                            className={`py-1 rounded-lg border text-[10px] font-mono tabular-nums transition-colors cursor-pointer ${
                              isSelected
                                ? 'border-primary-fill bg-primary-surface text-neutral-text font-semibold'
                                : 'border-neutral-interactive/50 bg-neutral-surface-alt/40 hover:bg-neutral-interactive/40 text-neutral-text-muted hover:text-neutral-text'
                            }`}
                          >
                            {lVal.toFixed(2)}
                          </button>
                        );
                      })}
                    </div>
                    <Slider
                      min={0.2}
                      max={0.95}
                      step={0.005}
                      value={[currentAccent.l]}
                      onValueChange={(val) =>
                        setAccentColor({
                          ...currentAccent,
                          l: Number(extractSliderNumber(val, currentAccent.l).toFixed(3)),
                        })
                      }
                    />
                  </div>

                  {/* 3. Accent Chroma */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-neutral-text block">
                          Accent Chroma
                        </span>
                        <span className="text-[11px] text-neutral-text-muted">
                          Brand color saturation (0.02 – 0.35)
                        </span>
                      </div>
                      <EditableValue
                        value={currentAccent.c}
                        min={0.02}
                        max={0.35}
                        step={0.005}
                        maxDecimals={3}
                        ariaLabel="Accent Chroma"
                        onChange={(val) => setAccentColor({ ...currentAccent, c: val })}
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {CHROMA_QUICK_PRESETS.map((cVal) => {
                        const isSelected = Math.abs(currentAccent.c - cVal) < 0.008;
                        return (
                          <button
                            key={cVal}
                            type="button"
                            onClick={() => setAccentColor({ ...currentAccent, c: cVal })}
                            className={`py-1 rounded-lg border text-[10px] font-mono tabular-nums transition-colors cursor-pointer ${
                              isSelected
                                ? 'border-primary-fill bg-primary-surface text-neutral-text font-semibold'
                                : 'border-neutral-interactive/50 bg-neutral-surface-alt/40 hover:bg-neutral-interactive/40 text-neutral-text-muted hover:text-neutral-text'
                            }`}
                          >
                            {cVal.toFixed(2)}
                          </button>
                        );
                      })}
                    </div>
                    <Slider
                      min={0.02}
                      max={0.35}
                      step={0.005}
                      value={[currentAccent.c]}
                      onValueChange={(val) =>
                        setAccentColor({
                          ...currentAccent,
                          c: Number(extractSliderNumber(val, currentAccent.c).toFixed(3)),
                        })
                      }
                    />
                  </div>
                </section>

                <Separator className="bg-neutral-interactive/50" />

                {/* Section C: Surface & Palette Balance */}
                <section className="space-y-4">
                  {/* 4. Neutral Surface Tint */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-neutral-text block">
                          Neutral Surface Tint
                        </span>
                        <span className="text-[11px] text-neutral-text-muted">
                          Grayscale (0%) to hue-tinted surfaces (100%)
                        </span>
                      </div>
                      <EditableValue
                        value={currentInput.tint}
                        min={0}
                        max={100}
                        step={1}
                        maxDecimals={1}
                        suffix="%"
                        ariaLabel="Neutral Surface Tint"
                        onChange={(val) => setTint(val)}
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {TINT_QUICK_PRESETS.map((tVal) => {
                        const isSelected = Math.abs(currentInput.tint - tVal) < 1;
                        return (
                          <button
                            key={tVal}
                            type="button"
                            onClick={() => setTint(tVal)}
                            className={`py-1 rounded-lg border text-[10px] font-mono tabular-nums transition-colors cursor-pointer ${
                              isSelected
                                ? 'border-primary-fill bg-primary-surface text-neutral-text font-semibold'
                                : 'border-neutral-interactive/50 bg-neutral-surface-alt/40 hover:bg-neutral-interactive/40 text-neutral-text-muted hover:text-neutral-text'
                            }`}
                          >
                            {tVal}%
                          </button>
                        );
                      })}
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[currentInput.tint]}
                      onValueChange={(val) => setTint(extractSliderNumber(val, currentInput.tint))}
                    />
                  </div>

                  {/* 5. Semantic Vibrancy */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-neutral-text block">
                          Semantic Vibrancy
                        </span>
                        <span className="text-[11px] text-neutral-text-muted">
                          Global saturation across all 6 color sets
                        </span>
                      </div>
                      <EditableValue
                        value={currentInput.chroma}
                        min={0}
                        max={100}
                        step={1}
                        maxDecimals={1}
                        suffix="%"
                        ariaLabel="Semantic Vibrancy"
                        onChange={(val) => setChroma(val)}
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {VIBRANCY_QUICK_PRESETS.map((vVal) => {
                        const isSelected = Math.abs(currentInput.chroma - vVal) < 1;
                        return (
                          <button
                            key={vVal}
                            type="button"
                            onClick={() => setChroma(vVal)}
                            className={`py-1 rounded-lg border text-[10px] font-mono tabular-nums transition-colors cursor-pointer ${
                              isSelected
                                ? 'border-primary-fill bg-primary-surface text-neutral-text font-semibold'
                                : 'border-neutral-interactive/50 bg-neutral-surface-alt/40 hover:bg-neutral-interactive/40 text-neutral-text-muted hover:text-neutral-text'
                            }`}
                          >
                            {vVal}%
                          </button>
                        );
                      })}
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[currentInput.chroma]}
                      onValueChange={(val) => setChroma(extractSliderNumber(val, currentInput.chroma))}
                    />
                  </div>
                </section>

                <Separator className="bg-neutral-interactive/50" />

                {/* Section D: 6 Derived Functional Sets */}
                <section className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-text">Derived Semantic Sets</span>
                    <span className="text-[11px] text-neutral-text-muted">Auto Hue Resolution</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5 pt-0.5">
                    {functionalSets.map((set) => (
                      <div key={set.key} className="text-center space-y-1">
                        <div className={`h-5 rounded-lg ${set.bgClass} ring-1 ring-black/10 dark:ring-white/15`} />
                        <span className="text-[10px] font-medium text-neutral-text-secondary block truncate">
                          {set.label}
                        </span>
                        {set.hue !== undefined && (
                          <span className="text-[9px] font-mono tabular-nums text-neutral-text-muted block">
                            {Math.round(set.hue)}°
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === 'geometry' && (
              <>
                {/* Section 1: Corner Radius */}
                <section className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-neutral-text block">Corner Radius</span>
                      <span className="text-[11px] text-neutral-text-muted">
                        Scales component curvature (base 10px)
                      </span>
                    </div>
                    <EditableValue
                      value={radius}
                      min={0}
                      max={3}
                      step={0.025}
                      maxDecimals={3}
                      suffix="x"
                      computedHint={formatPxValue(radius * BASE_RADIUS_PX)}
                      ariaLabel="Corner Radius"
                      onChange={(val) => setRadius(val)}
                    />
                  </div>

                  {/* Quick Change Items with Hover Computed Pixel Value */}
                  <div className="grid grid-cols-5 gap-1.5">
                    {RADIUS_PRESETS.map((preset) => {
                      const isSelected = Math.abs(radius - preset.val) < 0.01;
                      const computedPx = formatPxValue(preset.val * BASE_RADIUS_PX);
                      return (
                        <Tooltip key={preset.label}>
                          <TooltipTrigger
                            render={
                              <button
                                type="button"
                                onClick={() => setRadius(preset.val)}
                                title={`${preset.label}: ${computedPx} (--radius)`}
                                className={`group/preset py-1.5 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                                  isSelected
                                    ? 'border-primary-fill bg-primary-surface text-neutral-text font-semibold shadow-2xs'
                                    : 'border-neutral-interactive/60 bg-neutral-surface-alt/40 hover:bg-neutral-interactive/40 text-neutral-text-secondary'
                                }`}
                              >
                                <span className="text-[11px] block">{preset.label}</span>
                                <span className="text-[10px] font-mono tabular-nums text-neutral-text-muted block group-hover/preset:hidden">
                                  {preset.val}x
                                </span>
                                <span className="text-[10px] font-mono tabular-nums text-primary-text font-semibold hidden group-hover/preset:block">
                                  {computedPx}
                                </span>
                              </button>
                            }
                          />
                          <TooltipContent side="top">
                            <span>
                              {preset.label}: <strong className="font-mono">{computedPx}</strong>
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>

                  <Slider
                    min={0}
                    max={2.5}
                    step={0.025}
                    value={[radius]}
                    onValueChange={(val) =>
                      setRadius(Number(extractSliderNumber(val, radius).toFixed(3)))
                    }
                  />
                </section>

                <Separator className="bg-neutral-interactive/50" />

                {/* Section 2: Spacing & Density */}
                <section className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-neutral-text block">Spacing & Density</span>
                      <span className="text-[11px] text-neutral-text-muted">
                        Scales paddings, gaps & heights (base 4px)
                      </span>
                    </div>
                    <EditableValue
                      value={whitespace}
                      min={0.4}
                      max={2.5}
                      step={0.025}
                      maxDecimals={3}
                      suffix="x"
                      computedHint={formatPxValue(whitespace * BASE_SPACING_PX)}
                      ariaLabel="Spacing and Density"
                      onChange={(val) => setWhitespace(val)}
                    />
                  </div>

                  {/* Quick Change Items with Hover Computed Pixel Value */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {DENSITY_PRESETS.map((preset) => {
                      const isSelected = Math.abs(whitespace - preset.val) < 0.01;
                      const computedPx = formatPxValue(preset.val * BASE_SPACING_PX);
                      return (
                        <Tooltip key={preset.label}>
                          <TooltipTrigger
                            render={
                              <button
                                type="button"
                                onClick={() => setWhitespace(preset.val)}
                                title={`${preset.label}: ${computedPx} (--spacing)`}
                                className={`group/preset py-1.5 px-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                                  isSelected
                                    ? 'border-primary-fill bg-primary-surface text-neutral-text font-semibold shadow-2xs'
                                    : 'border-neutral-interactive/60 bg-neutral-surface-alt/40 hover:bg-neutral-interactive/40 text-neutral-text-secondary'
                                }`}
                              >
                                <span className="text-[11px] block">{preset.label}</span>
                                <span className="text-[10px] font-mono tabular-nums text-neutral-text-muted block group-hover/preset:hidden">
                                  {preset.val}x
                                </span>
                                <span className="text-[10px] font-mono tabular-nums text-primary-text font-semibold hidden group-hover/preset:block">
                                  {computedPx}
                                </span>
                              </button>
                            }
                          />
                          <TooltipContent side="top">
                            <span>
                              {preset.label}: <strong className="font-mono">{computedPx}</strong> unit
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>

                  <Slider
                    min={0.5}
                    max={1.6}
                    step={0.025}
                    value={[whitespace]}
                    onValueChange={(val) =>
                      setWhitespace(Number(extractSliderNumber(val, whitespace).toFixed(3)))
                    }
                  />
                </section>

                <Separator className="bg-neutral-interactive/50" />

                {/* Section 3: Typography & Typeset Rhythm */}
                <section className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-neutral-text block">Typeset Rhythm</span>
                      <span className="text-[11px] text-neutral-text-muted">
                        Scales UI font size, line-height & measure
                      </span>
                    </div>
                    <EditableValue
                      value={currentTypesetPx}
                      min={11}
                      max={22}
                      step={0.5}
                      maxDecimals={2}
                      suffix="px"
                      computedHint={`${measurements.leading}lh`}
                      ariaLabel="Typeset Base Size"
                      onChange={(val) => setMeasurements({ size: `${val}px` })}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {TYPESET_LIST.map((item) => {
                      const isSelected = typesetPreset === item.id;
                      const spec = TYPESET_PRESETS[item.id];
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTypesetPreset(item.id)}
                          className={`px-2.5 py-2 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-primary-fill bg-primary-surface text-neutral-text font-semibold shadow-2xs'
                              : 'border-neutral-interactive/60 bg-neutral-surface-alt/40 hover:bg-neutral-interactive/40 text-neutral-text-secondary'
                          }`}
                        >
                          <span className="text-xs block">{item.label}</span>
                          <span className="text-[10px] font-mono tabular-nums text-neutral-text-muted block">
                            {spec.size} · {spec.leading}lh
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <Slider
                    min={12}
                    max={20}
                    step={0.5}
                    value={[currentTypesetPx]}
                    onValueChange={(val) =>
                      setMeasurements({
                        size: `${Number(extractSliderNumber(val, currentTypesetPx).toFixed(2))}px`,
                      })
                    }
                  />
                </section>
              </>
            )}

            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-text">Export Format</span>
                  <div className="inline-flex items-center rounded-full bg-neutral-surface-alt p-1 border border-neutral-interactive/60 h-8">
                    {(
                      [
                        { id: 'props', label: 'React JSX' },
                        { id: 'css', label: 'CSS Vars' },
                        { id: 'json', label: 'JSON' },
                      ] as const
                    ).map((fmt) => (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => setExportFormat(fmt.id)}
                        className={`h-full px-2.5 rounded-full text-[11px] leading-none font-medium transition-all cursor-pointer border ${
                          exportFormat === fmt.id
                            ? 'bg-neutral-surface text-neutral-text border-neutral-interactive/70 shadow-2xs font-semibold dark:bg-neutral-interactive dark:border-neutral-interactive-hover'
                            : 'border-transparent text-neutral-text-muted hover:text-neutral-text'
                        }`}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <pre className="p-3.5 rounded-2xl bg-neutral-surface-alt border border-neutral-interactive/70 text-[11px] font-mono tabular-nums text-neutral-text overflow-x-auto leading-relaxed">
                    {codeSnippet}
                  </pre>
                </div>

                {/* Active Token Summary */}
                <div className="pt-1 space-y-1.5 text-[11px] text-neutral-text-muted">
                  <div className="flex items-center justify-between">
                    <span>Accent Color</span>
                    <span className="font-mono tabular-nums text-neutral-text">
                      oklch({formatCleanNumber(currentAccent.l, 3)} {formatCleanNumber(currentAccent.c, 3)} {Math.round(currentAccent.h)}°)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Radius & Spacing</span>
                    <span className="font-mono tabular-nums text-neutral-text">
                      {formatCleanNumber(radius, 3)}x ({formatPxValue(radius * BASE_RADIUS_PX)}) · {formatCleanNumber(whitespace, 3)}x ({formatPxValue(whitespace * BASE_SPACING_PX)})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Typeset Rhythm</span>
                    <span className="font-mono tabular-nums text-neutral-text">
                      {typesetPreset} ({measurements.size} · {measurements.leading}lh · {measurements.measure})
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. Pinned Action Footer */}
          <div className="px-5 py-3 border-t border-neutral-interactive/60 bg-neutral-surface-alt/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="size-3 rounded-full shrink-0 ring-1 ring-black/10 dark:ring-white/20"
                style={{ backgroundColor: currentOklchString }}
              />
              <span className="text-[11px] font-mono tabular-nums text-neutral-text-muted truncate">
                {formatCleanNumber(radius, 3)}x ({formatPxValue(radius * BASE_RADIUS_PX)}) · {formatCleanNumber(whitespace, 3)}x ({formatPxValue(whitespace * BASE_SPACING_PX)})
              </span>
            </div>

            <Button
              size="sm"
              variant="default"
              onClick={handleCopy}
              className="gap-1.5 cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" />
                  <span>Copied Code</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Copy Theme Code</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
