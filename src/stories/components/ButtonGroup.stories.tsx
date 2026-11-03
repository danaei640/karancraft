import type { Meta, StoryObj } from '@storybook/react';
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Copy,
  Download,
  GitBranch,
  Globe,
  Italic,
  Layers,
  Plus,
  Rocket,
  Share2,
  Sparkles,
  Trash2,
  Underline,
} from 'icons';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    attached: true,
    variant: 'outline',
    intent: 'neutral',
    size: 'default',
    disabled: false,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button leading={<Copy />}>Copy</Button>
      <Button leading={<Share2 />}>Share</Button>
      <Button leading={<Download />}>Export</Button>
    </ButtonGroup>
  ),
};

export const VariantsAndIntents: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-4">
        <ButtonGroup variant="default" intent="primary">
          <Button leading={<Rocket />}>Deploy</Button>
          <Button>Staging</Button>
          <Button size="icon" aria-label="More deploy options">
            <ChevronDown />
          </Button>
        </ButtonGroup>

        <ButtonGroup variant="default" intent="neutral">
          <Button>Year</Button>
          <Button>Month</Button>
          <Button>Day</Button>
        </ButtonGroup>

        <ButtonGroup variant="default" intent="warning">
          <Button>Review</Button>
          <Button>Hold</Button>
        </ButtonGroup>

        <ButtonGroup variant="default" intent="danger">
          <Button leading={<Trash2 />}>Purge Cache</Button>
          <Button size="icon" aria-label="Purge options">
            <ChevronDown />
          </Button>
        </ButtonGroup>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <ButtonGroup variant="secondary" intent="neutral">
          <Button leading={<Copy />}>Copy</Button>
          <Button leading={<Share2 />}>Share</Button>
          <Button leading={<Download />}>Download</Button>
        </ButtonGroup>

        <ButtonGroup variant="secondary" intent="primary">
          <Button leading={<Sparkles />}>Generate</Button>
          <Button>Variations</Button>
        </ButtonGroup>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <ButtonGroup variant="outline" intent="neutral">
          <Button>Overview</Button>
          <Button>Metrics</Button>
          <Button>Logs</Button>
        </ButtonGroup>

        <ButtonGroup variant="outline" intent="primary">
          <Button leading={<GitBranch />}>main</Button>
          <Button>v2.4.0</Button>
        </ButtonGroup>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <ButtonGroup variant="ghost" intent="neutral">
          <Button size="icon" aria-label="Bold">
            <Bold />
          </Button>
          <Button size="icon" aria-label="Italic">
            <Italic />
          </Button>
          <Button size="icon" aria-label="Underline">
            <Underline />
          </Button>
        </ButtonGroup>

        <ButtonGroup variant="ghost" intent="primary">
          <Button leading={<AlignLeft />}>Start</Button>
          <Button leading={<AlignCenter />}>Center</Button>
          <Button leading={<AlignRight />}>End</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const SplitButton: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonGroup variant="default" intent="primary" size="sm">
        <Button leading={<Plus />}>New Issue</Button>
        <Button size="icon-sm" aria-label="More creation options">
          <ChevronDown />
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="default" intent="primary" size="default">
        <Button leading={<Rocket />}>Publish Registry</Button>
        <Button size="icon" aria-label="Publish target options">
          <ChevronDown />
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="outline" intent="neutral" size="lg">
        <Button leading={<GitBranch />}>Merge Pull Request</Button>
        <Button size="icon-lg" aria-label="Select merge strategy">
          <ChevronDown />
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup variant="outline" size="xs">
        <ButtonGroupText>XS (24px)</ButtonGroupText>
        <Button leading={<Copy />}>Copy</Button>
        <Button>Duplicate</Button>
        <Button size="icon-xs" aria-label="More">
          <ChevronDown />
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="outline" size="sm">
        <ButtonGroupText>SM (28px)</ButtonGroupText>
        <Button leading={<Copy />}>Copy</Button>
        <Button>Duplicate</Button>
        <Button size="icon-sm" aria-label="More">
          <ChevronDown />
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="outline" size="default">
        <ButtonGroupText>Default (32px)</ButtonGroupText>
        <Button leading={<Copy />}>Copy</Button>
        <Button>Duplicate</Button>
        <Button size="icon" aria-label="More">
          <ChevronDown />
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="outline" size="lg">
        <ButtonGroupText>LG (36px)</ButtonGroupText>
        <Button leading={<Copy />}>Copy</Button>
        <Button>Duplicate</Button>
        <Button size="icon-lg" aria-label="More">
          <ChevronDown />
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const WithTextAndSeparator: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonGroup variant="outline" size="default">
        <ButtonGroupText>
          <GitBranch />
          Branch
        </ButtonGroupText>
        <Button>main</Button>
        <Button size="icon" aria-label="Switch branch">
          <ChevronDown />
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="ghost" size="default">
        <Button size="icon" aria-label="Bold">
          <Bold />
        </Button>
        <Button size="icon" aria-label="Italic">
          <Italic />
        </Button>
        <Button size="icon" aria-label="Underline">
          <Underline />
        </Button>
        <ButtonGroupSeparator />
        <Button size="icon" aria-label="Align start">
          <AlignLeft />
        </Button>
        <Button size="icon" aria-label="Align center">
          <AlignCenter />
        </Button>
        <Button size="icon" aria-label="Align end">
          <AlignRight />
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const SeparatedToolbar: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-neutral-text-secondary">
          Attached (default) — joined bar with collapsed inner radii
        </span>
        <ButtonGroup attached variant="outline" size="default">
          <Button leading={<Layers />}>Layers</Button>
          <Button leading={<Copy />}>Duplicate</Button>
          <Button leading={<Share2 />}>Share</Button>
        </ButtonGroup>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-neutral-text-secondary">
          Separated (attached=false) — spaced toolbar with individual corner radii
        </span>
        <ButtonGroup attached={false} variant="outline" size="default">
          <Button leading={<Layers />}>Layers</Button>
          <Button leading={<Copy />}>Duplicate</Button>
          <Button leading={<Share2 />}>Share</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const VerticalOrientation: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <ButtonGroup orientation="vertical" variant="outline" className="w-44">
        <Button wide align="start" leading={<Layers />}>
          All Layers
        </Button>
        <Button wide align="start" leading={<Copy />}>
          Duplicate Selection
        </Button>
        <Button wide align="start" leading={<Download />}>
          Export Assets
        </Button>
      </ButtonGroup>

      <ButtonGroup orientation="vertical" variant="secondary" className="w-44">
        <Button wide align="start" leading={<Globe />}>
          Production
        </Button>
        <Button wide align="start" leading={<GitBranch />}>
          Preview
        </Button>
        <Button wide align="start" leading={<Sparkles />}>
          Development
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const BidirectionalRTL: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div dir="ltr" className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-neutral-text-secondary">
          LTR (dir=&quot;ltr&quot;) — Logical start is left, end is right
        </span>
        <ButtonGroup variant="outline">
          <ButtonGroupText>
            <Globe />
            Region
          </ButtonGroupText>
          <Button>Europe</Button>
          <Button>Asia</Button>
          <Button size="icon" aria-label="More regions">
            <ChevronDown />
          </Button>
        </ButtonGroup>
      </div>

      <div dir="rtl" className="flex flex-col items-start gap-1.5">
        <span className="text-xs font-medium text-neutral-text-secondary">
          RTL (dir=&quot;rtl&quot;) — Logical start is right, end is left
        </span>
        <ButtonGroup variant="outline">
          <ButtonGroupText>
            <Globe />
            منطقه
          </ButtonGroupText>
          <Button>اروپا</Button>
          <Button>آسیا</Button>
          <Button size="icon" aria-label="گزینه‌های بیشتر">
            <ChevronDown />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};
