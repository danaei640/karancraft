"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Sliders,
  Palette,
  Layers,
  ShieldCheck,
  ArrowRight,
  Code2,
  Box,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/registry/bases/base/ui/button";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Switch } from "@/registry/bases/base/ui/switch";
import { Slider } from "@/registry/bases/base/ui/slider";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/bases/base/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/registry/bases/base/ui/dialog";
import { Checkbox } from "@/registry/bases/base/ui/checkbox";

export default function LandingPage() {
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);

  // Showcase state
  const [sliderVal, setSliderVal] = React.useState(72);
  const [switchState, setSwitchState] = React.useState(true);
  const [checkState, setCheckState] = React.useState(true);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-surface text-neutral-text flex flex-col selection:bg-primary-fill/20">
      {/* Global Site Navigation Header */}
      <SiteHeader />

      {/* Top Ambient Glow Backdrop (Signature Glow) */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none">
          <div
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-primary-fill/25 via-primary-interactive/35 to-primary-fill/15 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
          {/* Subtle Status Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-interactive/50 bg-neutral-surface-alt/70 px-4 py-1.5 text-xs font-medium backdrop-blur-md mb-8 shadow-xs">
            <Sparkles className="size-3.5 text-primary-text" />
            <span className="font-medium text-neutral-text">karan-ui Component Registry</span>
            <span className="size-1 rounded-full bg-neutral-text-muted/40" />
            <span className="text-neutral-text-muted font-mono text-[11px]">Base UI & Tailwind v4</span>
          </div>

          {/* Apple-grade Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl max-w-4xl mx-auto leading-[1.08] font-heading">
            Fluid, luminous, <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-neutral-text via-neutral-text/90 to-neutral-text/50 bg-clip-text text-transparent">
              and soft.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-neutral-text-muted max-w-2xl mx-auto leading-relaxed">
            A precision-engineered component registry built on <strong>Base UI</strong>,{" "}
            <strong>Next.js</strong>, and <strong>Tailwind CSS v4</strong>. 54 accessible primitives with signature pill geometries, OKLCH tokens, and tactile interactions.
          </p>

          {/* Quick Install Bar */}
          <div className="mt-10 max-w-lg mx-auto">
            <div className="flex items-center justify-between rounded-full border border-neutral-interactive/60 bg-neutral-surface-alt/90 p-1.5 shadow-sm backdrop-blur-md pl-4">
              <div className="flex items-center gap-2.5 overflow-hidden text-left">
                <Terminal className="size-3.5 shrink-0 text-neutral-text-muted" />
                <span className="truncate font-mono text-xs text-neutral-text">
                  npx shadcn add http://localhost:3000/r/button.json
                </span>
              </div>
              <Button
                size="sm"
                variant="default"
                onClick={() =>
                  copyToClipboard("npx shadcn add http://localhost:3000/r/button.json", "hero-btn")
                }
                className="rounded-full shadow-xs cursor-pointer"
              >
                {copiedCmd === "hero-btn" ? (
                  <>
                    <Check className="size-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/components">
                <Button size="lg" variant="default" className="gap-2 shadow-sm rounded-full font-medium">
                  <Layers className="size-4" />
                  <span>Explore 54 Components</span>
                  <ArrowRight className="size-4 opacity-70" />
                </Button>
              </Link>
              <Link href="/colors">
                <Button size="lg" variant="outline" className="gap-2 rounded-full font-medium">
                  <Palette className="size-4 text-primary-fill" />
                  <span>OKLCH Color Engine</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Apple-style Interactive Showcase Stage */}
        <section className="max-w-5xl mx-auto px-4 pb-24">
          <div className="rounded-3xl border border-neutral-interactive/50 bg-neutral-surface-alt/40 backdrop-blur-md p-6 sm:p-8 shadow-md relative overflow-hidden">
            {/* Stage Tabs Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-interactive/30">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-primary-text uppercase tracking-wider font-mono">
                  Live Preview
                </span>
                <h2 className="text-xl font-bold font-heading">Interactive Component Workbench</h2>
              </div>

              <Link
                href="/components"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-text-muted hover:text-neutral-text transition-colors"
              >
                <span>View Full Workbench & Test Suite</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>

            {/* Stage Content with Tabs using Line Variant */}
            <Tabs defaultValue="buttons" className="mt-6">
              <TabsList variant="line" className="mb-6">
                <TabsTrigger value="buttons" className="text-xs sm:text-sm">
                  Action Buttons
                </TabsTrigger>
                <TabsTrigger value="controls" className="text-xs sm:text-sm">
                  Tactile Controls
                </TabsTrigger>
                <TabsTrigger value="dialog" className="text-xs sm:text-sm">
                  Modal Dialogs
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Buttons */}
              <TabsContent value="buttons" className="space-y-6 pt-2">
                <div className="p-8 rounded-2xl border border-neutral-interactive/30 bg-neutral-surface/60 flex flex-wrap items-center justify-center gap-3">
                  <Button variant="default">Primary Action</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button intent="danger">Danger</Button>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-neutral-text-muted font-mono pt-2">
                  <span>Base UI Button · Proportional Radius &amp; Semantic Intents</span>
                  <Link href="/components/button" className="text-neutral-text hover:underline inline-flex items-center gap-1 shrink-0">
                    <span>Inspect button specs</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </TabsContent>

              {/* Tab 2: Controls */}
              <TabsContent value="controls" className="space-y-6 pt-2">
                <div className="p-8 rounded-2xl border border-neutral-interactive/30 bg-neutral-surface/60 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-surface-alt/50 border border-neutral-interactive/20">
                    <div className="space-y-0.5">
                      <span className="text-xs font-medium text-neutral-text">Fluid Switch</span>
                      <p className="text-[11px] text-neutral-text-muted">Springy tactile interaction</p>
                    </div>
                    <Switch checked={switchState} onCheckedChange={setSwitchState} />
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-surface-alt/50 border border-neutral-interactive/20 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-neutral-text">Precision Slider</span>
                      <span className="font-mono text-neutral-text-muted">{sliderVal}%</span>
                    </div>
                    <Slider
                      value={[sliderVal]}
                      onValueChange={(val) => setSliderVal(Array.isArray(val) ? val[0] : Number(val))}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center gap-3 px-4 py-2">
                    <Checkbox
                      id="opt-in"
                      checked={checkState}
                      onCheckedChange={(checked) => setCheckState(!!checked)}
                    />
                    <label htmlFor="opt-in" className="text-xs text-neutral-text-muted cursor-pointer select-none">
                      Strict OKLCH color token conformity enabled with AAA WCAG contrast
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-neutral-text-muted font-mono pt-2">
                  <span>Switch, Slider & Checkbox · Zero Framer Motion overhead</span>
                  <Link href="/components/switch" className="text-neutral-text hover:underline inline-flex items-center gap-1 shrink-0">
                    <span>Inspect switch specs</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </TabsContent>

              {/* Tab 3: Dialog */}
              <TabsContent value="dialog" className="space-y-6 pt-2">
                <div className="p-10 rounded-2xl border border-neutral-interactive/30 bg-neutral-surface/60 flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-xs text-neutral-text-muted max-w-md">
                    Base UI Dialog featuring frosted glass backdrop blur, keyboard navigation, and automatic focus trap.
                  </p>
                  <Dialog>
                    <DialogTrigger
                      render={
                        <Button variant="default" className="shadow-xs cursor-pointer">
                          Open Sample Modal
                        </Button>
                      }
                    />
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Karan UI Primitives</DialogTitle>
                        <DialogDescription>
                          Crafted with <code>@base-ui/react/dialog</code> and styled with native Tailwind CSS v4.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-2">
                        <div className="rounded-xl border border-neutral-interactive bg-neutral-interactive/40 p-3 font-mono text-xs">
                          npx shadcn add http://localhost:3000/r/dialog.json
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose
                          render={<Button variant="outline">Dismiss</Button>}
                        />
                        <Button
                          variant="default"
                          onClick={() => copyToClipboard("npx shadcn add http://localhost:3000/r/dialog.json", "sample-modal")}
                        >
                          {copiedCmd === "sample-modal" ? "Copied!" : "Copy Install Command"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-text-muted font-mono pt-2">
                  <span>Accessible Dialog · Base UI Portal</span>
                  <Link href="/components/dialog" className="text-neutral-text hover:underline flex items-center gap-1">
                    <span>Inspect dialog specs</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      {/* Apple-style Quality Bento Grid (3 Pillars) */}
      <section className="max-w-5xl mx-auto px-4 py-16 border-t border-neutral-interactive/30">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-primary-text uppercase tracking-wider font-mono">
            Engineering Excellence
          </span>
          <h2 className="text-3xl font-bold tracking-tight font-heading mt-1">
            Built for modern web applications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-3xl border border-neutral-interactive/40 bg-neutral-surface-alt/40 p-6 flex flex-col justify-between space-y-4 hover:border-neutral-interactive transition-colors">
            <div className="space-y-3">
              <div className="size-9 rounded-2xl bg-neutral-interactive flex items-center justify-center text-neutral-text">
                <Box className="size-4.5" />
              </div>
              <h3 className="font-bold text-base font-heading">Base UI Primitives</h3>
              <p className="text-xs text-neutral-text-muted leading-relaxed">
                Headless, unstyled foundations engineered by the Base UI team. Full keyboard accessibility, robust focus management, and React 19 compatibility.
              </p>
            </div>
            <div className="pt-2 border-t border-neutral-interactive/20 text-[11px] font-mono text-neutral-text-muted">
              @base-ui/react · WAI-ARIA
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-neutral-interactive/40 bg-neutral-surface-alt/40 p-6 flex flex-col justify-between space-y-4 hover:border-neutral-interactive transition-colors">
            <div className="space-y-3">
              <div className="size-9 rounded-2xl bg-primary-surface text-primary-text flex items-center justify-center border border-primary-interactive/40">
                <Palette className="size-4.5 text-primary-fill" />
              </div>
              <h3 className="font-bold text-base font-heading">OKLCH Color Science</h3>
              <p className="text-xs text-neutral-text-muted leading-relaxed">
                156 perceptually uniform color tokens across 6 functional sets. Automatic hue conflict resolution and guaranteed WCAG AAA contrast ratios.
              </p>
            </div>
            <div className="pt-2 border-t border-neutral-interactive/20 text-[11px] font-mono text-neutral-text-muted">
              Perceptual Lightness · Zero Shifts
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-neutral-interactive/40 bg-neutral-surface-alt/40 p-6 flex flex-col justify-between space-y-4 hover:border-neutral-interactive transition-colors">
            <div className="space-y-3">
              <div className="size-9 rounded-2xl bg-neutral-interactive flex items-center justify-center text-neutral-text">
                <ShieldCheck className="size-4.5" />
              </div>
              <h3 className="font-bold text-base font-heading">Standard Shadcn CLI</h3>
              <p className="text-xs text-neutral-text-muted leading-relaxed">
                Zero proprietary runtime lock-in. Distributed through standard Shadcn CLI registry endpoints with native Tailwind CSS v4 CSS variables.
              </p>
            </div>
            <div className="pt-2 border-t border-neutral-interactive/20 text-[11px] font-mono text-neutral-text-muted">
              npx shadcn add · 100% Owned Code
            </div>
          </div>
        </div>
      </section>

      {/* Minimalist CLI Quickstart Guide */}
      <section id="guide" className="max-w-4xl mx-auto px-4 py-16 border-t border-neutral-interactive/30">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-primary-text uppercase tracking-wider font-mono">
            Quick Start
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading mt-1">
            Install with the Shadcn CLI
          </h2>
          <p className="text-xs sm:text-sm text-neutral-text-muted mt-1.5">
            Add components directly to any Next.js or React 19 project in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-neutral-interactive/40 bg-neutral-surface-alt/50 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-text">
              <span className="size-5 rounded-full bg-neutral-interactive flex items-center justify-center text-[11px]">1</span>
              <span>Install Component by URL</span>
            </div>
            <p className="text-xs text-neutral-text-muted">
              Directly download any primitive JSON manifest into your components directory:
            </p>
            <div className="flex items-center justify-between rounded-xl bg-neutral-surface p-2.5 font-mono text-xs border border-neutral-interactive/30">
              <span className="truncate pr-2">npx shadcn add http://localhost:3000/r/button.json</span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard("npx shadcn add http://localhost:3000/r/button.json", "cli-1")
                }
                className="hover:text-neutral-text transition-colors p-1 cursor-pointer shrink-0"
              >
                {copiedCmd === "cli-1" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-interactive/40 bg-neutral-surface-alt/50 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-text">
              <span className="size-5 rounded-full bg-neutral-interactive flex items-center justify-center text-[11px]">2</span>
              <span>Register Karan UI Namespace</span>
            </div>
            <p className="text-xs text-neutral-text-muted">
              Add registry to your <code>components.json</code> for shorthand installs:
            </p>
            <pre className="rounded-xl bg-neutral-surface p-2.5 font-mono text-[11px] border border-neutral-interactive/30 overflow-x-auto text-neutral-text">
{`"registries": {
  "@karan-ui": "https://karan-ui.dev/r/{name}.json"
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Apple-grade Minimalist Footer */}
      <footer className="mt-auto border-t border-neutral-interactive/30 py-8 bg-neutral-surface-alt/30 text-xs text-neutral-text-muted">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-text">karan-ui</span>
            <span>—</span>
            <span>Modern Shadcn Component Registry built on Base UI & Tailwind CSS v4.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/components" className="hover:text-neutral-text transition-colors">
              Components (54)
            </Link>
            <Link href="/colors" className="hover:text-neutral-text transition-colors">
              Color Engine
            </Link>
            <a
              href="/r/index.json"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-text transition-colors font-mono text-[11px]"
            >
              Manifest
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
