import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
  type DropdownMenuSize,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  User,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  Cloud,
  Mail,
  MessageSquare,
  PlusCircle,
  Sparkles,
} from 'lucide-react';

interface DropdownMenuStoryProps {
  size?: DropdownMenuSize;
  hasIcons?: boolean;
  hasCheckmarks?: boolean;
}

const meta: Meta<any> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Density and sizing scale for menu content and items',
    },
    hasIcons: {
      control: 'boolean',
      description: 'Reserves an icon gutter across all items for alignment parity',
    },
    hasCheckmarks: {
      control: 'boolean',
      description: 'Reserves a checkmark indicator gutter across items',
    },
  },
  args: {
    size: 'default',
    hasIcons: true,
    hasCheckmarks: false,
  },
};

export default meta;
type Story = StoryObj<DropdownMenuStoryProps>;

export const Default: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" trailing={<ChevronDown className="size-4" />}>
            Workspace Options
          </Button>
        }
      />
      <DropdownMenuContent
        size={args.size}
        hasIcons={args.hasIcons}
        hasCheckmarks={args.hasCheckmarks}
        className="w-56"
      >
        <DropdownMenuLabel>Account & Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            icon={<User />}
            shortcut="⇧⌘P"
            subText="Personal account details"
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            icon={<CreditCard />}
            shortcut="⌘B"
            subText="Invoices and plans"
          >
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem
            icon={<Settings />}
            shortcut="⌘S"
          >
            Preferences
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={<PlusCircle />}>
            Invite Collaborators
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem icon={<Mail />}>Email Invitation</DropdownMenuItem>
            <DropdownMenuItem icon={<MessageSquare />}>Direct Link</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Cloud />}>Import from Slack</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          icon={<LogOut />}
          shortcut="⇧⌘Q"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithCheckboxesAndRadio: Story = {
  render: () => {
    const [showToolbar, setShowToolbar] = React.useState(true);
    const [showBookmarks, setShowBookmarks] = React.useState(false);
    const [theme, setTheme] = React.useState('system');

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" trailing={<ChevronDown className="size-4" />}>
              View Preferences
            </Button>
          }
        />
        <DropdownMenuContent className="w-60">
          <DropdownMenuLabel>Panels & Visibility</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showToolbar}
            onCheckedChange={(checked) => setShowToolbar(!!checked)}
            shortcut="⌘T"
          >
            Main Toolbar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showBookmarks}
            onCheckedChange={(checked) => setShowBookmarks(!!checked)}
            shortcut="⌘B"
          >
            Favorites Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Interface Theme</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="light">Light Surface</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark Theme</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">Follow System</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <DropdownMenu key={size}>
          <DropdownMenuTrigger
            render={
              <Button size={size} variant="outline" trailing={<ChevronDown className="size-4" />}>
                Menu ({size})
              </Button>
            }
          />
          <DropdownMenuContent size={size} hasIcons className="w-52">
            <DropdownMenuLabel>Size: {size}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Sparkles />} shortcut="⌘N">
              Quick Action
            </DropdownMenuItem>
            <DropdownMenuItem icon={<Settings />} shortcut="⌘,">
              Preferences
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  ),
};
