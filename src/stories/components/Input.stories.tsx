import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'file'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
  args: {
    placeholder: 'Enter text here...',
    type: 'text',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Email address...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input content',
  },
};

export const FileInput: Story = {
  args: {
    type: 'file',
  },
};
