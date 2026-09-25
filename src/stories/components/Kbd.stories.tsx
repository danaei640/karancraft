import type { Meta, StoryObj } from '@storybook/react';
import { Kbd, KbdGroup } from '@/components/ui/kbd';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Esc</Kbd>
    </div>
  ),
};

export const InShortcutGroup: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Search commands:</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Save file:</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
};
