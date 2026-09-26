import type { Meta, StoryObj } from '@storybook/react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Home, Inbox, Calendar, Search, Settings } from 'lucide-react';

const meta: Meta = {
  title: 'Components/Sidebar',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const items = [
  { title: 'Home', url: '#', icon: Home },
  { title: 'Inbox', url: '#', icon: Inbox },
  { title: 'Calendar', url: '#', icon: Calendar },
  { title: 'Search', url: '#', icon: Search },
  { title: 'Settings', url: '#', icon: Settings },
];

export const Default: Story = {
  render: () => (
    <div className="w-[800px] h-[450px] border rounded-2xl overflow-hidden flex">
      <SidebarProvider defaultOpen>
        <Sidebar>
          <SidebarHeader className="p-4 border-b">
            <h3 className="font-semibold font-heading text-sm">Karan UI App</h3>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton render={<a href={item.url} />}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t text-xs text-neutral-text-muted">
            v0.1.0 • Luma Registry
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <SidebarTrigger />
            <h2 className="text-xl font-bold font-heading">Dashboard</h2>
          </div>
          <div className="rounded-xl border p-4 bg-neutral-interactive/20 flex-1 flex items-center justify-center text-neutral-text-muted text-sm">
            Main content display area
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  ),
};
