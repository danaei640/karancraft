import type { Meta, StoryObj } from '@storybook/react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="max-w-md rounded-2xl border min-h-[200px]"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6 text-sm font-semibold">
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6 text-sm font-semibold">
          Main Content
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
