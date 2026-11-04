"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Label } from "@/registry/bases/base/ui/label"
import { Separator } from "@/registry/bases/base/ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn("cn-field-set flex flex-col", className)}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn("cn-field-legend", className)}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "cn-field-group group/field-group @container/field-group flex w-full flex-col",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva("cn-field group/field flex w-full", {
  variants: {
    orientation: {
      vertical:
        "cn-field-orientation-vertical flex-col *:w-full [&>.sr-only]:w-auto",
      horizontal:
        "cn-field-orientation-horizontal flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "cn-field-orientation-responsive flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "cn-field-content group/field-content flex flex-1 flex-col leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "cn-field-label group/field-label peer/field-label flex w-fit",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn("cn-field-title flex w-fit items-center", className)}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "cn-field-description text-xs text-neutral-text-muted leading-snug font-normal [[data-slot=field-label]+&]:-mt-1 group-has-data-horizontal/field:mt-0 group-has-data-horizontal/field:text-balance",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary-text",
        className
      )}
      {...props}
    />
  )
}

const fieldCaptionVariants = cva(
  "cn-field-caption text-xs leading-snug font-normal [&>a]:underline [&>a]:underline-offset-4",
  {
    variants: {
      intent: {
        neutral: "text-neutral-text-muted [&>a:hover]:text-neutral-text",
        danger: "text-danger-text [&>a:hover]:text-danger-text/80",
        success: "text-success-text [&>a:hover]:text-success-text/80",
        warning: "text-warning-text [&>a:hover]:text-warning-text/80",
        info: "text-info-text [&>a:hover]:text-info-text/80",
        primary: "text-primary-text [&>a:hover]:text-primary-text/80",
      },
    },
    defaultVariants: {
      intent: "neutral",
    },
  }
)

function FieldCaption({
  className,
  intent,
  children,
  errors,
  role,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof fieldCaptionVariants> & {
    errors?: Array<{ message?: string } | undefined>
  }) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  const effectiveIntent = intent ?? (errors?.length ? "danger" : "neutral")
  const isAlert = effectiveIntent === "danger"

  return (
    <div
      role={role ?? (isAlert ? "alert" : undefined)}
      data-slot="field-caption"
      data-intent={effectiveIntent}
      className={cn(
        fieldCaptionVariants({ intent: effectiveIntent }),
        className
      )}
      {...props}
    >
      {content}
    </div>
  )
}

const FormCaption = FieldCaption

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn("cn-field-separator relative", className)}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="cn-field-separator-content relative mx-auto block w-fit bg-neutral-surface"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldCaption,
  FormCaption,
  fieldCaptionVariants,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
