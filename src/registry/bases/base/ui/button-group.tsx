"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import type { ButtonIntent, ButtonVariant } from "@/registry/bases/base/ui/button"
import { Separator } from "@/registry/bases/base/ui/separator"

export type ButtonGroupSize = "xs" | "sm" | "default" | "lg"
export type ButtonGroupOrientation = "horizontal" | "vertical"

export interface ButtonGroupContextValue {
  variant?: ButtonVariant
  size?: ButtonGroupSize
  intent?: ButtonIntent
  disabled?: boolean
  orientation?: ButtonGroupOrientation
  attached?: boolean
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(
  null
)

export function useButtonGroupContext() {
  return React.useContext(ButtonGroupContext)
}

const buttonGroupVariants = cva(
  "cn-button-group inline-flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-20 *:hover:z-10 *:active:z-10 *:[&[data-pressed]]:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "cn-button-group-orientation-horizontal flex-row",
        vertical: "cn-button-group-orientation-vertical flex-col",
      },
      attached: {
        true: [
          "*:data-[slot=button]:bg-clip-border",
          "data-[orientation=horizontal]:[&>[data-slot]:not(:last-child)]:rounded-e-none",
          "data-[orientation=horizontal]:[&>[data-slot]:not(:first-child)]:rounded-s-none",
          "data-[orientation=horizontal]:[&>[data-slot=button][data-variant=outline]~[data-slot]]:-ms-px",
          "data-[orientation=horizontal]:[&>[data-slot=button-group-text]~[data-slot]]:-ms-px",
          "data-[orientation=horizontal]:[&>[data-slot]~[data-slot=button-group-text]]:-ms-px",
          "data-[orientation=horizontal]:[&>[data-slot=button][data-variant=default]:not(:hover):not(:active):not([data-pressed]):not(:focus-visible)+[data-slot=button][data-variant=default]:not(:hover):not(:active):not([data-pressed]):not(:focus-visible)]:border-s-neutral-on-fill/20",
          "data-[orientation=horizontal]:[&>[data-slot=button][data-variant=secondary]:not(:hover):not(:active):not([data-pressed]):not(:focus-visible)+[data-slot=button][data-variant=secondary]:not(:hover):not(:active):not([data-pressed]):not(:focus-visible)]:border-s-neutral-text/15",
          "data-[orientation=vertical]:[&>[data-slot]:not(:last-child)]:rounded-b-none",
          "data-[orientation=vertical]:[&>[data-slot]:not(:first-child)]:rounded-t-none",
          "data-[orientation=vertical]:[&>[data-slot=button][data-variant=outline]~[data-slot]]:-mt-px",
          "data-[orientation=vertical]:[&>[data-slot=button-group-text]~[data-slot]]:-mt-px",
          "data-[orientation=vertical]:[&>[data-slot]~[data-slot=button-group-text]]:-mt-px",
          "data-[orientation=vertical]:[&>[data-slot=button][data-variant=default]:not(:hover):not(:active):not([data-pressed]):not(:focus-visible)+[data-slot=button][data-variant=default]:not(:hover):not(:active):not([data-pressed]):not(:focus-visible)]:border-t-neutral-on-fill/20",
          "data-[orientation=vertical]:[&>[data-slot=button][data-variant=secondary]:not(:hover):not(:active):not([data-pressed]):not(:focus-visible)+[data-slot=button][data-variant=secondary]:not(:hover):not(:active):not([data-pressed]):not(:focus-visible)]:border-t-neutral-text/15",
        ].join(" "),
        false: "",
      },
      size: {
        xs: "data-[attached=false]:gap-1",
        sm: "data-[attached=false]:gap-1",
        default: "data-[attached=false]:gap-1.5",
        lg: "data-[attached=false]:gap-2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      attached: true,
      size: "default",
    },
  }
)

export interface ButtonGroupProps
  extends React.ComponentProps<"div">,
    Omit<VariantProps<typeof buttonGroupVariants>, "attached" | "size"> {
  /**
   * Layout direction of the group (`"horizontal"` | `"vertical"`).
   * @default "horizontal"
   */
  orientation?: ButtonGroupOrientation
  /**
   * When `true`, buttons are joined into a single contiguous bar with collapsed inner corners.
   * When `false`, buttons render as a spaced toolbar cluster with individual rounded corners.
   * @default true
   */
  attached?: boolean
  /**
   * Shared visual variant inherited by child `Button` components unless overridden on the child.
   */
  variant?: ButtonVariant
  /**
   * Shared semantic color intent inherited by child `Button` components unless overridden on the child.
   */
  intent?: ButtonIntent
  /**
   * Shared size scale inherited by child `Button` and `ButtonGroupText` components unless overridden on the child.
   */
  size?: ButtonGroupSize
  /**
   * Disables all child `Button` components in the group when `true`.
   */
  disabled?: boolean
}

function ButtonGroup({
  className,
  orientation = "horizontal",
  attached = true,
  variant,
  intent,
  size,
  disabled,
  ...props
}: ButtonGroupProps) {
  const resolvedOrientation: ButtonGroupOrientation = orientation || "horizontal"
  const resolvedAttached = attached !== false
  const resolvedSize: ButtonGroupSize = size || "default"

  const contextValue = React.useMemo<ButtonGroupContextValue>(
    () => ({
      variant,
      size,
      intent,
      disabled,
      orientation: resolvedOrientation,
      attached: resolvedAttached,
    }),
    [variant, size, intent, disabled, resolvedOrientation, resolvedAttached]
  )

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <div
        role="group"
        data-slot="button-group"
        data-orientation={resolvedOrientation}
        data-attached={resolvedAttached ? "true" : "false"}
        data-variant={variant}
        data-intent={intent}
        data-size={resolvedSize}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          buttonGroupVariants({
            orientation: resolvedOrientation,
            attached: resolvedAttached,
            size: resolvedSize,
          }),
          className
        )}
        {...props}
      />
    </ButtonGroupContext.Provider>
  )
}

const buttonGroupTextVariants = cva(
  "cn-button-group-text inline-flex shrink-0 items-center border border-neutral-interactive bg-neutral-interactive/60 text-neutral-text font-medium whitespace-nowrap select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-md px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        default:
          "h-8 gap-1.5 rounded-lg px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-9 gap-2 rounded-lg px-3.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface ButtonGroupTextProps extends useRender.ComponentProps<"div"> {
  /**
   * Size scale matching sibling buttons (`"xs"` | `"sm"` | `"default"` | `"lg"`).
   * Inherits from parent `ButtonGroup` when omitted.
   */
  size?: ButtonGroupSize
}

function ButtonGroupText({
  className,
  size,
  render,
  ...props
}: ButtonGroupTextProps) {
  const groupContext = useButtonGroupContext()
  const resolvedSize: ButtonGroupSize = size ?? groupContext?.size ?? "default"

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(buttonGroupTextVariants({ size: resolvedSize }), className),
      },
      props
    ),
    render,
    state: {
      slot: "button-group-text",
      size: resolvedSize,
    },
  })
}

function ButtonGroupSeparator({
  className,
  orientation,
  ...props
}: React.ComponentProps<typeof Separator>) {
  const groupContext = useButtonGroupContext()
  const resolvedOrientation =
    orientation ??
    (groupContext?.orientation === "vertical" ? "horizontal" : "vertical")

  return (
    <Separator
      data-slot="button-group-separator"
      orientation={resolvedOrientation}
      className={cn(
        "cn-button-group-separator relative self-stretch data-horizontal:my-px data-horizontal:w-auto data-vertical:mx-px data-vertical:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupContext,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupTextVariants,
  buttonGroupVariants,
}
