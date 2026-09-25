import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args: any) => (
    <div className="w-[450px] overflow-hidden rounded-2xl border">
      <AspectRatio ratio={args?.ratio || 16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Landscape"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const SixteenByNine: Story = {
  render: () => (
    <div className="w-[450px] overflow-hidden rounded-2xl border">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Landscape"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="w-[300px] overflow-hidden rounded-2xl border">
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
          alt="Portrait"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};
