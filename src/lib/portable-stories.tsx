'use client';

import React from 'react';
import { composeStories } from '@storybook/react';

import * as AccordionStories from '@/stories/components/Accordion.stories';
import * as AlertStories from '@/stories/components/Alert.stories';
import * as AlertDialogStories from '@/stories/components/AlertDialog.stories';
import * as AspectRatioStories from '@/stories/components/AspectRatio.stories';
import * as AvatarStories from '@/stories/components/Avatar.stories';
import * as BadgeStories from '@/stories/components/Badge.stories';
import * as BreadcrumbStories from '@/stories/components/Breadcrumb.stories';
import * as ButtonStories from '@/stories/components/Button.stories';
import * as ButtonGroupStories from '@/stories/components/ButtonGroup.stories';
import * as CalendarStories from '@/stories/components/Calendar.stories';
import * as CardStories from '@/stories/components/Card.stories';
import * as CarouselStories from '@/stories/components/Carousel.stories';
import * as ChartStories from '@/stories/components/Chart.stories';
import * as CheckboxStories from '@/stories/components/Checkbox.stories';
import * as CollapsibleStories from '@/stories/components/Collapsible.stories';
import * as ComboboxStories from '@/stories/components/Combobox.stories';
import * as CommandStories from '@/stories/components/Command.stories';
import * as ContextMenuStories from '@/stories/components/ContextMenu.stories';
import * as DialogStories from '@/stories/components/Dialog.stories';
import * as DrawerStories from '@/stories/components/Drawer.stories';
import * as DropdownMenuStories from '@/stories/components/DropdownMenu.stories';
import * as EmptyStories from '@/stories/components/Empty.stories';
import * as FieldStories from '@/stories/components/Field.stories';
import * as HoverCardStories from '@/stories/components/HoverCard.stories';
import * as InputStories from '@/stories/components/Input.stories';
import * as InputGroupStories from '@/stories/components/InputGroup.stories';
import * as InputOTPStories from '@/stories/components/InputOTP.stories';
import * as ItemStories from '@/stories/components/Item.stories';
import * as KbdStories from '@/stories/components/Kbd.stories';
import * as LabelStories from '@/stories/components/Label.stories';
import * as MenubarStories from '@/stories/components/Menubar.stories';
import * as NativeSelectStories from '@/stories/components/NativeSelect.stories';
import * as NavigationMenuStories from '@/stories/components/NavigationMenu.stories';
import * as PaginationStories from '@/stories/components/Pagination.stories';
import * as PopoverStories from '@/stories/components/Popover.stories';
import * as ProgressStories from '@/stories/components/Progress.stories';
import * as RadioGroupStories from '@/stories/components/RadioGroup.stories';
import * as ResizableStories from '@/stories/components/Resizable.stories';
import * as ScrollAreaStories from '@/stories/components/ScrollArea.stories';
import * as SelectStories from '@/stories/components/Select.stories';
import * as SeparatorStories from '@/stories/components/Separator.stories';
import * as SheetStories from '@/stories/components/Sheet.stories';
import * as SidebarStories from '@/stories/components/Sidebar.stories';
import * as SkeletonStories from '@/stories/components/Skeleton.stories';
import * as SliderStories from '@/stories/components/Slider.stories';
import * as SwitchStories from '@/stories/components/Switch.stories';
import * as TableStories from '@/stories/components/Table.stories';
import * as TabsStories from '@/stories/components/Tabs.stories';
import * as TextareaStories from '@/stories/components/Textarea.stories';
import * as ToastStories from '@/stories/components/Toast.stories';
import * as ToggleStories from '@/stories/components/Toggle.stories';
import * as ToggleGroupStories from '@/stories/components/ToggleGroup.stories';
import * as TooltipStories from '@/stories/components/Tooltip.stories';
import * as ThemeProviderStories from '@/stories/components/ThemeProvider.stories';

const MODULES_MAP: Record<string, any> = {
  accordion: AccordionStories,
  alert: AlertStories,
  'alert-dialog': AlertDialogStories,
  'aspect-ratio': AspectRatioStories,
  avatar: AvatarStories,
  badge: BadgeStories,
  breadcrumb: BreadcrumbStories,
  button: ButtonStories,
  'button-group': ButtonGroupStories,
  calendar: CalendarStories,
  card: CardStories,
  carousel: CarouselStories,
  chart: ChartStories,
  checkbox: CheckboxStories,
  collapsible: CollapsibleStories,
  combobox: ComboboxStories,
  command: CommandStories,
  'context-menu': ContextMenuStories,
  dialog: DialogStories,
  drawer: DrawerStories,
  'dropdown-menu': DropdownMenuStories,
  empty: EmptyStories,
  field: FieldStories,
  'hover-card': HoverCardStories,
  input: InputStories,
  'input-group': InputGroupStories,
  'input-otp': InputOTPStories,
  item: ItemStories,
  kbd: KbdStories,
  label: LabelStories,
  menubar: MenubarStories,
  'native-select': NativeSelectStories,
  'navigation-menu': NavigationMenuStories,
  pagination: PaginationStories,
  popover: PopoverStories,
  progress: ProgressStories,
  'radio-group': RadioGroupStories,
  resizable: ResizableStories,
  'scroll-area': ScrollAreaStories,
  select: SelectStories,
  separator: SeparatorStories,
  sheet: SheetStories,
  sidebar: SidebarStories,
  skeleton: SkeletonStories,
  slider: SliderStories,
  switch: SwitchStories,
  table: TableStories,
  tabs: TabsStories,
  textarea: TextareaStories,
  toast: ToastStories,
  toggle: ToggleStories,
  'toggle-group': ToggleGroupStories,
  tooltip: TooltipStories,
  'theme-provider': ThemeProviderStories,
};

export interface PortableStoryItem {
  id: string;
  name: string;
  Component: React.ComponentType<any>;
  args?: Record<string, any>;
}

export function getComposedStories(slug: string): PortableStoryItem[] {
  const module = MODULES_MAP[slug];
  if (!module) return [];

  try {
    const composed = composeStories(module);
    const items = Object.entries(composed).map(([key, StoryComponent]) => ({
      id: key,
      name: (StoryComponent as any).storyName || key.replace(/([A-Z])/g, ' $1').trim(),
      Component: StoryComponent as React.ComponentType<any>,
      args: (StoryComponent as any).args,
    }));

    // Ensure 'Default' always comes first (index 0)
    items.sort((a, b) => {
      if (a.id.toLowerCase() === 'default') return -1;
      if (b.id.toLowerCase() === 'default') return 1;
      return a.id.localeCompare(b.id);
    });

    return items;
  } catch (error) {
    console.warn(`Failed to compose stories for ${slug}:`, error);
    return [];
  }
}
