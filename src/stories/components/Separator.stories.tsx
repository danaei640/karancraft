import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@/components/ui/separator';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args: any) => (
    <div className="w-[300px] py-4">
      <div className="text-xs text-muted-foreground mb-2">Content Above</div>
      <Separator orientation={args?.orientation || 'horizontal'} />
      <div className="text-xs text-muted-foreground mt-2">Content Below</div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px] space-y-1">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none font-heading">Karan UI Core</h4>
        <p className="text-xs text-muted-foreground">An open-source registry designed for modern React.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-xs">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};
