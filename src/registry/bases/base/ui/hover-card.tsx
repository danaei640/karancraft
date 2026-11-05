"use client"

import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

export type HoverCardSize = "sm" | "default" | "lg"

const hoverCardContentVariants = cva(
  "cn-hover-card-content z-50 origin-(--transform-origin) rounded-xl border border-neutral-interactive/80 bg-neutral-surface text-neutral-text shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  {
    variants: {
      size: {
        sm: "w-64 p-3 text-xs",
        default: "w-80 p-4 text-sm",
        lg: "w-96 p-5 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

export interface HoverCardContentProps
  extends Omit<PreviewCardPrimitive.Popup.Props, "className">,
    Pick<
      PreviewCardPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset"
    >,
    VariantProps<typeof hoverCardContentVariants> {
  className?: string
  /**
   * Size scale for card width and padding (`sm` | `default` | `lg`).
   * @default "default"
   */
  size?: HoverCardSize
  /**
   * When true, renders an aligned arrow pointing to the anchor trigger.
   * @default false
   */
  withArrow?: boolean
}

function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  size = "default",
  withArrow = false,
  children,
  ...props
}: HoverCardContentProps) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          data-size={size}
          className={cn(
            hoverCardContentVariants({ size }),
            className
          )}
          {...props}
        >
          {children}
          {withArrow && (
            <PreviewCardPrimitive.Arrow
              className={cn(
                "cn-hover-card-arrow z-50 size-2.5 rotate-45 bg-neutral-surface border border-neutral-interactive/80 pointer-events-none",
                "data-[side=bottom]:top-[-5px] data-[side=bottom]:border-r-0 data-[side=bottom]:border-b-0",
                "data-[side=top]:bottom-[-5px] data-[side=top]:border-l-0 data-[side=top]:border-t-0",
                "data-[side=right]:left-[-5px] data-[side=right]:border-t-0 data-[side=right]:border-r-0",
                "data-[side=left]:right-[-5px] data-[side=left]:border-b-0 data-[side=left]:border-l-0"
              )}
            />
          )}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  hoverCardContentVariants,
}
