"use client"

import * as React from "react"
import Link from "next/link"
import {
  Sparkles,
  Copy,
  Check,
  Search,
  Moon,
  Sun,
  Terminal,
  ExternalLink,
  Code2,
  Sliders,
  Palette,
  Layers,
  Box,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Filter,
  CheckCircle2,
  PackageCheck
} from "lucide-react"

import { Button } from "@/registry/bases/base/ui/button"
import { Badge } from "@/registry/bases/base/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/bases/base/ui/card"
import { Switch } from "@/registry/bases/base/ui/switch"
import { Slider } from "@/registry/bases/base/ui/slider"
import { Input } from "@/registry/bases/base/ui/input"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/bases/base/ui/tabs"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/registry/bases/base/ui/dialog"
import { Checkbox } from "@/registry/bases/base/ui/checkbox"
import { Separator } from "@/registry/bases/base/ui/separator"

const REGISTRY_ITEMS = [
  { name: "accordion", category: "Layout", desc: "A vertically stacked set of interactive headings that each reveal a section of content." },
  { name: "alert", category: "Feedback", desc: "Displays a callout for user attention." },
  { name: "alert-dialog", category: "Overlay", desc: "A modal dialog that interrupts the user with important content and expects a response." },
  { name: "aspect-ratio", category: "Layout", desc: "Displays content within a desired ratio." },
  { name: "avatar", category: "Data Display", desc: "An image element with a fallback for representing the user." },
  { name: "badge", category: "Data Display", desc: "Displays a badge or a component that looks like a badge." },
  { name: "breadcrumb", category: "Navigation", desc: "Displays the path to the current resource using a hierarchy of links." },
  { name: "button", category: "Action", desc: "Displays a button or a component that looks like a button with fluid Luma pill styling." },
  { name: "button-group", category: "Action", desc: "A container grouping multiple related buttons with unified rounded pill borders." },
  { name: "calendar", category: "Forms", desc: "A date field component that allows users to enter and edit date." },
  { name: "card", category: "Layout", desc: "Displays a card with header, content, and footer." },
  { name: "carousel", category: "Layout", desc: "A carousel with motion and swipe gestures built using Embla." },
  { name: "chart", category: "Data Display", desc: "Responsive, accessible charts built with Recharts." },
  { name: "checkbox", category: "Forms", desc: "A control that allows the user to toggle between checked and not checked." },
  { name: "collapsible", category: "Layout", desc: "An interactive component which can be expanded/collapsed." },
  { name: "combobox", category: "Forms", desc: "Autocomplete input and command palette with multi-select chips." },
  { name: "command", category: "Forms", desc: "Fast, composable, unstyled command menu for React." },
  { name: "context-menu", category: "Overlay", desc: "Displays a menu to the user triggered by right-click or long-press." },
  { name: "dialog", category: "Overlay", desc: "A window overlaid on either the primary window or another dialog window." },
  { name: "drawer", category: "Overlay", desc: "A fluid sliding drawer modal for mobile and desktop." },
  { name: "dropdown-menu", category: "Overlay", desc: "Displays a menu to the user triggered by a button." },
  { name: "empty", category: "Feedback", desc: "Placeholder screen for empty states and zero-data screens." },
  { name: "field", category: "Forms", desc: "Form field container with label, description, and error states." },
  { name: "hover-card", category: "Overlay", desc: "For sighted users to preview content available behind a link." },
  { name: "input", category: "Forms", desc: "Displays a form input field with pill styling and soft glow ring." },
  { name: "input-group", category: "Forms", desc: "Input wrapper supporting inline prefix/suffix icons, buttons, and badges." },
  { name: "input-otp", category: "Forms", desc: "Accessible one-time password code input with automatic pasting." },
  { name: "item", category: "Data Display", desc: "Flexible list item with leading media, title, subtitle, and trailing action." },
  { name: "kbd", category: "Data Display", desc: "Displays keyboard shortcuts with pill borders." },
  { name: "label", category: "Forms", desc: "Renders an accessible label associated with controls." },
  { name: "menubar", category: "Navigation", desc: "A persistent desktop-style menu bar." },
  { name: "native-select", category: "Forms", desc: "Accessible native HTML select with refined Luma chevron styling." },
  { name: "navigation-menu", category: "Navigation", desc: "A collection of links with rich flyout panels for website navigation." },
  { name: "pagination", category: "Navigation", desc: "Pagination bar with page navigation, next, and previous buttons." },
  { name: "popover", category: "Overlay", desc: "Displays rich content in a portal triggered by a button." },
  { name: "progress", category: "Feedback", desc: "Displays an indicator showing the completion progress of a task." },
  { name: "radio-group", category: "Forms", desc: "A set of checkable buttons where only one can be checked at a time." },
  { name: "resizable", category: "Layout", desc: "Accessible resizable panel groups and split views." },
  { name: "scroll-area", category: "Layout", desc: "Custom cross-browser scrollbar area." },
  { name: "select", category: "Forms", desc: "Displays a list of options for the user to pick from." },
  { name: "separator", category: "Layout", desc: "Visually or semantically separates content." },
  { name: "sheet", category: "Overlay", desc: "Extends Dialog to display a side sheet complementing the main screen." },
  { name: "sidebar", category: "Navigation", desc: "Composable, themeable and collapsible sidebar primitive." },
  { name: "skeleton", category: "Feedback", desc: "Use to show a placeholder while content is loading." },
  { name: "slider", category: "Forms", desc: "Input where user selects a numeric value from within a given range." },
  { name: "switch", category: "Forms", desc: "A fluid control that allows toggling between checked and unchecked." },
  { name: "table", category: "Data Display", desc: "Responsive, styled data table primitive." },
  { name: "tabs", category: "Navigation", desc: "Pill-shaped tabbed sections of content." },
  { name: "textarea", category: "Forms", desc: "Multi-line form textarea with smooth corners." },
  { name: "toast", category: "Feedback", desc: "Accessible floating toast notification primitive." },
  { name: "toggle", category: "Action", desc: "A two-state button that can be either pressed or unpressed." },
  { name: "toggle-group", category: "Action", desc: "A set of two-state buttons toggled together." },
  { name: "tooltip", category: "Overlay", desc: "A popup displaying information on hover or keyboard focus." },
]

const PALETTES = [
  { name: "neutral", label: "Neutral", bg: "bg-neutral-900" },
  { name: "zinc", label: "Zinc", bg: "bg-zinc-800" },
  { name: "slate", label: "Slate", bg: "bg-slate-700" },
  { name: "violet", label: "Violet", bg: "bg-violet-600" },
  { name: "rose", label: "Rose", bg: "bg-rose-500" },
  { name: "emerald", label: "Emerald", bg: "bg-emerald-600" },
  { name: "blue", label: "Blue", bg: "bg-blue-600" },
]

export default function HomePage() {
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null)
  const [isDark, setIsDark] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("components")
  const [activeCategory, setActiveCategory] = React.useState("All")

  // Interactive playground states
  const [sliderVal, setSliderVal] = React.useState(68)
  const [switchState, setSwitchState] = React.useState(true)
  const [checkState, setCheckState] = React.useState(true)
  const [activePalette, setActivePalette] = React.useState("neutral")

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCmd(id)
    setTimeout(() => setCopiedCmd(null), 2000)
  }

  const toggleDarkMode = () => {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const categories = ["All", "Action", "Forms", "Overlay", "Layout", "Data Display", "Feedback", "Navigation"]

  const filteredItems = REGISTRY_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-neutral-surface text-neutral-text transition-colors duration-200">
      {/* Top Ambient Glow Banner */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-primary/30 to-primary-interactive/40 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 w-full border-b border-neutral-interactive/40 bg-neutral-surface/80 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-2xl bg-primary-fill text-primary-on-fill shadow-md font-bold tracking-tight">
                K
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold tracking-tight">karan-ui</span>
                <span className="rounded-full bg-primary-interactive px-2 py-0.5 text-[10px] font-medium text-primary-text">
                  Registry v4
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-text-muted">
              <Link href="/colors" className="flex items-center gap-1.5 transition-colors text-neutral-text font-semibold hover:text-primary-fill">
                <Palette className="size-3.5 text-primary-fill" />
                <span>Color System</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-primary-surface text-primary-text font-mono font-medium border border-primary-interactive/50">OKLCH</span>
              </Link>
              <Link href="/components" className="transition-colors hover:text-neutral-text">Components ({REGISTRY_ITEMS.length})</Link>
              <a href="#playground" className="transition-colors hover:text-neutral-text">Playground</a>
              <a href="#guide" className="transition-colors hover:text-neutral-text">Registry Spec</a>
              <a
                href="/r/index.json"
                target="_blank"
                className="flex items-center gap-1 transition-colors hover:text-neutral-text"
              >
                /r/index.json <ExternalLink className="size-3" />
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard("npx shadcn add http://localhost:3000/r/button.json", "nav-install")}
              >
                {copiedCmd === "nav-install" ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span>Copied CLI</span>
                  </>
                ) : (
                  <>
                    <Terminal className="size-3.5 text-neutral-text-muted" />
                    <span>Install Button</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container pt-20 pb-16 text-center lg:pt-28 lg:pb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-interactive bg-neutral-surface-alt/60 px-4 py-1.5 text-xs font-medium backdrop-blur-md mb-8 shadow-xs">
            <Sparkles className="size-3.5 text-primary-text" />
            <span>Modern Shadcn Component System</span>
            <Separator orientation="vertical" className="h-3" />
            <span className="text-neutral-text-muted">Base UI Primitives</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl max-w-4xl mx-auto leading-[1.1]">
            Fluid, luminous, <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-neutral-text via-neutral-text/80 to-muted-foreground bg-clip-text text-transparent">
              and soft.
            </span>
          </h1>

          <p className="mt-6 text-lg text-neutral-text-muted max-w-2xl mx-auto leading-relaxed">
            A production-ready Shadcn Component Registry built on <strong>Next.js 16</strong>,{" "}
            <strong>Base UI</strong>, and <strong>Tailwind CSS v4</strong>. 55+ accessible primitives with
            signature rounded-4xl geometries, OKLCH tokens, and tactile micro-interactions.
          </p>

          {/* Interactive Quick Install Bar */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="flex items-center justify-between rounded-full border border-neutral-interactive bg-neutral-surface-alt/90 p-2 shadow-lg backdrop-blur-md pl-4">
              <div className="flex items-center gap-3 overflow-hidden text-left">
                <Terminal className="size-4 shrink-0 text-primary-text" />
                <span className="truncate font-mono text-xs text-neutral-text-muted">
                  npx shadcn add <strong className="text-neutral-text">http://localhost:3000/r/button.json</strong>
                </span>
              </div>
              <Button
                size="sm"
                variant="default"
                onClick={() =>
                  copyToClipboard("npx shadcn add http://localhost:3000/r/button.json", "hero-btn")
                }
              >
                {copiedCmd === "hero-btn" ? (
                  <>
                    <Check className="size-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
            <p className="mt-3 text-xs text-neutral-text-muted">
              Or configure in <code className="text-neutral-text font-mono">components.json</code> with{" "}
              <code className="text-neutral-text font-mono">&quot;style&quot;: &quot;luma&quot;</code>
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/colors">
                <Button size="default" variant="default" className="gap-2">
                  <Palette className="size-4" />
                  <span>Explore OKLCH Color System</span>
                </Button>
              </Link>
              <Link href="/components">
                <Button size="default" variant="outline" className="gap-2">
                  <Layers className="size-4" />
                  <span>Browse 55+ Components</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Interactive Playground Section */}
      <section id="playground" className="container py-16 border-t border-neutral-interactive/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary-text uppercase tracking-wider mb-2">
              <Sliders className="size-3.5" />
              <span>Interactive Showcase</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Experience Components</h2>
            <p className="text-sm text-neutral-text-muted mt-1">
              Test real live components rendered directly with Base UI.
            </p>
          </div>

          {/* Color Palette Selector */}
          <div className="flex items-center gap-2 bg-neutral-surface-alt p-2 rounded-full border border-neutral-interactive shadow-xs">
            <Palette className="size-4 ml-2 text-neutral-text-muted" />
            <div className="flex items-center gap-1.5">
              {PALETTES.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setActivePalette(p.name)}
                  title={p.label}
                  className={`size-6 rounded-full ${p.bg} transition-transform ${
                    activePalette === p.name ? "ring-2 ring-primary-interactive-focus ring-offset-2 ring-offset-neutral-surface scale-110" : "opacity-80 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Buttons & Actions */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Action Primitives</Badge>
                <span className="font-mono text-xs text-neutral-text-muted">button.tsx</span>
              </div>
              <CardTitle className="mt-2">Pill Geometries</CardTitle>
              <CardDescription>
                Signature rounded-4xl buttons with soft hover nuances and active translations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button size="xs" variant="outline">XS</Button>
                <Button size="sm" variant="outline">Small</Button>
                <Button size="default" variant="outline">Default</Button>
                <Button size="lg" variant="default">Large Pill</Button>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between items-center text-xs text-neutral-text-muted">
              <span>Variants: 6 | Sizes: 8</span>
              <Button
                size="xs"
                variant="ghost"
                onClick={() => copyToClipboard("npx shadcn add http://localhost:3000/r/button.json", "copy-btn-comp")}
              >
                {copiedCmd === "copy-btn-comp" ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                Copy CLI
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2: Interactive Controls (Switch, Slider, Checkbox) */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Form Controls</Badge>
                <span className="font-mono text-xs text-neutral-text-muted">switch.tsx</span>
              </div>
              <CardTitle className="mt-2">Fluid Controls</CardTitle>
              <CardDescription>
                Smooth springy switches, custom slider thumbs, and tactile checkboxes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Switch Demo */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium">Luminous Ambient Glow</span>
                  <p className="text-xs text-neutral-text-muted">Enable active focus ring styling</p>
                </div>
                <Switch
                  checked={switchState}
                  onCheckedChange={setSwitchState}
                />
              </div>

              {/* Slider Demo */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-neutral-text-muted">Intensity Range</span>
                  <span className="font-mono">{sliderVal}%</span>
                </div>
                <Slider
                  value={[sliderVal]}
                  onValueChange={(val) => setSliderVal(Array.isArray(val) ? val[0] : Number(val))}
                  max={100}
                  step={1}
                />
              </div>

              {/* Checkbox Demo */}
              <div className="flex items-center gap-3 pt-1">
                <Checkbox
                  id="agree"
                  checked={checkState}
                  onCheckedChange={(checked) => setCheckState(!!checked)}
                />
                <label
                  htmlFor="agree"
                  className="text-xs font-medium text-neutral-text-muted cursor-pointer select-none leading-none"
                >
                  Strict OKLCH color token conformity enabled
                </label>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between items-center text-xs text-neutral-text-muted">
              <span>Active State: {switchState ? "Enabled" : "Disabled"}</span>
              <Button
                size="xs"
                variant="ghost"
                onClick={() => copyToClipboard("npx shadcn add http://localhost:3000/r/switch.json", "copy-sw-comp")}
              >
                {copiedCmd === "copy-sw-comp" ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                Copy CLI
              </Button>
            </CardFooter>
          </Card>

          {/* Card 3: Dialog & Overlays */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Overlays</Badge>
                <span className="font-mono text-xs text-neutral-text-muted">dialog.tsx</span>
              </div>
              <CardTitle className="mt-2">Modal & Portals</CardTitle>
              <CardDescription>
                Backdrop blur overlays with smooth zoom transitions and soft radii.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-neutral-interactive/80 bg-neutral-interactive/30 p-4 text-center">
                <p className="text-xs text-neutral-text-muted mb-3">
                  Click below to preview the responsive Base UI modal dialog:
                </p>
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button variant="default" className="shadow-md">
                        Open Dialog
                      </Button>
                    }
                  />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Karan-UI Component Registry</DialogTitle>
                      <DialogDescription>
                        This dialog is built with <code>@base-ui/react/dialog</code> and styled with
                        custom design tokens. Notice the frosted backdrop blur and gentle rounded borders.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-2">
                      <div className="rounded-2xl border border-neutral-interactive bg-neutral-interactive/40 p-3 font-mono text-xs">
                        npx shadcn add http://localhost:3000/r/dialog.json
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose
                        render={<Button variant="outline">Dismiss</Button>}
                      />
                      <Button variant="default" onClick={() => copyToClipboard("npx shadcn add http://localhost:3000/r/dialog.json", "modal-cli")}>
                        {copiedCmd === "modal-cli" ? "Copied!" : "Copy Install Command"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Badges showcase */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="default">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between items-center text-xs text-neutral-text-muted">
              <span>Portals: React 19 + Base UI</span>
              <Button
                size="xs"
                variant="ghost"
                onClick={() => copyToClipboard("npx shadcn add http://localhost:3000/r/dialog.json", "copy-dlg-comp")}
              >
                {copiedCmd === "copy-dlg-comp" ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                Copy CLI
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Component Catalog Grid Section */}
      <section id="catalog" className="container py-16 border-t border-neutral-interactive/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary-text uppercase tracking-wider mb-2">
              <PackageCheck className="size-3.5" />
              <span>Full Registry Index</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Component Directory</h2>
            <p className="text-sm text-neutral-text-muted mt-1">
              All 55 components ready to install directly into your project.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-text-muted" />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="xs"
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Catalog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.name}
              className="group relative flex flex-col justify-between rounded-3xl border border-neutral-interactive bg-neutral-surface-alt/60 p-5 transition-all hover:bg-neutral-surface-alt hover:shadow-md hover:border-primary-interactive-focus"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-base capitalize tracking-tight group-hover:text-primary-text transition-colors">
                    {item.name.replace(/-/g, " ")}
                  </span>
                  <Badge variant="outline" className="text-[10px] px-2 py-0">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-xs text-neutral-text-muted line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-interactive/40 flex items-center justify-between">
                <a
                  href={`/r/${item.name}.json`}
                  target="_blank"
                  className="font-mono text-[11px] text-neutral-text-muted hover:text-neutral-text flex items-center gap-1 transition-colors"
                >
                  /r/{item.name}.json <ExternalLink className="size-2.5" />
                </a>

                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() =>
                    copyToClipboard(
                      `npx shadcn add http://localhost:3000/r/${item.name}.json`,
                      `card-${item.name}`
                    )
                  }
                >
                  {copiedCmd === `card-${item.name}` ? (
                    <Check className="size-3 text-emerald-500" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                  <span>Add</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 border border-dashed border-neutral-interactive rounded-3xl">
            <Box className="size-10 mx-auto text-neutral-text-muted mb-3 opacity-40" />
            <p className="text-sm font-medium">No components match your query</p>
            <p className="text-xs text-neutral-text-muted mt-1">Try clearing your search term</p>
          </div>
        )}
      </section>

      {/* Registry Guide & CLI Spec Section */}
      <section id="guide" className="container py-16 border-t border-neutral-interactive/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-2">Distribution Guide</Badge>
            <h2 className="text-3xl font-bold tracking-tight">Using with the Shadcn CLI</h2>
            <p className="text-sm text-neutral-text-muted mt-1">
              How developers can consume the <code>karan-ui</code> registry in their own applications.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-neutral-interactive bg-neutral-surface-alt p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-primary-interactive text-primary-text font-bold text-xs">
                  1
                </div>
                <h3 className="font-semibold text-base">Direct URL Installation</h3>
              </div>
              <p className="text-sm text-neutral-text-muted mb-3">
                Install any component directly from the registry using its endpoint:
              </p>
              <div className="flex items-center justify-between rounded-2xl bg-neutral-surface-alt/60 p-3 font-mono text-xs">
                <span>npx shadcn add http://localhost:3000/r/button.json</span>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() =>
                    copyToClipboard("npx shadcn add http://localhost:3000/r/button.json", "guide-1")
                  }
                >
                  {copiedCmd === "guide-1" ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-interactive bg-neutral-surface-alt p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-primary-interactive text-primary-text font-bold text-xs">
                  2
                </div>
                <h3 className="font-semibold text-base">Add Luma Style & Tokens</h3>
              </div>
              <p className="text-sm text-neutral-text-muted mb-3">
                Pull in the complete Luma CSS tokens and OKLCH color variables:
              </p>
              <div className="flex items-center justify-between rounded-2xl bg-neutral-surface-alt/60 p-3 font-mono text-xs">
                <span>npx shadcn add http://localhost:3000/r/luma.json</span>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() =>
                    copyToClipboard("npx shadcn add http://localhost:3000/r/luma.json", "guide-2")
                  }
                >
                  {copiedCmd === "guide-2" ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-interactive bg-neutral-surface-alt p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-primary-interactive text-primary-text font-bold text-xs">
                  3
                </div>
                <h3 className="font-semibold text-base">Registry Configuration in components.json</h3>
              </div>
              <p className="text-sm text-neutral-text-muted mb-3">
                Configure your project&apos;s <code>components.json</code> to register the karan-ui registry namespace:
              </p>
              <pre className="rounded-2xl bg-neutral-surface-alt/60 p-4 font-mono text-xs overflow-x-auto">
{`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "luma",
  "registries": {
    "@karan-ui": "https://karan-ui.dev/r/{name}.json"
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-interactive/40 py-10 bg-neutral-surface-alt/30">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-text-muted">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-text">karan-ui</span>
            <span>—</span>
            <span>Crafted with Next.js 16, Base UI, and Tailwind CSS v4.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/r/index.json" className="hover:text-neutral-text transition-colors">
              Index Manifest
            </a>
            <a href="/r/luma.json" className="hover:text-neutral-text transition-colors">
              Luma Preset
            </a>
            <span className="text-primary-text font-medium">Phase 1 Complete</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
