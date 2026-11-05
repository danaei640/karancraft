import type { Meta, StoryObj } from '@storybook/react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Copy, Bookmark, Share2 } from 'lucide-react';

const meta: Meta<any> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'The preferred side of the anchor trigger to render the tooltip.',
    },
    withArrow: {
      control: 'boolean',
      description: 'Whether to render the pointing arrow indicator.',
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    side: 'top',
    withArrow: true,
  },
  render: (args: any) => (
    <TooltipProvider>
      <div className="flex items-center justify-center p-8">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon" aria-label="Add project">
                <Plus className="h-4 w-4" />
              </Button>
            }
          />
          <TooltipContent
            side={args.side}
            withArrow={args.withArrow}
            sideOffset={args.sideOffset}
          >
            Create new project
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const Positions: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4 items-center justify-center p-8">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm">Top</Button>} />
          <TooltipContent side="top">Tooltip positioned Top</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm">Right</Button>} />
          <TooltipContent side="right">Tooltip positioned Right</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm">Bottom</Button>} />
          <TooltipContent side="bottom">Tooltip positioned Bottom</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm">Left</Button>} />
          <TooltipContent side="left">Tooltip positioned Left</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const ActionToolbarWithHotkeys: Story = {
  render: () => (
    <TooltipProvider delay={100}>
      <div className="flex items-center gap-1.5 rounded-lg border border-neutral-interactive/60 bg-neutral-surface p-1.5 shadow-sm">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Copy to clipboard">
                <Copy className="h-4 w-4" />
              </Button>
            }
          />
          <TooltipContent side="top" className="flex items-center gap-2">
            <span>Copy snippet</span>
            <kbd className="rounded bg-neutral-surface/20 px-1 py-0.5 text-[10px] font-mono text-neutral-surface">
              ⌘C
            </kbd>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Bookmark component">
                <Bookmark className="h-4 w-4" />
              </Button>
            }
          />
          <TooltipContent side="top" className="flex items-center gap-2">
            <span>Save to favorites</span>
            <kbd className="rounded bg-neutral-surface/20 px-1 py-0.5 text-[10px] font-mono text-neutral-surface">
              ⌘D
            </kbd>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Share URL">
                <Share2 className="h-4 w-4" />
              </Button>
            }
          />
          <TooltipContent side="top">
            Share link
          </TooltipContent>
        </Tooltip>

        <div className="h-4 w-px bg-neutral-interactive/60 mx-1" />

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-danger-text hover:bg-danger-surface"
                aria-label="Delete entry"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            }
          />
          <TooltipContent side="top" className="text-danger-surface">
            Remove permanently
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const WithoutArrow: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex items-center justify-center p-6">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Clean Floating Pill</Button>} />
          <TooltipContent withArrow={false}>
            No pointer arrow rendered
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};
