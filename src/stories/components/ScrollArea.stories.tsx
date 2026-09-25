import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const tags = Array.from({ length: 30 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-2xl border p-4">
      <div className="p-1">
        <h4 className="mb-4 text-sm font-medium leading-none font-heading">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm py-1 font-mono text-muted-foreground">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
