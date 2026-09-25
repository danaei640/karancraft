import type { Meta, StoryObj } from '@storybook/react';
import {
  Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxList,
  ComboboxGroup,
  ComboboxLabel,
} from '@/components/ui/combobox';

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

const meta: Meta = {
  title: 'Components/Combobox',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Combobox items={frameworks}>
        <div className="relative">
          <ComboboxInput placeholder="Select framework..." />
          <ComboboxTrigger />
        </div>
        <ComboboxContent>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxLabel>Frameworks</ComboboxLabel>
              {frameworks.map((item) => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};
