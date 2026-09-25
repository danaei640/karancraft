import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { ChevronDown, Copy, Share2 } from 'lucide-react';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Year</Button>
      <Button variant="outline">Month</Button>
      <Button variant="outline">Day</Button>
    </ButtonGroup>
  ),
};

export const SplitButton: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Publish Registry</Button>
      <Button size="icon">
        <ChevronDown className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">
        <Copy className="mr-2 h-4 w-4" />
        Copy
      </Button>
      <Button variant="secondary">
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    </ButtonGroup>
  ),
};
