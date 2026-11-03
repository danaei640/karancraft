import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { ArrowRight, Globe, KeyRound, Mail, Search, Send, Upload } from 'icons';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost'],
      description: 'Structural surface variant of the input',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg'],
      description:
        'Proportional height, corner radius, padding, and font size tier matching Button',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'file'],
      description: 'HTML input type',
    },
    passwordToggle: {
      control: 'boolean',
      description:
        'When type="password", renders a trailing toggle button to show/hide password',
    },
    browseLabel: {
      control: 'text',
      description: 'When type="file", customizes the Browse trigger badge text',
    },
    noFileLabel: {
      control: 'text',
      description:
        'When type="file", customizes the empty state text when no file is selected',
    },
    filesSelectedLabel: {
      control: 'text',
      description:
        'When type="file" and multiple is enabled, customizes the summary text ({count} placeholder)',
    },
    fileClearable: {
      control: 'boolean',
      description:
        'When type="file", displays a trailing button to clear selected files',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction and reduces opacity',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when empty',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    type: 'text',
    passwordToggle: true,
    browseLabel: 'Browse',
    noFileLabel: 'No file selected',
    filesSelectedLabel: '{count} files selected',
    fileClearable: true,
    disabled: false,
    placeholder: 'Enter your email...',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <Input {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-5 w-80">
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted block">
          variant=&quot;default&quot; (Soft Filled)
        </span>
        <Input
          variant="default"
          placeholder="Search documentation..."
        />
      </div>
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted block">
          variant=&quot;outline&quot; (Crisp Bordered)
        </span>
        <Input
          variant="outline"
          placeholder="name@company.com"
        />
      </div>
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted block">
          variant=&quot;ghost&quot; (Minimal Inline)
        </span>
        <Input
          variant="ghost"
          defaultValue="Untitled Workspace"
          placeholder="Workspace title..."
        />
      </div>
    </div>
  ),
};

export const SizesWithButton: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-full max-w-lg">
      <div className="space-y-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted block">
          Adjacent Pairing (Identical Height & Corner Radius)
        </span>

        <div className="flex items-center gap-2">
          <span className="w-16 text-xs font-mono text-neutral-text-muted shrink-0">
            xs (24px)
          </span>
          <Input
            size="xs"
            variant="outline"
            placeholder="Filter tags..."
            className="max-w-52"
          />
          <Button size="xs" variant="default">
            Apply
          </Button>
          <Button size="xs" variant="outline">
            Reset
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-16 text-xs font-mono text-neutral-text-muted shrink-0">
            sm (28px)
          </span>
          <Input
            size="sm"
            variant="outline"
            placeholder="Invite teammate..."
            className="max-w-52"
          />
          <Button size="sm" variant="default" leading={<Mail />}>
            Invite
          </Button>
          <Button size="sm" variant="outline">
            Cancel
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-16 text-xs font-mono text-neutral-text-muted shrink-0">
            default (32px)
          </span>
          <Input
            size="default"
            variant="outline"
            placeholder="Enter your email..."
            className="max-w-52"
          />
          <Button size="default" variant="default" trailing={<ArrowRight />}>
            Subscribe
          </Button>
          <Button size="default" variant="outline">
            Later
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-16 text-xs font-mono text-neutral-text-muted shrink-0">
            lg (36px)
          </span>
          <Input
            size="lg"
            variant="outline"
            placeholder="Deploy domain..."
            className="max-w-52"
          />
          <Button size="lg" variant="default" leading={<Send />}>
            Publish
          </Button>
          <Button size="lg" variant="outline">
            Preview
          </Button>
        </div>
      </div>

      <div className="space-y-2.5 pt-2 border-t border-neutral-interactive/50">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted block">
          Joined Inside ButtonGroup
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonGroup size="sm" variant="outline">
            <Input placeholder="Search..." className="w-44" />
            <Button size="icon-sm" aria-label="Search">
              <Search />
            </Button>
          </ButtonGroup>

          <ButtonGroup size="default" variant="outline">
            <Input placeholder="https://karan-ui.dev" className="w-52" />
            <Button>Connect</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  ),
};

export const PasswordToggle: Story = {
  render: () => (
    <div className="flex flex-col gap-5 w-80">
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted flex items-center gap-1.5">
          <KeyRound className="size-3.5" />
          Default Password Input (Click Eye to Toggle)
        </span>
        <Input
          type="password"
          variant="default"
          defaultValue="KaranUI#2026!"
          placeholder="Enter password..."
        />
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted block">
          Outline Password across Sizes (xs / sm / default / lg)
        </span>
        <div className="flex flex-col gap-2">
          <Input
            size="xs"
            variant="outline"
            type="password"
            defaultValue="secret-xs-token"
          />
          <Input
            size="sm"
            variant="outline"
            type="password"
            defaultValue="secret-sm-token"
          />
          <Input
            size="default"
            variant="outline"
            type="password"
            defaultValue="secret-default-token"
          />
          <Input
            size="lg"
            variant="outline"
            type="password"
            defaultValue="secret-lg-token"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted block">
          Password without Toggle (passwordToggle=&#123;false&#125;)
        </span>
        <Input
          type="password"
          variant="outline"
          passwordToggle={false}
          defaultValue="HiddenToggleExample"
        />
      </div>
    </div>
  ),
};

export const FileInputCustomization: Story = {
  render: () => (
    <div className="flex flex-col gap-5 w-full max-w-md">
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted block">
          File Input Sizes Paired with Button (xs / sm / default / lg)
        </span>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input type="file" size="xs" variant="outline" />
            <Button size="xs" variant="default">
              Upload
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input type="file" size="sm" variant="outline" />
            <Button size="sm" variant="default">
              Upload
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input type="file" size="default" variant="outline" />
            <Button size="default" variant="default">
              Upload
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input type="file" size="lg" variant="outline" />
            <Button size="lg" variant="default">
              Upload
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted block">
          Custom Labels & Multiple Files Support
        </span>
        <div className="flex flex-col gap-2.5">
          <Input
            type="file"
            variant="default"
            accept=".svg,.png,.jpg"
            browseLabel={
              <span className="inline-flex items-center gap-1">
                <Upload className="size-3" />
                Choose Avatar
              </span>
            }
            noFileLabel="PNG, JPG or SVG (max 4MB)"
          />
          <Input
            type="file"
            variant="outline"
            multiple
            browseLabel="Select Archives"
            noFileLabel="Drop or pick .zip bundles..."
            filesSelectedLabel="{count} archives ready for upload"
          />
        </div>
      </div>
    </div>
  ),
};

export const StatesAndFile: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted block">
          Invalid State (aria-invalid=&quot;true&quot;)
        </span>
        <Input
          variant="outline"
          aria-invalid="true"
          defaultValue="invalid-email-address"
        />
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted block">
          Disabled State
        </span>
        <Input
          variant="default"
          disabled
          defaultValue="Read-only system identifier"
        />
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted block">
          File Input (Default & Outline)
        </span>
        <div className="flex flex-col gap-2">
          <Input variant="default" type="file" />
          <Input variant="outline" type="file" />
        </div>
      </div>
    </div>
  ),
};

export const BidirectionalRTL: Story = {
  render: () => (
    <div className="flex flex-col gap-5 w-full max-w-md">
      <div dir="ltr" className="space-y-2 rounded-xl border border-neutral-interactive/60 p-3.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted flex items-center gap-1.5">
          <Globe className="size-3.5" />
          LTR Direction (dir=&quot;ltr&quot;) — Toggle at Inline-End (Right)
        </span>
        <div className="flex items-center gap-2">
          <Input
            type="password"
            variant="outline"
            defaultValue="P@ssw0rd2026"
            placeholder="Password"
          />
          <Button variant="default">Sign In</Button>
        </div>
        <Input
          type="file"
          variant="outline"
          browseLabel="Browse"
          noFileLabel="No file selected"
        />
      </div>

      <div dir="rtl" className="space-y-2 rounded-xl border border-neutral-interactive/60 p-3.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-text-muted flex items-center gap-1.5">
          <Globe className="size-3.5" />
          RTL Direction (dir=&quot;rtl&quot;) — Toggle at Inline-End (Left)
        </span>
        <div className="flex items-center gap-2">
          <Input
            type="password"
            variant="outline"
            defaultValue="P@ssw0rd2026"
            placeholder="رمز عبور..."
          />
          <Button variant="default">ورود</Button>
        </div>
        <Input
          type="file"
          variant="outline"
          browseLabel="انتخاب فایل"
          noFileLabel="فایلی انتخاب نشده است"
        />
      </div>
    </div>
  ),
};
