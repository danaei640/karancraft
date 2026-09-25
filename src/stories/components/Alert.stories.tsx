import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Terminal, AlertCircle } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
  args: {
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[450px]">
      <Alert {...args}>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and registries to your app using the Karan UI CLI.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const Destructive: Story = {
  render: () => (
    <div className="w-[450px]">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again to continue.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
