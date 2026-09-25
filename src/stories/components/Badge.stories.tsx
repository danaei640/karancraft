import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      description: 'The visual style variant of the badge',
    },
  },
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Active',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Draft',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Blocked',
    variant: 'destructive',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Badge',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Badge',
    variant: 'link',
  },
};
