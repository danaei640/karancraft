import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import {
  Mail,
  ArrowRight,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
} from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
      description: 'The visual style variant of the button',
    },
    intent: {
      control: 'select',
      options: ['primary', 'neutral', 'success', 'danger', 'info', 'destructive'],
      description: 'Semantic color intent across variants',
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
      description: 'The size of the button',
    },
    wide: {
      control: 'boolean',
      description: 'Expand button to full container width',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Horizontal content alignment inside the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
  args: {
    children: 'Button',
    variant: 'default',
    intent: 'primary',
    size: 'default',
    wide: false,
    align: 'center',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
  },
};

export const Intents: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button intent="primary">Primary</Button>
      <Button intent="neutral">Neutral</Button>
      <Button intent="success" leading={<CheckCircle2 />}>
        Success
      </Button>
      <Button intent="info" leading={<Info />}>
        Info
      </Button>
      <Button intent="danger" leading={<AlertTriangle />}>
        Danger
      </Button>
      <Button intent="destructive" leading={<Trash2 />}>
        Destructive
      </Button>
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const LeadingAndTrailing: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button leading={<Mail />}>Login with Email</Button>
      <Button icon={<Sparkles />} variant="secondary">
        Icon Alias
      </Button>
      <Button trailing={<ArrowRight />} variant="outline">
        Continue
      </Button>
      <Button leading={<Sparkles />} trailing={<ArrowRight />} intent="info">
        Explore Features
      </Button>
    </div>
  ),
};

export const WideAndAlignment: Story = {
  render: () => (
    <div className="flex flex-col gap-2.5 w-full max-w-sm">
      <Button wide align="start" leading={<Mail />} variant="outline">
        Align Start (Wide)
      </Button>
      <Button wide align="center" leading={<Sparkles />}>
        Align Center (Wide)
      </Button>
      <Button wide align="end" trailing={<ArrowRight />} variant="secondary">
        Align End (Wide)
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button leading={<Mail />}>Login with Email</Button>
      <Button variant="secondary" trailing={<ArrowRight />}>
        Next Step
      </Button>
      <Button variant="outline" size="icon">
        <Sparkles className="h-4 w-4" />
      </Button>
      <Button disabled leading={<Loader2 className="animate-spin" />}>
        Please wait
      </Button>
    </div>
  ),
};
