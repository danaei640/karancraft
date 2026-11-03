import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const MODULES = [
  { value: 'auth', label: 'Authentication & SSO' },
  { value: 'billing', label: 'Usage Billing & Invoicing' },
  { value: 'webhooks', label: 'Outbound Event Webhooks' },
  { value: 'audit', label: 'Immutable Audit Logs' },
];

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    orientation: 'vertical',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  render: (args: any) => {
    const [value, setValue] = React.useState<string[]>(['auth', 'webhooks']);

    return (
      <div className="w-full max-w-sm rounded-xl border border-neutral-interactive/60 bg-neutral-surface p-4 shadow-2xs">
        <CheckboxGroup
          {...args}
          value={value}
          onValueChange={setValue}
        >
          <Label className="flex items-center gap-2.5 border-b border-neutral-interactive/40 pb-2.5 font-semibold text-neutral-text cursor-pointer">
            <Checkbox parent />
            <span>Platform Modules</span>
            <span className="ms-auto font-mono text-[11px] font-normal text-neutral-text-muted">
              {value.length === 0
                ? 'None'
                : value.length === MODULES.length
                  ? 'All selected'
                  : `${value.length} of ${MODULES.length} (Indeterminate)`}
            </span>
          </Label>

          <div
            className={
              args.orientation === 'horizontal'
                ? 'flex flex-row flex-wrap items-center gap-4 pt-1'
                : 'flex flex-col gap-2.5 pt-1 ps-5'
            }
          >
            {MODULES.map((mod) => (
              <Label
                key={mod.value}
                className="flex items-center gap-2.5 font-normal text-neutral-text-secondary hover:text-neutral-text cursor-pointer"
              >
                <Checkbox value={mod.value} />
                <span>{mod.label}</span>
              </Label>
            ))}
          </div>
        </CheckboxGroup>
      </div>
    );
  },
};

export const HorizontalGroup: Story = {
  render: () => (
    <CheckboxGroup
      orientation="horizontal"
      defaultValue={['email', 'push']}
    >
      <Label className="flex items-center gap-2 font-semibold text-neutral-text cursor-pointer pe-2 border-e border-neutral-interactive/50">
        <Checkbox parent />
        <span>All Channels</span>
      </Label>
      <Label className="flex items-center gap-2 cursor-pointer">
        <Checkbox value="email" />
        <span>Email</span>
      </Label>
      <Label className="flex items-center gap-2 cursor-pointer">
        <Checkbox value="push" />
        <span>Push</span>
      </Label>
      <Label className="flex items-center gap-2 cursor-pointer">
        <Checkbox value="sms" />
        <span>SMS</span>
      </Label>
    </CheckboxGroup>
  ),
};
