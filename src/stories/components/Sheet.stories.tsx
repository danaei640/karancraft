import type { Meta, StoryObj } from '@storybook/react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    side: 'right',
  },
  render: (args: any) => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open Sheet ({args?.side || 'right'})</Button>} />
      <SheetContent side={args?.side || 'right'}>
        <SheetHeader>
          <SheetTitle>Sheet Preview</SheetTitle>
          <SheetDescription>
            This sheet dynamically mounts on the selected side.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 text-sm text-neutral-text-muted">
          Single sheet component responsive to controls.
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open Sheet (Right)</Button>} />
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sheet-name" className="text-right">Name</Label>
            <Input id="sheet-name" defaultValue="Karan Arora" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sheet-username" className="text-right">Username</Label>
            <Input id="sheet-username" defaultValue="@karan" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit">Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary">Open Navigation (Left)</Button>} />
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Explore project directories and registry resources.</SheetDescription>
        </SheetHeader>
        <div className="py-6 flex flex-col gap-2">
          <Button variant="ghost" className="justify-start">Overview</Button>
          <Button variant="ghost" className="justify-start">Components</Button>
          <Button variant="ghost" className="justify-start">Documentation</Button>
          <Button variant="ghost" className="justify-start">Settings</Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};
