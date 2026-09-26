export interface ComponentPropDoc {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  options?: string[];
  controlType: 'select' | 'boolean' | 'text' | 'number';
}

export interface ComponentUsageGuide {
  summary: string;
  install: {
    cli: string;
    registryUrl?: string;
  };
  rootLayoutSetup?: {
    filename: string;
    code: string;
    explanation?: string;
  };
  features: {
    title: string;
    badge?: string;
    description: string;
    code?: string;
  }[];
  apiReference?: {
    name: string;
    type: string;
    description: string;
  }[];
  tips?: string[];
}

export interface ComponentMetadata {
  id: string;
  name: string;
  category:
    | 'Actions & Inputs'
    | 'Overlays & Dialogs'
    | 'Navigation & Menus'
    | 'Data Display & Layout'
    | 'Feedback & Utilities';
  description: string;
  baseUiPrimitive: string;
  installCmd: string;
  registryUrl: string;
  props: ComponentPropDoc[];
  defaultProps: Record<string, any>;
  usageGuide?: ComponentUsageGuide;
}

export const COMPONENTS_METADATA: Record<string, ComponentMetadata> = {
  button: {
    id: 'button',
    name: 'Button',
    category: 'Actions & Inputs',
    description: 'Displays a button or a component that looks like a button with pill geometry.',
    baseUiPrimitive: '@base-ui/react/button',
    installCmd: 'npx shadcn@latest add @karan-ui/button',
    registryUrl: 'https://karan-ui.dev/r/button.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'",
        defaultValue: "'default'",
        description: 'The visual style variant of the button',
        options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
        controlType: 'select',
      },
      {
        name: 'size',
        type: "'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg'",
        defaultValue: "'default'",
        description: 'The size dimension of the button',
        options: ['default', 'xs', 'sm', 'lg', 'icon'],
        controlType: 'select',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Whether the button is disabled and prevents interactions',
        controlType: 'boolean',
      },
      {
        name: 'children',
        type: 'ReactNode',
        defaultValue: "'Button'",
        description: 'The content rendered inside the button',
        controlType: 'text',
      },
    ],
    defaultProps: {
      variant: 'default',
      size: 'default',
      disabled: false,
      children: 'Click me',
    },
  },

  badge: {
    id: 'badge',
    name: 'Badge',
    category: 'Data Display & Layout',
    description: 'Displays a badge or small status tag styled with custom design tokens.',
    baseUiPrimitive: '@base-ui/react/use-render',
    installCmd: 'npx shadcn@latest add @karan-ui/badge',
    registryUrl: 'https://karan-ui.dev/r/badge.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link'",
        defaultValue: "'default'",
        description: 'The visual style variant of the badge',
        options: ['default', 'secondary', 'outline', 'destructive', 'ghost', 'link'],
        controlType: 'select',
      },
      {
        name: 'children',
        type: 'ReactNode',
        defaultValue: "'Badge'",
        description: 'The text or elements inside the badge',
        controlType: 'text',
      },
    ],
    defaultProps: {
      variant: 'default',
      children: 'Active',
    },
  },

  card: {
    id: 'card',
    name: 'Card',
    category: 'Data Display & Layout',
    description: 'Displays a card with header, title, description, content, action, and footer sections.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/card',
    registryUrl: 'https://karan-ui.dev/r/card.json',
    props: [
      {
        name: 'size',
        type: "'default' | 'sm'",
        defaultValue: "'default'",
        description: 'Card internal padding density',
        options: ['default', 'sm'],
        controlType: 'select',
      },
      {
        name: 'title',
        type: 'string',
        defaultValue: "'Project Overview'",
        description: 'Card title header text',
        controlType: 'text',
      },
      {
        name: 'description',
        type: 'string',
        defaultValue: "'Telemetry & metrics for Karan UI registry'",
        description: 'Card secondary description text',
        controlType: 'text',
      },
    ],
    defaultProps: {
      size: 'default',
      title: 'Project Overview',
      description: 'Telemetry & metrics for Karan UI registry',
    },
  },

  input: {
    id: 'input',
    name: 'Input',
    category: 'Actions & Inputs',
    description: 'Renders a text field input supporting Base UI primitives with focus rings.',
    baseUiPrimitive: '@base-ui/react/input',
    installCmd: 'npx shadcn@latest add @karan-ui/input',
    registryUrl: 'https://karan-ui.dev/r/input.json',
    props: [
      {
        name: 'type',
        type: "'text' | 'email' | 'password' | 'number'",
        defaultValue: "'text'",
        description: 'HTML input type',
        options: ['text', 'email', 'password', 'number'],
        controlType: 'select',
      },
      {
        name: 'placeholder',
        type: 'string',
        defaultValue: "'Enter your email...'",
        description: 'Placeholder text displayed when empty',
        controlType: 'text',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Whether input is disabled',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      type: 'text',
      placeholder: 'Enter your email...',
      disabled: false,
    },
  },

  textarea: {
    id: 'textarea',
    name: 'Textarea',
    category: 'Actions & Inputs',
    description: 'Displays a multiline textarea input with auto field sizing.',
    baseUiPrimitive: 'React.ComponentProps<"textarea">',
    installCmd: 'npx shadcn@latest add @karan-ui/textarea',
    registryUrl: 'https://karan-ui.dev/r/textarea.json',
    props: [
      {
        name: 'placeholder',
        type: 'string',
        defaultValue: "'Type your message...'",
        description: 'Placeholder text',
        controlType: 'text',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disabled state',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      placeholder: 'Type your message...',
      disabled: false,
    },
  },

  switch: {
    id: 'switch',
    name: 'Switch',
    category: 'Actions & Inputs',
    description: 'A control that allows the user to toggle between checked and not checked states.',
    baseUiPrimitive: '@base-ui/react/switch',
    installCmd: 'npx shadcn@latest add @karan-ui/switch',
    registryUrl: 'https://karan-ui.dev/r/switch.json',
    props: [
      {
        name: 'size',
        type: "'default' | 'sm'",
        defaultValue: "'default'",
        description: 'Size of the switch control',
        options: ['default', 'sm'],
        controlType: 'select',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disabled interaction state',
        controlType: 'boolean',
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Initial toggle state',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      size: 'default',
      disabled: false,
      defaultChecked: true,
    },
  },

  slider: {
    id: 'slider',
    name: 'Slider',
    category: 'Actions & Inputs',
    description: 'An input where the user selects a value from a given range.',
    baseUiPrimitive: '@base-ui/react/slider',
    installCmd: 'npx shadcn@latest add @karan-ui/slider',
    registryUrl: 'https://karan-ui.dev/r/slider.json',
    props: [
      {
        name: 'min',
        type: 'number',
        defaultValue: '0',
        description: 'Minimum allowed value',
        controlType: 'number',
      },
      {
        name: 'max',
        type: 'number',
        defaultValue: '100',
        description: 'Maximum allowed value',
        controlType: 'number',
      },
      {
        name: 'step',
        type: 'number',
        defaultValue: '1',
        description: 'Step increment',
        controlType: 'number',
      },
    ],
    defaultProps: {
      min: 0,
      max: 100,
      step: 1,
    },
  },

  progress: {
    id: 'progress',
    name: 'Progress',
    category: 'Feedback & Utilities',
    description: 'Displays an indicator showing the completion progress of a task.',
    baseUiPrimitive: '@base-ui/react/progress',
    installCmd: 'npx shadcn@latest add @karan-ui/progress',
    registryUrl: 'https://karan-ui.dev/r/progress.json',
    props: [
      {
        name: 'value',
        type: 'number',
        defaultValue: '65',
        description: 'The progress completion value from 0 to 100',
        controlType: 'number',
      },
    ],
    defaultProps: {
      value: 65,
    },
  },

  checkbox: {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Actions & Inputs',
    description: 'A control that allows the user to toggle between checked and not checked.',
    baseUiPrimitive: '@base-ui/react/checkbox',
    installCmd: 'npx shadcn@latest add @karan-ui/checkbox',
    registryUrl: 'https://karan-ui.dev/r/checkbox.json',
    props: [
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disabled checkbox',
        controlType: 'boolean',
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Initial state',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      disabled: false,
      defaultChecked: true,
    },
  },

  'radio-group': {
    id: 'radio-group',
    name: 'Radio Group',
    category: 'Actions & Inputs',
    description: 'A set of checkable buttons—known as radio buttons—where only one can be checked at a time.',
    baseUiPrimitive: '@base-ui/react/radio-group',
    installCmd: 'npx shadcn@latest add @karan-ui/radio-group',
    registryUrl: 'https://karan-ui.dev/r/radio-group.json',
    props: [
      {
        name: 'defaultValue',
        type: 'string',
        defaultValue: "'comfortable'",
        description: 'Default selected option value',
        options: ['default', 'comfortable', 'compact'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      defaultValue: 'comfortable',
    },
  },

  select: {
    id: 'select',
    name: 'Select',
    category: 'Actions & Inputs',
    description: 'Displays a menu of options for the user to pick from—triggered by a button.',
    baseUiPrimitive: '@base-ui/react/select',
    installCmd: 'npx shadcn@latest add @karan-ui/select',
    registryUrl: 'https://karan-ui.dev/r/select.json',
    props: [
      {
        name: 'size',
        type: "'default' | 'sm'",
        defaultValue: "'default'",
        description: 'Trigger button size',
        options: ['default', 'sm'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      size: 'default',
    },
  },

  'native-select': {
    id: 'native-select',
    name: 'Native Select',
    category: 'Actions & Inputs',
    description: 'Accessible native HTML select element styled with custom chevron and borders.',
    baseUiPrimitive: 'React.ComponentProps<"select">',
    installCmd: 'npx shadcn@latest add @karan-ui/native-select',
    registryUrl: 'https://karan-ui.dev/r/native-select.json',
    props: [
      {
        name: 'size',
        type: "'default' | 'sm'",
        defaultValue: "'default'",
        description: 'Select field height size',
        options: ['default', 'sm'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      size: 'default',
    },
  },

  dialog: {
    id: 'dialog',
    name: 'Dialog',
    category: 'Overlays & Dialogs',
    description: 'A window overlaid on either the primary window or another dialog window.',
    baseUiPrimitive: '@base-ui/react/dialog',
    installCmd: 'npx shadcn@latest add @karan-ui/dialog',
    registryUrl: 'https://karan-ui.dev/r/dialog.json',
    props: [
      {
        name: 'showCloseButton',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Whether to render the top right close X button',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      showCloseButton: true,
    },
  },

  'alert-dialog': {
    id: 'alert-dialog',
    name: 'Alert Dialog',
    category: 'Overlays & Dialogs',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
    baseUiPrimitive: '@base-ui/react/alert-dialog',
    installCmd: 'npx shadcn@latest add @karan-ui/alert-dialog',
    registryUrl: 'https://karan-ui.dev/r/alert-dialog.json',
    props: [
      {
        name: 'size',
        type: "'default' | 'sm'",
        defaultValue: "'default'",
        description: 'Size of the alert dialog modal',
        options: ['default', 'sm'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      size: 'default',
    },
  },

  sheet: {
    id: 'sheet',
    name: 'Sheet',
    category: 'Overlays & Dialogs',
    description: 'Extends the Dialog component to display content that complements the main screen on any edge.',
    baseUiPrimitive: '@base-ui/react/dialog',
    installCmd: 'npx shadcn@latest add @karan-ui/sheet',
    registryUrl: 'https://karan-ui.dev/r/sheet.json',
    props: [
      {
        name: 'side',
        type: "'top' | 'right' | 'bottom' | 'left'",
        defaultValue: "'right'",
        description: 'Edge of the viewport from which the sheet slides in',
        options: ['top', 'right', 'bottom', 'left'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      side: 'right',
    },
  },

  drawer: {
    id: 'drawer',
    name: 'Drawer',
    category: 'Overlays & Dialogs',
    description: 'A swipeable drawer component built on Base UI with authentic drag handle and gesture physics.',
    baseUiPrimitive: '@base-ui/react/drawer',
    installCmd: 'npx shadcn@latest add @karan-ui/drawer',
    registryUrl: 'https://karan-ui.dev/r/drawer.json',
    props: [
      {
        name: 'showSwipeHandle',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Whether to show the grab bar handle',
        controlType: 'boolean',
      },
    ],
    defaultProps: {
      showSwipeHandle: true,
    },
  },

  popover: {
    id: 'popover',
    name: 'Popover',
    category: 'Overlays & Dialogs',
    description: 'Displays rich content in a portal, triggered by a button with collision detection.',
    baseUiPrimitive: '@base-ui/react/popover',
    installCmd: 'npx shadcn@latest add @karan-ui/popover',
    registryUrl: 'https://karan-ui.dev/r/popover.json',
    props: [
      {
        name: 'side',
        type: "'top' | 'right' | 'bottom' | 'left'",
        defaultValue: "'bottom'",
        description: 'Preferred placement side',
        options: ['top', 'right', 'bottom', 'left'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      side: 'bottom',
    },
  },

  tooltip: {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Overlays & Dialogs',
    description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    baseUiPrimitive: '@base-ui/react/tooltip',
    installCmd: 'npx shadcn@latest add @karan-ui/tooltip',
    registryUrl: 'https://karan-ui.dev/r/tooltip.json',
    props: [
      {
        name: 'side',
        type: "'top' | 'right' | 'bottom' | 'left'",
        defaultValue: "'top'",
        description: 'Preferred placement side',
        options: ['top', 'right', 'bottom', 'left'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      side: 'top',
    },
  },

  'dropdown-menu': {
    id: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Navigation & Menus',
    description: 'Displays a menu to the user—such as a set of actions or functions—triggered by a button.',
    baseUiPrimitive: '@base-ui/react/menu',
    installCmd: 'npx shadcn@latest add @karan-ui/dropdown-menu',
    registryUrl: 'https://karan-ui.dev/r/dropdown-menu.json',
    props: [
      {
        name: 'align',
        type: "'start' | 'center' | 'end'",
        defaultValue: "'start'",
        description: 'Menu alignment relative to trigger',
        options: ['start', 'center', 'end'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      align: 'start',
    },
  },

  'context-menu': {
    id: 'context-menu',
    name: 'Context Menu',
    category: 'Navigation & Menus',
    description: 'Displays a menu located at the pointer coordinates triggered by right-click.',
    baseUiPrimitive: '@base-ui/react/context-menu',
    installCmd: 'npx shadcn@latest add @karan-ui/context-menu',
    registryUrl: 'https://karan-ui.dev/r/context-menu.json',
    props: [],
    defaultProps: {},
  },

  menubar: {
    id: 'menubar',
    name: 'Menubar',
    category: 'Navigation & Menus',
    description: 'A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.',
    baseUiPrimitive: '@base-ui/react/menubar',
    installCmd: 'npx shadcn@latest add @karan-ui/menubar',
    registryUrl: 'https://karan-ui.dev/r/menubar.json',
    props: [],
    defaultProps: {},
  },

  'navigation-menu': {
    id: 'navigation-menu',
    name: 'Navigation Menu',
    category: 'Navigation & Menus',
    description: 'A collection of links for navigating websites with animated viewports and flyout content.',
    baseUiPrimitive: '@base-ui/react/navigation-menu',
    installCmd: 'npx shadcn@latest add @karan-ui/navigation-menu',
    registryUrl: 'https://karan-ui.dev/r/navigation-menu.json',
    props: [],
    defaultProps: {},
  },

  tabs: {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation & Menus',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    baseUiPrimitive: '@base-ui/react/tabs',
    installCmd: 'npx shadcn@latest add @karan-ui/tabs',
    registryUrl: 'https://karan-ui.dev/r/tabs.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'line'",
        defaultValue: "'default'",
        description: 'The tabs list styling appearance',
        options: ['default', 'line'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      variant: 'default',
    },
  },

  accordion: {
    id: 'accordion',
    name: 'Accordion',
    category: 'Data Display & Layout',
    description: 'A vertically stacked set of interactive headings that each reveal a section of content.',
    baseUiPrimitive: '@base-ui/react/accordion',
    installCmd: 'npx shadcn@latest add @karan-ui/accordion',
    registryUrl: 'https://karan-ui.dev/r/accordion.json',
    props: [],
    defaultProps: {},
  },

  collapsible: {
    id: 'collapsible',
    name: 'Collapsible',
    category: 'Data Display & Layout',
    description: 'An interactive component which expands/collapses a panel.',
    baseUiPrimitive: '@base-ui/react/collapsible',
    installCmd: 'npx shadcn@latest add @karan-ui/collapsible',
    registryUrl: 'https://karan-ui.dev/r/collapsible.json',
    props: [],
    defaultProps: {},
  },

  breadcrumb: {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Navigation & Menus',
    description: 'Displays the path to the current resource using a hierarchy of links.',
    baseUiPrimitive: 'React.ComponentProps<"nav">',
    installCmd: 'npx shadcn@latest add @karan-ui/breadcrumb',
    registryUrl: 'https://karan-ui.dev/r/breadcrumb.json',
    props: [],
    defaultProps: {},
  },

  pagination: {
    id: 'pagination',
    name: 'Pagination',
    category: 'Navigation & Menus',
    description: 'Pagination with page navigation buttons, ellipsis, and next/prev controls.',
    baseUiPrimitive: 'React.ComponentProps<"nav">',
    installCmd: 'npx shadcn@latest add @karan-ui/pagination',
    registryUrl: 'https://karan-ui.dev/r/pagination.json',
    props: [],
    defaultProps: {},
  },

  table: {
    id: 'table',
    name: 'Table',
    category: 'Data Display & Layout',
    description: 'A responsive table component with rounded header, body, footer, and caption slots.',
    baseUiPrimitive: 'React.ComponentProps<"table">',
    installCmd: 'npx shadcn@latest add @karan-ui/table',
    registryUrl: 'https://karan-ui.dev/r/table.json',
    props: [],
    defaultProps: {},
  },

  avatar: {
    id: 'avatar',
    name: 'Avatar',
    category: 'Data Display & Layout',
    description: 'An image element with a fallback for representing the user, with group and badge support.',
    baseUiPrimitive: '@base-ui/react/avatar',
    installCmd: 'npx shadcn@latest add @karan-ui/avatar',
    registryUrl: 'https://karan-ui.dev/r/avatar.json',
    props: [
      {
        name: 'size',
        type: "'sm' | 'default' | 'lg'",
        defaultValue: "'default'",
        description: 'Diameter dimension size',
        options: ['sm', 'default', 'lg'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      size: 'default',
    },
  },

  alert: {
    id: 'alert',
    name: 'Alert',
    category: 'Feedback & Utilities',
    description: 'Displays a callout for user attention with icons, title, and description.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/alert',
    registryUrl: 'https://karan-ui.dev/r/alert.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'destructive'",
        defaultValue: "'default'",
        description: 'Alert intent variant',
        options: ['default', 'destructive'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      variant: 'default',
    },
  },

  separator: {
    id: 'separator',
    name: 'Separator',
    category: 'Feedback & Utilities',
    description: 'Visually or semantically separates content with horizontal or vertical orientation.',
    baseUiPrimitive: '@base-ui/react/separator',
    installCmd: 'npx shadcn@latest add @karan-ui/separator',
    registryUrl: 'https://karan-ui.dev/r/separator.json',
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'Separator line direction',
        options: ['horizontal', 'vertical'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      orientation: 'horizontal',
    },
  },

  skeleton: {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'Feedback & Utilities',
    description: 'Used to show a placeholder while content is loading with soft pulse animation.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/skeleton',
    registryUrl: 'https://karan-ui.dev/r/skeleton.json',
    props: [],
    defaultProps: {},
  },

  kbd: {
    id: 'kbd',
    name: 'Kbd',
    category: 'Feedback & Utilities',
    description: 'Displays keyboard keys and shortcut combinations with pill border styling.',
    baseUiPrimitive: 'React.ComponentProps<"kbd">',
    installCmd: 'npx shadcn@latest add @karan-ui/kbd',
    registryUrl: 'https://karan-ui.dev/r/kbd.json',
    props: [],
    defaultProps: {},
  },

  label: {
    id: 'label',
    name: 'Label',
    category: 'Feedback & Utilities',
    description: 'Renders an accessible label associated with form controls.',
    baseUiPrimitive: 'React.ComponentProps<"label">',
    installCmd: 'npx shadcn@latest add @karan-ui/label',
    registryUrl: 'https://karan-ui.dev/r/label.json',
    props: [],
    defaultProps: {},
  },

  field: {
    id: 'field',
    name: 'Field',
    category: 'Actions & Inputs',
    description: 'Field wrapper combining label, description, control, and validation errors.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/field',
    registryUrl: 'https://karan-ui.dev/r/field.json',
    props: [
      {
        name: 'orientation',
        type: "'vertical' | 'horizontal' | 'responsive'",
        defaultValue: "'vertical'",
        description: 'Layout direction of label and input',
        options: ['vertical', 'horizontal', 'responsive'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      orientation: 'vertical',
    },
  },

  item: {
    id: 'item',
    name: 'Item',
    category: 'Data Display & Layout',
    description: 'A flexible list item component for menus, cards, and activity feeds.',
    baseUiPrimitive: '@base-ui/react/use-render',
    installCmd: 'npx shadcn@latest add @karan-ui/item',
    registryUrl: 'https://karan-ui.dev/r/item.json',
    props: [],
    defaultProps: {},
  },

  empty: {
    id: 'empty',
    name: 'Empty',
    category: 'Data Display & Layout',
    description: 'Displays a friendly empty state when no content or results exist.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/empty',
    registryUrl: 'https://karan-ui.dev/r/empty.json',
    props: [],
    defaultProps: {},
  },

  'button-group': {
    id: 'button-group',
    name: 'Button Group',
    category: 'Actions & Inputs',
    description: 'Attaches buttons together in a contiguous toolbar row or column.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/button-group',
    registryUrl: 'https://karan-ui.dev/r/button-group.json',
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'Group direction',
        options: ['horizontal', 'vertical'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      orientation: 'horizontal',
    },
  },

  toggle: {
    id: 'toggle',
    name: 'Toggle',
    category: 'Actions & Inputs',
    description: 'A two-state button that can be either on or off.',
    baseUiPrimitive: '@base-ui/react/toggle',
    installCmd: 'npx shadcn@latest add @karan-ui/toggle',
    registryUrl: 'https://karan-ui.dev/r/toggle.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'outline'",
        defaultValue: "'default'",
        description: 'Toggle appearance',
        options: ['default', 'outline'],
        controlType: 'select',
      },
      {
        name: 'size',
        type: "'default' | 'sm' | 'lg'",
        defaultValue: "'default'",
        description: 'Toggle button size',
        options: ['default', 'sm', 'lg'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      variant: 'default',
      size: 'default',
    },
  },

  'toggle-group': {
    id: 'toggle-group',
    name: 'Toggle Group',
    category: 'Actions & Inputs',
    description: 'A set of two-state buttons that can be toggled on or off.',
    baseUiPrimitive: '@base-ui/react/toggle-group',
    installCmd: 'npx shadcn@latest add @karan-ui/toggle-group',
    registryUrl: 'https://karan-ui.dev/r/toggle-group.json',
    props: [
      {
        name: 'variant',
        type: "'default' | 'outline'",
        defaultValue: "'default'",
        description: 'Style variant',
        options: ['default', 'outline'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      variant: 'default',
    },
  },

  'input-group': {
    id: 'input-group',
    name: 'Input Group',
    category: 'Actions & Inputs',
    description: 'Attaches icons, buttons, or addons before or after an input field.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/input-group',
    registryUrl: 'https://karan-ui.dev/r/input-group.json',
    props: [],
    defaultProps: {},
  },

  'input-otp': {
    id: 'input-otp',
    name: 'Input OTP',
    category: 'Actions & Inputs',
    description: 'Accessible one-time password input component with copy-paste and slot animations.',
    baseUiPrimitive: 'input-otp',
    installCmd: 'npx shadcn@latest add @karan-ui/input-otp',
    registryUrl: 'https://karan-ui.dev/r/input-otp.json',
    props: [],
    defaultProps: {},
  },

  'scroll-area': {
    id: 'scroll-area',
    name: 'Scroll Area',
    category: 'Data Display & Layout',
    description: 'Augments native scroll with custom cross-browser styling and custom scrollbars.',
    baseUiPrimitive: '@base-ui/react/scroll-area',
    installCmd: 'npx shadcn@latest add @karan-ui/scroll-area',
    registryUrl: 'https://karan-ui.dev/r/scroll-area.json',
    props: [],
    defaultProps: {},
  },

  'aspect-ratio': {
    id: 'aspect-ratio',
    name: 'Aspect Ratio',
    category: 'Data Display & Layout',
    description: 'Displays content within a desired aspect ratio (e.g. 16/9, 4/3, 1/1).',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/aspect-ratio',
    registryUrl: 'https://karan-ui.dev/r/aspect-ratio.json',
    props: [
      {
        name: 'ratio',
        type: 'number',
        defaultValue: '1.7777777777777777',
        description: 'Aspect ratio ratio (width / height)',
        controlType: 'number',
      },
    ],
    defaultProps: {
      ratio: 16 / 9,
    },
  },

  resizable: {
    id: 'resizable',
    name: 'Resizable',
    category: 'Data Display & Layout',
    description: 'Accessible resizable panel groups and handles with tactile drag state.',
    baseUiPrimitive: 'react-resizable-panels',
    installCmd: 'npx shadcn@latest add @karan-ui/resizable',
    registryUrl: 'https://karan-ui.dev/r/resizable.json',
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'Split direction',
        options: ['horizontal', 'vertical'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      orientation: 'horizontal',
    },
  },

  'hover-card': {
    id: 'hover-card',
    name: 'Hover Card',
    category: 'Overlays & Dialogs',
    description: 'For sighted users to preview content available behind a link on hover.',
    baseUiPrimitive: '@base-ui/react/preview-card',
    installCmd: 'npx shadcn@latest add @karan-ui/hover-card',
    registryUrl: 'https://karan-ui.dev/r/hover-card.json',
    props: [],
    defaultProps: {},
  },

  calendar: {
    id: 'calendar',
    name: 'Calendar',
    category: 'Data Display & Layout',
    description: 'A date field component that allows users to enter and edit date values using react-day-picker.',
    baseUiPrimitive: 'react-day-picker',
    installCmd: 'npx shadcn@latest add @karan-ui/calendar',
    registryUrl: 'https://karan-ui.dev/r/calendar.json',
    props: [],
    defaultProps: {},
  },

  carousel: {
    id: 'carousel',
    name: 'Carousel',
    category: 'Data Display & Layout',
    description: 'A carousel with motion and swipe gestures built with Embla Carousel.',
    baseUiPrimitive: 'embla-carousel-react',
    installCmd: 'npx shadcn@latest add @karan-ui/carousel',
    registryUrl: 'https://karan-ui.dev/r/carousel.json',
    props: [],
    defaultProps: {},
  },

  chart: {
    id: 'chart',
    name: 'Chart',
    category: 'Data Display & Layout',
    description: 'Beautiful charts built using Recharts and Tailwind v4 CSS variables.',
    baseUiPrimitive: 'recharts',
    installCmd: 'npx shadcn@latest add @karan-ui/chart',
    registryUrl: 'https://karan-ui.dev/r/chart.json',
    props: [],
    defaultProps: {},
  },

  command: {
    id: 'command',
    name: 'Command',
    category: 'Actions & Inputs',
    description: 'Fast, composable, unstyled command menu for React built with cmdk.',
    baseUiPrimitive: 'cmdk',
    installCmd: 'npx shadcn@latest add @karan-ui/command',
    registryUrl: 'https://karan-ui.dev/r/command.json',
    props: [],
    defaultProps: {},
  },

  combobox: {
    id: 'combobox',
    name: 'Combobox',
    category: 'Actions & Inputs',
    description: 'Autocomplete input and picker combo built with Base UI Combobox primitives.',
    baseUiPrimitive: '@base-ui/react/combobox',
    installCmd: 'npx shadcn@latest add @karan-ui/combobox',
    registryUrl: 'https://karan-ui.dev/r/combobox.json',
    props: [],
    defaultProps: {},
  },

  toast: {
    id: 'toast',
    name: 'Toast',
    category: 'Feedback & Utilities',
    description: 'A succinct message that is displayed temporarily, handled natively by Base UI Toast.',
    baseUiPrimitive: '@base-ui/react/toast',
    installCmd: 'npx shadcn@latest add @karan-ui/toast',
    registryUrl: 'https://karan-ui.dev/r/toast.json',
    props: [
      {
        name: 'title',
        type: 'string',
        defaultValue: "'Notification'",
        description: 'Primary headline text for the toast notification',
        controlType: 'text',
      },
      {
        name: 'description',
        type: 'string',
        defaultValue: "'This is a native Base UI toast notification.'",
        description: 'Secondary explanatory message for the toast',
        controlType: 'text',
      },
      {
        name: 'type',
        type: "'success' | 'info' | 'warning' | 'error' | 'loading'",
        defaultValue: "'success'",
        description: 'Status type icon and styling of the toast',
        options: ['success', 'info', 'warning', 'error', 'loading'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      title: 'Notification',
      description: 'This is a native Base UI toast notification.',
      type: 'success',
    },
  },

  sidebar: {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'Navigation & Menus',
    description: 'A composable, responsive sidebar component with collapsible panels and tooltips.',
    baseUiPrimitive: 'React.ComponentProps<"div">',
    installCmd: 'npx shadcn@latest add @karan-ui/sidebar',
    registryUrl: 'https://karan-ui.dev/r/sidebar.json',
    props: [],
    defaultProps: {},
  },

  'theme-provider': {
    id: 'theme-provider',
    name: 'ThemeProvider',
    category: 'Feedback & Utilities',
    description:
      'Unified application root provider orchestrating @wrksz/themes theme switching, native Base UI Toast & Tooltip providers, and Shadcn Typeset vertical rhythm measurements.',
    baseUiPrimitive: '@wrksz/themes + Base UI',
    installCmd: 'npx shadcn@latest add @karan-ui/theme-provider',
    registryUrl: 'https://karan-ui.dev/r/theme-provider.json',
    props: [
      {
        name: 'themes',
        type: 'string[]',
        defaultValue: "['light', 'dark']",
        description:
          'List of valid themes. Supports custom strings (e.g. ["dark-modern", "light-vintage"]).',
        options: [
          '["light", "dark"]',
          '["dark-modern", "light-vintage"]',
          '["light", "dark", "high-contrast"]',
        ],
        controlType: 'select',
      },
      {
        name: 'defaultTheme',
        type: 'string',
        defaultValue: "'system'",
        description: 'Initial theme when no user preference is stored.',
        options: ['system', 'light', 'dark', 'dark-modern', 'light-vintage'],
        controlType: 'select',
      },
      {
        name: 'enableSystem',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Detects system preference changes via prefers-color-scheme.',
        controlType: 'boolean',
      },
      {
        name: 'attribute',
        type: "'class' | 'data-theme' | 'data-mode'",
        defaultValue: "'class'",
        description: 'HTML attribute modified on the target document element.',
        options: ['class', 'data-theme', 'data-mode'],
        controlType: 'select',
      },
      {
        name: 'typeset',
        type: "'default' | 'docs' | 'chat' | 'reading' | 'compact' | 'large'",
        defaultValue: "'default'",
        description:
          'Shadcn Typeset vertical rhythm preset controlling size, leading, flow, and measure.',
        options: ['default', 'docs', 'chat', 'reading', 'compact', 'large'],
        controlType: 'select',
      },
      {
        name: 'toast',
        type: 'boolean | Partial<ToasterProps>',
        defaultValue: 'true',
        description:
          'Automatically mounts the native Base UI Toast manager & viewport (<Toaster />).',
        controlType: 'boolean',
      },
      {
        name: 'tooltip',
        type: 'boolean | Partial<TooltipProviderProps>',
        defaultValue: 'true',
        description:
          'Wraps children with the native Base UI TooltipProvider with global delay.',
        controlType: 'boolean',
      },
      {
        name: 'colorTheme',
        type: 'string',
        defaultValue: "'zinc'",
        description:
          'Design token color theme identifier (e.g. zinc, slate, neutral, rose, blue).',
        options: ['zinc', 'slate', 'neutral', 'rose', 'blue'],
        controlType: 'select',
      },
    ],
    defaultProps: {
      themes: ['light', 'dark'],
      defaultTheme: 'system',
      enableSystem: true,
      attribute: 'class',
      typeset: 'default',
      toast: true,
      tooltip: true,
      colorTheme: 'zinc',
    },
    usageGuide: {
      summary:
        'The Karan UI ThemeProvider is the foundational root provider designed for modern Next.js 16 and React 19 applications. It seamlessly unifies @wrksz/themes (supporting arbitrary theme string arrays without SSR flash), native Base UI Toaster and TooltipProvider primitives, and the Shadcn Typeset specification for vertical typography rhythm.',
      install: {
        cli: 'npx shadcn@latest add @karan-ui/theme-provider',
        registryUrl: 'https://karan-ui.dev/r/theme-provider.json',
      },
      rootLayoutSetup: {
        filename: 'src/app/layout.tsx',
        explanation:
          'Wrap your root layout in <ThemeProvider> and place suppressHydrationWarning on <html> to allow @wrksz/themes pre-hydration script to set initial classes without React 19 hydration mismatch warnings.',
        code: `import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karan UI Application",
  description: "Built with Karan UI, Base UI, and Tailwind CSS v4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          typeset="docs"
          colorTheme="zinc"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`,
      },
      features: [
        {
          title: 'Arbitrary Theme String Arrays (@wrksz/themes)',
          badge: 'Dark / Light / Custom Themes',
          description:
            'Unlike legacy providers locked to standard dark and light, ThemeProvider accepts any array of theme strings such as ["dark-modern", "light-vintage"]. Use the useTheme() hook anywhere in client components to inspect and switch themes.',
          code: `// 1. Defining custom themes in your layout
<ThemeProvider
  themes={["dark-modern", "light-vintage", "dark-neon", "light-minimal"]}
  defaultTheme="dark-modern"
>
  {children}
</ThemeProvider>

// 2. Switching themes in any client component
import { useTheme } from "@/components/theme-provider";

export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme, themes } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={theme === t ? "font-bold text-primary-text" : "text-neutral-text-muted"}
        >
          {t}
        </button>
      ))}
      <button onClick={() => setTheme("system")}>System</button>
    </div>
  );
}`,
        },
        {
          title: 'Zero-Config Native Base UI Toast',
          badge: '@base-ui/react/toast',
          description:
            'ThemeProvider automatically renders the Base UI native <Toaster /> at the root level. Any component or action in your application can directly import toast and trigger notifications without having to manually place <Toaster /> tags in page templates.',
          code: `import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export function ActionButton() {
  return (
    <Button
      onClick={() => {
        toast.add({
          title: "Settings Saved",
          description: "Your user preferences were updated in Karan UI.",
          type: "success",
        });
      }}
    >
      Save Changes
    </Button>
  );
}`,
        },
        {
          title: 'Zero-Config Native Base UI Tooltip',
          badge: '@base-ui/react/tooltip',
          description:
            'Base UI TooltipProvider is included at the root by default with an instant hover delay. You can use <Tooltip>, <TooltipTrigger>, and <TooltipContent> anywhere without wrapping individual views or buttons in local providers.',
          code: `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function HelpButton() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
        ?
      </TooltipTrigger>
      <TooltipContent>
        Contextual assistance rendered via Base UI primitive.
      </TooltipContent>
    </Tooltip>
  );
}`,
        },
        {
          title: 'Shadcn Typeset Vertical Rhythm Specification',
          badge: 'Typography & Vertical Rhythm',
          description:
            'Implements the complete Shadcn Typeset specification (https://ui.shadcn.com/docs/typeset). Dynamically establishes CSS variables for --typeset-size, --typeset-leading, --typeset-flow, and --typeset-measure. Includes built-in presets: default, docs, chat, reading, compact, and large.',
          code: `import { Typeset, useTypeset } from "@/components/theme-provider";

export function ArticleView() {
  const { preset, setPreset, measurements } = useTypeset();

  return (
    <div>
      {/* Switch rhythm preset on the fly */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setPreset("reading")}>Reading Mode</button>
        <button onClick={() => setPreset("compact")}>Compact Mode</button>
      </div>

      {/* Scoped Typeset Container */}
      <Typeset preset="reading" className="prose">
        <h1>Intentional Vertical Rhythm</h1>
        <p>
          Body text, headings, and lists maintain proportional leading and flow spacing.
        </p>
      </Typeset>
    </div>
  );
}`,
        },
        {
          title: 'Color Theme Token Slot',
          badge: 'Extensible Palette',
          description:
            'A centralized design-token slot and context for upcoming color themes (zinc, slate, neutral, rose, blue, etc.). Allows accessing active colorTheme and switching palettes via useColorTheme().',
          code: `import { useColorTheme } from "@/components/theme-provider";

export function ColorThemeBadge() {
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-neutral-text-muted">Palette:</span>
      <span className="font-mono font-semibold">{colorTheme}</span>
      <button onClick={() => setColorTheme("rose")}>Switch to Rose</button>
    </div>
  );
}`,
        },
      ],
      apiReference: [
        {
          name: 'useTheme()',
          type: '() => ThemeContextValue',
          description:
            'Returns { theme, resolvedTheme, setTheme, themes, systemTheme } from @wrksz/themes.',
        },
        {
          name: 'useTypeset()',
          type: '() => TypesetContextValue',
          description:
            'Returns { measurements, preset, setPreset, setMeasurements, style, className }.',
        },
        {
          name: 'useColorTheme()',
          type: '() => ColorThemeContextValue',
          description:
            'Returns { colorTheme, setColorTheme, config } for color palette switching.',
        },
        {
          name: 'toast.add(options)',
          type: '(options: ToastOptions) => string',
          description:
            'Natively dispatches a toast notification to the global Base UI Toaster.',
        },
        {
          name: '<Typeset />',
          type: 'React.FC<TypesetProps>',
          description:
            'Container component that applies scoped vertical rhythm typography variables and styling.',
        },
      ],
      tips: [
        'Add suppressHydrationWarning to your <html> tag in Next.js RootLayout to eliminate hydration warnings from pre-hydration theme scripts.',
        'Custom themes can be styled in globals.css using attribute selectors like html.dark-modern or [data-theme="light-vintage"].',
        'If you wish to manage toasts manually, pass toast={false} to <ThemeProvider> and place <Toaster /> explicitly where needed.',
      ],
    },
  },
};

export const CATEGORIES = [
  'Actions & Inputs',
  'Overlays & Dialogs',
  'Navigation & Menus',
  'Data Display & Layout',
  'Feedback & Utilities',
] as const;

export function getComponentsByCategory() {
  const result: Record<string, ComponentMetadata[]> = {};
  for (const cat of CATEGORIES) {
    result[cat] = [];
  }
  for (const item of Object.values(COMPONENTS_METADATA)) {
    if (result[item.category]) {
      result[item.category].push(item);
    }
  }
  return result;
}
