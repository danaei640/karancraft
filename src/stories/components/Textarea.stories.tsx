import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@/components/ui/textarea';

const SAMPLE_SCROLL_CONTENT = `1. Proportional Geometry: Corner radius R scales proportionally with control height H (R/H ≈ 0.25).
2. Optical Safe Padding: Horizontal inset clears the corner arc (Px ≥ R + 2px).
3. Zero Scroll-Dimension Padding: The outer frame has py-0 so scrolling content reaches the exact top and bottom edges.
4. Dynamic Scroll Faders: Smooth CSS mask faders activate automatically on whichever vertical side has overflow scroll.
5. Auto-Expanding Field Sizing: Grows seamlessly with lines until maxHeight is reached, then switches to smooth vertical scrolling.
6. Bi-Directional Ready: Works identically in both LTR and RTL document directions.`;

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg'],
    },
    maxHeight: {
      control: 'text',
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    variant: 'default',
    size: 'default',
    maxHeight: '110px',
    placeholder: 'Type your message here...',
    defaultValue: SAMPLE_SCROLL_CONTENT,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-md">
      <Textarea {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Textarea
        variant="default"
        placeholder="Default filled surface variant..."
      />
      <Textarea
        variant="outline"
        placeholder="Outline bordered surface variant..."
      />
      <Textarea
        variant="ghost"
        placeholder="Ghost borderless inline variant..."
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Textarea size="xs" variant="outline" placeholder="Extra small (xs)..." />
      <Textarea size="sm" variant="outline" placeholder="Small (sm)..." />
      <Textarea
        size="default"
        variant="outline"
        placeholder="Default (default)..."
      />
      <Textarea size="lg" variant="outline" placeholder="Large (lg)..." />
    </div>
  ),
};

export const MaxHeightScrollFader: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-neutral-text-muted">
        <span className="font-medium text-neutral-text">
          Auto-scroll after maxHeight (110px) with top & bottom faders
        </span>
        <span className="font-mono text-[11px]">maxHeight=&quot;110px&quot;</span>
      </div>
      <Textarea
        variant="outline"
        maxHeight={110}
        defaultValue={SAMPLE_SCROLL_CONTENT}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Textarea
        disabled
        variant="outline"
        defaultValue="This textarea is disabled and cannot be edited."
      />
    </div>
  ),
};
