import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mail, Copy } from 'lucide-react';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: () => (
    <div className="w-[350px]">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search className="h-4 w-4 text-neutral-text-muted" />
        </InputGroupAddon>
        <Input placeholder="Search components..." />
      </InputGroup>
    </div>
  ),
};

export const WithLeadingIcon: Story = {
  render: () => (
    <div className="w-[350px]">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search className="h-4 w-4 text-neutral-text-muted" />
        </InputGroupAddon>
        <Input placeholder="Search components..." />
      </InputGroup>
    </div>
  ),
};

export const WithTrailingButton: Story = {
  render: () => (
    <div className="w-[400px]">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Mail className="h-4 w-4 text-neutral-text-muted" />
        </InputGroupAddon>
        <Input placeholder="Enter recipient email" />
        <InputGroupAddon align="inline-end">
          <Button size="xs" variant="secondary">
            Send Invite
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
