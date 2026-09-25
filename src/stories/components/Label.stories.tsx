import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Email address',
  },
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms-label" />
      <Label htmlFor="terms-label">Accept terms and conditions</Label>
    </div>
  ),
};
