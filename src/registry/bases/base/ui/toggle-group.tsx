"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Separator } from "@/registry/bases/base/ui/separator"
import {
  Toggle,
  type ToggleProps,
  type ToggleSize,
  type ToggleVariant,
} from "@/registry/bases/base/ui/toggle"

export type ToggleGroupOrientation = "horizontal" | "vertical"

export interface ToggleGroupContextValue {
  variant?: ToggleVariant
  size?: ToggleSize
  disabled?: boolean
  orientation?: ToggleGroupOrientation
  attached?: boolean
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(
  null
)

export function useToggleGroupContext() {
  return React.useContext(ToggleGroupContext)
}

const toggleGroupVariants = cva(
  "cn-toggle-group inline-flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-20 *:hover:z-10 *:active:z-10 *:[&[data-pressed]]:z-10 *:[&[aria-pressed=true]]:z-10",
  {
    variants: {
      orientation: {
        horizontal: "cn-toggle-group-orientation-horizontal flex-row",
        vertical: "cn-toggle-group-orientation-vertical flex-col",
      },
      attached: {
        true: [
          "*:data-[slot=toggle]:bg-clip-border *:data-[slot=toggle-group-item]:bg-clip-border",
          "data-[orientation=horizontal]:[&>[data-slot]:not(:last-child)]:rounded-e-none",
          "data-[orientation=horizontal]:[&>[data-slot]:not(:first-child)]:rounded-s-none",
          "data-[orientation=horizontal]:[&>[data-slot][data-variant=outline]~[data-slot]]:-ms-px",
          "data-[orientation=vertical]:[&>[data-slot]:not(:last-child)]:rounded-b-none",
          "data-[orientation=vertical]:[&>[data-slot]:not(:first-child)]:rounded-t-none",
          "data-[orientation=vertical]:[&>[data-slot][data-variant=outline]~[data-slot]]:-mt-px",
        ].join(" "),
        false: "",
      },
      size: {
        xs: "data-[attached=false]:gap-1",
        sm: "data-[attached=false]:gap-1",
        default: "data-[attached=false]:gap-1.5",
        lg: "data-[attached=false]:gap-2",
        "icon-xs": "data-[attached=false]:gap-1",
        "icon-sm": "data-[attached=false]:gap-1",
        icon: "data-[attached=false]:gap-1.5",
        "icon-lg": "data-[attached=false]:gap-2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      attached: true,
      size: "default",
    },
  }
)

export interface ToggleGroupProps<Value extends string = string>
  extends Omit<ToggleGroupPrimitive.Props<Value>, "className" | "orientation">,
    Omit<VariantProps<typeof toggleGroupVariants>, "attached" | "size" | "orientation"> {
  className?: string
  /**
   * Layout direction of the group (`"horizontal"` | `"vertical"`).
   * @default "horizontal"
   */
  orientation?: ToggleGroupOrientation
  /**
   * When `true`, toggles are joined into a single contiguous bar with collapsed inner corners.
   * When `false`, toggles render as a spaced toolbar cluster with individual rounded corners.
   * @default true
   */
  attached?: boolean
  /**
   * Shared visual variant inherited by child `Toggle` and `ToggleGroupItem` components unless overridden on the child.
   * @default "default"
   */
  variant?: ToggleVariant
  /**
   * Shared size scale inherited by child `Toggle` and `ToggleGroupItem` components unless overridden on the child.
   * Matches button sizing (`xs` | `sm` | `default` | `lg` | `icon-xs` | `icon-sm` | `icon` | `icon-lg`).
   * @default "default"
   */
  size?: ToggleSize
  /**
   * Disables all child toggles in the group when `true`.
   */
  disabled?: boolean
}

function ToggleGroup<Value extends string = string>({
  className,
  orientation = "horizontal",
  attached = true,
  variant = "default",
  size = "default",
  disabled,
  children,
  ...props
}: ToggleGroupProps<Value>) {
  const resolvedOrientation: ToggleGroupOrientation = orientation || "horizontal"
  const resolvedAttached = attached !== false
  const resolvedSize: ToggleSize = size || "default"
  const resolvedVariant: ToggleVariant = variant || "default"

  const contextValue = React.useMemo<ToggleGroupContextValue>(
    () => ({
      variant: resolvedVariant,
      size: resolvedSize,
      disabled,
      orientation: resolvedOrientation,
      attached: resolvedAttached,
    }),
    [resolvedVariant, resolvedSize, disabled, resolvedOrientation, resolvedAttached]
  )

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <ToggleGroupPrimitive
        data-slot="toggle-group"
        data-orientation={resolvedOrientation}
        data-attached={resolvedAttached ? "true" : "false"}
        data-variant={resolvedVariant}
        data-size={resolvedSize}
        data-disabled={disabled ? "" : undefined}
        orientation={resolvedOrientation}
        disabled={disabled}
        className={cn(
          toggleGroupVariants({
            orientation: resolvedOrientation,
            attached: resolvedAttached,
            size: resolvedSize,
          }),
          className
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive>
    </ToggleGroupContext.Provider>
  )
}

export interface ToggleGroupItemProps extends ToggleProps {
  /**
   * Unique value for the item within the toggle group.
   */
  value?: string
}

function ToggleGroupItem({
  className,
  ...props
}: ToggleGroupItemProps) {
  return (
    <Toggle
      data-slot="toggle-group-item"
      className={cn("cn-toggle-group-item", className)}
      {...props}
    />
  )
}

function ToggleGroupSeparator({
  className,
  orientation,
  ...props
}: React.ComponentProps<typeof Separator>) {
  const groupContext = useToggleGroupContext()
  const resolvedOrientation =
    orientation ??
    (groupContext?.orientation === "vertical" ? "horizontal" : "vertical")

  return (
    <Separator
      data-slot="toggle-group-separator"
      orientation={resolvedOrientation}
      className={cn(
        "cn-toggle-group-separator shrink-0 self-stretch",
        resolvedOrientation === "vertical"
          ? "h-auto w-px my-1"
          : "h-px w-auto mx-1",
        className
      )}
      {...props}
    />
  )
}

export {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupSeparator,
  toggleGroupVariants,
}
