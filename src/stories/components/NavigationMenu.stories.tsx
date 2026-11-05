import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

interface NavigationMenuStoryProps {
  align?: 'start' | 'center' | 'end';
}

const meta: Meta<NavigationMenuStoryProps> = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Popup alignment relative to the active menu trigger',
    },
  },
  args: {
    align: 'start',
  },
};

export default meta;
type Story = StoryObj<NavigationMenuStoryProps>;

export const Default: Story = {
  render: (args) => (
    <NavigationMenu align={args.align}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink
                  className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-linear-to-b from-primary-surface to-neutral-surface-alt p-6 no-underline outline-none focus:shadow-md border border-neutral-interactive/50"
                  href="#"
                >
                  <Sparkles className="size-6 text-primary-fill mb-2" />
                  <div className="mb-1 text-base font-semibold font-heading text-neutral-text">
                    Karan UI
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-text-muted">
                    Modern UI components built with Base UI and OKLCH color token architecture.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="block p-3 rounded-xl hover:bg-neutral-interactive/40 transition-colors">
                  <div className="text-sm font-medium leading-none text-neutral-text">Introduction</div>
                  <p className="line-clamp-2 text-xs leading-snug text-neutral-text-muted mt-1">
                    Design tokens, proportional scaling, and Base UI foundations.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="block p-3 rounded-xl hover:bg-neutral-interactive/40 transition-colors">
                  <div className="text-sm font-medium leading-none text-neutral-text">Installation</div>
                  <p className="line-clamp-2 text-xs leading-snug text-neutral-text-muted mt-1">
                    How to install dependencies and configure your Next.js application.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="block p-3 rounded-xl hover:bg-neutral-interactive/40 transition-colors">
                  <div className="text-sm font-medium leading-none text-neutral-text">Typography</div>
                  <p className="line-clamp-2 text-xs leading-snug text-neutral-text-muted mt-1">
                    Proportional scale specs for headings, body, and monospace keys.
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <NavigationMenuLink href="#" className="block p-3 rounded-xl hover:bg-neutral-interactive/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <Layers className="size-4 text-primary-fill" />
                    <span className="text-sm font-medium leading-none text-neutral-text">Overlays</span>
                  </div>
                  <p className="line-clamp-2 text-xs leading-snug text-neutral-text-muted mt-1">
                    Dialog, Sheet, Drawer, Popover, HoverCard, and Tooltip.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="block p-3 rounded-xl hover:bg-neutral-interactive/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <Zap className="size-4 text-warning-fill" />
                    <span className="text-sm font-medium leading-none text-neutral-text">Menus &amp; Navigation</span>
                  </div>
                  <p className="line-clamp-2 text-xs leading-snug text-neutral-text-muted mt-1">
                    DropdownMenu, ContextMenu, Menubar, Tabs, and Breadcrumb.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="block p-3 rounded-xl hover:bg-neutral-interactive/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-success-fill" />
                    <span className="text-sm font-medium leading-none text-neutral-text">Form Controls</span>
                  </div>
                  <p className="line-clamp-2 text-xs leading-snug text-neutral-text-muted mt-1">
                    Input, Textarea, Select, Checkbox, Radio, and Switch.
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className="cn-navigation-menu-trigger inline-flex h-9 items-center justify-center px-4 py-2 text-sm font-medium hover:text-neutral-text transition-colors">
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
