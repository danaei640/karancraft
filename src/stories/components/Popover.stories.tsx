import type { Meta, StoryObj } from '@storybook/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SlidersHorizontal, Info, X } from 'lucide-react';

const meta: Meta<any> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size scale determining popover width and internal padding.',
    },
    withArrow: {
      control: 'boolean',
      description: 'Whether to render an aligned arrow pointer toward the anchor trigger.',
    },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Preferred side of the trigger to render the popover.',
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    size: 'default',
    withArrow: true,
    side: 'bottom',
  },
  render: (args: any) => (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Open Popover
          </Button>
        }
      />
      <PopoverContent
        size={args.size}
        withArrow={args.withArrow}
        side={args.side}
      >
        <PopoverHeader>
          <div className="flex items-center justify-between">
            <PopoverTitle>Display Settings</PopoverTitle>
            <PopoverClose render={<Button variant="ghost" size="icon-xs" className="h-5 w-5"><X className="h-3 w-3" /></Button>} />
          </div>
          <PopoverDescription>
            Adjust layer properties and canvas attributes.
          </PopoverDescription>
        </PopoverHeader>
        <div className="space-y-3 py-2">
          <div className="space-y-1">
            <Label htmlFor="popover-width" className="text-xs">Width</Label>
            <Input id="popover-width" defaultValue="100%" size="sm" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="popover-height" className="text-xs">Max Height</Label>
            <Input id="popover-height" defaultValue="320px" size="sm" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger
            render={
              <Button variant="outline" size="sm" className="capitalize">
                {side}
              </Button>
            }
          />
          <PopoverContent side={side} withArrow size="sm">
            <PopoverHeader>
              <PopoverTitle className="capitalize text-xs">{side} Popover</PopoverTitle>
              <PopoverDescription>
                Anchored to {side} with collision detection.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm">Size: sm</Button>} />
        <PopoverContent size="sm" withArrow>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary-fill shrink-0" />
            <p className="text-xs">Compact popover suited for quick tips and micro forms.</p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="default">Size: default</Button>} />
        <PopoverContent size="default" withArrow>
          <PopoverHeader>
            <PopoverTitle>Standard Width</PopoverTitle>
            <PopoverDescription>
              Default popover size accommodating form fields and multi-line descriptions.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="lg">Size: lg</Button>} />
        <PopoverContent size="lg" withArrow>
          <PopoverHeader>
            <PopoverTitle>Large Card Popover</PopoverTitle>
            <PopoverDescription>
              Expanded width suitable for rich preview cards, filter complexes, or tables.
            </PopoverDescription>
          </PopoverHeader>
          <div className="mt-3 rounded-lg bg-neutral-interactive/25 p-3 text-xs text-neutral-text-muted">
            Provides generous layout width up to 384px (24rem).
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
