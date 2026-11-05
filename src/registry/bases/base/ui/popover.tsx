"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

export type PopoverSize = "sm" | "default" | "lg"

const popoverContentVariants = cva(
  "cn-popover-content z-50 origin-(--transform-origin) rounded-xl border border-neutral-interactive/80 bg-neutral-surface text-neutral-text shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  {
    variants: {
      size: {
        sm: "w-64 p-3 text-xs",
        default: "w-72 sm:w-80 p-4 text-sm",
        lg: "w-80 sm:w-96 p-5 text-sm",
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
  sideOffset = 8,
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
              className={cn(
                "cn-popover-arrow z-50 size-2.5 rotate-45 bg-neutral-surface border border-neutral-interactive/80 pointer-events-none",
                "data-[side=bottom]:top-[-5px] data-[side=bottom]:border-r-0 data-[side=bottom]:border-b-0",
                "data-[side=top]:bottom-[-5px] data-[side=top]:border-l-0 data-[side=top]:border-t-0",
                "data-[side=right]:left-[-5px] data-[side=right]:border-t-0 data-[side=right]:border-r-0",
                "data-[side=left]:right-[-5px] data-[side=left]:border-b-0 data-[side=left]:border-l-0"
              )}
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
