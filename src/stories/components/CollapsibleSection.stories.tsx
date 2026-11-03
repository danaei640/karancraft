import type { Meta, StoryObj } from '@storybook/react';
import {
  CollapsibleSection,
  CollapsibleSectionTrigger,
  CollapsibleSectionContent,
} from '@/components/ui/collapsible-section';
import { Layers, Shield, Cpu } from 'icons';

const meta: Meta<typeof CollapsibleSection> = {
  title: 'Components/CollapsibleSection',
  component: CollapsibleSection,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    defaultOpen: true,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof CollapsibleSection>;

export const Default: Story = {
  render: (props) => (
    <CollapsibleSection
      defaultOpen
      className="w-full max-w-md rounded-xl border border-neutral-interactive/60 bg-neutral-surface p-1.5"
      {...props}
    >
      <CollapsibleSectionTrigger>
        <span>Repository Dependencies (3)</span>
      </CollapsibleSectionTrigger>
      <CollapsibleSectionContent className="space-y-2">
        <div className="rounded-lg border border-neutral-interactive/60 bg-neutral-surface-alt/50 px-3 py-2 font-mono text-xs text-neutral-text">
          @base-ui/react
        </div>
        <div className="rounded-lg border border-neutral-interactive/60 bg-neutral-surface-alt/50 px-3 py-2 font-mono text-xs text-neutral-text">
          next@16.3.6
        </div>
        <div className="rounded-lg border border-neutral-interactive/60 bg-neutral-surface-alt/50 px-3 py-2 font-mono text-xs text-neutral-text">
          tailwindcss@4.1
        </div>
      </CollapsibleSectionContent>
    </CollapsibleSection>
  ),
};

export const StackedSections: Story = {
  render: () => (
    <div className="w-full max-w-md divide-y divide-neutral-interactive/50 rounded-xl border border-neutral-interactive/60 bg-neutral-surface p-1.5">
      <CollapsibleSection defaultOpen className="py-1 first:pt-0 last:pb-0">
        <CollapsibleSectionTrigger>
          <Layers className="size-4 text-neutral-text-muted shrink-0" />
          <span>Build Pipeline</span>
          <span className="ms-1.5 rounded-md bg-neutral-interactive px-1.5 py-0.5 font-mono text-[11px] text-neutral-text-muted">
            Active
          </span>
        </CollapsibleSectionTrigger>
        <CollapsibleSectionContent className="space-y-1.5">
          <p className="text-xs leading-relaxed text-neutral-text-secondary">
            Automatically compiles registry JSON manifests and runs static type verification on every commit.
          </p>
        </CollapsibleSectionContent>
      </CollapsibleSection>

      <CollapsibleSection className="py-1 first:pt-0 last:pb-0">
        <CollapsibleSectionTrigger>
          <Cpu className="size-4 text-neutral-text-muted shrink-0" />
          <span>Compute Scaling Limits</span>
        </CollapsibleSectionTrigger>
        <CollapsibleSectionContent className="space-y-1.5">
          <p className="text-xs leading-relaxed text-neutral-text-secondary">
            Configured for scale-to-zero with instant cold start and up to 8 vCPU burst capacity.
          </p>
        </CollapsibleSectionContent>
      </CollapsibleSection>

      <CollapsibleSection className="py-1 first:pt-0 last:pb-0">
        <CollapsibleSectionTrigger>
          <Shield className="size-4 text-neutral-text-muted shrink-0" />
          <span>Security & Access Rules</span>
        </CollapsibleSectionTrigger>
        <CollapsibleSectionContent className="space-y-1.5">
          <p className="text-xs leading-relaxed text-neutral-text-secondary">
            Strict origin verification and token-scoped API routes are enforced across all environments.
          </p>
        </CollapsibleSectionContent>
      </CollapsibleSection>
    </div>
  ),
};

export const ShorthandLabel: Story = {
  render: () => (
    <CollapsibleSection
      defaultOpen
      label="Environment Variables"
      className="w-full max-w-md rounded-xl border border-neutral-interactive/60 bg-neutral-surface p-1.5"
    >
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between rounded-md bg-neutral-surface-alt/60 px-2.5 py-1.5 font-mono">
          <span className="text-neutral-text">NODE_ENV</span>
          <span className="text-neutral-text-muted">production</span>
        </div>
        <div className="flex items-center justify-between rounded-md bg-neutral-surface-alt/60 px-2.5 py-1.5 font-mono">
          <span className="text-neutral-text">PORT</span>
          <span className="text-neutral-text-muted">3000</span>
        </div>
      </div>
    </CollapsibleSection>
  ),
};

export const Disabled: Story = {
  render: () => (
    <CollapsibleSection
      disabled
      className="w-full max-w-md rounded-xl border border-neutral-interactive/60 bg-neutral-surface p-1.5"
    >
      <CollapsibleSectionTrigger>
        Locked Configuration Section
      </CollapsibleSectionTrigger>
      <CollapsibleSectionContent>
        This content cannot be toggled while the collapsible section is disabled.
      </CollapsibleSectionContent>
    </CollapsibleSection>
  ),
};
