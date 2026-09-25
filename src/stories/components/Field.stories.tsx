import type { Meta, StoryObj } from '@storybook/react';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <div className="w-[360px]">
      <Field>
        <FieldLabel htmlFor="email-field">Email address</FieldLabel>
        <Input id="email-field" type="email" placeholder="you@example.com" />
        <FieldDescription>We will never share your email with anyone.</FieldDescription>
      </Field>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-[360px]">
      <Field>
        <FieldLabel htmlFor="username-field">Username</FieldLabel>
        <Input id="username-field" defaultValue="admin" aria-invalid="true" />
        <FieldError>This username is already taken.</FieldError>
      </Field>
    </div>
  ),
};

export const GroupForm: Story = {
  render: () => (
    <div className="w-[360px]">
      <FieldSet>
        <FieldLegend>Account Setup</FieldLegend>
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="first-name">First Name</FieldLabel>
            <Input id="first-name" placeholder="John" />
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
            <Input id="last-name" placeholder="Doe" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};
