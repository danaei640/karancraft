import type { Meta, StoryObj } from '@storybook/react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">@karan-ui starred 3 repositories</h4>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm"><ChevronsUpDown className="h-4 w-4" /></Button>} />
      </div>
      <div className="rounded-md border px-4 py-3 text-sm font-mono">
        @base-ui/react
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm font-mono">
          nextjs-16
        </div>
        <div className="rounded-md border px-4 py-3 text-sm font-mono">
          tailwindcss-v4
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
