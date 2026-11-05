export interface ComponentPropDoc {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  options?: string[];
  controlType: 'select' | 'boolean' | 'text' | 'number';
}

export interface ComponentUsageGuide {
  summary: string;
  install: {
    cli: string;
    registryUrl?: string;
  };
  rootLayoutSetup?: {
    filename: string;
    code: string;
    explanation?: string;
  };
  features: {
    title: string;
    badge?: string;
    description: string;
    code?: string;
  }[];
  apiReference?: {
    name: string;
    type: string;
    description: string;
  }[];
  tips?: string[];
}

export interface ComponentMetadata {
  id: string;
  name: string;
  category:
    | 'Actions & Inputs'
    | 'Overlays & Dialogs'
    | 'Navigation & Menus'
    | 'Data Display & Layout'
    | 'Feedback & Utilities';
  description: string;
  baseUiPrimitive: string;
  installCmd: string;
  registryUrl: string;
  props: ComponentPropDoc[];
  defaultProps: Record<string, any>;
  usageGuide?: ComponentUsageGuide;
}

export const COMPONENTS_METADATA: Record<string, ComponentMetadata> = {
  button: {
    id: 'button',
    name: 'Button',
    category: 'Actions & Inputs',
    description:
      'Displays an interactive button with proportional size-to-radius geometry, smart variant/intent color resolution, leading/trailing slots, full-width alignment, and async loading state.',
    baseUiPrimitive: '@base-ui/react/button',
    installCmd: 'npx shadcn@latest add @karan-ui/button',
    registryUrl: 'https://karan-ui.dev/r/button.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'outline' | 'ghost' | 'link'",
        defaultValue: "'default'",
        description: 'Structural emphasis variant of the button',
        options: ['default', 'secondary', 'outline', 'ghost', 'link'],
        controlType: 'select',
      },
      {
        name: 'intent',
        type: "'primary' | 'neutral' | 'success' | 'warning' | 'info' | 'danger'",
        defaultValue: "'auto'",
        description:
          'Semantic color intent (auto uses primary for default variant and neutral for others)',
        options: ['auto', 'primary', 'neutral', 'success', 'warning', 'info', 'danger'],
        controlType: 'select',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'default' | 'lg' | 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg'",
        defaultValue: "'default'",
        description:
          'Proportional height, corner radius (R/H ≈ 0.25), horizontal padding (Px ≥ R + 2px), and icon size',
        options: ['xs', 'sm', 'default', 'lg', 'icon-xs', 'icon-sm', 'icon', 'icon-lg'],
        controlType: 'select',
      },
      {
        name: 'align',
        type: "'start' | 'center' | 'end'",
        defaultValue: "'center'",
        description: 'Horizontal alignment of button contents',
        options: ['start', 'center', 'end'],
        controlType: 'select',
      },
      {
        name: 'wide',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Expands the button to 100% width of its container',
        controlType: 'boolean',
      },
      {
        name: 'loading',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Renders an inline spinner in the leading slot and disables interactions',
        controlType: 'boolean',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Whether the button is disabled and prevents interactions',
        controlType: 'boolean',
      },
      {
        name: 'leading',
        type: 'ReactNode',
        defaultValue: "''",
        description: 'Element or label rendered before children (alias: icon)',
        controlType: 'text',
      },
      {
        name: 'trailing',
        type: 'ReactNode',
        defaultValue: "''",
        description: 'Element or label rendered after children',
        controlType: 'text',
      },
      {
        name: 'children',
        type: 'ReactNode',
        defaultValue: "'Button'",
        description: 'The content rendered inside the button',
        controlType: 'text',
      },
    ],
    defaultProps: {
      variant: 'default',
      intent: 'auto',
      size: 'default',
      align: 'center',
      wide: false,
      loading: false,
      disabled: false,
      children: 'Click me',
    },
    usageGuide: {
      summary:
        'The Karan UI Button separates structural hierarchy (variant) from semantic color meaning (intent). When no intent is passed, variant="default" automatically resolves to primary, while secondary, outline, ghost, and link resolve to neutral. Corner radii, horizontal padding, icon dimensions, and internal gaps follow strict optical proportions (R/H ≈ 0.25 and Px ≥ R + 2px at 1x).',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/button',
        registryUrl: 'https://karan-ui.dev/r/button.json',
      },
      features: [
        {
          title: 'Variants & Smart Default Intent Resolution',
          badge: 'Hierarchy',
          description:
            'By default, variant="default" uses the primary accent palette to anchor the viewport CTA, whereas secondary, outline, ghost, and link automatically default to the neutral palette. Each variant follows a harmonic rest → hover → active color progression: default flows fill → fill-hover → fill-active, secondary flows interactive → interactive-hover → interactive-active, and link flows text-secondary → text → text-secondary.',
          code: `import { Button } from "@/components/ui/button"

export function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Primary Action</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link Action</Button>
    </div>
  )
}`,
        },
        {
          title: 'Semantic Intents Across Variants (Replacing Destructive Variant)',
          badge: '6 Intents',
          description:
            'Pass intent="primary" | "neutral" | "success" | "warning" | "info" | "danger" to apply the 13-token OKLCH color scale to any structural variant with consistent lightness and chroma progression from rest → hover → active.',
          code: `import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle2, AlertTriangle, Info } from "lucide-react"

export function ButtonIntentsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button intent="primary">Primary</Button>
      <Button intent="neutral">Neutral</Button>
      <Button intent="success" leading={<CheckCircle2 />}>Approve</Button>
      <Button intent="warning" leading={<AlertTriangle />}>Caution</Button>
      <Button intent="info" leading={<Info />}>Inspect</Button>
      <Button intent="danger" leading={<Trash2 />}>Delete</Button>
      <Button variant="outline" intent="danger">Revoke Access</Button>
    </div>
  )
}`,
        },
        {
          title: 'Proportional Size, Corner Radius & Padding Scale',
          badge: '10px Default Radius at 1x',
          description:
            'At 1x theme geometry: default (h-8 / 32px) and lg (h-9 / 36px) use 10px corner radius (rounded-lg) with 12px (px-3) and 14px (px-3.5) horizontal padding. Compact xs (h-6 / 24px) and sm (h-7 / 28px) step down 1 level to 8px radius (rounded-md) with 8px padding (px-2).',
          code: `import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs" leading={<Plus />}>XS (24px · 8px radius)</Button>
      <Button size="sm" leading={<Plus />}>SM (28px · 8px radius)</Button>
      <Button size="default" leading={<Plus />}>Default (32px · 10px radius)</Button>
      <Button size="lg" leading={<Plus />}>LG (36px · 10px radius)</Button>
    </div>
  )
}`,
        },
        {
          title: 'Leading, Trailing & Icon Alias Slots',
          badge: 'Slots',
          description:
            'Use leading (or its alias icon) and trailing props to attach icons, badges, or keyboard shortcuts before and after button children. SVG icons without an explicit size-* class are automatically sized to match the button tier (12px for xs, 14px for sm, 16px for default/lg).',
          code: `import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, Sparkles } from "lucide-react"

export function ButtonAffixesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button leading={<Mail />}>Continue with Email</Button>
      <Button icon={<Sparkles />} variant="secondary">Generate</Button>
      <Button trailing={<ArrowRight />} variant="outline">Next Step</Button>
    </div>
  )
}`,
        },
        {
          title: 'Full-Width Layout, Smart Slot Alignment & Async Loading',
          badge: 'Layout & State',
          description:
            'When align="center", both leading and trailing stay grouped next to children in the center. When align="start", leading and children align to the start while trailing sticks to the end edge. Conversely, when align="end", leading sticks to the start edge while children and trailing align to the end.',
          code: `import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, Sparkles } from "lucide-react"

export function ButtonStateAndLayoutDemo() {
  return (
    <div className="flex flex-col gap-2.5 max-w-xs">
      <Button wide align="start" variant="outline" leading={<Mail />} trailing={<ArrowRight />}>
        Start (Trailing at End)
      </Button>
      <Button wide align="center" leading={<Sparkles />} trailing={<ArrowRight />}>
        Center (Grouped)
      </Button>
      <Button wide align="end" variant="secondary" leading={<Mail />} trailing={<ArrowRight />}>
        End (Leading at Start)
      </Button>
      <Button wide loading>
        Saving Workspace...
      </Button>
    </div>
  )
}`,
        },
      ],
      apiReference: [
        {
          name: 'Button',
          type: 'React.FC<ButtonProps>',
          description:
            'Primary interactive button component built on @base-ui/react/button with variant, intent, size, wide, align, leading/icon, trailing, and loading props.',
        },
        {
          name: 'buttonVariants',
          type: '(props?: VariantProps<typeof buttonVariants>) => string',
          description:
            'CVA helper for applying button structural and size classes to custom elements or links.',
        },
        {
          name: 'ButtonVariant',
          type: "'default' | 'secondary' | 'outline' | 'ghost' | 'link'",
          description: 'Union type representing structural emphasis levels.',
        },
        {
          name: 'ButtonIntent',
          type: "'primary' | 'neutral' | 'success' | 'warning' | 'info' | 'danger'",
          description: 'Union type representing semantic OKLCH color intents.',
        },
        {
          name: 'ButtonAlign',
          type: "'start' | 'center' | 'end'",
          description: 'Horizontal content alignment options inside the button.',
        },
      ],
      tips: [
        'Use intent="danger" across any variant (default, secondary, outline, ghost, or link) instead of a separate destructive variant.',
        'Leave intent omitted for standard primary CTAs (variant="default") and neutral secondary actions (variant="secondary" | "outline" | "ghost") to preserve the 60-30-10 color balance.',
        'Prefer passing icons via leading={<Icon />} or trailing={<Icon />} so automatic icon sizing (12px / 14px / 16px) and slot data attributes are applied consistently.',
        'When rendering icon-only buttons (size="icon-xs" | "icon-sm" | "icon" | "icon-lg"), always provide an accessible aria-label.',
      ],
    },
  },

  badge: {
    id: 'badge',
    name: 'Badge',
    category: 'Data Display & Layout',
    description: 'Displays a badge or small status tag styled with custom design tokens.',
    baseUiPrimitive: '@base-ui/react/use-render',
    installCmd: 'npx shadcn@latest add @karan-ui/badge',
    registryUrl: 'https://karan-ui.dev/r/badge.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link'",
        defaultValue: "'default'",
        description: 'The visual style variant of the badge',
        options: ['default', 'secondary', 'outline', 'destructive', 'ghost', 'link'],
        controlType: 'select',
      },
      {
        name: 'children',
        type: 'ReactNode',
        defaultValue: "'Badge'",
        description: 'The text or elements inside the badge',
        controlType: 'text',
      },
    ],
    defaultProps: {
      variant: 'default',
      children: 'Active',
    },
  },

  card: {
    id: 'card',
    name: 'Card',
    category: 'Data Display & Layout',
    description:
      'Displays a versatile surface card supporting default (tint), outline, and ghost variants, 6 semantic OKLCH intents, proportional sm/default/lg geometry (P = R + 2px), and polymorphic interactive states.',
    baseUiPrimitive: '@base-ui/react/use-render',
    installCmd: 'npx shadcn@latest add @karan-ui/card',
    registryUrl: 'https://karan-ui.dev/r/card.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'tint' | 'outline' | 'ghost'",
        defaultValue: "'default'",
        description:
          'Structural surface style: default/tint (soft tinted surface-alt), outline (1px border), or ghost (transparent borderless)',
        options: ['default', 'tint', 'outline', 'ghost'],
        controlType: 'select',
      },
      {
        name: 'intent',
        type: "'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger'",
        defaultValue: "'neutral'",
        description:
          'Semantic OKLCH color intent applied across surface, border, typography, and focus ring tokens',
        options: ['neutral', 'primary', 'info', 'success', 'warning', 'danger'],
        controlType: 'select',
      },
      {
        name: 'size',
        type: "'sm' | 'default' | 'lg'",
        defaultValue: "'default'",
        description:
          'Proportional corner radius and padding tier following P = R + 2px at 1x (sm: 14px/16px, default: 18px/20px, lg: 22px/24px)',
        options: ['sm', 'default', 'lg'],
        controlType: 'select',
      },
      {
        name: 'interactive',
        type: 'boolean',
        defaultValue: 'false',
        description:
          'Enables hover/active surface & border transitions, pointer cursor, intent-matched focus-visible ring, and keyboard activation',
        controlType: 'boolean',
      },
      {
        name: 'title',
        type: 'string',
        defaultValue: "'Project Overview'",
        description: 'Card title header text',
        controlType: 'text',
      },
      {
        name: 'description',
        type: 'string',
        defaultValue: "'Telemetry & metrics for Karan UI registry'",
        description: 'Card secondary description text',
        controlType: 'text',
      },
    ],
    defaultProps: {
      variant: 'default',
      intent: 'neutral',
      size: 'default',
      interactive: false,
      title: 'Project Overview',
      description: 'Telemetry & metrics for Karan UI registry',
    },
    usageGuide: {
      summary:
        'Built on @base-ui/react/use-render, Card separates structural surface hierarchy (variant="default" | "tint" | "outline" | "ghost") from semantic color meaning (intent="neutral" | "primary" | "info" | "success" | "warning" | "danger"). All three size tiers (sm, default, lg) obey the proportional P = R + 2px formula at 1x scale, and setting interactive enables hover/active states, keyboard focus rings, and polymorphic element rendering via render.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/card',
        registryUrl: 'https://karan-ui.dev/r/card.json',
      },
      features: [
        {
          title: '1. Surface Variants: Default (Tint), Outline & Ghost',
          badge: '3 Variants',
          description:
            'Use variant="default" (or alias variant="tint") for a soft tinted surface, variant="outline" for a crisp 1px border, or variant="ghost" for a quiet borderless container.',
          code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function CardVariantsDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default (Tint)</CardTitle>
          <CardDescription>Soft tinted surface</CardDescription>
        </CardHeader>
        <CardContent>Zero border clutter.</CardContent>
      </Card>
      <Card variant="outline">
        <CardHeader>
          <CardTitle>Outline</CardTitle>
          <CardDescription>1px structural border</CardDescription>
        </CardHeader>
        <CardContent>High-density separation.</CardContent>
      </Card>
      <Card variant="ghost">
        <CardHeader>
          <CardTitle>Ghost</CardTitle>
          <CardDescription>Transparent surface</CardDescription>
        </CardHeader>
        <CardContent>Quiet layout grouping.</CardContent>
      </Card>
    </div>
  )
}`,
        },
        {
          title: '2. Semantic OKLCH Intents Across Variants',
          badge: '6 Intents',
          description:
            'Pass intent="neutral" | "primary" | "info" | "success" | "warning" | "danger" to harmonize the card surface, border, title, and CardDescription secondary text with perceptual OKLCH tokens.',
          code: `import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function CardIntentsDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card variant="default" intent="primary">
        <CardHeader>
          <CardTitle>Primary</CardTitle>
          <CardDescription>Brand accent tint</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="default" intent="success">
        <CardHeader>
          <CardTitle>Success</CardTitle>
          <CardDescription>All checks nominal</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="outline" intent="danger">
        <CardHeader>
          <CardTitle>Danger Outline</CardTitle>
          <CardDescription>Action required</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}`,
        },
        {
          title: '3. Proportional Size, Radius & Padding Formula (P = R + 2px)',
          badge: 'sm · default · lg',
          description:
            'At 1x theme scale (--radius = 10px, --spacing = 4px): sm uses 14px radius (rounded-xl) with 16px padding (--spacing(4)); default uses 18px radius (rounded-2xl) with 20px padding (--spacing(5)); lg uses 22px radius (rounded-3xl) with 24px padding (--spacing(6)).',
          code: `import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function CardSizesDemo() {
  return (
    <div className="grid grid-cols-3 gap-4 items-start">
      <Card size="sm" variant="outline">
        <CardHeader>
          <CardTitle>Small (sm)</CardTitle>
          <CardDescription>14px radius · 16px padding</CardDescription>
        </CardHeader>
      </Card>
      <Card size="default" variant="outline">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>18px radius · 20px padding</CardDescription>
        </CardHeader>
      </Card>
      <Card size="lg" variant="outline">
        <CardHeader>
          <CardTitle>Large (lg)</CardTitle>
          <CardDescription>22px radius · 24px padding</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}`,
        },
        {
          title: '4. Interactive Prop & Polymorphic render Support',
          badge: 'Interactive & useRender',
          description:
            'Add interactive to enable hover/active surface & border transitions, cursor-pointer, and an intent-matched focus-visible ring. Compose with render={<a href="..." />} or render={<button />} for native anchor or button semantics.',
          code: `import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function InteractiveCardDemo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card interactive variant="outline" intent="primary" onClick={() => {}}>
        <CardHeader>
          <CardTitle>Interactive Div Card</CardTitle>
          <CardDescription>Focusable with Enter/Space activation</CardDescription>
        </CardHeader>
      </Card>
      <Card interactive variant="default" intent="info" render={<a href="#docs" />}>
        <CardHeader>
          <CardTitle>Polymorphic Link Card</CardTitle>
          <CardDescription>Renders as a native anchor element</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}`,
        },
      ],
      apiReference: [
        {
          name: 'Card',
          type: 'CardProps',
          description:
            'Root card surface supporting variant ("default" | "tint" | "outline" | "ghost"), intent ("neutral" | "primary" | "info" | "success" | "warning" | "danger"), size ("sm" | "default" | "lg"), interactive, and Base UI render.',
        },
        {
          name: 'CardHeader / CardContent / CardFooter',
          type: 'React.ComponentProps<"div">',
          description:
            'Structural layout sections that automatically inherit --card-spacing horizontal padding and corner radii from the parent Card.',
        },
        {
          name: 'CardTitle / CardDescription / CardAction',
          type: 'React.ComponentProps<"div">',
          description:
            'Header sub-slots. CardTitle scales with card size; CardDescription automatically adapts its secondary text token to the parent card intent.',
        },
      ],
    },
  },

  input: {
    id: 'input',
    name: 'Input',
    category: 'Actions & Inputs',
    description:
      'Proportional single-line text and file field supporting default, outline, and ghost variants, 4 size tiers aligned with Button, bi-directional password toggling, and customizable file input labels.',
    baseUiPrimitive: '@base-ui/react/input',
    installCmd: 'npx shadcn@latest add @karan-ui/input',
    registryUrl: 'https://karan-ui.dev/r/input.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'outline' | 'ghost'",
        defaultValue: "'default'",
        description:
          'Visual surface variant (soft filled default, crisp bordered outline, or borderless ghost)',
        options: ['default', 'outline', 'ghost'],
        controlType: 'select',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'default' | 'lg'",
        defaultValue: "'default'",
        description:
          'Proportional height, corner radius, padding, and font size tier matching Button',
        options: ['xs', 'sm', 'default', 'lg'],
        controlType: 'select',
      },
      {
        name: 'type',
        type: "'text' | 'email' | 'password' | 'number' | 'search' | 'file'",
        defaultValue: "'text'",
        description:
          'HTML input type (password enables visibility toggle; file enables custom badge & status labels)',
        options: ['text', 'email', 'password', 'number', 'search', 'file'],
        controlType: 'select',
      },
      {
        name: 'passwordToggle',
        type: 'boolean',
        defaultValue: 'true',
        description:
          'When type="password", renders a trailing toggle button at inline-end to show or hide the password',
        controlType: 'boolean',
      },
      {
        name: 'browseLabel',
        type: 'ReactNode',
        defaultValue: "'Browse'",
        description:
          'When type="file", customizes the Browse trigger button label (pass null or false to hide)',
        controlType: 'text',
      },
      {
        name: 'noFileLabel',
        type: 'ReactNode',
        defaultValue: "'No file selected'",
        description:
          'When type="file", customizes the empty status label when no file is selected',
        controlType: 'text',
      },
      {
        name: 'filesSelectedLabel',
        type: 'string | ((count: number, files: File[]) => ReactNode)',
        defaultValue: "'{count} files selected'",
        description:
          'When type="file" and multiple files are chosen, customizes the count summary label',
        controlType: 'text',
      },
      {
        name: 'fileClearable',
        type: 'boolean',
        defaultValue: 'true',
        description:
          'When type="file", displays a trailing clear button when one or more files are selected',
        controlType: 'boolean',
      },
      {
        name: 'placeholder',
        type: 'string',
        defaultValue: "'Enter your email...'",
        description: 'Placeholder text displayed when empty',
        controlType: 'text',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Whether the input is disabled',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      variant: 'default',
      size: 'default',
      type: 'text',
      passwordToggle: true,
      browseLabel: 'Browse',
      noFileLabel: 'No file selected',
      filesSelectedLabel: '{count} files selected',
      fileClearable: true,
      placeholder: 'Enter your email...',
      disabled: false,
    },
    usageGuide: {
      summary:
        'A single-line text and file input engineered with the same two proportional geometry formulas (R/H ≈ 0.25 and Px ≥ R + 2px) as Button so adjacent inputs and buttons share identical heights and corner radii across xs (24px), sm (28px), default (32px), and lg (36px).',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/input',
        registryUrl: 'https://karan-ui.dev/r/input.json',
      },
      features: [
        {
          title: '1. Surface Variants (Default, Outline & Ghost)',
          badge: '3 Variants',
          description:
            'Input provides three surface variants: "default" (soft interactive fill with hover elevation), "outline" (crisp border matching Button outline), and "ghost" (transparent at rest for inline editing).',
          code: `import { Input } from "@/components/ui/input"

export function InputVariantsDemo() {
  return (
    <div className="flex flex-col gap-3 max-w-xs">
      <Input variant="default" placeholder="Default filled surface" />
      <Input variant="outline" placeholder="Outline bordered surface" />
      <Input variant="ghost" defaultValue="Ghost inline editable" />
    </div>
  )
}`,
        },
        {
          title: '2. 1:1 Size & Corner Parity with Button',
          badge: 'Proportional Geometry',
          description:
            'Every Input size tier (xs: 24px / rounded-md, sm: 28px / rounded-md, default: 32px / rounded-lg, lg: 36px / rounded-lg) matches Button dimensions exactly, whether placed side-by-side or joined inside a ButtonGroup.',
          code: `import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function InputWithButtonDemo() {
  return (
    <div className="flex items-center gap-2">
      <Input size="default" variant="outline" placeholder="Enter your email..." />
      <Button size="default" variant="default">Subscribe</Button>
    </div>
  )
}`,
        },
        {
          title: '3. Bi-Directional Password Show/Hide Toggle',
          badge: 'LTR & RTL Ready',
          description:
            'When type="password", Input automatically renders an accessible trailing toggle button at the logical inline-end (end-1, with pe-* text clearance) using Eye and EyeOff from the local icons package.',
          code: `import { Input } from "@/components/ui/input"

export function PasswordInputDemo() {
  return (
    <div className="flex flex-col gap-3 max-w-xs">
      <Input type="password" variant="outline" placeholder="Enter password..." />
      <Input type="password" variant="outline" passwordToggle={false} placeholder="Without toggle..." />
    </div>
  )
}`,
        },
        {
          title: '4. Proportional File Input with Customizable Labels',
          badge: 'Custom Labels & Concentric Badge',
          description:
            'When type="file", Input renders a vertically centered, concentric inner Browse badge (R_inner = max(R_outer - 4px, 4px)) and status label with full support for customizing browseLabel, noFileLabel, fileSelectedLabel, filesSelectedLabel, and trailing clear action.',
          code: `import { Input } from "@/components/ui/input"

export function FileInputDemo() {
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <Input type="file" variant="outline" />
      <Input
        type="file"
        variant="default"
        multiple
        browseLabel="Choose Archives"
        noFileLabel="Drop or pick .zip bundles..."
        filesSelectedLabel="{count} archives selected"
      />
    </div>
  )
}`,
        },
      ],
      apiReference: [
        {
          name: 'InputProps',
          type: 'Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>',
          description:
            'Accepts variant ("default" | "outline" | "ghost"), size ("xs" | "sm" | "default" | "lg"), passwordToggle (boolean), browseLabel (ReactNode), noFileLabel (ReactNode), fileSelectedLabel ((file: File) => ReactNode), filesSelectedLabel (string | ((count, files) => ReactNode)), fileClearable (boolean), and htmlSize (number).',
        },
        {
          name: 'InputVariant',
          type: "'default' | 'outline' | 'ghost'",
          description: 'Union type representing the three surface emphasis styles.',
        },
        {
          name: 'InputSize',
          type: "'xs' | 'sm' | 'default' | 'lg'",
          description: 'Proportional size tier aligned 1:1 with Button heights and radii.',
        },
      ],
      tips: [
        'Pair Input and Button with the same size prop ("xs" | "sm" | "default" | "lg") for pixel-aligned form rows and toolbars.',
        'Place <Input /> directly inside <ButtonGroup variant="outline" size="sm"> to automatically inherit size, variant, disabled state, and seamless joined borders.',
        'Customize file inputs for any locale or domain using browseLabel, noFileLabel, and filesSelectedLabel.',
      ],
    },
  },

  textarea: {
    id: 'textarea',
    name: 'Textarea',
    category: 'Actions & Inputs',
    description:
      'Auto-expanding multiline text field with default, outline, and ghost variants, 4 size tiers, maxHeight auto-scroll, zero scroll-dimension padding, and dynamic fader effects on scrollable edges.',
    baseUiPrimitive: 'React.ComponentProps<"textarea">',
    installCmd: 'npx shadcn@latest add @karan-ui/textarea',
    registryUrl: 'https://karan-ui.dev/r/textarea.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'outline' | 'ghost'",
        defaultValue: "'default'",
        description:
          'Visual surface variant (soft filled default, bordered outline, or borderless ghost)',
        options: ['default', 'outline', 'ghost'],
        controlType: 'select',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'default' | 'lg'",
        defaultValue: "'default'",
        description:
          'Proportional corner radius, horizontal padding, and typography size tier',
        options: ['xs', 'sm', 'default', 'lg'],
        controlType: 'select',
      },
      {
        name: 'maxHeight',
        type: 'number | string',
        defaultValue: "'110px'",
        description:
          'Maximum height before auto-expanding switches to vertical scroll with top/bottom faders',
        controlType: 'text',
      },
      {
        name: 'placeholder',
        type: 'string',
        defaultValue: "'Type your message...'",
        description: 'Placeholder text when empty',
        controlType: 'text',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disabled state',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      variant: 'default',
      size: 'default',
      maxHeight: '110px',
      placeholder: 'Type your message...',
      disabled: false,
    },
    usageGuide: {
      summary:
        'An auto-sizing multiline textarea that expands naturally with content up to an optional maxHeight, then seamlessly transitions to vertical scrolling with zero scroll-dimension wrapper padding (py-0) and dynamic CSS mask fader effects on whichever vertical edge has scroll.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/textarea',
        registryUrl: 'https://karan-ui.dev/r/textarea.json',
      },
      features: [
        {
          title: '1. Auto-Expand up to maxHeight with Scroll Faders',
          badge: 'Dynamic Fader Mask',
          description:
            'Pass maxHeight (number in px or CSS length string like "120px" or "8rem"). Once content exceeds maxHeight, the textarea automatically scrolls vertically with zero padding on the scroll dimension and smooth top/bottom fader effects on scrollable sides.',
          code: `import { Textarea } from "@/components/ui/textarea"

export function TextareaMaxHeightDemo() {
  return (
    <Textarea
      variant="outline"
      maxHeight={120}
      placeholder="Grows automatically up to 120px, then scrolls with top & bottom fader effects..."
    />
  )
}`,
        },
        {
          title: '2. Surface Variants & Proportional Sizes',
          badge: '3 Variants × 4 Sizes',
          description:
            'Supports default, outline, and ghost variants across xs, sm, default, and lg size tiers to match Input and Button geometry.',
          code: `import { Textarea } from "@/components/ui/textarea"

export function TextareaVariantsDemo() {
  return (
    <div className="flex flex-col gap-3 max-w-md">
      <Textarea variant="default" size="sm" placeholder="Default surface" />
      <Textarea variant="outline" size="default" placeholder="Outline surface" />
      <Textarea variant="ghost" size="lg" placeholder="Ghost inline surface" />
    </div>
  )
}`,
        },
      ],
    },
  },

  switch: {
    id: 'switch',
    name: 'Switch',
    category: 'Actions & Inputs',
    description: 'A control that allows the user to toggle between checked and not checked states.',
    baseUiPrimitive: '@base-ui/react/switch',
    installCmd: 'npx shadcn@latest add @karan-ui/switch',
    registryUrl: 'https://karan-ui.dev/r/switch.json',
    props: [
      {
        name: 'size',
        type: "'default' | 'sm'",
        defaultValue: "'default'",
        description: 'Size of the switch control',
        options: ['default', 'sm'],
        controlType: 'select',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disabled interaction state',
        controlType: 'boolean',
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Initial toggle state',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      size: 'default',
      disabled: false,
      defaultChecked: true,
    },
  },

  slider: {
    id: 'slider',
    name: 'Slider',
    category: 'Actions & Inputs',
    description:
      'Accessible range and single-value slider with synchronized thumb and indicator line movement and optional real-time thumb tooltip.',
    baseUiPrimitive: '@base-ui/react/slider',
    installCmd: 'npx shadcn@latest add @karan-ui/slider',
    registryUrl: 'https://karan-ui.dev/r/slider.json',
    props: [
      {
        name: 'min',
        type: 'number',
        defaultValue: '0',
        description: 'Minimum allowed value',
        controlType: 'number',
      },
      {
        name: 'max',
        type: 'number',
        defaultValue: '100',
        description: 'Maximum allowed value',
        controlType: 'number',
      },
      {
        name: 'step',
        type: 'number',
        defaultValue: '1',
        description: 'Step increment',
        controlType: 'number',
      },
      {
        name: 'tooltip',
        type: 'boolean | string | null',
        defaultValue: 'null',
        description:
          'Hidden by default (null). Pass true (or "true") to show real-time value on thumb, or pass a string to customize the tooltip label.',
        controlType: 'text',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables slider interaction',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      min: 0,
      max: 100,
      step: 1,
      tooltip: null,
      disabled: false,
    },
    usageGuide: {
      summary:
        'Built on @base-ui/react/slider with 1:1 synchronized timing between the thumb and indicator line (instantaneous during dragging, matched cubic-bezier easing on track click/keyboard) and an optional tooltip prop for real-time thumb values and custom labels.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/slider',
        registryUrl: 'https://karan-ui.dev/r/slider.json',
      },
      features: [
        {
          title: '1. Real-Time Thumb Tooltip & Custom Labels',
          badge: 'tooltip Prop',
          description:
            'By default tooltip is null and hidden. Add tooltip (<Slider tooltip />) to display the real-time value above each thumb, or pass a string (<Slider tooltip="Volume" /> or <Slider tooltip="%" />) to customize the tooltip label.',
          code: `import { Slider } from "@/components/ui/slider"

export function SliderTooltipDemo() {
  return (
    <div className="flex flex-col gap-8 max-w-xs pt-4">
      {/* Default: tooltip is null and hidden */}
      <Slider defaultValue={[30]} />

      {/* Boolean tooltip: shows real-time value */}
      <Slider defaultValue={[50]} tooltip />

      {/* String tooltip: customizes tooltip label */}
      <Slider defaultValue={[75]} tooltip="Volume" />
    </div>
  )
}`,
        },
        {
          title: '2. Dual-Thumb Range Slider with Tooltips',
          badge: 'Multi-Thumb Sync',
          description:
            'Pass an array of values to defaultValue or value to render multiple thumbs. Each thumb renders its own real-time tooltip synchronized with the range indicator bar.',
          code: `import { Slider } from "@/components/ui/slider"

export function RangeSliderDemo() {
  return (
    <div className="max-w-xs pt-4">
      <Slider defaultValue={[25, 75]} min={0} max={100} tooltip="$" />
    </div>
  )
}`,
        },
      ],
    },
  },

  progress: {
    id: 'progress',
    name: 'Progress',
    category: 'Feedback & Utilities',
    description: 'Displays an indicator showing the completion progress of a task.',
    baseUiPrimitive: '@base-ui/react/progress',
    installCmd: 'npx shadcn@latest add @karan-ui/progress',
    registryUrl: 'https://karan-ui.dev/r/progress.json',
    props: [
      {
        name: 'value',
        type: 'number',
        defaultValue: '65',
        description: 'The progress completion value from 0 to 100',
        controlType: 'number',
      },
    ],
    defaultProps: {
      value: 65,
    },
  },

  checkbox: {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Actions & Inputs',
    description:
      'Accessible tri-state checkbox with crisp stroke-draw checkmark animation, indeterminate state, and CheckboxGroup parent-child synchronization.',
    baseUiPrimitive: '@base-ui/react/checkbox',
    installCmd: 'npx shadcn@latest add @karan-ui/checkbox',
    registryUrl: 'https://karan-ui.dev/r/checkbox.json',
    props: [
      {
        name: 'defaultChecked',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Initial checked state when uncontrolled',
        controlType: 'boolean',
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        defaultValue: 'false',
        description:
          'Places the checkbox into a mixed/indeterminate state with an animated horizontal bar',
        controlType: 'boolean',
      },
      {
        name: 'parent',
        type: 'boolean',
        defaultValue: 'false',
        description:
          'When used inside CheckboxGroup, links this checkbox as the parent controller (becomes indeterminate when some child checkboxes are off)',
        controlType: 'boolean',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables user interaction',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      defaultChecked: true,
      indeterminate: false,
      disabled: false,
    },
    usageGuide: {
      summary:
        'Built on @base-ui/react/checkbox and @base-ui/react/checkbox-group with keepMounted SVG stroke-dashoffset draw-in animations for both the Check icon and the Indeterminate Minus icon, plus automatic parent indeterminate synchronization in CheckboxGroup.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/checkbox',
        registryUrl: 'https://karan-ui.dev/r/checkbox.json',
      },
      features: [
        {
          title: '1. Animated Check & Indeterminate State',
          badge: 'Stroke-Draw Animation',
          description:
            'Both checked and indeterminate icons stay mounted and animate smoothly using stroke-dashoffset and spring scaling.',
          code: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxStatesDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Label className="flex items-center gap-2.5">
        <Checkbox defaultChecked />
        <span>Checked with stroke-draw animation</span>
      </Label>
      <Label className="flex items-center gap-2.5">
        <Checkbox indeterminate />
        <span>Indeterminate mixed state</span>
      </Label>
    </div>
  )
}`,
        },
        {
          title: '2. CheckboxGroup with Parent Indeterminate State',
          badge: 'Parent-Child Sync',
          description:
            'Place <Checkbox parent /> inside <CheckboxGroup> alongside child <Checkbox value="..." /> items. When some child checkboxes are off, the parent checkbox automatically enters the indeterminate state.',
          code: `import * as React from "react"
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function PermissionsGroupDemo() {
  const [value, setValue] = React.useState(["read", "write"])

  return (
    <CheckboxGroup value={value} onValueChange={setValue}>
      <Label className="flex items-center gap-2.5 font-semibold">
        <Checkbox parent />
        <span>Select all permissions</span>
      </Label>
      <div className="flex flex-col gap-2 ps-5">
        <Label className="flex items-center gap-2.5">
          <Checkbox value="read" />
          <span>Read repository</span>
        </Label>
        <Label className="flex items-center gap-2.5">
          <Checkbox value="write" />
          <span>Write commits</span>
        </Label>
        <Label className="flex items-center gap-2.5">
          <Checkbox value="admin" />
          <span>Administer settings</span>
        </Label>
      </div>
    </CheckboxGroup>
  )
}`,
        },
      ],
    },
  },

  'checkbox-group': {
    id: 'checkbox-group',
    name: 'Checkbox Group',
    category: 'Actions & Inputs',
    description:
      'Coordinates shared state across multiple checkboxes with automatic parent indeterminate state when some child checkboxes are off.',
    baseUiPrimitive: '@base-ui/react/checkbox-group',
    installCmd: 'npx shadcn@latest add @karan-ui/checkbox-group',
    registryUrl: 'https://karan-ui.dev/r/checkbox-group.json',
    props: [
      {
        name: 'orientation',
        type: "'vertical' | 'horizontal'",
        defaultValue: "'vertical'",
        description: 'Layout flow direction of the group',
        options: ['vertical', 'horizontal'],
        controlType: 'select',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables all checkboxes in the group',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      orientation: 'vertical',
      disabled: false,
    },
  },

  'radio-group': {
    id: 'radio-group',
    name: 'Radio Group',
    category: 'Actions & Inputs',
    description: 'A set of checkable buttons—known as radio buttons—where only one can be checked at a time. Supports both standard animated circular radios and arbitrary custom content items.',
    baseUiPrimitive: '@base-ui/react/radio-group',
    installCmd: 'npx shadcn@latest add @karan-ui/radio-group',
    registryUrl: 'https://karan-ui.dev/r/radio-group.json',
    props: [
      {
        name: 'defaultValue',
        type: 'string',
        defaultValue: "'comfortable'",
        description: 'Default selected option value',
        options: ['default', 'comfortable', 'compact'],
        controlType: 'select',
      },
      {
        name: 'orientation',
        type: "'vertical' | 'horizontal'",
        defaultValue: "'vertical'",
        description: 'Layout orientation of the radio group',
        options: ['vertical', 'horizontal'],
        controlType: 'select',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables all radio items in the group',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      defaultValue: 'comfortable',
      orientation: 'vertical',
      disabled: false,
    },
    usageGuide: {
      summary:
        'A polymorphic radio group built on @base-ui/react/radio-group and @base-ui/react/radio. RadioGroupItem automatically renders a standard circular radio button with a scale-and-fade inner dot when empty, or switches to a custom container card when children are passed—with optional <RadioGroupIndicator /> composition anywhere inside.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/radio-group',
        registryUrl: 'https://karan-ui.dev/r/radio-group.json',
      },
      features: [
        {
          title: 'Animated Circular Radio (Default Mode)',
          badge: 'Auto-detected',
          description:
            'When <RadioGroupItem /> has no children, it renders a 16×16 circular radio control with a keepMounted indicator that scales and fades smoothly on selection and deselection.',
          code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

<RadioGroup defaultValue="comfortable">
  <div className="flex items-center gap-2.5">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center gap-2.5">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
</RadioGroup>`,
        },
        {
          title: 'Standalone Custom Content Containers',
          badge: 'Polymorphic',
          description:
            'Pass any children to <RadioGroupItem> to turn the item itself into an interactive card with animated border, ring, and surface tint transitions on selection.',
          code: `<RadioGroup defaultValue="pro" className="grid grid-cols-2 gap-3">
  <RadioGroupItem value="starter" className="flex-col items-start gap-1">
    <span className="text-sm font-medium">Starter</span>
    <span className="text-xs text-neutral-text-subtle">$12/month</span>
  </RadioGroupItem>
  <RadioGroupItem value="pro" className="flex-col items-start gap-1">
    <span className="text-sm font-medium">Performance</span>
    <span className="text-xs text-neutral-text-subtle">$36/month</span>
  </RadioGroupItem>
</RadioGroup>`,
        },
        {
          title: 'Custom Cards with Composable Indicator',
          badge: 'Composable',
          description:
            'Place <RadioGroupIndicator /> anywhere inside a custom <RadioGroupItem> to combine custom card layouts with the animated circular radio indicator.',
          code: `import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupIndicator,
} from "@/components/ui/radio-group"

<RadioGroup defaultValue="express">
  <RadioGroupItem value="express" className="items-start justify-between gap-3">
    <div className="space-y-1">
      <div className="text-sm font-medium">Express Courier</div>
      <div className="text-xs text-neutral-text-subtle">Next-day delivery</div>
    </div>
    <RadioGroupIndicator className="mt-0.5" />
  </RadioGroupItem>
</RadioGroup>`,
        },
      ],
      apiReference: [
        {
          name: 'RadioGroup',
          type: 'RadioGroupProps',
          description: 'Root container managing single-selection state and keyboard navigation. Supports orientation="vertical" | "horizontal".',
        },
        {
          name: 'RadioGroupItem',
          type: 'RadioGroupItemProps',
          description: 'Individual radio item. Renders as a circular radio button when empty, or as a custom selectable container when children are passed.',
        },
        {
          name: 'RadioGroupIndicator',
          type: 'RadioGroupIndicatorProps',
          description: 'Standalone animated circular radio indicator that can be placed anywhere inside a custom RadioGroupItem.',
        },
      ],
    },
  },

  select: {
    id: 'select',
    name: 'Select',
    category: 'Actions & Inputs',
    description:
      'Accessible select menu built on @base-ui/react/select with default, outline, and ghost variants, 4 proportional size tiers matching Button and Input, alignWithItem positioning, dual up/down chevron trigger icon, and OKLCH color-mix translucent popup overlay.',
    baseUiPrimitive: '@base-ui/react/select',
    installCmd: 'npx shadcn@latest add @karan-ui/select',
    registryUrl: 'https://karan-ui.dev/r/select.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'outline' | 'ghost'",
        defaultValue: "'default'",
        description:
          'Visual surface variant (soft filled default, bordered outline, or borderless ghost)',
        options: ['default', 'outline', 'ghost'],
        controlType: 'select',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'default' | 'lg'",
        defaultValue: "'default'",
        description:
          'Proportional height, corner radius, padding, and typography tier matching Button and Input 1:1',
        options: ['xs', 'sm', 'default', 'lg'],
        controlType: 'select',
      },
      {
        name: 'alignWithItem',
        type: 'boolean',
        defaultValue: 'true',
        description:
          'Aligns the selected item in the popup directly over the trigger text (alias for Base UI alignItemWithTrigger). Set false for standard dropdown positioning.',
        controlType: 'boolean',
      },
      {
        name: 'placeholder',
        type: 'string',
        defaultValue: "'Select a timezone...'",
        description: 'Placeholder text displayed when no option is selected',
        controlType: 'text',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables opening and interacting with the select',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      variant: 'default',
      size: 'default',
      alignWithItem: true,
      placeholder: 'Select a timezone...',
      disabled: false,
    },
    usageGuide: {
      summary:
        'Built on @base-ui/react/select with automatic item label extraction (supporting both Base UI’s items map and declarative <SelectItem> children), 3 surface variants (default, outline, ghost), 4 size tiers (xs, sm, default, lg) engineered with the exact R/H ≈ 0.25 corner formula as Button and Input, an alignWithItem prop alias for Base UI’s alignItemWithTrigger, dual up/down chevron trigger indicator, and OKLCH color-mix() overlay translucency.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/select',
        registryUrl: 'https://karan-ui.dev/r/select.json',
      },
      features: [
        {
          title: '1. Surface Variants (Default, Outline & Ghost)',
          badge: '3 Variants',
          description:
            'Pass variant="default" | "outline" | "ghost" on either <Select> or <SelectTrigger>. Uses --color-neutral-interactive* OKLCH color-mix tokens so triggers harmonize automatically on both page backgrounds and tinted cards.',
          code: `import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export function SelectVariantsDemo() {
  return (
    <div className="flex flex-col gap-3 max-w-xs">
      <Select variant="default" defaultValue="next">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Default variant" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="remix">Remix</SelectItem>
        </SelectContent>
      </Select>

      <Select variant="outline" defaultValue="next">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Outline variant" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="remix">Remix</SelectItem>
        </SelectContent>
      </Select>

      <Select variant="ghost" defaultValue="next">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Ghost variant" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="remix">Remix</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}`,
        },
        {
          title: '2. 1:1 Size & Corner Radius Parity with Button and Input',
          badge: 'Proportional Geometry',
          description:
            'Supports size="xs" | "sm" | "default" | "lg" on <Select> or <SelectTrigger>, matching Button and Input heights (24px, 28px, 32px, 36px) and radii (rounded-md for xs/sm, rounded-lg for default/lg).',
          code: `import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function SelectSizeRowDemo() {
  return (
    <div className="flex items-center gap-2">
      <Select size="sm" variant="outline" defaultValue="production">
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="production">Production</SelectItem>
          <SelectItem value="staging">Staging</SelectItem>
        </SelectContent>
      </Select>
      <Button size="sm" variant="default">Deploy</Button>
    </div>
  )
}`,
        },
        {
          title: '3. Item-Aligned vs. Dropdown Positioning (alignWithItem)',
          badge: 'Base UI Positioner Alias',
          description:
            'Pass alignWithItem (alias for Base UI’s alignItemWithTrigger) on <Select> or <SelectContent>. When true (default), the popup overlaps the trigger so the active item text aligns with the trigger text; when false, it opens below/above the trigger with sideOffset.',
          code: `<Select alignWithItem={false} defaultValue="utc">
  <SelectTrigger className="w-52">
    <SelectValue placeholder="Select timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
    <SelectItem value="est">Eastern Time (EST)</SelectItem>
    <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
  </SelectContent>
</Select>`,
        },
        {
          title: '4. Native Base UI items Prop & Auto-Extracted JSX Labels',
          badge: '@base-ui/react/select',
          description:
            'In Base UI, Select.Root uses an items map to resolve selected labels before the portal mounts. Karan UI automatically extracts value-to-label mappings from <SelectItem> children AND supports passing Base UI’s items prop directly.',
          code: `const environments = {
  prod: "Production (us-east-1)",
  stage: "Staging (eu-central-1)",
  dev: "Development (local)",
}

<Select items={environments} defaultValue="prod">
  <SelectTrigger className="w-60">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {Object.entries(environments).map(([value, label]) => (
      <SelectItem key={value} value={value}>
        {label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>`,
        },
      ],
      apiReference: [
        {
          name: 'Select',
          type: 'SelectProps<Value, Multiple>',
          description:
            'Root component wrapping @base-ui/react/select Select.Root. Accepts variant, size, alignWithItem, placeholder, items, value, defaultValue, onValueChange, and disabled.',
        },
        {
          name: 'SelectTrigger',
          type: 'SelectTriggerProps',
          description:
            'Combobox button trigger with ChevronsUpDown icon indicator. Inherits variant, size, and disabled from SelectContext or ButtonGroupContext.',
        },
        {
          name: 'SelectContent',
          type: 'SelectContentProps',
          description:
            'Portaled Positioner + Popup + ScrollArrows + List container with OKLCH color-mix translucent surface and concentric corner radius.',
        },
        {
          name: 'SelectItem',
          type: 'SelectPrimitive.Item.Props',
          description:
            'Selectable option item with ItemText and trailing Check indicator.',
        },
      ],
    },
  },

  dialog: {
    id: 'dialog',
    name: 'Dialog',
    category: 'Overlays & Dialogs',
    description:
      'A borderless modal window overlaid on the primary viewport with shadcn animations, size-driven density and paddings, and header-docked DialogClose.',
    baseUiPrimitive: '@base-ui/react/dialog',
    installCmd: 'npx shadcn@latest add @karan-ui/dialog',
    registryUrl: 'https://karan-ui.dev/r/dialog.json',
    props: [
      {
        name: 'size',
        type: "'sm' | 'default' | 'lg' | 'xl' | 'full'",
        defaultValue: "'default'",
        description:
          'Proportional scale controlling modal width, internal padding, density, and typography',
        options: ['sm', 'default', 'lg', 'xl', 'full'],
        controlType: 'select',
      },
      {
        name: 'showCloseButton',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Whether to show the top-right icon close button',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      size: 'default',
      showCloseButton: true,
    },
    usageGuide: {
      summary:
        'Built directly on @base-ui/react/dialog featuring a clean borderless elevated surface with soft shadow, duration-200 shadcn-matching zoom/fade animations, built-in top-right icon close button, and size-responsive padding and density scaling.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/dialog',
        registryUrl: 'https://karan-ui.dev/r/dialog.json',
      },
      features: [
        {
          title: 'Structured Slot Architecture',
          badge: 'Semantic Layout',
          description:
            'Organize modal content using DialogHeader, DialogTitle, DialogDescription, DialogBody (with built-in overflow scrolling), and DialogFooter.',
          code: `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open Dialog</Button>} />
      <DialogContent size="default">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your account details and display preferences.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-neutral-text-muted">Form fields go here...</p>
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
        },
        {
          title: 'Size-Driven Padding & Density Scaling',
          badge: 'Proportional Density',
          description:
            'The size prop (sm, default, lg, xl, full) automatically harmonizes container width, internal padding (p-4 to p-10), gap density, and title typography scale.',
        },
        {
          title: 'Responsive Desktop Dialog / Mobile Drawer Pattern',
          badge: 'Responsive UX',
          description:
            'Pair with Drawer to render an elevated centered modal on desktop viewports and an authentic swipeable bottom sheet on mobile screens.',
        },
      ],
    },
  },

  'alert-dialog': {
    id: 'alert-dialog',
    name: 'Alert Dialog',
    category: 'Overlays & Dialogs',
    description:
      'A borderless interruptive confirmation modal with start-aligned header layout, shadcn animations, and Dialog-matching padding density.',
    baseUiPrimitive: '@base-ui/react/alert-dialog',
    installCmd: 'npx shadcn@latest add @karan-ui/alert-dialog',
    registryUrl: 'https://karan-ui.dev/r/alert-dialog.json',
    props: [
      {
        name: 'size',
        type: "'sm' | 'default' | 'lg' | 'xl' | 'full'",
        defaultValue: "'default'",
        description:
          'Proportional scale controlling modal width, internal padding, density, and typography',
        options: ['sm', 'default', 'lg', 'xl', 'full'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      size: 'default',
    },
    usageGuide: {
      summary:
        'Built on @base-ui/react/alert-dialog with clean borderless elevated surface, strict start-aligned layout, size-driven padding matching Dialog, 200ms shadcn animations, and accessible focus trap guarantees.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/alert-dialog',
        registryUrl: 'https://karan-ui.dev/r/alert-dialog.json',
      },
      features: [
        {
          title: 'Semantic Destructive Actions',
          badge: 'Safety First',
          description:
            'AlertDialogAction accepts an intent prop (defaults to danger) to immediately signal risk to the user using the OKLCH token scale.',
          code: `import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button intent="danger">Delete Workspace</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction intent="danger">Confirm Deletion</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
        },
      ],
    },
  },

  sheet: {
    id: 'sheet',
    name: 'Sheet',
    category: 'Overlays & Dialogs',
    description:
      'A side-sliding panel on any viewport edge with gesture touch physics and default floating card mode.',
    baseUiPrimitive: '@base-ui/react/drawer',
    installCmd: 'npx shadcn@latest add @karan-ui/sheet',
    registryUrl: 'https://karan-ui.dev/r/sheet.json',
    props: [
      {
        name: 'side',
        type: "'right' | 'left' | 'top' | 'bottom' | 'start' | 'end'",
        defaultValue: "'right'",
        description: 'Viewport edge from which the sheet enters',
        options: ['right', 'left', 'top', 'bottom', 'start', 'end'],
        controlType: 'select',
      },
      {
        name: 'floating',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Renders as a detached floating card with perimeter margins and rounded corners',
        controlType: 'boolean',
      },
      {
        name: 'size',
        type: "'sm' | 'default' | 'lg' | 'xl' | 'full'",
        defaultValue: "'default'",
        description: 'Width scale for side sheets or height scale for vertical sheets',
        options: ['sm', 'default', 'lg', 'xl', 'full'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      side: 'right',
      floating: true,
      size: 'default',
    },
    usageGuide: {
      summary:
        'Unified with Drawer on @base-ui/react/drawer to give side sheets full gesture drag physics, velocity-based dismissal, and floating card mode without ad-hoc CSS tweaks.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/sheet',
        registryUrl: 'https://karan-ui.dev/r/sheet.json',
      },
      features: [
        {
          title: 'Floating Mode by Default',
          badge: 'Floating Islands',
          description:
            'floating={true} renders an elevated card detached from screen edges with rounded-2xl corners and soft borders. Set floating={false} for traditional edge-to-edge flush styling.',
          code: `import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function SheetDemo() {
  return (
    <Sheet side="right" floating={true}>
      <SheetTrigger render={<Button variant="outline">Open Navigation</Button>} />
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Explore project directories and components.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p className="text-sm text-neutral-text-muted">Navigation items...</p>
        </SheetBody>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}`,
        },
      ],
    },
  },

  drawer: {
    id: 'drawer',
    name: 'Drawer',
    category: 'Overlays & Dialogs',
    description:
      'A touch-friendly sliding drawer with authentic gesture physics, drag-to-dismiss handle, and floating card mode built on Base UI.',
    baseUiPrimitive: '@base-ui/react/drawer',
    installCmd: 'npx shadcn@latest add @karan-ui/drawer',
    registryUrl: 'https://karan-ui.dev/r/drawer.json',
    props: [
      {
        name: 'side',
        type: "'bottom' | 'top' | 'left' | 'right' | 'start' | 'end'",
        defaultValue: "'bottom'",
        description: 'Edge of the screen where the drawer anchors',
        options: ['bottom', 'top', 'left', 'right', 'start', 'end'],
        controlType: 'select',
      },
      {
        name: 'floating',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Renders the drawer panel as a floating island with perimeter margin',
        controlType: 'boolean',
      },
      {
        name: 'showSwipeHandle',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Whether to render the tactile pill grab handle at the drawer edge',
        controlType: 'boolean',
      },
      {
        name: 'size',
        type: "'sm' | 'default' | 'lg' | 'xl' | 'full'",
        defaultValue: "'default'",
        description: 'Height or width dimension tier',
        options: ['sm', 'default', 'lg', 'xl', 'full'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      side: 'bottom',
      floating: true,
      showSwipeHandle: true,
      size: 'default',
    },
    usageGuide: {
      summary:
        'Native Base UI drawer primitive delivering iOS-quality spring motion, touch and mouse swipe dismissal, and full LTR/RTL support without third-party heavy dependencies.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/drawer',
        registryUrl: 'https://karan-ui.dev/r/drawer.json',
      },
      features: [
        {
          title: 'Tactile Gesture Drag Dismissal',
          badge: 'Touch Native',
          description:
            'Users can swipe down (or in the reverse direction of the anchor) to flick-dismiss the drawer with velocity sensing.',
        },
      ],
    },
  },

  popover: {
    id: 'popover',
    name: 'Popover',
    category: 'Overlays & Dialogs',
    description:
      'An anchored floating content card with collision detection, arrow pointer, and soft elevation shadow.',
    baseUiPrimitive: '@base-ui/react/popover',
    installCmd: 'npx shadcn@latest add @karan-ui/popover',
    registryUrl: 'https://karan-ui.dev/r/popover.json',
    props: [
      {
        name: 'size',
        type: "'sm' | 'default' | 'lg'",
        defaultValue: "'default'",
        description: 'Width and padding dimension scale',
        options: ['sm', 'default', 'lg'],
        controlType: 'select',
      },
      {
        name: 'withArrow',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Whether to render an aligned arrow pointer to the trigger element',
        controlType: 'boolean',
      },
      {
        name: 'side',
        type: "'top' | 'right' | 'bottom' | 'left'",
        defaultValue: "'bottom'",
        description: 'Preferred placement edge relative to trigger',
        options: ['top', 'right', 'bottom', 'left'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      size: 'default',
      withArrow: false,
      side: 'bottom',
    },
    usageGuide: {
      summary:
        'Floating card built on @base-ui/react/popover with smart anchor positioning, collision avoidance, and balanced OKLCH contrast.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/popover',
        registryUrl: 'https://karan-ui.dev/r/popover.json',
      },
      features: [
        {
          title: 'Elevation-First Surface',
          badge: 'Visual Clarity',
          description:
            'Clean borderless popup surface elevated purely by shadow-xl against the page backdrop for low visual fatigue.',
        },
      ],
    },
  },

  tooltip: {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Overlays & Dialogs',
    description:
      'Fast hover and keyboard focus micro-popup rendered in an inverted high-contrast pill with arrow support.',
    baseUiPrimitive: '@base-ui/react/tooltip',
    installCmd: 'npx shadcn@latest add @karan-ui/tooltip',
    registryUrl: 'https://karan-ui.dev/r/tooltip.json',
    props: [
      {
        name: 'side',
        type: "'top' | 'right' | 'bottom' | 'left'",
        defaultValue: "'top'",
        description: 'Preferred placement side',
        options: ['top', 'right', 'bottom', 'left'],
        controlType: 'select',
      },
      {
        name: 'withArrow',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Whether to render the pointer arrow toward the trigger',
        controlType: 'boolean',
      },
      {
        name: 'sideOffset',
        type: 'number',
        defaultValue: '6',
        description: 'Pixel offset between trigger and tooltip popup',
        controlType: 'number',
      },
    ],
    defaultProps: {
      side: 'top',
      withArrow: true,
      sideOffset: 6,
    },
    usageGuide: {
      summary:
        'Always rendered in inverted high-contrast (bg-neutral-text text-neutral-surface) with a 150ms cubic-bezier transition, Base UI TooltipProvider delay coordination, and arrow support.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/tooltip',
        registryUrl: 'https://karan-ui.dev/r/tooltip.json',
      },
      features: [
        {
          title: 'Accessible Hover & Keyboard Focus',
          badge: 'WCAG AAA',
          description:
            'Guarantees accessible tooltip behavior across both mouse pointer hover and keyboard tab navigation.',
        },
      ],
    },
  },

  'dropdown-menu': {
    id: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Navigation & Menus',
    description: 'Displays a menu to the user—such as a set of actions or functions—triggered by a button.',
    baseUiPrimitive: '@base-ui/react/menu',
    installCmd: 'npx shadcn@latest add @karan-ui/dropdown-menu',
    registryUrl: 'https://karan-ui.dev/r/dropdown-menu.json',
    props: [
      {
        name: 'align',
        type: "'start' | 'center' | 'end'",
        defaultValue: "'start'",
        description: 'Menu alignment relative to trigger',
        options: ['start', 'center', 'end'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      align: 'start',
    },
  },

  'context-menu': {
    id: 'context-menu',
    name: 'Context Menu',
    category: 'Navigation & Menus',
    description: 'Displays a menu located at the pointer coordinates triggered by right-click.',
    baseUiPrimitive: '@base-ui/react/context-menu',
    installCmd: 'npx shadcn@latest add @karan-ui/context-menu',
    registryUrl: 'https://karan-ui.dev/r/context-menu.json',
    props: [],
    defaultProps: {},
  },

  menubar: {
    id: 'menubar',
    name: 'Menubar',
    category: 'Navigation & Menus',
    description: 'A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.',
    baseUiPrimitive: '@base-ui/react/menubar',
    installCmd: 'npx shadcn@latest add @karan-ui/menubar',
    registryUrl: 'https://karan-ui.dev/r/menubar.json',
    props: [],
    defaultProps: {},
  },

  'navigation-menu': {
    id: 'navigation-menu',
    name: 'Navigation Menu',
    category: 'Navigation & Menus',
    description: 'A collection of links for navigating websites with animated viewports and flyout content.',
    baseUiPrimitive: '@base-ui/react/navigation-menu',
    installCmd: 'npx shadcn@latest add @karan-ui/navigation-menu',
    registryUrl: 'https://karan-ui.dev/r/navigation-menu.json',
    props: [],
    defaultProps: {},
  },

  tabs: {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation & Menus',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    baseUiPrimitive: '@base-ui/react/tabs',
    installCmd: 'npx shadcn@latest add @karan-ui/tabs',
    registryUrl: 'https://karan-ui.dev/r/tabs.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'line'",
        defaultValue: "'default'",
        description: 'The tabs list styling appearance',
        options: ['default', 'line'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      variant: 'default',
    },
  },

  accordion: {
    id: 'accordion',
    name: 'Accordion',
    category: 'Data Display & Layout',
    description: 'A vertically stacked set of interactive headings that each reveal a section of content.',
    baseUiPrimitive: '@base-ui/react/accordion',
    installCmd: 'npx shadcn@latest add @karan-ui/accordion',
    registryUrl: 'https://karan-ui.dev/r/accordion.json',
    props: [],
    defaultProps: {},
  },

  collapsible: {
    id: 'collapsible',
    name: 'Collapsible',
    category: 'Data Display & Layout',
    description: 'An interactive component which expands/collapses a panel.',
    baseUiPrimitive: '@base-ui/react/collapsible',
    installCmd: 'npx shadcn@latest add @karan-ui/collapsible',
    registryUrl: 'https://karan-ui.dev/r/collapsible.json',
    props: [],
    defaultProps: {},
  },

  'collapsible-section': {
    id: 'collapsible-section',
    name: 'Collapsible Section',
    category: 'Data Display & Layout',
    description:
      'A collapsible section featuring a full-width trigger row (with children as the label and a dedicated rotating chevron at the end of the row) and a content div below it.',
    baseUiPrimitive: '@base-ui/react/collapsible',
    installCmd: 'npx shadcn@latest add @karan-ui/collapsible-section',
    registryUrl: 'https://karan-ui.dev/r/collapsible-section.json',
    props: [
      {
        name: 'defaultOpen',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Whether the collapsible section is initially expanded',
        controlType: 'boolean',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables toggling the collapsible section',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      defaultOpen: true,
      disabled: false,
    },
    usageGuide: {
      summary:
        'Built on @base-ui/react/collapsible. CollapsibleSectionTrigger renders a full-width row with children as the label and a dedicated rotating ChevronDown icon at the end of the row, while CollapsibleSectionContent smoothly animates the content div below it.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/collapsible-section',
        registryUrl: 'https://karan-ui.dev/r/collapsible-section.json',
      },
      features: [
        {
          title: 'Trigger Row + Content Div Below',
          badge: 'Standard Pattern',
          description:
            'Pass label content as children to <CollapsibleSectionTrigger>—it renders in a full-width row with a dedicated trailing chevron that rotates 180° when expanded, followed by <CollapsibleSectionContent> rendering the content div below it.',
          code: `import {
  CollapsibleSection,
  CollapsibleSectionTrigger,
  CollapsibleSectionContent,
} from "@/components/ui/collapsible-section"

<CollapsibleSection defaultOpen>
  <CollapsibleSectionTrigger>Section Title</CollapsibleSectionTrigger>
  <CollapsibleSectionContent>
    <p>Collapsible section content displayed in a div below the trigger row.</p>
  </CollapsibleSectionContent>
</CollapsibleSection>`,
        },
        {
          title: 'Shorthand Label Prop',
          badge: 'Shorthand',
          description:
            'Pass a label (or title) prop directly to <CollapsibleSection> to automatically render the trigger row and wrap children inside the content div below it.',
          code: `import { CollapsibleSection } from "@/components/ui/collapsible-section"

<CollapsibleSection label="Environment Variables" defaultOpen>
  <div className="space-y-1.5">
    <div>NODE_ENV=production</div>
    <div>PORT=3000</div>
  </div>
</CollapsibleSection>`,
        },
      ],
      apiReference: [
        {
          name: 'CollapsibleSection',
          type: 'CollapsibleSectionProps',
          description: 'Root collapsible section container (flex-col). Accepts open, defaultOpen, onOpenChange, disabled, and optional shorthand label/title.',
        },
        {
          name: 'CollapsibleSectionTrigger',
          type: 'CollapsibleSectionTriggerProps',
          description: 'Full-width trigger row rendering children as the start-aligned label and a dedicated rotating ChevronDown at the end of the row.',
        },
        {
          name: 'CollapsibleSectionContent',
          type: 'CollapsibleSectionContentProps',
          description: 'Animated panel that expands/collapses using --collapsible-panel-height and renders a content div below the trigger row.',
        },
      ],
    },
  },

  breadcrumb: {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Navigation & Menus',
    description: 'Displays the path to the current resource using a hierarchy of links.',
    baseUiPrimitive: 'React.ComponentProps<"nav">',
    installCmd: 'npx shadcn@latest add @karan-ui/breadcrumb',
    registryUrl: 'https://karan-ui.dev/r/breadcrumb.json',
    props: [],
    defaultProps: {},
  },

  pagination: {
    id: 'pagination',
    name: 'Pagination',
    category: 'Navigation & Menus',
    description: 'Pagination with page navigation buttons, ellipsis, and next/prev controls.',
    baseUiPrimitive: 'React.ComponentProps<"nav">',
    installCmd: 'npx shadcn@latest add @karan-ui/pagination',
    registryUrl: 'https://karan-ui.dev/r/pagination.json',
    props: [],
    defaultProps: {},
  },

  table: {
    id: 'table',
    name: 'Table',
    category: 'Data Display & Layout',
    description: 'A responsive table component with rounded header, body, footer, and caption slots.',
    baseUiPrimitive: 'React.ComponentProps<"table">',
    installCmd: 'npx shadcn@latest add @karan-ui/table',
    registryUrl: 'https://karan-ui.dev/r/table.json',
    props: [],
    defaultProps: {},
  },

  avatar: {
    id: 'avatar',
    name: 'Avatar',
    category: 'Data Display & Layout',
    description: 'An image element with a fallback for representing the user, with group and badge support.',
    baseUiPrimitive: '@base-ui/react/avatar',
    installCmd: 'npx shadcn@latest add @karan-ui/avatar',
    registryUrl: 'https://karan-ui.dev/r/avatar.json',
    props: [
      {
        name: 'size',
        type: "'sm' | 'default' | 'lg'",
        defaultValue: "'default'",
        description: 'Diameter dimension size',
        options: ['sm', 'default', 'lg'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      size: 'default',
    },
  },

  alert: {
    id: 'alert',
    name: 'Alert',
    category: 'Feedback & Utilities',
    description: 'Displays a callout for user attention with icons, title, and description.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/alert',
    registryUrl: 'https://karan-ui.dev/r/alert.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'destructive'",
        defaultValue: "'default'",
        description: 'Alert intent variant',
        options: ['default', 'destructive'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      variant: 'default',
    },
  },

  separator: {
    id: 'separator',
    name: 'Separator',
    category: 'Feedback & Utilities',
    description: 'Visually or semantically separates content with horizontal or vertical orientation.',
    baseUiPrimitive: '@base-ui/react/separator',
    installCmd: 'npx shadcn@latest add @karan-ui/separator',
    registryUrl: 'https://karan-ui.dev/r/separator.json',
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'Separator line direction',
        options: ['horizontal', 'vertical'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      orientation: 'horizontal',
    },
  },

  skeleton: {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'Feedback & Utilities',
    description: 'Used to show a placeholder while content is loading with soft pulse animation.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/skeleton',
    registryUrl: 'https://karan-ui.dev/r/skeleton.json',
    props: [],
    defaultProps: {},
  },

  kbd: {
    id: 'kbd',
    name: 'Kbd',
    category: 'Feedback & Utilities',
    description: 'Displays keyboard keys and shortcut combinations with pill border styling.',
    baseUiPrimitive: 'React.ComponentProps<"kbd">',
    installCmd: 'npx shadcn@latest add @karan-ui/kbd',
    registryUrl: 'https://karan-ui.dev/r/kbd.json',
    props: [],
    defaultProps: {},
  },

  label: {
    id: 'label',
    name: 'Label',
    category: 'Feedback & Utilities',
    description: 'Renders an accessible label associated with form controls.',
    baseUiPrimitive: 'React.ComponentProps<"label">',
    installCmd: 'npx shadcn@latest add @karan-ui/label',
    registryUrl: 'https://karan-ui.dev/r/label.json',
    props: [],
    defaultProps: {},
  },

  field: {
    id: 'field',
    name: 'Field',
    category: 'Actions & Inputs',
    description:
      'Form control wrapper orchestrating label, optional subtitle description, interactive input, and bottom caption with multi-intent feedback and optical vertical symmetry.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/field',
    registryUrl: 'https://karan-ui.dev/r/field.json',
    props: [
      {
        name: 'orientation',
        type: "'vertical' | 'horizontal' | 'responsive'",
        defaultValue: "'vertical'",
        description: 'Layout direction of label, control, and supporting text',
        options: ['vertical', 'horizontal', 'responsive'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      orientation: 'vertical',
    },
    usageGuide: {
      summary:
        'Structured form field system adhering to strict vertical optical rhythm. Positions optional FieldDescription directly beneath FieldLabel with 1 step reduced visual load (text-xs text-neutral-text-muted), positions FieldCaption directly beneath the input control, and enforces symmetric 8px spacing both above and below the control.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/field',
        registryUrl: 'https://karan-ui.dev/r/field.json',
      },
      features: [
        {
          title: '1. Structured Label & Subtitle Description Hierarchy',
          badge: '1-Step Less Visual Load',
          description:
            '<FieldDescription> sits directly beneath <FieldLabel> above the input with 1 step reduced visual weight (12px text-xs, normal font weight, and muted contrast), providing contextual guidance without competing with the primary label.',
          code: `<Field>
  <FieldLabel htmlFor="workspace-email">Work Email</FieldLabel>
  <FieldDescription>Used for corporate SSO and billing invoices.</FieldDescription>
  <Input id="workspace-email" type="email" placeholder="alex@company.com" />
  <FieldCaption>Must be an active corporate domain.</FieldCaption>
</Field>`,
        },
        {
          title: '2. Symmetric Optical Spacing Above and Below Input',
          badge: '8px Uniform Rhythm',
          description:
            'Harmonizes vertical spacing so the gap between the header (label/description) and input exactly equals the gap between input and footer (caption). Eliminates awkward bottom gap inflation.',
          code: `<Field>
  <FieldLabel htmlFor="project-slug">Project Slug</FieldLabel>
  <Input id="project-slug" defaultValue="karan-craft" />
  <FieldCaption>Only lowercase letters, numbers, and dashes.</FieldCaption>
</Field>`,
        },
        {
          title: '3. Unified FieldCaption with Intent Feedback',
          badge: 'Multi-Intent & Validation',
          description:
            'Single unified footer element under the input supporting intents ("neutral", "danger", "success", "warning", "info", "primary"). Eliminates duplicate stacked elements and automatically handles role="alert" when intent="danger" or validation errors are present.',
          code: `<FieldSet>
  <FieldLegend>Security Credentials</FieldLegend>
  <FieldGroup className="gap-4">
    <Field>
      <FieldLabel htmlFor="user-pass">Password</FieldLabel>
      <FieldDescription>Minimum 8 characters with at least one symbol.</FieldDescription>
      <Input id="user-pass" type="password" aria-invalid="true" />
      <FieldCaption intent="danger">Password must include at least one special character.</FieldCaption>
    </Field>
  </FieldGroup>
</FieldSet>`,
        },
      ],
      apiReference: [
        {
          name: 'Field',
          type: 'React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>',
          description:
            'Root container managing field role="group", orientation ("vertical" | "horizontal" | "responsive"), and vertical 8px spacing rhythm.',
        },
        {
          name: 'FieldLabel',
          type: 'React.ComponentProps<typeof Label>',
          description:
            'Primary label styled with 14px text-sm, medium weight, and neutral primary text contrast.',
        },
        {
          name: 'FieldDescription',
          type: 'React.ComponentProps<"p">',
          description:
            'Supporting subtitle positioned under FieldLabel and above the input with 1 step less visual load (12px text-xs, muted color).',
        },
        {
          name: 'FieldCaption',
          type: 'React.ComponentProps<"div"> & VariantProps<typeof fieldCaptionVariants> & { errors?: Array<{ message?: string }> }',
          description:
            'Unified bottom feedback element positioned directly under the input control. Supports intent ("neutral" | "danger" | "success" | "warning" | "info" | "primary") and array-based error lists with automatic role="alert" accessibility.',
        },
        {
          name: 'FormCaption',
          type: 'typeof FieldCaption',
          description: 'Convenience alias for FieldCaption.',
        },
        {
          name: 'FieldContent',
          type: 'React.ComponentProps<"div">',
          description:
            'Flex container grouping controls and captions in horizontal or responsive field layouts.',
        },
        {
          name: 'FieldSet',
          type: 'React.ComponentProps<"fieldset">',
          description: 'Semantic <fieldset> wrapper for related fields.',
        },
        {
          name: 'FieldLegend',
          type: 'React.ComponentProps<"legend"> & { variant?: "legend" | "label" }',
          description: 'Legend heading for a FieldSet group.',
        },
        {
          name: 'FieldGroup',
          type: 'React.ComponentProps<"div">',
          description: 'Container for grouping multiple Fields with consistent form rhythm.',
        },
      ],
    },
  },

  item: {
    id: 'item',
    name: 'Item',
    category: 'Data Display & Layout',
    description: 'A flexible list item component for menus, cards, and activity feeds.',
    baseUiPrimitive: '@base-ui/react/use-render',
    installCmd: 'npx shadcn@latest add @karan-ui/item',
    registryUrl: 'https://karan-ui.dev/r/item.json',
    props: [],
    defaultProps: {},
  },

  empty: {
    id: 'empty',
    name: 'Empty',
    category: 'Data Display & Layout',
    description: 'Displays a friendly empty state when no content or results exist.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/empty',
    registryUrl: 'https://karan-ui.dev/r/empty.json',
    props: [],
    defaultProps: {},
  },

  'button-group': {
    id: 'button-group',
    name: 'Button Group',
    category: 'Actions & Inputs',
    description:
      'Groups related buttons into a contiguous segmented bar or a spaced toolbar with shared variant, intent, size, and bi-directional (LTR/RTL) corner geometry.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/button-group',
    registryUrl: 'https://karan-ui.dev/r/button-group.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'outline' | 'ghost' | 'link'",
        defaultValue: "'outline'",
        description:
          'Shared visual style passed via ButtonGroupContext to all child buttons unless overridden on an individual button.',
        options: ['default', 'secondary', 'outline', 'ghost', 'link'],
        controlType: 'select',
      },
      {
        name: 'intent',
        type: "'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'",
        defaultValue: "'neutral'",
        description:
          'Shared semantic color intent inherited by child buttons unless overridden locally.',
        options: ['neutral', 'primary', 'success', 'warning', 'danger', 'info'],
        controlType: 'select',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'default' | 'lg'",
        defaultValue: "'default'",
        description:
          'Shared size scale inherited by child Button and ButtonGroupText elements.',
        options: ['xs', 'sm', 'default', 'lg'],
        controlType: 'select',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'Layout axis of the button group.',
        options: ['horizontal', 'vertical'],
        controlType: 'select',
      },
      {
        name: 'attached',
        type: 'boolean',
        defaultValue: 'true',
        description:
          'When true, joins buttons into a single bar with collapsed inner corners and shared seams. When false, renders a spaced toolbar cluster.',
        controlType: 'boolean',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables all child buttons in the group via context.',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      variant: 'outline',
      intent: 'neutral',
      size: 'default',
      orientation: 'horizontal',
      attached: true,
      disabled: false,
    },
    usageGuide: {
      summary:
        'ButtonGroup coordinates multiple Button, ButtonGroupText, and ButtonGroupSeparator elements as a cohesive unit. It provides a React context (ButtonGroupContext) so shared props (variant, intent, size, disabled) only need to be declared once on the parent group, and uses CSS logical properties (start/end) so corner radii and border overlaps adapt automatically to both LTR and RTL page directions.',
      install: {
        cli: 'npx shadcn@latest add https://karan-ui.dev/r/button-group.json',
        registryUrl: 'https://karan-ui.dev/r/button-group.json',
      },
      features: [
        {
          title: 'Shared Group Context (Variant, Intent, Size, Disabled)',
          badge: 'Context',
          description:
            'Pass variant, intent, size, or disabled once on <ButtonGroup>. All child <Button> and <ButtonGroupText> elements automatically inherit those values via ButtonGroupContext while still allowing individual overrides.',
          code: `<ButtonGroup variant="outline" intent="neutral" size="default">
  <Button leading={<Copy />}>Copy</Button>
  <Button leading={<Share2 />}>Share</Button>
  <Button leading={<Download />}>Export</Button>
</ButtonGroup>`,
        },
        {
          title: 'Variant-Aware Seam Handling & Ghost Rule',
          badge: 'Borders & Seams',
          description:
            'In attached mode, outline buttons overlap adjacent borders (-ms-px / -mt-px) so there is never a double 2px border; default and secondary buttons render a subtle 1px seam divider; and ghost / link buttons render flush with no border or separator.',
          code: `{/* Filled split button with 1px translucent seam */}
<ButtonGroup variant="default" intent="primary">
  <Button leading={<Rocket />}>Publish Registry</Button>
  <Button size="icon" aria-label="More options">
    <ChevronDown />
  </Button>
</ButtonGroup>

{/* Ghost toolbar — no borders or separators between buttons */}
<ButtonGroup variant="ghost">
  <Button size="icon" aria-label="Bold"><Bold /></Button>
  <Button size="icon" aria-label="Italic"><Italic /></Button>
  <Button size="icon" aria-label="Underline"><Underline /></Button>
</ButtonGroup>`,
        },
        {
          title: 'Attached vs. Separated Toolbar Mode',
          badge: 'Layout',
          description:
            'Set attached (default: true) for a joined segmented bar with collapsed inner corners, or attached={false} for a spaced toolbar cluster where each button retains all four rounded corners with size-proportional gap.',
          code: `<ButtonGroup attached={false} variant="outline" size="sm">
  <Button leading={<Layers />}>Layers</Button>
  <Button leading={<Copy />}>Duplicate</Button>
  <Button leading={<Share2 />}>Share</Button>
</ButtonGroup>`,
        },
        {
          title: 'Size-Matched ButtonGroupText & Separator',
          badge: 'Addons',
          description:
            'ButtonGroupText automatically inherits the group size (xs, sm, default, lg) to match the exact height, corner radius, horizontal padding, and icon sizing of sibling buttons. ButtonGroupSeparator automatically orients perpendicular to the group.',
          code: `<ButtonGroup variant="outline" size="default">
  <ButtonGroupText>
    <GitBranch />
    Branch
  </ButtonGroupText>
  <Button>main</Button>
  <Button size="icon" aria-label="Switch branch">
    <ChevronDown />
  </Button>
</ButtonGroup>`,
        },
        {
          title: 'Bi-Directional (LTR & RTL) Logical Geometry',
          badge: 'RTL Ready',
          description:
            'All corner flattening and border overlaps use logical CSS properties (rounded-s-none, rounded-e-none, -ms-px, border-s-*) so groups automatically mirror in dir="rtl" containers without any extra classes.',
          code: `<div dir="rtl">
  <ButtonGroup variant="outline">
    <ButtonGroupText>منطقه</ButtonGroupText>
    <Button>اروپا</Button>
    <Button>آسیا</Button>
  </ButtonGroup>
</div>`,
        },
      ],
      apiReference: [
        {
          name: 'ButtonGroup',
          type: 'ButtonGroupProps',
          description:
            'Root group container (role="group") providing ButtonGroupContext and managing horizontal/vertical attached or separated layout.',
        },
        {
          name: 'ButtonGroupText',
          type: 'ButtonGroupTextProps',
          description:
            'Non-interactive text/icon label addon that inherits size from ButtonGroupContext and matches sibling button dimensions.',
        },
        {
          name: 'ButtonGroupSeparator',
          type: 'React.ComponentProps<typeof Separator>',
          description:
            '1px divider that automatically defaults to vertical in horizontal groups and horizontal in vertical groups.',
        },
      ],
      tips: [
        'Declare shared variant, intent, and size on <ButtonGroup> rather than repeating them on every child <Button>.',
        'Match icon-only split triggers to the group size (icon-xs with xs, icon-sm with sm, icon with default, icon-lg with lg).',
        'Use variant="ghost" for dense icon toolbars where no border or separator between buttons is desired.',
        'Avoid physical left/right utility overrides (such as rounded-l-none or -ml-px); logical start/end utilities ensure full LTR and RTL support.',
      ],
    },
  },

  toggle: {
    id: 'toggle',
    name: 'Toggle',
    category: 'Actions & Inputs',
    description:
      'A two-state button that can be either on or off, supporting default, outline, and tint variants, size-to-radius scaling identical to Button, and square icon-* dimensions.',
    baseUiPrimitive: '@base-ui/react/toggle',
    installCmd: 'npx shadcn@latest add @karan-ui/toggle',
    registryUrl: 'https://karan-ui.dev/r/toggle.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'outline' | 'tint'",
        defaultValue: "'default'",
        description:
          'Visual style variant: default (subtle neutral), outline (1px bordered), or tint (vibrant primary accent when selected, transparent when unselected)',
        options: ['default', 'outline', 'tint'],
        controlType: 'select',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'default' | 'lg' | 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg'",
        defaultValue: "'default'",
        description:
          'Sizing scale matching Button, where any icon-* option enforces perfectly square dimensions',
        options: ['xs', 'sm', 'default', 'lg', 'icon-xs', 'icon-sm', 'icon', 'icon-lg'],
        controlType: 'select',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Whether user interaction is disabled',
        controlType: 'boolean',
      },
      {
        name: 'defaultPressed',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Initial pressed state for uncontrolled toggle',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      variant: 'default',
      size: 'default',
      disabled: false,
      defaultPressed: false,
    },
    usageGuide: {
      summary:
        'Toggle provides an accessible two-state press button built on @base-ui/react/toggle. It shares the exact size scale and radius proportions of Button (including square icon-* sizes) and introduces a specialized tint variant that illuminates with the primary brand color when selected while remaining clean and transparent when unselected.',
      install: {
        cli: 'npx shadcn@latest add https://karan-ui.dev/r/toggle.json',
        registryUrl: 'https://karan-ui.dev/r/toggle.json',
      },
      features: [
        {
          title: 'Button-Matching Sizing & Square Icon Tiers',
          badge: 'Sizing',
          description:
            'Toggle shares the exact 4 height tiers (xs, sm, default, lg) and 4 square icon sizes (icon-xs, icon-sm, icon, icon-lg) as Button. Passing any icon-* tier renders a perfect 1:1 aspect ratio button.',
          code: `<Toggle size="icon" aria-label="Toggle pin">
  <Pin />
</Toggle>`,
        },
        {
          title: 'Specialized Tint Variant',
          badge: 'Tint Variant',
          description:
            'Use variant="tint" for accent-driven selection: when unselected, the button remains transparent with neutral hover; when pressed, it lights up with the primary interactive color and high-contrast text.',
          code: `<Toggle variant="tint" aria-label="Bookmark article">
  <Bookmark />
  Bookmark
</Toggle>`,
        },
        {
          title: 'Full Base UI & A11y Support',
          badge: 'Accessibility',
          description:
            'Built on @base-ui/react/toggle, with automatic aria-pressed, data-pressed, and data-disabled attributes, keyboard Enter/Space activation, and focus rings.',
          code: `<Toggle pressed={isPinned} onPressedChange={setIsPinned} aria-label="Pin message">
  <Pin />
</Toggle>`,
        },
      ],
      apiReference: [
        {
          name: 'Toggle',
          type: 'ToggleProps',
          description:
            'The two-state button component supporting variant (default, outline, tint), size (xs, sm, default, lg, icon-xs, icon-sm, icon, icon-lg), pressed, defaultPressed, and onPressedChange.',
        },
      ],
      tips: [
        'Use size="icon" (or icon-xs, icon-sm, icon-lg) whenever rendering icon-only toggle buttons to ensure exact square geometry.',
        'Use variant="tint" when the active state signifies an important enabled feature or brand action.',
        'Always provide an aria-label when the toggle contains only an icon without visible text.',
      ],
    },
  },

  'toggle-group': {
    id: 'toggle-group',
    name: 'Toggle Group',
    category: 'Actions & Inputs',
    description:
      'A set of two-state buttons coordinating selection state, attached or spaced layout, variant and size inheritance, and horizontal/vertical orientation.',
    baseUiPrimitive: '@base-ui/react/toggle-group',
    installCmd: 'npx shadcn@latest add @karan-ui/toggle-group',
    registryUrl: 'https://karan-ui.dev/r/toggle-group.json',
    props: [
      {
        name: 'attached',
        type: 'boolean',
        defaultValue: 'true',
        description:
          'When true, toggles are joined into a contiguous segmented bar with collapsed inner corners. When false, renders as a spaced toolbar cluster.',
        controlType: 'boolean',
      },
      {
        name: 'variant',
        type: "'default' | 'outline' | 'tint'",
        defaultValue: "'default'",
        description:
          'Shared visual style variant inherited by child toggles unless overridden on the child',
        options: ['default', 'outline', 'tint'],
        controlType: 'select',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'default' | 'lg' | 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg'",
        defaultValue: "'default'",
        description:
          'Shared size scale inherited by child toggles matching button sizing (icon-* produces square dimensions)',
        options: ['xs', 'sm', 'default', 'lg', 'icon-xs', 'icon-sm', 'icon', 'icon-lg'],
        controlType: 'select',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'Layout direction of the toggle group',
        options: ['horizontal', 'vertical'],
        controlType: 'select',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables all toggles in the group when true',
        controlType: 'boolean',
      },
      {
        name: 'multiple',
        type: 'boolean',
        defaultValue: 'false',
        description:
          'Allows multiple items in the group to be active simultaneously',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      attached: true,
      variant: 'default',
      size: 'default',
      orientation: 'horizontal',
      disabled: false,
      multiple: false,
    },
    usageGuide: {
      summary:
        'ToggleGroup mirrors ButtonGroup architecture while coordinating single or multiple selection states across children. It provides ToggleGroupContext so props (attached, variant, size, orientation, disabled) only need to be declared once on the parent container, and uses logical properties for flawless LTR and RTL support.',
      install: {
        cli: 'npx shadcn@latest add https://karan-ui.dev/r/toggle-group.json',
        registryUrl: 'https://karan-ui.dev/r/toggle-group.json',
      },
      features: [
        {
          title: 'ButtonGroup-Identical Architecture & Context',
          badge: 'Context & Sizing',
          description:
            'Pass attached, variant, size, orientation, or disabled on <ToggleGroup>. All child <ToggleGroupItem> and <Toggle> components inherit these settings automatically.',
          code: `<ToggleGroup variant="outline" size="sm" attached>
  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline /></ToggleGroupItem>
</ToggleGroup>`,
        },
        {
          title: 'Attached vs. Spaced Layouts',
          badge: 'Layout',
          description:
            'Set attached (default: true) for a contiguous segmented control with collapsed inner corners, or attached={false} for a spaced toolbar cluster with size-proportional gap.',
          code: `<ToggleGroup attached={false} variant="outline" size="default">
  <ToggleGroupItem value="left"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight /></ToggleGroupItem>
</ToggleGroup>`,
        },
        {
          title: 'Single & Multi Selection Modes',
          badge: 'Selection',
          description:
            'Supports single radio-style toggle behavior (multiple={false}) for mutually exclusive choices, or multi-select toolbar toggling (multiple={true}).',
          code: `<ToggleGroup multiple defaultValue={["bold", "italic"]}>
  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic /></ToggleGroupItem>
</ToggleGroup>`,
        },
        {
          title: 'Toolbar Separators',
          badge: 'Addons',
          description:
            'Includes ToggleGroupSeparator to cleanly divide tool groups within rich text editors or command surfaces.',
          code: `<ToggleGroup attached variant="default">
  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
  <ToggleGroupSeparator />
  <ToggleGroupItem value="left"><AlignLeft /></ToggleGroupItem>
</ToggleGroup>`,
        },
      ],
      apiReference: [
        {
          name: 'ToggleGroup',
          type: 'ToggleGroupProps',
          description:
            'Root toggle group container managing roving keyboard navigation, attached/spaced layout, and propagating ToggleGroupContext.',
        },
        {
          name: 'ToggleGroupItem',
          type: 'ToggleGroupItemProps',
          description:
            'Two-state button item that inherits variant, size, and disabled props from the parent ToggleGroup.',
        },
        {
          name: 'ToggleGroupSeparator',
          type: 'React.ComponentProps<typeof Separator>',
          description:
            'Visual divider oriented perpendicular to the group layout direction.',
        },
      ],
      tips: [
        'Set attached={false} when building a floating toolbar cluster where each icon button needs individual rounding.',
        'Use variant="tint" in editor toolbars to give prominent color feedback on active formatting styles.',
        'When using multiple={false}, value is a single string within an array (e.g. defaultValue={["center"]}).',
      ],
    },
  },

  'input-group': {
    id: 'input-group',
    name: 'Input Group',
    category: 'Actions & Inputs',
    description: 'Attaches icons, buttons, or addons before or after an input field.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/input-group',
    registryUrl: 'https://karan-ui.dev/r/input-group.json',
    props: [],
    defaultProps: {},
  },

  'input-otp': {
    id: 'input-otp',
    name: 'Input OTP',
    category: 'Actions & Inputs',
    description: 'Accessible one-time password input component with copy-paste and slot animations.',
    baseUiPrimitive: 'input-otp',
    installCmd: 'npx shadcn@latest add @karan-ui/input-otp',
    registryUrl: 'https://karan-ui.dev/r/input-otp.json',
    props: [],
    defaultProps: {},
  },

  'scroll-area': {
    id: 'scroll-area',
    name: 'Scroll Area',
    category: 'Data Display & Layout',
    description: 'Augments native scroll with custom cross-browser styling and custom scrollbars.',
    baseUiPrimitive: '@base-ui/react/scroll-area',
    installCmd: 'npx shadcn@latest add @karan-ui/scroll-area',
    registryUrl: 'https://karan-ui.dev/r/scroll-area.json',
    props: [],
    defaultProps: {},
  },

  'aspect-ratio': {
    id: 'aspect-ratio',
    name: 'Aspect Ratio',
    category: 'Data Display & Layout',
    description: 'Displays content within a desired aspect ratio (e.g. 16/9, 4/3, 1/1).',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/aspect-ratio',
    registryUrl: 'https://karan-ui.dev/r/aspect-ratio.json',
    props: [
      {
        name: 'ratio',
        type: 'number',
        defaultValue: '1.7777777777777777',
        description: 'Aspect ratio ratio (width / height)',
        controlType: 'number',
      },
    ],
    defaultProps: {
      ratio: 16 / 9,
    },
  },

  resizable: {
    id: 'resizable',
    name: 'Resizable',
    category: 'Data Display & Layout',
    description: 'Accessible resizable panel groups and handles with tactile drag state.',
    baseUiPrimitive: 'react-resizable-panels',
    installCmd: 'npx shadcn@latest add @karan-ui/resizable',
    registryUrl: 'https://karan-ui.dev/r/resizable.json',
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'Split direction',
        options: ['horizontal', 'vertical'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      orientation: 'horizontal',
    },
  },

  'hover-card': {
    id: 'hover-card',
    name: 'Hover Card',
    category: 'Overlays & Dialogs',
    description:
      'For sighted users to preview rich content available behind an anchor link or button trigger on hover.',
    baseUiPrimitive: '@base-ui/react/preview-card',
    installCmd: 'npx shadcn@latest add @karan-ui/hover-card',
    registryUrl: 'https://karan-ui.dev/r/hover-card.json',
    props: [
      {
        name: 'appearance',
        type: "'default' | 'inverted'",
        defaultValue: "'default'",
        description: 'Surface contrast appearance mode (default vs inverted)',
        options: ['default', 'inverted'],
        controlType: 'select',
      },
      {
        name: 'size',
        type: "'sm' | 'default' | 'lg'",
        defaultValue: "'default'",
        description: 'Card width and internal padding scale',
        options: ['sm', 'default', 'lg'],
        controlType: 'select',
      },
      {
        name: 'withArrow',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Whether to render an aligned arrow pointing to the anchor trigger',
        controlType: 'boolean',
      },
      {
        name: 'side',
        type: "'top' | 'right' | 'bottom' | 'left'",
        defaultValue: "'bottom'",
        description: 'Preferred placement edge relative to trigger',
        options: ['top', 'right', 'bottom', 'left'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      appearance: 'default',
      size: 'default',
      withArrow: false,
      side: 'bottom',
    },
    usageGuide: {
      summary:
        'Built on @base-ui/react/preview-card with built-in sighted hover delay, accessible focus coordination, dual surface appearances, and arrow support.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/hover-card',
        registryUrl: 'https://karan-ui.dev/r/hover-card.json',
      },
      features: [
        {
          title: 'Rich Link & Profile Previews',
          badge: 'PreviewCard',
          description:
            'Display author avatars, bio summaries, statistics, or status indicators without navigating away from the page.',
          code: `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link">@karancraft</Button>} />
      <HoverCardContent withArrow>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Karan Craft</h4>
          <p className="text-xs text-neutral-text-muted">
            Next-generation accessible design system built on Base UI.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}`,
        },
      ],
    },
  },

  calendar: {
    id: 'calendar',
    name: 'Calendar',
    category: 'Data Display & Layout',
    description: 'A date field component that allows users to enter and edit date values using react-day-picker.',
    baseUiPrimitive: 'react-day-picker',
    installCmd: 'npx shadcn@latest add @karan-ui/calendar',
    registryUrl: 'https://karan-ui.dev/r/calendar.json',
    props: [],
    defaultProps: {},
  },

  carousel: {
    id: 'carousel',
    name: 'Carousel',
    category: 'Data Display & Layout',
    description: 'A carousel with motion and swipe gestures built with Embla Carousel.',
    baseUiPrimitive: 'embla-carousel-react',
    installCmd: 'npx shadcn@latest add @karan-ui/carousel',
    registryUrl: 'https://karan-ui.dev/r/carousel.json',
    props: [],
    defaultProps: {},
  },

  chart: {
    id: 'chart',
    name: 'Chart',
    category: 'Data Display & Layout',
    description: 'Beautiful charts built using Recharts and Tailwind v4 CSS variables.',
    baseUiPrimitive: 'recharts',
    installCmd: 'npx shadcn@latest add @karan-ui/chart',
    registryUrl: 'https://karan-ui.dev/r/chart.json',
    props: [],
    defaultProps: {},
  },

  command: {
    id: 'command',
    name: 'Command',
    category: 'Actions & Inputs',
    description: 'Fast, composable, unstyled command menu for React built with cmdk.',
    baseUiPrimitive: 'cmdk',
    installCmd: 'npx shadcn@latest add @karan-ui/command',
    registryUrl: 'https://karan-ui.dev/r/command.json',
    props: [],
    defaultProps: {},
  },

  combobox: {
    id: 'combobox',
    name: 'Combobox',
    category: 'Actions & Inputs',
    description: 'Autocomplete input and picker combo built with Base UI Combobox primitives.',
    baseUiPrimitive: '@base-ui/react/combobox',
    installCmd: 'npx shadcn@latest add @karan-ui/combobox',
    registryUrl: 'https://karan-ui.dev/r/combobox.json',
    props: [],
    defaultProps: {},
  },

  toast: {
    id: 'toast',
    name: 'Toast',
    category: 'Feedback & Utilities',
    description: 'A succinct message that is displayed temporarily, handled natively by Base UI Toast.',
    baseUiPrimitive: '@base-ui/react/toast',
    installCmd: 'npx shadcn@latest add @karan-ui/toast',
    registryUrl: 'https://karan-ui.dev/r/toast.json',
    props: [
      {
        name: 'title',
        type: 'string',
        defaultValue: "'Notification'",
        description: 'Primary headline text for the toast notification',
        controlType: 'text',
      },
      {
        name: 'description',
        type: 'string',
        defaultValue: "'This is a native Base UI toast notification.'",
        description: 'Secondary explanatory message for the toast',
        controlType: 'text',
      },
      {
        name: 'type',
        type: "'success' | 'info' | 'warning' | 'error' | 'loading'",
        defaultValue: "'success'",
        description: 'Status type icon and styling of the toast',
        options: ['success', 'info', 'warning', 'error', 'loading'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      title: 'Notification',
      description: 'This is a native Base UI toast notification.',
      type: 'success',
    },
  },

  sidebar: {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'Navigation & Menus',
    description: 'A composable, responsive sidebar component with collapsible panels and tooltips.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/sidebar',
    registryUrl: 'https://karan-ui.dev/r/sidebar.json',
    props: [],
    defaultProps: {},
  },

  'theme-provider': {
    id: 'theme-provider',
    name: 'ThemeProvider',
    category: 'Feedback & Utilities',
    description:
      'Unified application root provider orchestrating @wrksz/themes theme switching, native Base UI Toast & Tooltip providers, and Shadcn Typeset vertical rhythm measurements.',
    baseUiPrimitive: '@wrksz/themes + Base UI',
    installCmd: 'npx shadcn@latest add @karan-ui/theme-provider',
    registryUrl: 'https://karan-ui.dev/r/theme-provider.json',
    props: [
      {
        name: 'accentColor',
        type: 'OklchColor ({ l, c, h })',
        defaultValue: '{ l: 0.55, c: 0.24, h: 264 }',
        description:
          'Primary brand accent in OKLCH color space. Defines the base hue angle (0–360°), saturation (0–0.35), and lightness (0.35–0.95, e.g. 0.88 for Canary Yellow). Drives the entire 6×13×2 palette.',
        controlType: 'text',
      },
      {
        name: 'tint',
        type: 'number (0–100%)',
        defaultValue: '20',
        description:
          'Neutral Surface Tint factor. At 0%, neutral surfaces and text are pure achromatic grayscale (0 saturation). At 100%, neutral surfaces and borders become richly tinted by the accent color.',
        controlType: 'number',
      },
      {
        name: 'chroma',
        type: 'number (0–100%)',
        defaultValue: '80',
        description:
          'Global Vibrancy Scale. Controls overall saturation multiplier across all 6 functional color sets (Primary, Neutral, Info, Success, Warning, Danger).',
        controlType: 'number',
      },
      {
        name: 'defaultTheme',
        type: "'system' | 'light' | 'dark'",
        defaultValue: "'system'",
        description:
          'Initial theme mode when no preference is saved in localStorage. Selects system, light, or dark.',
        options: ['system', 'light', 'dark'],
        controlType: 'select',
      },
      {
        name: 'enableSystem',
        type: 'boolean',
        defaultValue: 'true',
        description:
          'Automatically tracks operating system dark/light mode preference via the prefers-color-scheme media query.',
        controlType: 'boolean',
      },
      {
        name: 'attribute',
        type: "'class' | 'data-theme' | 'data-mode'",
        defaultValue: "'class'",
        description:
          'HTML attribute applied to the target document element (<html> by default) to set theme styles.',
        options: ['class', 'data-theme', 'data-mode'],
        controlType: 'select',
      },
      {
        name: 'typeset',
        type: "'default' | 'docs' | 'chat' | 'reading' | 'compact' | 'large'",
        defaultValue: "'default'",
        description:
          'Shadcn Typeset vertical rhythm preset controlling font size (--typeset-size), line-height leading, block flow spacing, and reading measure.',
        options: ['default', 'docs', 'chat', 'reading', 'compact', 'large'],
        controlType: 'select',
      },
      {
        name: 'toast',
        type: 'boolean | Partial<ToasterProps>',
        defaultValue: 'true',
        description:
          'Automatically mounts Base UI’s accessible Toast manager and viewport (<Toaster />). Enables toast.create() across your app.',
        controlType: 'boolean',
      },
      {
        name: 'tooltip',
        type: 'boolean | Partial<TooltipProviderProps>',
        defaultValue: 'true',
        description:
          'Wraps children with Base UI’s global TooltipProvider for synchronized hover delay and positioning.',
        controlType: 'boolean',
      },
      {
        name: 'whitespace',
        type: 'number (0.5–2.0)',
        defaultValue: '1',
        description:
          'White-space and element sizing multiplier. Proportionally scales all component padding, margin, gap, and dimension utilities without altering font sizes or typography.',
        controlType: 'number',
      },
      {
        name: 'radius',
        type: 'number (0–3.0)',
        defaultValue: '1',
        description:
          'Border radius curvature multiplier. Proportionally scales all rounded-* values (from rounded-xs to rounded-4xl), preserving rounded-none and rounded-full.',
        controlType: 'number',
      },
      {
        name: 'themes',
        type: 'string[]',
        defaultValue: "['light', 'dark']",
        description:
          'List of valid theme names supported by the application. Supports custom strings (e.g. ["dark-modern", "light-vintage"]).',
        options: [
          '["light", "dark"]',
          '["dark-modern", "light-vintage"]',
          '["light", "dark", "high-contrast"]',
        ],
        controlType: 'select',
      },
    ],
    defaultProps: {
      accentColor: { l: 0.55, c: 0.24, h: 264 },
      tint: 20,
      chroma: 80,
      whitespace: 1,
      radius: 1,
      defaultTheme: 'system',
      enableSystem: true,
      attribute: 'class',
      typeset: 'default',
      toast: true,
      tooltip: true,
      themes: ['light', 'dark'],
    },
    usageGuide: {
      summary:
        'The Karan UI ThemeProvider is the foundational root provider designed for modern Next.js 16 and React 19 applications. It seamlessly unifies @wrksz/themes (supporting arbitrary theme string arrays without SSR flash), native Base UI Toaster and TooltipProvider primitives, and the Shadcn Typeset specification for vertical typography rhythm.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/theme-provider',
        registryUrl: 'https://karan-ui.dev/r/theme-provider.json',
      },
      rootLayoutSetup: {
        filename: 'src/app/layout.tsx',
        explanation:
          'Wrap your root layout in <ThemeProvider> and place suppressHydrationWarning on <html> to allow @wrksz/themes pre-hydration script to set initial classes without React 19 hydration mismatch warnings.',
        code: `import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karan UI Application",
  description: "Built with Karan UI, Base UI, and Tailwind CSS v4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          typeset="docs"
          colorTheme="zinc"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`,
      },
      features: [
        {
          title: 'Arbitrary Theme String Arrays (@wrksz/themes)',
          badge: 'Dark / Light / Custom Themes',
          description:
            'Unlike legacy providers locked to standard dark and light, ThemeProvider accepts any array of theme strings such as ["dark-modern", "light-vintage"]. Use the useTheme() hook anywhere in client components to inspect and switch themes.',
          code: `// 1. Defining custom themes in your layout
<ThemeProvider
  themes={["dark-modern", "light-vintage", "dark-neon", "light-minimal"]}
  defaultTheme="dark-modern"
>
  {children}
</ThemeProvider>

// 2. Switching themes in any client component
import { useTheme } from "@/components/theme-provider";

export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme, themes } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={theme === t ? "font-bold text-primary-text" : "text-neutral-text-muted"}
        >
          {t}
        </button>
      ))}
      <button onClick={() => setTheme("system")}>System</button>
    </div>
  );
}`,
        },
        {
          title: 'Zero-Config Native Base UI Toast',
          badge: '@base-ui/react/toast',
          description:
            'ThemeProvider automatically renders the Base UI native <Toaster /> at the root level. Any component or action in your application can directly import toast and trigger notifications without having to manually place <Toaster /> tags in page templates.',
          code: `import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export function ActionButton() {
  return (
    <Button
      onClick={() => {
        toast.add({
          title: "Settings Saved",
          description: "Your user preferences were updated in Karan UI.",
          type: "success",
        });
      }}
    >
      Save Changes
    </Button>
  );
}`,
        },
        {
          title: 'Zero-Config Native Base UI Tooltip',
          badge: '@base-ui/react/tooltip',
          description:
            'Base UI TooltipProvider is included at the root by default with an instant hover delay. You can use <Tooltip>, <TooltipTrigger>, and <TooltipContent> anywhere without wrapping individual views or buttons in local providers.',
          code: `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function HelpButton() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
        ?
      </TooltipTrigger>
      <TooltipContent>
        Contextual assistance rendered via Base UI primitive.
      </TooltipContent>
    </Tooltip>
  );
}`,
        },
        {
          title: 'Shadcn Typeset Vertical Rhythm Specification',
          badge: 'Typography & Vertical Rhythm',
          description:
            'Implements the complete Shadcn Typeset specification (https://ui.shadcn.com/docs/typeset). Dynamically establishes CSS variables for --typeset-size, --typeset-leading, --typeset-flow, and --typeset-measure. Includes built-in presets: default, docs, chat, reading, compact, and large.',
          code: `import { Typeset, useTypeset } from "@/components/theme-provider";

export function ArticleView() {
  const { preset, setPreset, measurements } = useTypeset();

  return (
    <div>
      {/* Switch rhythm preset on the fly */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setPreset("reading")}>Reading Mode</button>
        <button onClick={() => setPreset("compact")}>Compact Mode</button>
      </div>

      {/* Scoped Typeset Container */}
      <Typeset preset="reading" className="prose">
        <h1>Intentional Vertical Rhythm</h1>
        <p>
          Body text, headings, and lists maintain proportional leading and flow spacing.
        </p>
      </Typeset>
    </div>
  );
}`,
        },
        {
          title: 'Color Theme Token Slot',
          badge: 'Extensible Palette',
          description:
            'A centralized design-token slot and context for upcoming color themes (zinc, slate, neutral, rose, blue, etc.). Allows accessing active colorTheme and switching palettes via useColorTheme().',
          code: `import { useColorTheme } from "@/components/theme-provider";

export function ColorThemeBadge() {
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-neutral-text-muted">Palette:</span>
      <span className="font-mono font-semibold">{colorTheme}</span>
      <button onClick={() => setColorTheme("rose")}>Switch to Rose</button>
    </div>
  );
}`,
        },
        {
          title: 'Geometry & Density Multipliers (whitespace & radius)',
          badge: 'Design System Scaling',
          description:
            'ThemeProvider provides two first-class multipliers: whitespace (scales padding, margin, gap, and component sizing without touching typography) and radius (scales rounded-* tokens proportionally, preserving rounded-none and rounded-full). Access them anywhere via useThemeGeometry().',
          code: `import { useThemeGeometry } from "@/components/theme-provider";

export function GeometryToolbar() {
  const { whitespace, setWhitespace, radius, setRadius, resetGeometry } = useThemeGeometry();

  return (
    <div className="flex items-center gap-4">
      {/* Sizing & Density */}
      <button onClick={() => setWhitespace(0.8)}>Compact (0.8x)</button>
      <button onClick={() => setWhitespace(1.0)}>Default (1.0x)</button>
      <button onClick={() => setWhitespace(1.25)}>Relaxed (1.25x)</button>

      {/* Border Radius */}
      <button onClick={() => setRadius(0)}>Sharp (0x)</button>
      <button onClick={() => setRadius(1.5)}>Curved (1.5x)</button>
      <button onClick={() => resetGeometry()}>Reset</button>
    </div>
  );
}`,
        },
      ],
      apiReference: [
        {
          name: 'useTheme()',
          type: '() => ThemeContextValue',
          description:
            'Returns { theme, resolvedTheme, setTheme, themes, systemTheme } from @wrksz/themes.',
        },
        {
          name: 'useThemeGeometry()',
          type: '() => { whitespace, setWhitespace, radius, setRadius, resetGeometry }',
          description:
            'Returns current whitespace and radius multipliers along with updater functions and resetGeometry().',
        },
        {
          name: 'useTypeset()',
          type: '() => TypesetContextValue',
          description:
            'Returns { measurements, preset, setPreset, setMeasurements, style, className }.',
        },
        {
          name: 'useColorTheme()',
          type: '() => ColorThemeContextValue',
          description:
            'Returns { colorTheme, setColorTheme, config } for color palette switching.',
        },
        {
          name: 'toast.add(options)',
          type: '(options: ToastOptions) => string',
          description:
            'Natively dispatches a toast notification to the global Base UI Toaster.',
        },
        {
          name: '<Typeset />',
          type: 'React.FC<TypesetProps>',
          description:
            'Container component that applies scoped vertical rhythm typography variables and styling.',
        },
      ],
      tips: [
        'Add suppressHydrationWarning to your <html> tag in Next.js RootLayout to eliminate hydration warnings from pre-hydration theme scripts.',
        'Custom themes can be styled in globals.css using attribute selectors like html.dark-modern or [data-theme="light-vintage"].',
        'If you wish to manage toasts manually, pass toast={false} to <ThemeProvider> and place <Toaster /> explicitly where needed.',
      ],
    },
  },
};

export const CATEGORIES = [
  'Actions & Inputs',
  'Overlays & Dialogs',
  'Navigation & Menus',
  'Data Display & Layout',
  'Feedback & Utilities',
] as const;

export function getComponentsByCategory() {
  const result: Record<string, ComponentMetadata[]> = {};
  for (const cat of CATEGORIES) {
    result[cat] = [];
  }
  for (const item of Object.values(COMPONENTS_METADATA)) {
    if (result[item.category]) {
      result[item.category].push(item);
    }
  }
  return result;
}
