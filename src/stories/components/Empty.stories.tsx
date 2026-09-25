import type { Meta, StoryObj } from '@storybook/react';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from '@/components/ui/empty';
import { Button } from '@/components/ui/button';
import { FolderArchive, Plus } from 'lucide-react';

const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  render: () => (
    <div className="w-[420px] rounded-2xl border p-8">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderArchive className="h-10 w-10 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No projects found</EmptyTitle>
          <EmptyDescription>
            You haven't created any component registries or projects yet. Get started by creating your first registry.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  ),
};
