import type { Meta, StoryObj } from '@storybook/react';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldCaption,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldContent,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'responsive'],
      description: 'Layout direction of label, control, and supporting text.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: (args: any) => (
    <div className="w-[360px]">
      <Field {...args}>
        <FieldLabel htmlFor="email-field">Email address</FieldLabel>
        <FieldDescription>
          Enter the corporate or personal email linked to your workspace.
        </FieldDescription>
        <Input id="email-field" type="email" placeholder="you@example.com" />
        <FieldCaption>We will send a single-use authentication link.</FieldCaption>
      </Field>
    </div>
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <div className="w-[360px]">
      <Field>
        <FieldLabel htmlFor="phone-field">Phone number</FieldLabel>
        <Input id="phone-field" type="tel" placeholder="+1 (555) 012-3456" />
        <FieldCaption>Standard SMS notification rates may apply.</FieldCaption>
      </Field>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-[360px]">
      <Field>
        <FieldLabel htmlFor="username-field">Username</FieldLabel>
        <FieldDescription>Your public profile handle visible across teams.</FieldDescription>
        <Input id="username-field" defaultValue="admin" aria-invalid="true" />
        <FieldCaption intent="danger">This username is already taken. Please choose another.</FieldCaption>
      </Field>
    </div>
  ),
};

export const CaptionIntents: Story = {
  render: () => (
    <div className="flex w-[360px] flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="caption-neutral">Neutral Hint</FieldLabel>
        <Input id="caption-neutral" placeholder="Neutral caption" />
        <FieldCaption intent="neutral">Standard helper text for formatting guidance.</FieldCaption>
      </Field>
      <Field>
        <FieldLabel htmlFor="caption-info">Info Notice</FieldLabel>
        <Input id="caption-info" placeholder="Info caption" />
        <FieldCaption intent="info">Autosaved draft will be synced every 30 seconds.</FieldCaption>
      </Field>
      <Field>
        <FieldLabel htmlFor="caption-warning">Warning Alert</FieldLabel>
        <Input id="caption-warning" placeholder="Warning caption" />
        <FieldCaption intent="warning">Changing your domain may temporarily disrupt incoming traffic.</FieldCaption>
      </Field>
      <Field>
        <FieldLabel htmlFor="caption-danger">Danger Error</FieldLabel>
        <Input id="caption-danger" defaultValue="invalid@@mail" aria-invalid="true" />
        <FieldCaption intent="danger">Please enter a valid email address.</FieldCaption>
      </Field>
      <Field>
        <FieldLabel htmlFor="caption-success">Success Confirmation</FieldLabel>
        <Input id="caption-success" defaultValue="karan-craft" />
        <FieldCaption intent="success">Domain handle is available for registration.</FieldCaption>
      </Field>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-[440px]">
      <Field orientation="horizontal">
        <FieldLabel htmlFor="org-domain">Custom Domain</FieldLabel>
        <FieldContent>
          <FieldDescription>Optional custom CNAME routing for your project.</FieldDescription>
          <Input id="org-domain" placeholder="app.company.com" />
          <FieldCaption>Requires DNS verification within 24 hours.</FieldCaption>
        </FieldContent>
      </Field>
    </div>
  ),
};

export const FormGroup: Story = {
  render: () => (
    <div className="w-[380px]">
      <FieldSet>
        <FieldLegend>Profile Details</FieldLegend>
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="first-name">First Name</FieldLabel>
            <Input id="first-name" placeholder="Alex" />
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
            <Input id="last-name" placeholder="Morgan" />
          </Field>
          <Field>
            <FieldLabel htmlFor="website">Website</FieldLabel>
            <FieldDescription>Must include https:// prefix.</FieldDescription>
            <Input id="website" placeholder="https://example.com" />
            <FieldCaption>Displayed publicly on your portfolio card.</FieldCaption>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};
