"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

export type PopoverSize = "sm" | "default" | "lg"

const popoverContentVariants = cva(
  "cn-popover-content z-50 origin-(--transform-origin) bg-neutral-surface text-neutral-text shadow-xl outline-none transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  {
    variants: {
      size: {
        sm: "w-64 p-3 rounded-lg text-xs",
        default: "w-72 sm:w-80 p-4 rounded-xl text-sm",
        lg: "w-80 sm:w-96 p-5 rounded-2xl text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />
}

export interface PopoverContentProps
  extends Omit<PopoverPrimitive.Popup.Props, "className">,
    Pick<
      PopoverPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset"
    >,
    VariantProps<typeof popoverContentVariants> {
  className?: string
  /**
   * Size scale for popover width and internal padding (`sm` | `default` | `lg`).
   * @default "default"
   */
  size?: PopoverSize
  /**
   * When true, renders an aligned arrow pointing to the anchor element.
   * @default false
   */
  withArrow?: boolean
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 6,
  size = "default",
  withArrow = false,
  children,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal data-slot="popover-portal">
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          data-size={size}
          className={cn(
            popoverContentVariants({ size }),
            className
          )}
          {...props}
        >
          {children}
          {withArrow && (
            <PopoverPrimitive.Arrow
              className="cn-popover-arrow z-50 bg-neutral-surface fill-neutral-surface"
            />
          )}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("cn-popover-header flex flex-col gap-1 pb-2 text-start", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("cn-popover-title font-semibold text-neutral-text tracking-tight", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("cn-popover-description text-neutral-text-muted text-xs leading-normal", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  PopoverClose,
  popoverContentVariants,
}
