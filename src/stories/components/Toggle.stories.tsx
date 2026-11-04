import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '@/components/ui/toggle';
import {
  Bold,
  Italic,
  Underline,
  Bookmark,
  Pin,
  Mic,
  Volume2,
  Highlighter,
  Heart,
  Star,
  Check,
} from 'icons';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'tint'],
      description: 'The visual style variant of the toggle button',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'icon-xs', 'icon-sm', 'icon', 'icon-lg'],
      description: 'Sizing tier matching button, where icon-* produces a square dimension',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle button is disabled',
    },
    defaultPressed: {
      control: 'boolean',
      description: 'Initial pressed state for uncontrolled toggle',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    defaultPressed: false,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    defaultPressed: false,
  },
  render: (args) => (
    <Toggle aria-label="Toggle pin" {...args}>
      <Pin />
      Pin to top
    </Toggle>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-text-muted">
          Default (Neutral Interactive When Selected)
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle variant="default" aria-label="Toggle bold">
            <Bold />
            Bold
          </Toggle>
          <Toggle variant="default" defaultPressed aria-label="Toggle bold (pressed)">
            <Bold />
            Bold (Selected)
          </Toggle>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-text-muted">
          Outline (1px Bordered Container)
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle variant="outline" aria-label="Toggle italic">
            <Italic />
            Italic
          </Toggle>
          <Toggle variant="outline" defaultPressed aria-label="Toggle italic (pressed)">
            <Italic />
            Italic (Selected)
          </Toggle>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-text-muted">
          Tint (Primary Color Selected, Default Unselected)
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle variant="tint" aria-label="Toggle bookmark">
            <Bookmark />
            Bookmark
          </Toggle>
          <Toggle variant="tint" defaultPressed aria-label="Toggle bookmark (pressed)">
            <Bookmark />
            Bookmark (Selected)
          </Toggle>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle size="xs" variant="outline" aria-label="Toggle xs">
        <Star />
        Extra Small
      </Toggle>
      <Toggle size="sm" variant="outline" aria-label="Toggle sm">
        <Star />
        Small
      </Toggle>
      <Toggle size="default" variant="outline" defaultPressed aria-label="Toggle default">
        <Star />
        Default
      </Toggle>
      <Toggle size="lg" variant="outline" aria-label="Toggle lg">
        <Star />
        Large
      </Toggle>
    </div>
  ),
};

export const SquareIconSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Toggle size="icon-xs" variant="outline" aria-label="Extra small square toggle">
          <Heart />
        </Toggle>
        <span className="text-xs text-neutral-text-muted">icon-xs (24×24px, rounded-md)</span>
      </div>

      <div className="flex items-center gap-3">
        <Toggle size="icon-sm" variant="outline" aria-label="Small square toggle">
          <Heart />
        </Toggle>
        <span className="text-xs text-neutral-text-muted">icon-sm (28×28px, rounded-md)</span>
      </div>

      <div className="flex items-center gap-3">
        <Toggle size="icon" variant="outline" defaultPressed aria-label="Default square toggle">
          <Heart />
        </Toggle>
        <span className="text-xs text-neutral-text-muted">icon (32×32px, rounded-lg)</span>
      </div>

      <div className="flex items-center gap-3">
        <Toggle size="icon-lg" variant="outline" aria-label="Large square toggle">
          <Heart />
        </Toggle>
        <span className="text-xs text-neutral-text-muted">icon-lg (36×36px, rounded-lg)</span>
      </div>
    </div>
  ),
};

export const TintVariantShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-neutral-text-secondary">
        The <code>tint</code> variant stays transparent with soft hover in the unselected state, then transitions into a rich primary-interactive accent surface when pressed.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Toggle variant="tint" size="icon" defaultPressed aria-label="Bold">
          <Bold />
        </Toggle>
        <Toggle variant="tint" size="icon" defaultPressed aria-label="Italic">
          <Italic />
        </Toggle>
        <Toggle variant="tint" size="icon" aria-label="Underline">
          <Underline />
        </Toggle>
        <Toggle variant="tint" size="icon" aria-label="Highlighter">
          <Highlighter />
        </Toggle>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Toggle variant="tint" defaultPressed aria-label="Toggle mic">
          <Mic />
          Microphone On
        </Toggle>
        <Toggle variant="tint" aria-label="Toggle volume">
          <Volume2 />
          Sound Alerts
        </Toggle>
        <Toggle variant="tint" defaultPressed aria-label="Verified creator">
          <Check />
          Verified
        </Toggle>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle disabled variant="default" aria-label="Disabled default toggle">
        <Pin />
        Default
      </Toggle>
      <Toggle disabled variant="outline" aria-label="Disabled outline toggle">
        <Pin />
        Outline
      </Toggle>
      <Toggle disabled defaultPressed variant="tint" aria-label="Disabled tint toggle">
        <Pin />
        Tint (Selected)
      </Toggle>
      <Toggle disabled size="icon" variant="outline" aria-label="Disabled icon toggle">
        <Bookmark />
      </Toggle>
    </div>
  ),
};
