import type { Meta, StoryObj } from '@storybook/react';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, GitFork, Star, MapPin } from 'lucide-react';

const meta: Meta<any> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'radio',
      options: ['default', 'inverted'],
      description: 'Surface contrast appearance mode.',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size scale determining card width and internal padding.',
    },
    withArrow: {
      control: 'boolean',
      description: 'Whether to render an aligned arrow pointer toward the anchor trigger.',
    },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Preferred side of the trigger to render the hover card.',
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    appearance: 'default',
    size: 'default',
    withArrow: true,
    side: 'bottom',
  },
  render: (args: any) => (
    <div className="flex items-center justify-center p-8">
      <HoverCard>
        <HoverCardTrigger render={<Button variant="link" className="p-0 text-base font-semibold">@karancraft</Button>} />
        <HoverCardContent
          appearance={args.appearance}
          size={args.size}
          withArrow={args.withArrow}
          side={args.side}
        >
          <div className="flex gap-3.5">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="@karancraft" />
              <AvatarFallback>KC</AvatarFallback>
            </Avatar>
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-neutral-text">Karan Craft</h4>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">Pro</Badge>
              </div>
              <p className="text-xs text-neutral-text-muted leading-relaxed">
                Next-generation accessible design system built on Base UI and mathematical OKLCH color engine.
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs text-neutral-text-muted">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>San Francisco</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  <span>Joined Oct 2026</span>
                </div>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const Appearances: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-6">
      <HoverCard>
        <HoverCardTrigger render={<Button variant="outline">Default Hover Card</Button>} />
        <HoverCardContent appearance="default" withArrow>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Standard Surface</h4>
            <p className="text-xs text-neutral-text-muted">
              Balanced neutral surface with rich shadow elevation and borderless clarity.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger render={<Button variant="secondary">Inverted Hover Card</Button>} />
        <HoverCardContent appearance="inverted" withArrow>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-neutral-surface">Inverted Surface</h4>
            <p className="text-xs text-neutral-surface/70">
              High-contrast card for prominent author insights and system tooltips.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const RepositoryPreview: Story = {
  render: () => (
    <div className="flex items-center justify-center p-6">
      <HoverCard>
        <HoverCardTrigger
          render={
            <Button variant="link" className="gap-1.5 text-primary-fill font-medium">
              base-ui/react
            </Button>
          }
        />
        <HoverCardContent size="default" withArrow>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-neutral-text">@base-ui/react</span>
              <span className="text-[10px] rounded-full bg-success-surface text-success-text px-2 py-0.5 border border-success-interactive/40">
                Active
              </span>
            </div>
            <p className="text-xs text-neutral-text-muted">
              Unstyled UI components for React with cutting-edge CSS architecture, anchor positioning, and animations.
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-text-muted pt-1">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-warning-fill fill-warning-fill" />
                <span>14.2k</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" />
                <span>850</span>
              </div>
              <span className="ms-auto text-[11px] text-neutral-text-muted/80">TypeScript</span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};
