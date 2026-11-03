import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Bell,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  Sparkles,
  Layers,
} from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    variant: 'default',
    intent: 'neutral',
    size: 'default',
    interactive: false,
    title: 'Project Overview',
    description: 'Telemetry & metrics for Karan UI registry',
  },
  render: (args: any) => (
    <Card
      className="w-[380px]"
      variant={args?.variant || 'default'}
      intent={args?.intent || 'neutral'}
      size={args?.size || 'default'}
      interactive={Boolean(args?.interactive)}
    >
      <CardHeader>
        <CardTitle>{args?.title || 'Project Overview'}</CardTitle>
        <CardDescription>
          {args?.description || 'Telemetry & metrics for Karan UI registry'}
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">v0.1</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Input placeholder="Filter deployment environment..." size="sm" />
        <div className="flex items-center gap-3 rounded-lg border border-neutral-interactive bg-neutral-surface p-3">
          <Bell className="size-4 shrink-0 text-neutral-text-muted" />
          <div className="flex-1 space-y-0.5">
            <p className="text-xs font-medium leading-none text-neutral-text">
              Release Notifications
            </p>
            <p className="text-xs text-neutral-text-muted">
              Receive webhook alerts on registry updates
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
        <Button variant="secondary" size="sm">
          Preview
        </Button>
        <Button size="sm" intent={args?.intent || 'primary'}>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default (Tint)</CardTitle>
          <CardDescription>Soft tinted surface container</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-neutral-text-secondary">
            Uses surface-alt tokens with stepped color-mix contrast for child controls.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="secondary" size="xs">
            Secondary
          </Button>
          <Button variant="outline" size="xs">
            Outline
          </Button>
        </CardFooter>
      </Card>

      <Card variant="outline">
        <CardHeader>
          <CardTitle>Outline</CardTitle>
          <CardDescription>Crisp 1px structural border</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-neutral-text-secondary">
            Ideal for dense dashboards and high-contrast structural separation.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="secondary" size="xs">
            Secondary
          </Button>
          <Button variant="outline" size="xs">
            Outline
          </Button>
        </CardFooter>
      </Card>

      <Card variant="ghost">
        <CardHeader>
          <CardTitle>Ghost</CardTitle>
          <CardDescription>Transparent quiet container</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-neutral-text-secondary">
            Maintains card padding and rhythm without background or border weight.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="secondary" size="xs">
            Secondary
          </Button>
          <Button variant="ghost" size="xs">
            Ghost
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const SemanticIntents: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
      <Card variant="default" intent="neutral">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="size-4" />
            <span>Neutral</span>
          </CardTitle>
          <CardDescription>Standard structural surface</CardDescription>
          <CardAction>
            <Badge variant="secondary">Default</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="font-mono text-xs tabular-nums">
          99.98% uptime · 12 regions
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="secondary" size="xs">
            Configure
          </Button>
          <Button variant="ghost" size="xs">
            Logs
          </Button>
        </CardFooter>
      </Card>

      <Card variant="default" intent="primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-4" />
            <span>Primary</span>
          </CardTitle>
          <CardDescription>Brand accent tinted surface</CardDescription>
          <CardAction>
            <Badge variant="secondary">Pro</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="font-mono text-xs tabular-nums">
          Active plan · Pro Workspace
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="secondary" size="xs">
            Manage Plan
          </Button>
          <Button variant="ghost" size="xs">
            Invoices
          </Button>
        </CardFooter>
      </Card>

      <Card variant="default" intent="info">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="size-4" />
            <span>Info</span>
          </CardTitle>
          <CardDescription>Informational guidance surface</CardDescription>
          <CardAction>
            <Badge variant="secondary">v2.4</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="font-mono text-xs tabular-nums">
          v2.4 schema migration ready
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="secondary" size="xs">
            Review Diff
          </Button>
          <Button variant="ghost" size="xs">
            Dismiss
          </Button>
        </CardFooter>
      </Card>

      <Card variant="default" intent="success">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-4" />
            <span>Success</span>
          </CardTitle>
          <CardDescription>Healthy verification state</CardDescription>
          <CardAction>
            <Badge variant="secondary">Verified</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="font-mono text-xs tabular-nums">
          56 / 56 registry checks passed
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="secondary" size="xs">
            View Report
          </Button>
          <Button variant="ghost" size="xs">
            Export
          </Button>
        </CardFooter>
      </Card>

      <Card variant="default" intent="warning">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="size-4" />
            <span>Warning</span>
          </CardTitle>
          <CardDescription>Approaching rate threshold</CardDescription>
          <CardAction>
            <Badge variant="secondary">84%</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="font-mono text-xs tabular-nums">
          84% of monthly quota used
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="secondary" size="xs">
            Raise Quota
          </Button>
          <Button variant="ghost" size="xs">
            Mute
          </Button>
        </CardFooter>
      </Card>

      <Card variant="default" intent="danger">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="size-4" />
            <span>Danger</span>
          </CardTitle>
          <CardDescription>Critical attention required</CardDescription>
          <CardAction>
            <Badge variant="secondary">Alert</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="font-mono text-xs tabular-nums">
          2 production webhooks failing
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="secondary" size="xs">
            Retry Endpoints
          </Button>
          <Button variant="ghost" size="xs">
            Inspect
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const LayeredHarmony: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
      {(
        ['neutral', 'primary', 'info', 'success', 'warning', 'danger'] as const
      ).map((intent) => (
        <Card key={intent} variant="default" intent={intent}>
          <CardHeader>
            <CardTitle className="capitalize">{intent} Surface Layering</CardTitle>
            <CardDescription>
              Default neutral children automatically inherit {intent} harmony & stepped contrast
            </CardDescription>
            <CardAction>
              <Badge variant="secondary">{intent}</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input placeholder={`Search ${intent} records...`} size="sm" />
            <Separator />
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
              <Button variant="outline" size="sm">
                Outline
              </Button>
              <Button variant="ghost" size="sm">
                Ghost
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const OutlineIntents: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
      {(
        ['neutral', 'primary', 'info', 'success', 'warning', 'danger'] as const
      ).map((intent) => (
        <Card key={intent} variant="outline" intent={intent} size="sm">
          <CardHeader>
            <CardTitle className="capitalize">{intent} Outline</CardTitle>
            <CardDescription>
              1px {intent}-interactive border token
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xs">
            Crisp bordered surface with intent-matched typography.
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start w-full max-w-4xl">
      <Card size="sm" variant="outline">
        <CardHeader>
          <CardTitle>Small (sm)</CardTitle>
          <CardDescription>14px radius · 16px padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-neutral-text-secondary">
            Compact density following P = R + 2px at 1x scale.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="xs" variant="secondary">
            Inspect sm
          </Button>
        </CardFooter>
      </Card>

      <Card size="default" variant="outline">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>18px radius · 20px padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-neutral-text-secondary">
            Balanced standard density following P = R + 2px at 1x scale.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="secondary">
            Inspect default
          </Button>
        </CardFooter>
      </Card>

      <Card size="lg" variant="outline">
        <CardHeader>
          <CardTitle>Large (lg)</CardTitle>
          <CardDescription>22px radius · 24px padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-neutral-text-secondary">
            Spacious editorial density following P = R + 2px at 1x scale.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="default" variant="secondary">
            Inspect lg
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const InteractiveCards: Story = {
  render: function InteractiveCardsDemo() {
    const [selected, setSelected] = React.useState<string>('primary');

    const items = [
      {
        id: 'neutral',
        variant: 'default' as const,
        intent: 'neutral' as const,
        title: 'Tinted Interactive',
        metric: '128,490',
        delta: '+24.8% this month',
      },
      {
        id: 'primary',
        variant: 'outline' as const,
        intent: 'primary' as const,
        title: 'Outline Interactive',
        metric: '99.99%',
        delta: 'Zero SLA breaches',
      },
      {
        id: 'ghost',
        variant: 'ghost' as const,
        intent: 'info' as const,
        title: 'Ghost Interactive',
        metric: '1.4ms',
        delta: 'Edge p95 latency',
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {items.map((item) => (
          <Card
            key={item.id}
            interactive
            variant={item.variant}
            intent={item.intent}
            onClick={() => setSelected(item.id)}
            className={
              selected === item.id ? 'ring-2 ring-primary-fill' : undefined
            }
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{item.title}</span>
                <ArrowUpRight className="size-4 opacity-70" />
              </CardTitle>
              <CardDescription>Click or press Enter/Space</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading tabular-nums">
                {item.metric}
              </div>
              <p className="text-xs opacity-75 mt-1">{item.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  },
};

export const PolymorphicRender: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
      <Card
        interactive
        variant="outline"
        intent="primary"
        render={<a href="#card-link-demo" onClick={(e) => e.preventDefault()} />}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Rendered as Anchor (&lt;a&gt;)</span>
            <ArrowUpRight className="size-4" />
          </CardTitle>
          <CardDescription>
            Uses Base UI render prop for native link semantics
          </CardDescription>
        </CardHeader>
        <CardContent className="text-xs">
          Right-click or tab to inspect native anchor focus and hover states.
        </CardContent>
      </Card>

      <Card
        interactive
        variant="default"
        intent="success"
        render={<button type="button" className="text-start" />}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Rendered as Button (&lt;button&gt;)</span>
            <CheckCircle2 className="size-4" />
          </CardTitle>
          <CardDescription>
            Native button element with intent focus ring
          </CardDescription>
        </CardHeader>
        <CardContent className="text-xs">
          Supports full keyboard activation and semantic button accessibility.
        </CardContent>
      </Card>
    </div>
  ),
};
