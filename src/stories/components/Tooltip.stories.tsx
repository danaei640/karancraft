import type { Meta, StoryObj } from '@storybook/react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>} />
        <TooltipContent>
          <p>Add new project</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const Positions: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4 items-center">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm">Top</Button>} />
          <TooltipContent side="top">Tooltip on Top</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm">Right</Button>} />
          <TooltipContent side="right">Tooltip on Right</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm">Bottom</Button>} />
          <TooltipContent side="bottom">Tooltip on Bottom</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm">Left</Button>} />
          <TooltipContent side="left">Tooltip on Left</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};
