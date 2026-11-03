import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args: any) => (
    <Select defaultValue="est" {...args}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select a timezone..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe &amp; UTC</SelectLabel>
          <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-neutral-text-muted">
          Default (Filled)
        </span>
        <Select variant="default" defaultValue="next">
          <SelectTrigger className="w-[190px]">
            <SelectValue placeholder="Select framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="next">Next.js 16</SelectItem>
            <SelectItem value="remix">React Router v7</SelectItem>
            <SelectItem value="astro">Astro 5</SelectItem>
            <SelectItem value="vite">Vite 6</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-neutral-text-muted">
          Outline
        </span>
        <Select variant="outline" defaultValue="remix">
          <SelectTrigger className="w-[190px]">
            <SelectValue placeholder="Select framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="next">Next.js 16</SelectItem>
            <SelectItem value="remix">React Router v7</SelectItem>
            <SelectItem value="astro">Astro 5</SelectItem>
            <SelectItem value="vite">Vite 6</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-neutral-text-muted">
          Ghost
        </span>
        <Select variant="ghost" defaultValue="astro">
          <SelectTrigger className="w-[190px]">
            <SelectValue placeholder="Select framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="next">Next.js 16</SelectItem>
            <SelectItem value="remix">React Router v7</SelectItem>
            <SelectItem value="astro">Astro 5</SelectItem>
            <SelectItem value="vite">Vite 6</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};

export const SizesAndFormulaParity: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      {(['xs', 'sm', 'default', 'lg'] as const).map((size) => (
        <div key={size} className="flex items-center gap-2.5">
          <span className="w-16 text-xs font-mono text-neutral-text-muted">
            {size}
          </span>
          <Select size={size} variant="outline" defaultValue="prod">
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prod">Production</SelectItem>
              <SelectItem value="stage">Staging</SelectItem>
              <SelectItem value="dev">Development</SelectItem>
            </SelectContent>
          </Select>
          <Input
            size={size}
            variant="outline"
            defaultValue="us-east-1"
            className="w-[140px]"
          />
          <Button size={size} variant="default">
            Deploy
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const AlignmentModes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-neutral-text-muted">
          alignWithItem={'{true}'} (Item Overlaps Trigger)
        </span>
        <Select alignWithItem={true} variant="outline" defaultValue="cherry">
          <SelectTrigger className="w-[210px]">
            <SelectValue placeholder="Pick a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
            <SelectItem value="dragonfruit">Dragonfruit</SelectItem>
            <SelectItem value="elderberry">Elderberry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-neutral-text-muted">
          alignWithItem={'{false}'} (Dropdown Below Trigger)
        </span>
        <Select alignWithItem={false} variant="outline" defaultValue="cherry">
          <SelectTrigger className="w-[210px]">
            <SelectValue placeholder="Pick a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
            <SelectItem value="dragonfruit">Dragonfruit</SelectItem>
            <SelectItem value="elderberry">Elderberry</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};

export const BaseUiItemsMap: Story = {
  render: () => {
    const roleItems = {
      owner: 'Workspace Owner',
      admin: 'Administrator',
      maintainer: 'Core Maintainer',
      viewer: 'Read-Only Viewer',
    };

    return (
      <div className="flex flex-wrap items-center gap-4">
        <Select items={roleItems} defaultValue="maintainer" variant="default">
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(roleItems).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select items={roleItems} variant="outline">
          <SelectTrigger className="w-[220px]" placeholder="Assign a role..." />
          <SelectContent>
            {Object.entries(roleItems).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  },
};

export const LayeredInCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
      {(['neutral', 'primary', 'info'] as const).map((intent) => (
        <Card key={intent} variant="default" intent={intent} size="sm">
          <CardHeader>
            <CardTitle className="capitalize">{intent} Surface</CardTitle>
            <CardDescription>
              Select variants harmonized via OKLCH color-mix.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5">
            <Select variant="default" size="sm" defaultValue="auto">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Default (Filled)</SelectItem>
                <SelectItem value="manual">Manual Override</SelectItem>
              </SelectContent>
            </Select>
            <Select variant="outline" size="sm" defaultValue="outline">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outline">Outline Variant</SelectItem>
                <SelectItem value="custom">Custom Policy</SelectItem>
              </SelectContent>
            </Select>
            <Select variant="ghost" size="sm" defaultValue="ghost">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ghost">Ghost Variant</SelectItem>
                <SelectItem value="minimal">Minimal Mode</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
