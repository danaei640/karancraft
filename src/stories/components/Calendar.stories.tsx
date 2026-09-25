import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: function SingleDatePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="rounded-2xl border p-4 w-fit">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
        />
      </div>
    );
  },
};

export const SingleDate: Story = {
  render: function SingleDatePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="rounded-2xl border p-4 w-fit">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
        />
      </div>
    );
  },
};
