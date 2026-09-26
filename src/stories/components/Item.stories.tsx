import type { Meta, StoryObj } from '@storybook/react';
import {
  Item,
  ItemGroup,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemMedia,
  ItemSeparator,
} from '@/components/ui/item';
import { ShieldCheck, Zap, Sparkles } from 'lucide-react';

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Item>;

export const Default: Story = {
  render: () => (
    <div className="w-[380px] rounded-xl border p-2">
      <ItemGroup>
        <Item>
          <ItemMedia variant="icon">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Enterprise Security</ItemTitle>
            <ItemDescription>SOC2 Type II certified and verified.</ItemDescription>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia variant="icon">
            <Zap className="h-5 w-5 text-amber-500" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Instant Deployment</ItemTitle>
            <ItemDescription>Push to production in milliseconds.</ItemDescription>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia variant="icon">
            <Sparkles className="h-5 w-5 text-purple-500" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>karan-ui Design Tokens</ItemTitle>
            <ItemDescription>Authentic rounded-4xl pill aesthetics.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  ),
};
