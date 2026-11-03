import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const PERMISSIONS = [
  { value: 'read', label: 'Read repository contents' },
  { value: 'write', label: 'Push commits & branches' },
  { value: 'deploy', label: 'Trigger production deployments' },
  { value: 'admin', label: 'Manage team access & webhooks' },
];

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
  args: {
    defaultChecked: true,
    indeterminate: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args: any) => (
    <div className="flex items-center gap-2.5">
      <Checkbox id="checkbox-default" {...args} />
      <Label htmlFor="checkbox-default" className="cursor-pointer">
        Enable real-time notifications
      </Label>
    </div>
  ),
};

export const IndeterminateState: Story = {
  render: () => {
    const [state, setState] = React.useState<'unchecked' | 'indeterminate' | 'checked'>('indeterminate');

    const cycleState = () => {
      setState((prev) =>
        prev === 'unchecked'
          ? 'indeterminate'
          : prev === 'indeterminate'
            ? 'checked'
            : 'unchecked'
      );
    };

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="checkbox-indeterminate-demo"
            checked={state === 'checked'}
            indeterminate={state === 'indeterminate'}
            onCheckedChange={cycleState}
          />
          <Label htmlFor="checkbox-indeterminate-demo" className="cursor-pointer">
            Tri-state checkbox ({state})
          </Label>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-text-muted">
          <span>Click checkbox or</span>
          <button
            type="button"
            onClick={cycleState}
            className="rounded-md bg-neutral-interactive px-2 py-0.5 font-mono text-[11px] text-neutral-text hover:bg-neutral-interactive-hover cursor-pointer"
          >
            Cycle state
          </button>
        </div>
      </div>
    );
  },
};

export const GroupWithIndeterminateParent: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['read', 'write']);

    return (
      <div className="w-full max-w-xs rounded-xl border border-neutral-interactive/60 bg-neutral-surface p-4 shadow-2xs">
        <CheckboxGroup
          value={selected}
          onValueChange={setSelected}
          allValues={PERMISSIONS.map((p) => p.value)}
        >
          <Label className="flex items-center gap-2.5 border-b border-neutral-interactive/40 pb-2.5 font-semibold text-neutral-text cursor-pointer">
            <Checkbox parent />
            <span>Select all permissions</span>
            <span className="ms-auto font-mono text-[11px] font-normal text-neutral-text-muted">
              {selected.length}/{PERMISSIONS.length}
            </span>
          </Label>

          <div className="flex flex-col gap-2 pt-1 ps-5">
            {PERMISSIONS.map((item) => (
              <Label
                key={item.value}
                className="flex items-center gap-2.5 font-normal text-neutral-text-secondary hover:text-neutral-text cursor-pointer"
              >
                <Checkbox value={item.value} />
                <span>{item.label}</span>
              </Label>
            ))}
          </div>
        </CheckboxGroup>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked">Disabled unchecked</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="disabled-indeterminate" disabled indeterminate />
        <Label htmlFor="disabled-indeterminate">Disabled indeterminate</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked">Disabled checked</Label>
      </div>
    </div>
  ),
};
