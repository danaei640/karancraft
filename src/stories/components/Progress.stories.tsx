import type { Meta, StoryObj } from '@storybook/react';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 65,
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (args: any) => (
    <div className="w-[350px]">
      <Progress {...args} />
    </div>
  ),
};

export const WithLabelAndValue: Story = {
  render: () => (
    <div className="w-[350px]">
      <Progress value={78}>
        <div className="flex justify-between w-full text-xs text-neutral-text-muted mb-1">
          <ProgressLabel>Downloading assets...</ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>
    </div>
  ),
};
