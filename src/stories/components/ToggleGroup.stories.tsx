import type { Meta, StoryObj } from '@storybook/react';
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupSeparator,
} from '@/components/ui/toggle-group';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
  Grid,
  ListFilter,
  Columns,
  Square,
  Sparkles,
} from 'icons';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    attached: {
      control: 'boolean',
      description:
        'When true, toggles are joined into a contiguous bar with collapsed inner corners. When false, renders as a spaced toolbar cluster.',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'tint'],
      description:
        'Shared visual variant inherited by child toggles unless overridden on the child',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'icon-xs', 'icon-sm', 'icon', 'icon-lg'],
      description:
        'Shared size scale inherited by child toggles matching button sizing (icon-* produces square dimensions)',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of the toggle group',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all toggles in the group when true',
    },
    multiple: {
      control: 'boolean',
      description: 'Allows multiple items to be pressed concurrently when true',
    },
  },
  args: {
    attached: true,
    variant: 'outline',
    size: 'default',
    orientation: 'horizontal',
    disabled: false,
    multiple: false,
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    attached: true,
    variant: 'outline',
    size: 'default',
    orientation: 'horizontal',
    disabled: false,
    multiple: false,
    defaultValue: ['center'],
  },
  render: (args) => (
    <ToggleGroup aria-label="Text alignment" {...args}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Align justify">
        <AlignJustify />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const AttachedVsSpaced: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-text-muted">
          Attached (Contiguous Segmented Bar - attached={'{true}'})
        </span>
        <ToggleGroup attached variant="outline" defaultValue={['left']}>
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-text-muted">
          Spaced (Toolbar Cluster - attached={'{false}'})
        </span>
        <ToggleGroup attached={false} variant="outline" defaultValue={['left']}>
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-text-muted">
          Default Variant (Neutral Fill on Selection)
        </span>
        <ToggleGroup variant="default" defaultValue={['bold', 'italic']} multiple>
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-text-muted">
          Outline Variant (Bordered Contiguous Seam)
        </span>
        <ToggleGroup variant="outline" defaultValue={['bold', 'italic']} multiple>
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-text-muted">
          Tint Variant (Primary Color on Selection, Default on Unselected)
        </span>
        <ToggleGroup variant="tint" defaultValue={['bold', 'italic']} multiple>
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline />
          </ToggleGroupItem>
          <ToggleGroupItem value="highlight" aria-label="Highlight">
            <Highlighter />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <span className="w-16 text-xs text-neutral-text-muted">xs</span>
        <ToggleGroup size="xs" variant="outline" defaultValue={['month']}>
          <ToggleGroupItem value="year">Year</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-16 text-xs text-neutral-text-muted">sm</span>
        <ToggleGroup size="sm" variant="outline" defaultValue={['month']}>
          <ToggleGroupItem value="year">Year</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-16 text-xs text-neutral-text-muted">default</span>
        <ToggleGroup size="default" variant="outline" defaultValue={['month']}>
          <ToggleGroupItem value="year">Year</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-16 text-xs text-neutral-text-muted">lg</span>
        <ToggleGroup size="lg" variant="outline" defaultValue={['month']}>
          <ToggleGroupItem value="year">Year</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const SquareIconSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <span className="w-20 text-xs text-neutral-text-muted">icon-xs</span>
        <ToggleGroup size="icon-xs" variant="outline" defaultValue={['left']}>
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-20 text-xs text-neutral-text-muted">icon-sm</span>
        <ToggleGroup size="icon-sm" variant="outline" defaultValue={['left']}>
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-20 text-xs text-neutral-text-muted">icon</span>
        <ToggleGroup size="icon" variant="outline" defaultValue={['left']}>
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-20 text-xs text-neutral-text-muted">icon-lg</span>
        <ToggleGroup size="icon-lg" variant="outline" defaultValue={['left']}>
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const Orientation: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-neutral-text-muted">
          Horizontal (attached)
        </span>
        <ToggleGroup orientation="horizontal" variant="outline" defaultValue={['grid']}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List />
          </ToggleGroupItem>
          <ToggleGroupItem value="columns" aria-label="Column view">
            <Columns />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-neutral-text-muted">
          Vertical (attached)
        </span>
        <ToggleGroup orientation="vertical" variant="outline" defaultValue={['grid']}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List />
          </ToggleGroupItem>
          <ToggleGroupItem value="columns" aria-label="Column view">
            <Columns />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-neutral-text-muted">
          Vertical (spaced)
        </span>
        <ToggleGroup attached={false} orientation="vertical" variant="outline" defaultValue={['grid']}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List />
          </ToggleGroupItem>
          <ToggleGroupItem value="columns" aria-label="Column view">
            <Columns />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const WithSeparators: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-neutral-text-secondary">
        Combine multiple controls and groups with <code>ToggleGroupSeparator</code> in rich editing toolbars:
      </p>

      <div className="flex flex-wrap items-center gap-1 rounded-xl border border-neutral-interactive p-1 bg-neutral-surface">
        <ToggleGroup attached variant="default" multiple defaultValue={['bold']}>
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline />
          </ToggleGroupItem>
          <ToggleGroupItem value="strike" aria-label="Strikethrough">
            <Strikethrough />
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroupSeparator />

        <ToggleGroup attached variant="default" defaultValue={['left']}>
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroupSeparator />

        <ToggleGroup attached variant="tint" defaultValue={['code']}>
          <ToggleGroupItem value="code" aria-label="Code view">
            <Code />
          </ToggleGroupItem>
          <ToggleGroupItem value="ai" aria-label="AI Assist">
            <Sparkles />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-neutral-text-muted">
          Entire Group Disabled (disabled prop on ToggleGroup)
        </span>
        <ToggleGroup disabled variant="outline" defaultValue={['bold']}>
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-neutral-text-muted">
          Individual Item Disabled
        </span>
        <ToggleGroup variant="outline" defaultValue={['bold']}>
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem disabled value="italic" aria-label="Italic (disabled)">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};
