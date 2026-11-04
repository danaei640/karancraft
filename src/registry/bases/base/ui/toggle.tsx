"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { useToggleGroupContext } from "@/registry/bases/base/ui/toggle-group"

export type ToggleVariant = "default" | "outline" | "tint"

export type ToggleSize =
  | "xs"
  | "sm"
  | "default"
  | "lg"
  | "icon-xs"
  | "icon-sm"
  | "icon"
  | "icon-lg"

const toggleVariants = cva(
  "cn-toggle group/toggle inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "cn-toggle-variant-default border border-transparent bg-transparent text-neutral-text hover:bg-neutral-interactive hover:text-neutral-text active:bg-neutral-interactive-hover [&[data-pressed]]:bg-neutral-interactive [&[data-pressed]]:text-neutral-text aria-pressed:bg-neutral-interactive aria-pressed:text-neutral-text",
        outline:
          "cn-toggle-variant-outline border border-neutral-interactive bg-neutral-surface text-neutral-text dark:bg-transparent hover:bg-neutral-interactive dark:hover:bg-neutral-interactive hover:text-neutral-text active:bg-neutral-interactive-hover dark:active:bg-neutral-interactive-hover [&[data-pressed]]:bg-neutral-interactive [&[data-pressed]]:text-neutral-text aria-pressed:bg-neutral-interactive aria-pressed:text-neutral-text",
        tint:
          "cn-toggle-variant-tint border border-transparent bg-transparent text-neutral-text hover:bg-neutral-interactive hover:text-neutral-text active:bg-neutral-interactive-hover [&[data-pressed]]:bg-primary-interactive [&[data-pressed]]:text-primary-text [&[data-pressed]]:hover:bg-primary-interactive-hover [&[data-pressed]]:active:bg-primary-interactive-active aria-pressed:bg-primary-interactive aria-pressed:text-primary-text aria-pressed:hover:bg-primary-interactive-hover aria-pressed:active:bg-primary-interactive-active",
      },
      size: {
        xs: "cn-toggle-size-xs h-6 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "cn-toggle-size-sm h-7 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        default: "cn-toggle-size-default h-8 gap-1.5 rounded-lg px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "cn-toggle-size-lg h-9 gap-2 rounded-lg px-3.5 text-sm [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "cn-toggle-size-icon-xs size-6 rounded-md p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "cn-toggle-size-icon-sm size-7 rounded-md p-0 [&_svg:not([class*='size-'])]:size-3.5",
        icon: "cn-toggle-size-icon size-8 rounded-lg p-0 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "cn-toggle-size-icon-lg size-9 rounded-lg p-0 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ToggleProps
  extends Omit<TogglePrimitive.Props, "className">,
    VariantProps<typeof toggleVariants> {
  className?: string
  /**
   * Visual variant of the toggle button (`default` | `outline` | `tint`).
   * When `tint` is selected, it uses the primary brand color, and matches `default` when unselected.
   * @default "default"
   */
  variant?: ToggleVariant
  /**
   * Sizing scale matching Button (`xs` | `sm` | `default` | `lg` | `icon-xs` | `icon-sm` | `icon` | `icon-lg`).
   * Any `icon-*` (or `icon`) tier makes the button perfectly square.
   * @default "default"
   */
  size?: ToggleSize
}

function Toggle({
  className,
  variant,
  size,
  disabled,
  ...props
}: ToggleProps) {
  const groupContext = useToggleGroupContext()

  const resolvedVariant: ToggleVariant =
    variant ?? groupContext?.variant ?? "default"
  const resolvedSize: ToggleSize =
    size ?? groupContext?.size ?? "default"
  const isDisabled = Boolean(disabled || groupContext?.disabled)

  return (
    <TogglePrimitive
      data-slot="toggle"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      disabled={isDisabled}
      className={cn(
        toggleVariants({ variant: resolvedVariant, size: resolvedSize }),
        className
      )}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
