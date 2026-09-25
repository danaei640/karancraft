import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    title: 'Settings Saved',
    description: 'Your preferences have been updated in Karan UI.',
    type: 'success',
  },
  render: (args: any) => (
    <div className="flex flex-col items-center gap-3">
      <Toaster />
      <Button
        variant="outline"
        onClick={() => {
          toast.add({
            title: args?.title || 'Settings Saved',
            description: args?.description || 'Your preferences have been updated in Karan UI.',
            type: args?.type || 'success',
          });
        }}
      >
        Trigger Base UI Toast ({args?.type || 'success'})
      </Button>
      <span className="text-xs text-muted-foreground font-mono">
        Native @base-ui/react/toast notification
      </span>
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div className="flex gap-4">
      <Toaster />
      <Button
        variant="secondary"
        onClick={() => {
          toast.add({
            title: 'Project Created',
            description: 'Your new Karan UI project is ready.',
            type: 'success',
          });
        }}
      >
        Success Toast
      </Button>
    </div>
  ),
};

export const ErrorToast: Story = {
  render: () => (
    <div className="flex gap-4">
      <Toaster />
      <Button
        variant="destructive"
        onClick={() => {
          toast.add({
            title: 'Deployment Failed',
            description: 'Could not connect to the remote cluster.',
            type: 'error',
          });
        }}
      >
        Error Toast
      </Button>
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div className="flex gap-4">
      <Toaster />
      <Button
        variant="outline"
        onClick={() => {
          toast.add({
            title: 'Storage Warning',
            description: 'Your workspace is at 85% disk capacity.',
            type: 'warning',
          });
        }}
      >
        Warning Toast
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex gap-4">
      <Toaster />
      <Button
        variant="ghost"
        onClick={() => {
          toast.add({
            title: 'Exporting Assets...',
            description: 'Preparing your components package for distribution.',
            type: 'loading',
          });
        }}
      >
        Loading Toast
      </Button>
    </div>
  ),
};
