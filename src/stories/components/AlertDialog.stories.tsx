import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogMedia,
  type AlertDialogSize,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2, AlertTriangle, ShieldAlert } from 'icons';

interface AlertDialogStoryProps {
  size?: AlertDialogSize;
  title?: string;
  description?: string;
  actionText?: string;
  actionIntent?: 'danger' | 'primary' | 'warning';
}

const meta: Meta<any> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Modal width scale',
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    description: {
      control: 'text',
      description: 'Alert explanatory description',
    },
    actionText: {
      control: 'text',
      description: 'Confirm action button label',
    },
    actionIntent: {
      control: 'select',
      options: ['danger', 'primary', 'warning'],
      description: 'Semantic intent for confirmation action button',
    },
  },
  args: {
    size: 'sm',
    title: 'Are you absolutely sure?',
    description: 'This action cannot be undone. This will permanently delete your project and remove all associated data.',
    actionText: 'Delete Project',
    actionIntent: 'danger',
  },
};

export default meta;
type Story = StoryObj<AlertDialogStoryProps>;

export const Default: Story = {
  render: (args) => (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button intent={args.actionIntent} leading={<Trash2 className="size-4" />}>
            Trigger Confirmation
          </Button>
        }
      />
      <AlertDialogContent size={args.size}>
        <AlertDialogHeader>
          <AlertDialogTitle>{args.title}</AlertDialogTitle>
          <AlertDialogDescription>{args.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction intent={args.actionIntent}>
            {args.actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const DestructiveWithMedia: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button intent="danger" variant="default" leading={<AlertTriangle className="size-4" />}>
            Revoke Production API Keys
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogMedia>
          <div className="flex size-12 items-center justify-center rounded-full bg-danger-surface text-danger-text">
            <ShieldAlert className="size-6" />
          </div>
        </AlertDialogMedia>
        <AlertDialogHeader className="text-center sm:text-start">
          <AlertDialogTitle>Revoke Production Credentials</AlertDialogTitle>
          <AlertDialogDescription>
            All running microservices using this key will immediately lose database access and fail health checks.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Active</AlertDialogCancel>
          <AlertDialogAction intent="danger" leading={<Trash2 className="size-4" />}>
            Revoke Immediately
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(['sm', 'default', 'lg'] as AlertDialogSize[]).map((size) => (
        <AlertDialog key={size}>
          <AlertDialogTrigger
            render={<Button variant="outline">Alert Size: {size}</Button>}
          />
          <AlertDialogContent size={size}>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmation Tier ({size})</AlertDialogTitle>
              <AlertDialogDescription>
                Proportional layout with focus trap guarantees and accessible role attributes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Back</AlertDialogCancel>
              <AlertDialogAction intent="primary">Acknowledge</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ))}
    </div>
  ),
};
