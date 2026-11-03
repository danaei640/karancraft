import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@/components/ui/slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

function DefaultSliderDemo(args: React.ComponentProps<typeof Slider>) {
  const [val, setVal] = React.useState<number[]>([40]);

  return (
    <div className="w-full max-w-xs space-y-6">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-neutral-text">Volume Level</span>
        <span className="font-mono text-neutral-text-muted">{val[0]}%</span>
      </div>
      <Slider
        value={val}
        onValueChange={(next) =>
          setVal(Array.isArray(next) ? [...next] : [next])
        }
        max={100}
        step={1}
        {...args}
      />
    </div>
  );
}

export const Default: Story = {
  render: (args) => <DefaultSliderDemo {...args} />,
};

export const WithTooltip: Story = {
  render: () => (
    <div className="w-full max-w-xs space-y-8 pt-4">
      <div className="space-y-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-neutral-text">
            Real-Time Value Tooltip
          </span>
          <span className="font-mono text-[11px] text-neutral-text-muted">
            tooltip
          </span>
        </div>
        <Slider defaultValue={[45]} max={100} step={1} tooltip />
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-neutral-text">
            Custom Tooltip Label
          </span>
          <span className="font-mono text-[11px] text-neutral-text-muted">
            tooltip=&quot;Volume&quot;
          </span>
        </div>
        <Slider defaultValue={[68]} max={100} step={1} tooltip="Volume" />
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-neutral-text">
            Unit Suffix Label
          </span>
          <span className="font-mono text-[11px] text-neutral-text-muted">
            tooltip=&quot;%&quot;
          </span>
        </div>
        <Slider defaultValue={[80]} max={100} step={1} tooltip="%" />
      </div>
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-full max-w-xs space-y-6 pt-4">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-neutral-text">Price Filter</span>
        <span className="font-mono text-neutral-text-muted">Dual Thumb</span>
      </div>
      <Slider defaultValue={[25, 75]} max={100} step={1} tooltip="$" />
    </div>
  ),
};

export const DiscreteSteps: Story = {
  render: () => (
    <div className="w-full max-w-xs space-y-6 pt-4">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-neutral-text">Quality Level</span>
        <span className="font-mono text-neutral-text-muted">Step 25</span>
      </div>
      <Slider defaultValue={[75]} min={0} max={100} step={25} tooltip />
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
