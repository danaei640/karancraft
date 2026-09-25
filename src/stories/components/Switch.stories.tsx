import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
  },
  args: {
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: (args: any) => (
    <div className="flex items-center space-x-3">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
