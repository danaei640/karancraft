import type { Meta, StoryObj } from '@storybook/react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, Settings, User, Bell, Shield, Sparkles } from 'lucide-react';

const meta: Meta<any> = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['right', 'left', 'bottom', 'top', 'start', 'end'],
      description: 'The edge of the screen from which the sheet slides in.',
    },
    floating: {
      control: 'boolean',
      description: 'Whether to render as a floating card with margin and rounded corners (true) or flush to the viewport edge (false).',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'full'],
      description: 'The width (for side sheets) or height (for top/bottom sheets) scale.',
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    side: 'right',
    floating: false,
    size: 'default',
  },
  render: (args: any) => (
    <Sheet side={args.side} floating={args.floating}>
      <SheetTrigger render={<Button variant="outline">Open Sheet ({args.side || 'right'})</Button>} />
      <SheetContent side={args.side} floating={args.floating} size={args.size}>
        <SheetHeader>
          <SheetTitle>Sheet Preview</SheetTitle>
          <SheetDescription>
            Side drawer panel with docked edge styling and exact shadcn slide transitions.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-4 py-2">
            <div className="rounded-lg border border-neutral-interactive/50 bg-neutral-surface/60 p-4">
              <h4 className="text-sm font-medium text-neutral-text">Active Properties</h4>
              <p className="mt-1 text-xs text-neutral-text-muted">
                Side: <span className="font-mono text-primary-fill">{args.side || 'right'}</span> &bull;{' '}
                Floating: <span className="font-mono text-primary-fill">{String(args.floating ?? true)}</span> &bull;{' '}
                Size: <span className="font-mono text-primary-fill">{args.size || 'default'}</span>
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-email">Email Address</Label>
              <Input id="sheet-email" type="email" placeholder="karan@example.com" />
            </div>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Save Settings</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['right', 'left', 'bottom', 'top'] as const).map((side) => (
        <Sheet key={side} side={side}>
          <SheetTrigger
            render={
              <Button variant="outline">
                Open {side.charAt(0).toUpperCase() + side.slice(1)}
              </Button>
            }
          />
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{side.charAt(0).toUpperCase() + side.slice(1)} Sheet</SheetTitle>
              <SheetDescription>
                Anchored to the {side} edge of the viewport.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              <p className="text-sm text-neutral-text-muted">
                Seamless gesture dismiss and responsive styling are preserved across all four viewport sides.
              </p>
            </SheetBody>
            <SheetFooter>
              <SheetClose render={<Button variant="outline">Dismiss</Button>} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

export const FloatingVsFlush: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Sheet side="right" floating={true}>
        <SheetTrigger render={<Button intent="primary">Floating Sheet (Default)</Button>} />
        <SheetContent side="right" floating={true}>
          <SheetHeader>
            <SheetTitle>Floating Sheet</SheetTitle>
            <SheetDescription>
              Floating islands detached from viewport edges with rounded corners and soft borders.
            </SheetDescription>
          </SheetHeader>
          <SheetBody>
            <div className="rounded-lg border border-neutral-interactive/60 bg-neutral-surface/40 p-3 text-xs text-neutral-text-muted">
              <code>floating=&#123;true&#125;</code> adds perimeter inset spacing and rounded-2xl radii to maintain a modern, elevated card feel.
            </div>
          </SheetBody>
          <SheetFooter>
            <SheetClose render={<Button variant="outline">Close</Button>} />
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet side="right" floating={false}>
        <SheetTrigger render={<Button variant="outline">Flush Sheet (Edge to Edge)</Button>} />
        <SheetContent side="right" floating={false}>
          <SheetHeader>
            <SheetTitle>Flush Sheet</SheetTitle>
            <SheetDescription>
              Traditional edge-to-edge panel flush with the browser viewport.
            </SheetDescription>
          </SheetHeader>
          <SheetBody>
            <div className="rounded-lg border border-neutral-interactive/60 bg-neutral-surface/40 p-3 text-xs text-neutral-text-muted">
              <code>floating=&#123;false&#125;</code> aligns flush against the window frame without external margins.
            </div>
          </SheetBody>
          <SheetFooter>
            <SheetClose render={<Button variant="outline">Close</Button>} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  ),
};

export const NavigationDrawer: Story = {
  render: () => (
    <Sheet side="start">
      <SheetTrigger render={<Button variant="secondary">Open Navigation</Button>} />
      <SheetContent side="start" size="sm">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-fill text-neutral-surface">
              <Sparkles className="h-4 w-4" />
            </div>
            <SheetTitle>Karan Workspace</SheetTitle>
          </div>
          <SheetDescription>Quick navigation and project settings.</SheetDescription>
        </SheetHeader>
        <SheetBody className="flex flex-col gap-1 py-3">
          <Button variant="ghost" className="justify-start gap-2.5">
            <Home className="h-4 w-4 text-neutral-text-muted" />
            Overview
          </Button>
          <Button variant="ghost" className="justify-start gap-2.5">
            <User className="h-4 w-4 text-neutral-text-muted" />
            Team Members
          </Button>
          <Button variant="ghost" className="justify-start gap-2.5">
            <Bell className="h-4 w-4 text-neutral-text-muted" />
            Notifications
          </Button>
          <Button variant="ghost" className="justify-start gap-2.5">
            <Shield className="h-4 w-4 text-neutral-text-muted" />
            Security &amp; Keys
          </Button>
          <Button variant="ghost" className="justify-start gap-2.5">
            <Settings className="h-4 w-4 text-neutral-text-muted" />
            Preferences
          </Button>
        </SheetBody>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" className="w-full">Close Menu</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['sm', 'default', 'lg', 'xl'] as const).map((size) => (
        <Sheet key={size} side="right">
          <SheetTrigger render={<Button variant="outline">Size: {size}</Button>} />
          <SheetContent side="right" size={size}>
            <SheetHeader>
              <SheetTitle>Sheet Size: {size}</SheetTitle>
              <SheetDescription>
                Testing proportional width scaling for side panel layout.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              <p className="text-sm text-neutral-text-muted">
                Content neatly adapts within the {size} sizing tier.
              </p>
            </SheetBody>
            <SheetFooter>
              <SheetClose render={<Button variant="outline">Dismiss</Button>} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};
