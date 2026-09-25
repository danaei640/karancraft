import type { Meta, StoryObj } from '@storybook/react';
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from '@/components/ui/native-select';

const meta: Meta<typeof NativeSelect> = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NativeSelect>;

export const Default: Story = {
  render: () => (
    <NativeSelect defaultValue="banana" className="w-[200px]">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
    </NativeSelect>
  ),
};

export const Grouped: Story = {
  render: () => (
    <NativeSelect defaultValue="mercedes" className="w-[220px]">
      <NativeSelectOptGroup label="German Cars">
        <NativeSelectOption value="audi">Audi</NativeSelectOption>
        <NativeSelectOption value="bmw">BMW</NativeSelectOption>
        <NativeSelectOption value="mercedes">Mercedes</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Japanese Cars">
        <NativeSelectOption value="toyota">Toyota</NativeSelectOption>
        <NativeSelectOption value="honda">Honda</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
};
