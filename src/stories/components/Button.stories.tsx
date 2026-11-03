import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import {
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  Plus,
} from 'icons';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'link'],
      description: 'The structural emphasis variant of the button',
    },
    intent: {
      control: 'select',
      options: ['primary', 'neutral', 'success', 'warning', 'info', 'danger'],
      description:
        'Semantic color intent (defaults to primary for default variant, neutral for others)',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'icon-xs', 'icon-sm', 'icon', 'icon-lg'],
      description: 'Proportional height, corner radius, padding, and icon size tier',
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
    loading: {
      control: 'boolean',
      description: 'Displays a leading spinner and disables pointer interaction',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
    wide: false,
    align: 'center',
    loading: false,
    disabled: false,
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

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default (Primary)</Button>
      <Button variant="secondary">Secondary (Neutral)</Button>
      <Button variant="outline">Outline (Neutral)</Button>
      <Button variant="ghost">Ghost (Neutral)</Button>
      <Button variant="link">Link (Neutral)</Button>
    </div>
  ),
};

export const Intents: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button intent="primary">Primary</Button>
      <Button intent="neutral">Neutral</Button>
      <Button intent="success" leading={<CheckCircle2 />}>
        Success
      </Button>
      <Button intent="warning" leading={<AlertTriangle />}>
        Warning
      </Button>
      <Button intent="info" leading={<Info />}>
        Info
      </Button>
      <Button intent="danger" leading={<Trash2 />}>
        Danger
      </Button>
    </div>
  ),
};

export const DangerAcrossVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default" intent="danger" leading={<Trash2 />}>
        Delete Project
      </Button>
      <Button variant="secondary" intent="danger" leading={<AlertTriangle />}>
        Revoke Access
      </Button>
      <Button variant="outline" intent="danger">
        Remove Member
      </Button>
      <Button variant="ghost" intent="danger">
        Discard Draft
      </Button>
      <Button variant="link" intent="danger">
        Reset Credentials
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="xs" leading={<Plus />}>
          Extra Small (24px)
        </Button>
        <Button size="sm" leading={<Plus />}>
          Small (28px)
        </Button>
        <Button size="default" leading={<Plus />}>
          Default (32px)
        </Button>
        <Button size="lg" leading={<Plus />}>
          Large (36px)
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="icon-xs" variant="outline" aria-label="Add XS">
          <Plus />
        </Button>
        <Button size="icon-sm" variant="outline" aria-label="Add SM">
          <Plus />
        </Button>
        <Button size="icon" variant="outline" aria-label="Add Default">
          <Plus />
        </Button>
        <Button size="icon-lg" variant="outline" aria-label="Add LG">
          <Plus />
        </Button>
      </div>
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
      <Button
        wide
        align="start"
        leading={<Mail />}
        trailing={<ArrowRight />}
        variant="outline"
      >
        Align Start (Trailing at End)
      </Button>
      <Button
        wide
        align="center"
        leading={<Sparkles />}
        trailing={<ArrowRight />}
      >
        Align Center (Grouped)
      </Button>
      <Button
        wide
        align="end"
        leading={<Mail />}
        trailing={<ArrowRight />}
        variant="secondary"
      >
        Align End (Leading at Start)
      </Button>
    </div>
  ),
};

export const LoadingAndDisabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Saving Changes</Button>
      <Button variant="secondary" loading>
        Syncing Workspace
      </Button>
      <Button variant="outline" intent="danger" loading>
        Deleting...
      </Button>
      <Button disabled leading={<Mail />}>
        Disabled Action
      </Button>
    </div>
  ),
};
