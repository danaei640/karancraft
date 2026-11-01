'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  COMPONENTS_METADATA,
  ComponentMetadata,
} from '@/lib/components-meta';
import { getComposedStories, PortableStoryItem } from '@/lib/portable-stories';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Smartphone,
  Tablet,
  Monitor,
  ExternalLink,
  Layers,
  Terminal,
  BookOpen,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/registry/bases/base/ui/tabs';

interface ComponentWorkbenchProps {
  slug: string;
}

export function ComponentWorkbench({ slug }: ComponentWorkbenchProps) {
  const metadata: ComponentMetadata =
    COMPONENTS_METADATA[slug] || COMPONENTS_METADATA.button;

  // 3 Primary Tabs: Usage Guide, Canvas, Stories
  const [activeTab, setActiveTab] = useState<'canvas' | 'guide' | 'stories'>('canvas');

  const [propsState, setPropsState] = useState<Record<string, any>>(
    metadata.defaultProps || {}
  );
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [copiedStoryId, setCopiedStoryId] = useState<string | null>(null);

  const handleCopySnippet = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>(
    'desktop'
  );
  const [canvasBg, setCanvasBg] = useState<'solid' | 'dots' | 'grid'>('dots');

  // Load portable stories for this component
  const stories = useMemo(() => getComposedStories(slug), [slug]);

  // Update default props when slug changes
  useEffect(() => {
    setPropsState(metadata.defaultProps || {});
  }, [slug, metadata]);

  const handlePropChange = (name: string, value: any) => {
    setPropsState((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetProps = () => {
    setPropsState(metadata.defaultProps || {});
  };

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(metadata.installCmd);
    } catch {}
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  // Generate JSX Code string based on active propsState
  const generatedCode = useMemo(() => {
    const propStrings = Object.entries(propsState)
      .filter(([key, value]) => {
        if (key === 'children') return false;
        if (value === undefined || value === null) return false;
        if (typeof value === 'boolean' && !value) return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'boolean') return key;
        if (typeof value === 'string') return `${key}="${value}"`;
        return `${key}={${JSON.stringify(value)}}`;
      });

    const childrenContent = propsState.children || metadata.name;
    const hasChildren = typeof childrenContent === 'string';

    const propsFormatted =
      propStrings.length > 0 ? ` ${propStrings.join(' ')}` : '';

    if (hasChildren) {
      return `<${metadata.name}${propsFormatted}>\n  ${childrenContent}\n</${metadata.name}>`;
    }
    return `<${metadata.name}${propsFormatted} />`;
  }, [metadata, propsState]);

  const copyCodeSnippet = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
    } catch {}
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Helper to generate code for a story variant
  const getStoryCode = (story: PortableStoryItem) => {
    const isDefault = story.id.toLowerCase() === 'default';
    const variantProp = isDefault ? '' : ` variant="${story.id}"`;
    return `import { ${metadata.name} } from "@/components/ui/${metadata.id}";\n\nexport function ${story.name.replace(/[^a-zA-Z0-9]/g, '')}Demo() {\n  return (\n    <${metadata.name}${variantProp}>${story.name}</${metadata.name}>\n  );\n}`;
  };

  const handleCopyStory = async (story: PortableStoryItem) => {
    const code = getStoryCode(story);
    try {
      await navigator.clipboard.writeText(code);
    } catch {}
    setCopiedStoryId(story.id);
    setTimeout(() => setCopiedStoryId(null), 2000);
  };

  // Single primary component story for the interactive canvas
  const PrimaryStory = useMemo(() => {
    if (stories.length === 0) return null;
    const def = stories.find((s) => s.id.toLowerCase() === 'default');
    return def ? def.Component : stories[0].Component;
  }, [stories]);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-neutral-surface text-neutral-text h-screen overflow-y-auto">
      {/* Component Header Bar with Exactly 3 Tabs */}
      <header className="border-b border-neutral-interactive/40 p-4 sm:p-6 bg-neutral-surface/50 backdrop-blur-md sticky top-0 z-30 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-neutral-text-muted">
              <Link href="/components" className="hover:text-neutral-text">
                Components
              </Link>
              <span>/</span>
              <span className="text-neutral-text font-medium">{metadata.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold font-heading tracking-tight">
                {metadata.name}
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-interactive text-primary-text font-mono text-[11px] border border-primary-interactive">
                {metadata.baseUiPrimitive}
              </span>
            </div>
          </div>

          {/* Action Tools & CLI Install */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-surface-alt/60 border border-neutral-interactive/50 font-mono text-xs text-neutral-text-muted">
              <Terminal className="size-3.5 text-neutral-text-muted shrink-0" />
              <span className="truncate max-w-[280px]">
                {metadata.installCmd}
              </span>
              <button
                onClick={copyCommand}
                className="hover:text-neutral-text transition-colors p-1 cursor-pointer"
                title="Copy Shadcn CLI Install Command"
              >
                {copiedCmd ? (
                  <Check className="size-3.5 text-emerald-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* View Mode Navigation Tabs — Exactly 3 Tabs: Usage Guide, Canvas, Stories */}
        <div className="pt-1">
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as 'guide' | 'canvas' | 'stories')}
          >
            <TabsList variant="line">
              <TabsTrigger value="guide" className="flex items-center gap-2">
                <BookOpen className="size-3.5" />
                <span>Usage Guide</span>
                {metadata.usageGuide && (
                  <span className="size-1.5 rounded-full bg-primary-fill" />
                )}
              </TabsTrigger>
              <TabsTrigger value="canvas" className="flex items-center gap-2">
                <Sliders className="size-3.5" />
                <span>Canvas</span>
              </TabsTrigger>
              <TabsTrigger value="stories" className="flex items-center gap-2">
                <Layers className="size-3.5" />
                <span>Stories ({stories.length})</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="flex-1 p-6">
        {/* ================================================================ */}
        {/* TAB 1: CANVAS (Component description + Canvas view in same tab) */}
        {/* ================================================================ */}
        {activeTab === 'canvas' && (
          <div className="space-y-6">
            {/* Description & Overview in the same tab as Canvas */}
            <div className="rounded-3xl border border-neutral-interactive/50 bg-neutral-surface-alt/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-interactive text-primary-text border border-primary-interactive font-mono">
                    {metadata.baseUiPrimitive}
                  </span>
                  <span className="text-xs text-neutral-text-muted">•</span>
                  <span className="text-xs font-mono text-neutral-text-muted">{metadata.category}</span>
                </div>
                <h2 className="text-lg font-bold font-heading text-neutral-text">
                  {metadata.name} Interactive Canvas
                </h2>
                <p className="text-xs text-neutral-text-muted leading-relaxed">
                  {metadata.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('guide')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-interactive hover:bg-neutral-interactive-hover text-neutral-text text-xs font-medium transition-colors cursor-pointer"
                >
                  <BookOpen className="size-3.5" />
                  <span>View Full Guide</span>
                </button>
              </div>
            </div>

            {/* Canvas Grid: Center Canvas + Right Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              {/* Center Canvas */}
              <div className="lg:col-span-3 flex flex-col rounded-3xl border border-neutral-interactive/50 bg-neutral-surface overflow-hidden shadow-xs">
                {/* Canvas Controls Toolbar */}
                <div className="p-3 border-b border-neutral-interactive/40 bg-neutral-interactive/20 flex items-center justify-between text-xs text-neutral-text-muted">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-text">Canvas</span>
                    <div className="h-3 w-px bg-neutral-interactive/60 mx-1" />
                    {/* Viewport switchers */}
                    <div className="flex items-center rounded-full bg-neutral-surface-alt p-0.5 border border-neutral-interactive/30">
                      <button
                        onClick={() => setViewport('desktop')}
                        className={`p-1 rounded-full transition-colors cursor-pointer ${
                          viewport === 'desktop'
                            ? 'bg-neutral-surface text-neutral-text shadow-xs'
                            : 'hover:text-neutral-text'
                        }`}
                        title="Desktop (100%)"
                      >
                        <Monitor className="size-3.5" />
                      </button>
                      <button
                        onClick={() => setViewport('tablet')}
                        className={`p-1 rounded-full transition-colors cursor-pointer ${
                          viewport === 'tablet'
                            ? 'bg-neutral-surface text-neutral-text shadow-xs'
                            : 'hover:text-neutral-text'
                        }`}
                        title="Tablet (768px)"
                      >
                        <Tablet className="size-3.5" />
                      </button>
                      <button
                        onClick={() => setViewport('mobile')}
                        className={`p-1 rounded-full transition-colors cursor-pointer ${
                          viewport === 'mobile'
                            ? 'bg-neutral-surface text-neutral-text shadow-xs'
                            : 'hover:text-neutral-text'
                        }`}
                        title="Mobile (375px)"
                      >
                        <Smartphone className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Background pattern */}
                    <div className="flex items-center rounded-full bg-neutral-surface-alt p-0.5 border border-neutral-interactive/30 text-[11px]">
                      <button
                        onClick={() => setCanvasBg('dots')}
                        className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                          canvasBg === 'dots'
                            ? 'bg-neutral-surface text-neutral-text shadow-xs'
                            : ''
                        }`}
                      >
                        Dots
                      </button>
                      <button
                        onClick={() => setCanvasBg('grid')}
                        className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                          canvasBg === 'grid'
                            ? 'bg-neutral-surface text-neutral-text shadow-xs'
                            : ''
                        }`}
                      >
                        Grid
                      </button>
                      <button
                        onClick={() => setCanvasBg('solid')}
                        className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                          canvasBg === 'solid'
                            ? 'bg-neutral-surface text-neutral-text shadow-xs'
                            : ''
                        }`}
                      >
                        Solid
                      </button>
                    </div>

                    <button
                      onClick={handleResetProps}
                      className="p-1 rounded-full hover:bg-neutral-surface-alt text-neutral-text-muted hover:text-neutral-text transition-colors cursor-pointer"
                      title="Reset props to default"
                    >
                      <RotateCcw className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Render Area */}
                <div
                  className={`min-h-[380px] p-12 flex items-center justify-center transition-all ${
                    canvasBg === 'dots'
                      ? 'bg-[radial-gradient(var(--neutral-interactive)_1px,transparent_1px)] bg-[size:16px_16px]'
                      : canvasBg === 'grid'
                      ? 'bg-[linear-gradient(to_right,var(--neutral-interactive)_1px,transparent_1px),linear-gradient(to_bottom,var(--neutral-interactive)_1px,transparent_1px)] bg-[size:24px_24px]'
                      : 'bg-neutral-surface'
                  }`}
                >
                  <div
                    className={`transition-all flex items-center justify-center ${
                      viewport === 'mobile'
                        ? 'w-[375px] border border-dashed border-neutral-interactive/60 p-6 rounded-2xl bg-neutral-surface/80 shadow-xs'
                        : viewport === 'tablet'
                        ? 'w-[768px] border border-dashed border-neutral-interactive/60 p-8 rounded-2xl bg-neutral-surface/80 shadow-xs'
                        : 'w-full max-w-2xl'
                    }`}
                  >
                    {PrimaryStory ? (
                      <PrimaryStory {...propsState} />
                    ) : (
                      <div className="text-sm text-neutral-text-muted">
                        No primary story available.
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Quick Code Bar */}
                <div className="p-3 border-t border-neutral-interactive/40 bg-neutral-interactive/10 flex items-center justify-between text-xs font-mono text-neutral-text-muted">
                  <span className="truncate max-w-md">{generatedCode.split('\n')[0]}</span>
                  <button
                    onClick={copyCodeSnippet}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-interactive hover:bg-neutral-interactive-hover text-neutral-text transition-colors text-xs font-sans font-medium cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="size-3 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Controls Panel */}
              <div className="lg:col-span-1 rounded-3xl border border-neutral-interactive/50 bg-neutral-surface p-4 flex flex-col gap-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-neutral-interactive/30 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-text-muted">
                    Props Controls
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-text-muted">
                    {metadata.props.length} props
                  </span>
                </div>

                {metadata.props.length === 0 ? (
                  <div className="text-xs text-neutral-text-muted py-4 text-center">
                    This component uses compound sub-components or unstyled children. Explore the{' '}
                    <button
                      onClick={() => setActiveTab('stories')}
                      className="text-neutral-text underline underline-offset-2 cursor-pointer"
                    >
                      Stories
                    </button>{' '}
                    tab to see all variations.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {metadata.props.map((prop) => (
                      <div key={prop.name} className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <label className="font-mono text-[11px] font-semibold text-neutral-text">
                            {prop.name}
                          </label>
                          <span className="text-[10px] text-neutral-text-muted font-mono truncate max-w-[120px]">
                            {prop.type}
                          </span>
                        </div>

                        {prop.controlType === 'select' && prop.options && (
                          <select
                            value={propsState[prop.name] ?? prop.defaultValue}
                            onChange={(e) =>
                              handlePropChange(prop.name, e.target.value)
                            }
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-neutral-interactive/60 bg-neutral-interactive/20 outline-none focus:border-primary-interactive-focus cursor-pointer"
                          >
                            {prop.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        )}

                        {prop.controlType === 'boolean' && (
                          <div className="flex items-center justify-between py-1">
                            <span className="text-neutral-text-muted text-[11px]">
                              {propsState[prop.name] ? 'Enabled' : 'Disabled'}
                            </span>
                            <input
                              type="checkbox"
                              checked={!!propsState[prop.name]}
                              onChange={(e) =>
                                handlePropChange(prop.name, e.target.checked)
                              }
                              className="size-4 accent-foreground rounded cursor-pointer"
                            />
                          </div>
                        )}

                        {prop.controlType === 'text' && (
                          <input
                            type="text"
                            value={propsState[prop.name] ?? ''}
                            onChange={(e) =>
                              handlePropChange(prop.name, e.target.value)
                            }
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-neutral-interactive/60 bg-neutral-interactive/20 outline-none focus:border-primary-interactive-focus"
                          />
                        )}

                        {prop.controlType === 'number' && (
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={propsState[prop.name] ?? 0}
                            onChange={(e) =>
                              handlePropChange(prop.name, Number(e.target.value))
                            }
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-neutral-interactive/60 bg-neutral-interactive/20 outline-none focus:border-primary-interactive-focus"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 2: USAGE GUIDE (Props table + MDX descriptions + Code blocks) */}
        {/* ================================================================ */}
        {activeTab === 'guide' && (
          <div className="max-w-4xl space-y-10">
            {/* 1. Header Overview Banner */}
            <div className="rounded-3xl border border-neutral-interactive/50 bg-gradient-to-br from-primary-surface via-neutral-surface-alt/40 to-neutral-surface p-6 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-interactive text-primary-text border border-primary-interactive font-mono">
                      {metadata.baseUiPrimitive}
                    </span>
                    <span className="text-xs text-neutral-text-muted">•</span>
                    <span className="text-xs font-mono text-neutral-text-muted">{metadata.category}</span>
                  </div>
                  <h2 className="text-xl font-bold font-heading">{metadata.name} Integration Guide</h2>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={metadata.registryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-surface-alt/60 hover:bg-neutral-surface-alt text-neutral-text-muted hover:text-neutral-text border border-neutral-interactive/50 text-xs font-mono transition-colors"
                  >
                    <ExternalLink className="size-3.5" />
                    <span>View JSON</span>
                  </a>
                </div>
              </div>

              <p className="text-sm text-neutral-text-muted leading-relaxed">
                {metadata.usageGuide?.summary || metadata.description}
              </p>

              {/* Quick CLI command */}
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-neutral-interactive/40 border border-neutral-interactive/40 font-mono text-xs">
                <Terminal className="size-4 text-primary-text shrink-0" />
                <span className="truncate select-all text-neutral-text">{metadata.installCmd}</span>
                <button
                  onClick={copyCommand}
                  className="ml-auto p-1.5 rounded-lg hover:bg-neutral-surface-alt text-neutral-text-muted hover:text-neutral-text transition-colors shrink-0 cursor-pointer"
                  title="Copy CLI command"
                >
                  {copiedCmd ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                </button>
              </div>
            </div>

            {/* 2. Application Root Setup (if present) */}
            {metadata.usageGuide?.rootLayoutSetup && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-primary-interactive text-primary-text flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <h3 className="text-base font-bold font-heading">Application Root Setup</h3>
                  </div>
                  <span className="text-xs font-mono text-neutral-text-muted bg-neutral-interactive/50 px-2.5 py-1 rounded-md border border-neutral-interactive/40">
                    {metadata.usageGuide.rootLayoutSetup.filename}
                  </span>
                </div>

                {metadata.usageGuide.rootLayoutSetup.explanation && (
                  <p className="text-xs text-neutral-text-muted leading-relaxed">
                    {metadata.usageGuide.rootLayoutSetup.explanation}
                  </p>
                )}

                <div className="relative rounded-2xl border border-neutral-interactive/50 bg-neutral-interactive/20 overflow-hidden">
                  <div className="p-3 border-b border-neutral-interactive/30 bg-neutral-interactive/40 flex items-center justify-between text-xs font-mono text-neutral-text-muted">
                    <span>{metadata.usageGuide.rootLayoutSetup.filename}</span>
                    <button
                      onClick={() => handleCopySnippet('setup', metadata.usageGuide!.rootLayoutSetup!.code)}
                      className="flex items-center gap-1.5 hover:text-neutral-text transition-colors cursor-pointer"
                    >
                      {copiedSnippetId === 'setup' ? (
                        <>
                          <Check className="size-3 text-emerald-500" />
                          <span className="text-emerald-500 font-sans">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          <span className="font-sans">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto text-neutral-text leading-relaxed">
                    <code>{metadata.usageGuide.rootLayoutSetup.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* 3. PROPS SPECIFICATION TABLE (Integrated directly into Usage Guide) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-primary-interactive text-primary-text flex items-center justify-center font-bold text-xs">
                    {metadata.usageGuide?.rootLayoutSetup ? '2' : '1'}
                  </div>
                  <h3 className="text-base font-bold font-heading">Props Specification</h3>
                </div>
                <span className="text-xs font-mono text-neutral-text-muted bg-neutral-interactive/50 px-2.5 py-1 rounded-md border border-neutral-interactive/40">
                  {metadata.props.length} props documented
                </span>
              </div>
              <p className="text-xs text-neutral-text-muted leading-relaxed">
                Complete API props specification, types, and default values supported by <code className="font-mono text-[11px] bg-neutral-interactive px-1.5 py-0.5 rounded">{metadata.name}</code>.
              </p>

              {metadata.props.length === 0 ? (
                <div className="p-4 rounded-2xl border border-neutral-interactive/40 bg-neutral-interactive/10 text-xs text-neutral-text-muted">
                  This component uses compound sub-components or unstyled children without top-level scalar props.
                </div>
              ) : (
                <div className="rounded-2xl border border-neutral-interactive/50 overflow-hidden shadow-xs">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-neutral-interactive/40 border-b border-neutral-interactive/40 font-semibold text-neutral-text-muted">
                      <tr>
                        <th className="p-3 pl-4">Prop</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Default</th>
                        <th className="p-3 pr-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {metadata.props.map((prop) => (
                        <tr key={prop.name} className="hover:bg-neutral-interactive/20 transition-colors">
                          <td className="p-3 pl-4 font-mono font-medium text-neutral-text whitespace-nowrap">
                            {prop.name}
                          </td>
                          <td className="p-3 font-mono text-[11px] text-primary-text whitespace-nowrap">
                            {prop.type}
                          </td>
                          <td className="p-3 font-mono text-[11px] text-neutral-text-muted whitespace-nowrap">
                            {prop.defaultValue || '—'}
                          </td>
                          <td className="p-3 pr-4 text-neutral-text-muted leading-relaxed">
                            {prop.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* 4. Features & Implementation Recipes (with code blocks) */}
            {metadata.usageGuide?.features && metadata.usageGuide.features.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-primary-interactive text-primary-text flex items-center justify-center font-bold text-xs">
                    {metadata.usageGuide?.rootLayoutSetup ? '3' : '2'}
                  </div>
                  <h3 className="text-base font-bold font-heading">Features & Implementation Recipes</h3>
                </div>

                <div className="space-y-6">
                  {metadata.usageGuide.features.map((feature, idx) => (
                    <div
                      key={feature.title}
                      className="rounded-2xl border border-neutral-interactive/50 bg-neutral-surface-alt p-5 space-y-4 shadow-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-sm font-bold font-heading text-neutral-text">
                          {idx + 1}. {feature.title}
                        </h4>
                        {feature.badge && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-interactive text-neutral-text border border-neutral-interactive/40">
                            {feature.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-neutral-text-muted leading-relaxed">
                        {feature.description}
                      </p>

                      {feature.code && (
                        <div className="relative rounded-xl border border-neutral-interactive/40 bg-neutral-interactive/20 overflow-hidden">
                          <div className="p-2.5 px-3 border-b border-neutral-interactive/30 bg-neutral-interactive/40 flex items-center justify-between text-[11px] font-mono text-neutral-text-muted">
                            <span>Example Code</span>
                            <button
                              onClick={() => handleCopySnippet(`feat-${idx}`, feature.code!)}
                              className="flex items-center gap-1.5 hover:text-neutral-text transition-colors cursor-pointer"
                            >
                              {copiedSnippetId === `feat-${idx}` ? (
                                <>
                                  <Check className="size-3 text-emerald-500" />
                                  <span className="text-emerald-500 font-sans">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="size-3" />
                                  <span className="font-sans">Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-3.5 text-xs font-mono overflow-x-auto text-neutral-text leading-relaxed">
                            <code>{feature.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. API & Exported Utilities Reference */}
            {metadata.usageGuide?.apiReference && metadata.usageGuide.apiReference.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-primary-interactive text-primary-text flex items-center justify-center font-bold text-xs">
                    {metadata.usageGuide?.rootLayoutSetup ? '4' : '3'}
                  </div>
                  <h3 className="text-base font-bold font-heading">API & Exported Utilities</h3>
                </div>

                <div className="rounded-2xl border border-neutral-interactive/50 overflow-hidden shadow-xs">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-neutral-interactive/40 border-b border-neutral-interactive/40 font-semibold text-neutral-text-muted">
                      <tr>
                        <th className="p-3 pl-4">Export / Symbol</th>
                        <th className="p-3">Type Signature</th>
                        <th className="p-3 pr-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {metadata.usageGuide.apiReference.map((api) => (
                        <tr key={api.name} className="hover:bg-neutral-interactive/20 transition-colors">
                          <td className="p-3 pl-4 font-mono font-medium text-neutral-text">
                            {api.name}
                          </td>
                          <td className="p-3 font-mono text-[11px] text-neutral-text-muted">
                            {api.type}
                          </td>
                          <td className="p-3 pr-4 text-neutral-text-muted leading-relaxed">
                            {api.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. Production Tips & Hydration Safety */}
            {metadata.usageGuide?.tips && metadata.usageGuide.tips.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-text-muted">
                  Best Practices & Gotchas
                </h4>
                <div className="space-y-2">
                  {metadata.usageGuide.tips.map((tip, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl border border-neutral-interactive/40 bg-neutral-interactive/15 text-xs text-neutral-text-muted leading-relaxed"
                    >
                      <Sparkles className="size-4 text-primary-text shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Generic fallback if no metadata.usageGuide is defined */}
            {!metadata.usageGuide && (
              <div className="rounded-2xl border border-neutral-interactive/40 bg-neutral-surface-alt p-6 space-y-4">
                <h3 className="text-base font-bold">Standard Import & Usage</h3>
                <p className="text-xs text-neutral-text-muted">
                  Install the component into your project via the Shadcn CLI:
                </p>
                <pre className="p-3 rounded-xl bg-neutral-interactive/40 font-mono text-xs text-neutral-text">
                  <code>{metadata.installCmd}</code>
                </pre>
                <p className="text-xs text-neutral-text-muted">
                  Import and use in your application:
                </p>
                <pre className="p-3 rounded-xl bg-neutral-interactive/40 font-mono text-xs text-neutral-text">
                  <code>{`import { ${metadata.name} } from "@/components/ui/${metadata.id}";\n\nexport function Example() {\n  return <${metadata.name} />;\n}`}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 3: STORIES (Grid of all variants with copy code button for each) */}
        {/* ================================================================ */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold font-heading">
                  All {metadata.name} Variants & Stories
                </h2>
                <p className="text-xs text-neutral-text-muted">
                  Explore all authored variants and states. Click &quot;Copy Code&quot; on any variant to use it immediately in your code.
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-surface-alt text-neutral-text-muted border border-neutral-interactive/40 w-fit">
                {stories.length} stories rendered
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {stories.map((story) => {
                const StoryComp = story.Component;
                const isCopied = copiedStoryId === story.id;
                return (
                  <div
                    key={story.id}
                    className="flex flex-col rounded-3xl border border-neutral-interactive/50 bg-neutral-surface overflow-hidden shadow-xs hover:border-neutral-interactive transition-all"
                  >
                    <div className="p-3 px-4 border-b border-neutral-interactive/30 bg-neutral-interactive/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-neutral-text font-heading">
                          {story.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-interactive text-neutral-text-muted">
                          {story.id}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyStory(story)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-surface hover:bg-neutral-interactive border border-neutral-interactive/60 text-[11px] font-medium text-neutral-text transition-colors cursor-pointer shadow-2xs"
                        title="Copy variant code"
                      >
                        {isCopied ? (
                          <>
                            <Check className="size-3 text-emerald-500" />
                            <span className="text-emerald-500 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-neutral-text-muted" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="min-h-[200px] p-6 sm:p-8 flex items-center justify-center overflow-x-auto bg-[radial-gradient(var(--neutral-interactive)_1px,transparent_1px)] bg-[size:16px_16px]">
                      <div className="w-full flex justify-center py-2">
                        <StoryComp />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
