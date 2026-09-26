import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, ArrowUpRight } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    size: 'default',
    title: 'Project Overview',
    description: 'Telemetry & metrics for Karan UI registry',
  },
  render: (args: any) => (
    <Card className="w-[380px]" size={args?.size || 'default'}>
      <CardHeader>
        <CardTitle>{args?.title || 'Project Overview'}</CardTitle>
        <CardDescription>
          {args?.description || 'Telemetry & metrics for Karan UI registry'}
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">Pro</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <Bell className="h-5 w-5 text-neutral-text-muted" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Push Notifications</p>
            <p className="text-xs text-neutral-text-muted">Receive instant mobile pushes</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Cancel</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card className="w-[350px] transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Karan Analytics</span>
          <ArrowUpRight className="h-4 w-4 text-neutral-text-muted" />
        </CardTitle>
        <CardDescription>Real-time metrics & registry telemetry</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-heading">128,490</div>
        <p className="text-xs text-neutral-text-muted mt-1">+24.8% from last month</p>
      </CardContent>
    </Card>
  ),
};
