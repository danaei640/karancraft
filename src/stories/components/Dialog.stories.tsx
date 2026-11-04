import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  type DialogSize,
} from '@/components/ui/dialog';
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
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/registry/bases/base/hooks/use-mobile';

interface DialogStoryProps {
  size?: DialogSize;
  title?: string;
  description?: string;
}

const meta: Meta<any> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'full'],
      description: 'Modal width, padding density, and typography scale',
    },
    title: {
      control: 'text',
      description: 'Header title text',
    },
    description: {
      control: 'text',
      description: 'Header subtitle description text',
    },
  },
  args: {
    size: 'default',
    title: 'Edit Profile',
    description: "Make changes to your account settings here. Click save when you're done.",
  },
};

export default meta;
type Story = StoryObj<DialogStoryProps>;

export const Default: Story = {
  render: (args) => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Open Dialog</Button>} />
      <DialogContent size={args.size}>
        <DialogHeader>
          <DialogTitle>{args.title}</DialogTitle>
          <DialogDescription>{args.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-1">
          <div className="grid grid-cols-4 items-center gap-3">
            <Label htmlFor="dialog-name" className="text-end text-xs">
              Name
            </Label>
            <Input id="dialog-name" defaultValue="Karan Arora" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-3">
            <Label htmlFor="dialog-username" className="text-end text-xs">
              Username
            </Label>
            <Input id="dialog-username" defaultValue="@karan" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Sizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = React.useState<DialogSize | null>(null);

    return (
      <div className="flex flex-wrap items-center gap-3">
        {(['sm', 'default', 'lg', 'xl'] as DialogSize[]).map((size) => (
          <Dialog
            key={size}
            open={openSize === size}
            onOpenChange={(isOpen) => setOpenSize(isOpen ? size : null)}
          >
            <DialogTrigger render={<Button variant="outline">Size: {size}</Button>} />
            <DialogContent size={size}>
              <DialogHeader>
                <DialogTitle>Dialog Tier: {size.toUpperCase()}</DialogTitle>
                <DialogDescription>
                  Padding, gap density, and title typography scale automatically with `{size}`.
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg bg-neutral-surface/50 p-3 text-xs text-neutral-text-muted space-y-1">
                <p><strong>Size Tier:</strong> {size}</p>
                <p><strong>Border:</strong> Clean borderless surface with elevation shadow.</p>
                <p><strong>Density:</strong> Proportional spacing ({size === 'sm' ? 'p-4 gap-3' : size === 'lg' || size === 'xl' ? 'p-8 gap-5' : 'p-6 gap-4'}).</p>
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline">Close</Button>} />
                <Button onClick={() => setOpenSize(null)}>Understood</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    );
  },
};

export const WithScrollableBody: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Terms &amp; Privacy</Button>} />
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Terms of Service &amp; Data Policies</DialogTitle>
          <DialogDescription>
            Please review our latest usage guidelines before continuing.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="max-h-64 space-y-3 text-sm text-neutral-text-muted pe-2">
          <p>
            Welcome to Karan UI. By using this software, you agree to comply with our design guidelines,
            accessible contrast policies, and component lifecycle specifications.
          </p>
          <p>
            All components are built upon Base UI primitives and follow mathematical OKLCH color token
            distribution to ensure accessible readability and minimal visual fatigue.
          </p>
          <p>
            We strictly enforce RTL and LTR bidirectional layout support using CSS logical properties such
            as start, end, ps, pe, ms, and me.
          </p>
          <p>
            Our dialog surface is clean and borderless, utilizing soft elevation shadows and responsive
            touch drawer pairing for mobile viewports.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Decline</Button>} />
          <Button>Accept &amp; Proceed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ResponsiveDialogDrawer: Story = {
  render: () => {
    const isMobile = useIsMobile();
    const [open, setOpen] = React.useState(false);

    if (isMobile) {
      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger render={<Button>Open Responsive (Mobile Drawer)</Button>} />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Responsive Settings</DrawerTitle>
              <DrawerDescription>
                Automatically rendered as a swipeable gesture drawer on mobile viewports.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile-email">Email Address</Label>
                <Input id="mobile-email" defaultValue="karan@example.com" />
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Save Settings</Button>
              <DrawerClose render={<Button variant="outline">Cancel</Button>} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button>Open Responsive (Desktop Modal)</Button>} />
        <DialogContent size="default">
          <DialogHeader>
            <DialogTitle>Responsive Settings</DialogTitle>
            <DialogDescription>
              Automatically rendered as a centered modal Dialog on desktop viewports.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="desktop-email">Email Address</Label>
              <Input id="desktop-email" defaultValue="karan@example.com" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button onClick={() => setOpen(false)}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
