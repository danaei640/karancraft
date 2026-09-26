import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Lock, Bell, BarChart3, Settings } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="account" className="w-full max-w-md" {...args}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Account Settings</CardTitle>
            <CardDescription className="text-xs">
              Manage your personal profile and display settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 py-0">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs">Display Name</Label>
              <Input id="name" defaultValue="Karan Arora" className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username" className="text-xs">Username</Label>
              <Input id="username" defaultValue="@karan" className="h-8 text-xs" />
            </div>
          </CardContent>
          <CardFooter className="pt-3">
            <Button size="sm" className="w-full">Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Password & Security</CardTitle>
            <CardDescription className="text-xs">
              Update credentials and active session tokens.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 py-0">
            <div className="space-y-1">
              <Label htmlFor="current" className="text-xs">Current Password</Label>
              <Input id="current" type="password" className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new" className="text-xs">New Password</Label>
              <Input id="new" type="password" className="h-8 text-xs" />
            </div>
          </CardContent>
          <CardFooter className="pt-3">
            <Button size="sm" className="w-full">Update Password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-3">
        <div className="p-4 rounded-2xl border border-neutral-interactive/50 bg-neutral-surface-alt/40 space-y-2">
          <span className="text-xs font-semibold text-primary-text">Overview Dashboard</span>
          <p className="text-xs text-neutral-text-muted leading-relaxed">
            Real-time telemetry and component utilization metrics across active production sessions.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="p-2.5 rounded-xl bg-neutral-surface border border-neutral-interactive/40">
              <span className="text-[10px] text-neutral-text-muted">Total Requests</span>
              <p className="text-sm font-bold font-mono">1.24M</p>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-surface border border-neutral-interactive/40">
              <span className="text-[10px] text-neutral-text-muted">Uptime</span>
              <p className="text-sm font-bold font-mono">99.98%</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="pt-3">
        <div className="p-4 rounded-2xl border border-neutral-interactive/50 bg-neutral-surface-alt/40 space-y-2">
          <span className="text-xs font-semibold text-primary-text">Analytics Engine</span>
          <p className="text-xs text-neutral-text-muted leading-relaxed">
            Detailed breakdowns of Base UI component adoption and token consistency checks.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports" className="pt-3">
        <div className="p-4 rounded-2xl border border-neutral-interactive/50 bg-neutral-surface-alt/40 space-y-2">
          <span className="text-xs font-semibold text-primary-text">Compliance Reports</span>
          <p className="text-xs text-neutral-text-muted leading-relaxed">
            Automated WCAG 2.2 AAA accessibility audits generated on each commit.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account" className="gap-1.5 text-xs">
          <User className="size-3.5" />
          <span>Profile</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="gap-1.5 text-xs">
          <Bell className="size-3.5" />
          <span>Alerts</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="gap-1.5 text-xs">
          <Settings className="size-3.5" />
          <span>Settings</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="pt-3">
        <div className="p-4 rounded-2xl border border-neutral-interactive/50 bg-neutral-surface-alt/40 text-xs text-neutral-text-muted">
          Profile preferences and personal identity configurations.
        </div>
      </TabsContent>
      <TabsContent value="notifications" className="pt-3">
        <div className="p-4 rounded-2xl border border-neutral-interactive/50 bg-neutral-surface-alt/40 text-xs text-neutral-text-muted">
          Notification dispatch channels, webhooks, and push tokens.
        </div>
      </TabsContent>
      <TabsContent value="settings" className="pt-3">
        <div className="p-4 rounded-2xl border border-neutral-interactive/50 bg-neutral-surface-alt/40 text-xs text-neutral-text-muted">
          System telemetry and workspace configuration settings.
        </div>
      </TabsContent>
    </Tabs>
  ),
};
