import type { Meta, StoryObj } from '@storybook/react';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupIndicator,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Cpu, Zap, Shield } from 'icons';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (props) => (
    <RadioGroup
      defaultValue="comfortable"
      className="max-w-sm"
      {...props}
    >
      <div className="flex items-center gap-2.5">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" orientation="horizontal">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="rh1" />
        <Label htmlFor="rh1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="rh2" />
        <Label htmlFor="rh2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="rh3" />
        <Label htmlFor="rh3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const CustomCards: Story = {
  render: () => (
    <RadioGroup defaultValue="pro" className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
      <RadioGroupItem value="starter" className="flex-col items-start gap-2 p-3.5">
        <div className="flex w-full items-center justify-between">
          <span className="flex size-7 items-center justify-center rounded-md bg-neutral-interactive text-neutral-text">
            <Cpu className="size-4" />
          </span>
          <span className="text-xs font-mono text-neutral-text-subtle">2 vCPU</span>
        </div>
        <div className="space-y-0.5">
          <div className="text-sm font-medium text-neutral-text">Starter</div>
          <div className="text-xs text-neutral-text-subtle">4 GB RAM · $12/mo</div>
        </div>
      </RadioGroupItem>

      <RadioGroupItem value="pro" className="flex-col items-start gap-2 p-3.5">
        <div className="flex w-full items-center justify-between">
          <span className="flex size-7 items-center justify-center rounded-md bg-neutral-interactive text-neutral-text">
            <Zap className="size-4" />
          </span>
          <span className="text-xs font-mono text-neutral-text-subtle">4 vCPU</span>
        </div>
        <div className="space-y-0.5">
          <div className="text-sm font-medium text-neutral-text">Performance</div>
          <div className="text-xs text-neutral-text-subtle">16 GB RAM · $36/mo</div>
        </div>
      </RadioGroupItem>

      <RadioGroupItem value="enterprise" className="flex-col items-start gap-2 p-3.5">
        <div className="flex w-full items-center justify-between">
          <span className="flex size-7 items-center justify-center rounded-md bg-neutral-interactive text-neutral-text">
            <Shield className="size-4" />
          </span>
          <span className="text-xs font-mono text-neutral-text-subtle">8 vCPU</span>
        </div>
        <div className="space-y-0.5">
          <div className="text-sm font-medium text-neutral-text">Dedicated</div>
          <div className="text-xs text-neutral-text-subtle">32 GB RAM · $72/mo</div>
        </div>
      </RadioGroupItem>
    </RadioGroup>
  ),
};

export const CustomCardsWithIndicator: Story = {
  render: () => (
    <RadioGroup defaultValue="fast" className="grid gap-2.5 max-w-md">
      <RadioGroupItem value="standard" className="items-start justify-between gap-3 p-3.5">
        <div className="space-y-1">
          <div className="text-sm font-medium leading-none text-neutral-text">
            Standard Delivery
          </div>
          <div className="text-xs text-neutral-text-subtle">
            Arrives in 4–6 business days · Free
          </div>
        </div>
        <RadioGroupIndicator className="mt-0.5" />
      </RadioGroupItem>

      <RadioGroupItem value="fast" className="items-start justify-between gap-3 p-3.5">
        <div className="space-y-1">
          <div className="text-sm font-medium leading-none text-neutral-text">
            Express Courier
          </div>
          <div className="text-xs text-neutral-text-subtle">
            Next-day air delivery with priority tracking · $14.00
          </div>
        </div>
        <RadioGroupIndicator className="mt-0.5" />
      </RadioGroupItem>

      <RadioGroupItem value="scheduled" className="items-start justify-between gap-3 p-3.5">
        <div className="space-y-1">
          <div className="text-sm font-medium leading-none text-neutral-text">
            Scheduled Window
          </div>
          <div className="text-xs text-neutral-text-subtle">
            Pick a 2-hour drop-off slot · $22.00
          </div>
        </div>
        <RadioGroupIndicator className="mt-0.5" />
      </RadioGroupItem>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" disabled className="max-w-sm">
      <div className="flex items-center gap-2.5">
        <RadioGroupItem value="default" id="rd1" />
        <Label htmlFor="rd1">Default (Disabled)</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <RadioGroupItem value="comfortable" id="rd2" />
        <Label htmlFor="rd2">Comfortable (Selected & Disabled)</Label>
      </div>
    </RadioGroup>
  ),
};

