import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  type ContextMenuSize,
} from '@/components/ui/context-menu';
import {
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Copy,
  Scissors,
  Bookmark,
  Share2,
  Trash2,
  Terminal,
} from 'lucide-react';

interface ContextMenuStoryProps {
  size?: ContextMenuSize;
  hasIcons?: boolean;
}

const meta: Meta<any> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Sizing scale and density of the context menu',
    },
    hasIcons: {
      control: 'boolean',
      description: 'Reserves an icon gutter across all items',
    },
  },
  args: {
    size: 'default',
    hasIcons: true,
  },
};

export default meta;
type Story = StoryObj<ContextMenuStoryProps>;

export const Default: Story = {
  render: (args) => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[200px] w-full max-w-md items-center justify-center rounded-2xl border border-dashed border-neutral-interactive/80 bg-neutral-surface/50 text-sm text-neutral-text-muted select-none">
        Right-click anywhere inside this target area
      </ContextMenuTrigger>
      <ContextMenuContent size={args.size} hasIcons={args.hasIcons} className="w-64">
        <ContextMenuItem icon={<ArrowLeft />} shortcut="⌘[">
          Back
        </ContextMenuItem>
        <ContextMenuItem icon={<ArrowRight />} shortcut="⌘]" disabled>
          Forward
        </ContextMenuItem>
        <ContextMenuItem icon={<RotateCcw />} shortcut="⌘R">
          Reload
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={<Copy />} shortcut="⌘C">
          Copy Selection
        </ContextMenuItem>
        <ContextMenuItem icon={<Scissors />} shortcut="⌘X">
          Cut
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger icon={<Share2 />}>
            Share Link
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Copy Link</ContextMenuItem>
            <ContextMenuItem>Send to Device</ContextMenuItem>
            <ContextMenuItem>QR Code</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem
          variant="destructive"
          icon={<Trash2 />}
          shortcut="⌫"
          subText="Irreversible action"
        >
          Delete Item
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithPreferences: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = React.useState(true);
    const [fullUrl, setFullUrl] = React.useState(false);
    const [viewMode, setViewMode] = React.useState('grid');

    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[180px] w-full max-w-md items-center justify-center rounded-2xl border border-neutral-interactive/80 bg-neutral-surface-alt/40 text-sm text-neutral-text select-none">
          Right-click to configure display options
        </ContextMenuTrigger>
        <ContextMenuContent className="w-60">
          <ContextMenuLabel>Page Layout</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={bookmarks}
            onCheckedChange={(checked) => setBookmarks(!!checked)}
            shortcut="⇧⌘B"
          >
            Show Bookmark Bar
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={fullUrl}
            onCheckedChange={(checked) => setFullUrl(!!checked)}
          >
            Show Full URLs
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>Display Format</ContextMenuLabel>
          <ContextMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
            <ContextMenuRadioItem value="grid">Grid Tiles</ContextMenuRadioItem>
            <ContextMenuRadioItem value="list">Detailed List</ContextMenuRadioItem>
            <ContextMenuRadioItem value="compact">Compact Density</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};
