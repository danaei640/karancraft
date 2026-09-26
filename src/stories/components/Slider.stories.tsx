import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@/components/ui/slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-neutral-text">Volume Level</span>
        <span className="font-mono text-neutral-text-muted">40%</span>
      </div>
      <Slider defaultValue={[40]} max={100} step={1} {...args} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-neutral-text">Price Filter</span>
        <span className="font-mono text-neutral-text-muted">$25 – $75</span>
      </div>
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  ),
};

export const DiscreteSteps: Story = {
  render: () => (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-neutral-text">Quality Level</span>
        <span className="font-mono text-neutral-text-muted">High (75)</span>
      </div>
      <Slider defaultValue={[75]} min={0} max={100} step={25} />
      <div className="flex justify-between text-[10px] text-neutral-text-muted font-mono px-0.5">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </div>
  ),
};
