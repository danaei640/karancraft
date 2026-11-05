import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  type MenubarSize,
} from '@/components/ui/menubar';
import {
  FileText,
  FolderOpen,
  Save,
  Share2,
  Printer,
  Undo2,
  Redo2,
  Sparkles,
} from 'lucide-react';

interface MenubarStoryProps {
  size?: MenubarSize;
}

const meta: Meta<MenubarStoryProps> = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Height and density scale for menubar triggers and flyouts',
    },
  },
  args: {
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<MenubarStoryProps>;

export const Default: Story = {
  render: (args) => (
    <Menubar size={args.size}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent className="w-56">
          <MenubarItem icon={<FileText />} shortcut="⌘T">
            New Tab
          </MenubarItem>
          <MenubarItem icon={<FolderOpen />} shortcut="⌘N">
            New Window
          </MenubarItem>
          <MenubarItem icon={<Save />} shortcut="⌘S">
            Save File
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger icon={<Share2 />}>Export & Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email Document</MenubarItem>
              <MenubarItem>Save as PDF</MenubarItem>
              <MenubarItem>Markdown Link</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem icon={<Printer />} shortcut="⌘P">
            Print...
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent className="w-48">
          <MenubarItem icon={<Undo2 />} shortcut="⌘Z">
            Undo
          </MenubarItem>
          <MenubarItem icon={<Redo2 />} shortcut="⇧⌘Z">
            Redo
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem shortcut="⌘X">Cut</MenubarItem>
          <MenubarItem shortcut="⌘C">Copy</MenubarItem>
          <MenubarItem shortcut="⌘V">Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent className="w-56">
          <MenubarCheckboxItem checked>Show Navigation Rail</MenubarCheckboxItem>
          <MenubarCheckboxItem>Always Show Full URLs</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem shortcut="⌃⌘F">Enter Full Screen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <div key={size} className="space-y-2">
          <div className="text-xs font-mono text-neutral-text-muted uppercase">Size: {size}</div>
          <Menubar size={size}>
            <MenubarMenu>
              <MenubarTrigger>Workspace</MenubarTrigger>
              <MenubarContent>
                <MenubarItem icon={<Sparkles />} shortcut="⌘N">
                  New Project
                </MenubarItem>
                <MenubarItem shortcut="⌘O">Open Recent</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Window</MenubarTrigger>
              <MenubarContent>
                <MenubarItem shortcut="⌘M">Minimize</MenubarItem>
                <MenubarItem shortcut="⌘W">Close Window</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      ))}
    </div>
  ),
};
