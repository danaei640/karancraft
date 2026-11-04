import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  type DrawerSide,
  type DrawerSize,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface DrawerStoryProps {
  side?: DrawerSide;
  floating?: boolean;
  size?: DrawerSize;
  title?: string;
  description?: string;
  showSwipeHandle?: boolean;
}

const meta: Meta<DrawerStoryProps> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
      description: 'The edge from which the drawer slides in',
    },
    floating: {
      control: 'boolean',
      description: 'When true, renders with an inset margin, rounded corners, and soft shadow',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'full'],
      description: 'Drawer sizing scale',
    },
    showSwipeHandle: {
      control: 'boolean',
      description: 'Whether to show the touch drag handle indicator',
    },
    title: {
      control: 'text',
      description: 'Drawer title',
    },
    description: {
      control: 'text',
      description: 'Drawer subtitle description',
    },
  },
  args: {
    side: 'bottom',
    floating: true,
    size: 'default',
    title: 'Daily Fitness Goal',
    description: 'Adjust and track your active workout metrics.',
    showSwipeHandle: true,
  },
};

export default meta;
type Story = StoryObj<DrawerStoryProps>;

export const Default: Story = {
  render: (args) => (
    <Drawer
      side={args.side}
      floating={args.floating}
      size={args.size}
      showSwipeHandle={args.showSwipeHandle}
    >
      <DrawerTrigger render={<Button variant="outline">Open Drawer ({args.side})</Button>} />
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{args.title}</DrawerTitle>
            <DrawerDescription>{args.description}</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className="p-4 pb-0 text-center">
            <div className="text-5xl font-bold tracking-tighter text-neutral-text">420</div>
            <div className="text-neutral-text-muted text-xs uppercase tracking-wider mt-1">
              Calories burned today
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button>Save Progress</Button>
            <DrawerClose render={<Button variant="outline">Cancel</Button>} />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

export const FloatingVsFlush: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Drawer side="bottom" floating={true}>
        <DrawerTrigger render={<Button>Floating Card Drawer (Default)</Button>} />
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Floating Inset Drawer</DrawerTitle>
              <DrawerDescription>
                Renders with `floating={true}`, giving an inset margin, rounded-2xl curvature, and deep soft shadow.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline">Dismiss</Button>} />
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer side="bottom" floating={false}>
        <DrawerTrigger render={<Button variant="secondary">Flush Edge Drawer</Button>} />
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Flush Edge Drawer</DrawerTitle>
              <DrawerDescription>
                Renders with `floating={false}`, perfectly flush with the viewport perimeter.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline">Dismiss</Button>} />
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(['left', 'right', 'top', 'bottom'] as DrawerSide[]).map((side) => (
        <Drawer key={side} side={side} floating={true}>
          <DrawerTrigger render={<Button variant="outline">Slide from {side}</Button>} />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer: {side.toUpperCase()}</DrawerTitle>
              <DrawerDescription>
                Unified gesture drawer sliding from the {side} edge.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody className="p-4 text-sm text-neutral-text-secondary">
              Fully aligned with RTL and LTR logical properties without hardcoded directional offsets.
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline">Close</Button>} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};
