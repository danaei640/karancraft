"use client"

import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

export type HoverCardAppearance = "default" | "inverted"
export type HoverCardSize = "sm" | "default" | "lg"

const hoverCardContentVariants = cva(
  "cn-hover-card-content z-50 origin-(--transform-origin) outline-none transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  {
    variants: {
      appearance: {
        default: "bg-neutral-surface text-neutral-text shadow-xl",
        inverted: "bg-neutral-text text-neutral-surface shadow-2xl",
      },
      size: {
        sm: "w-64 p-3 rounded-lg text-xs",
        default: "w-80 p-4 rounded-xl text-sm",
        lg: "w-96 p-5 rounded-2xl text-sm",
      },
    },
    defaultVariants: {
      appearance: "default",
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
   * Surface appearance (`default` | `inverted`).
   * @default "default"
   */
  appearance?: HoverCardAppearance
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
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
  appearance = "default",
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
          data-appearance={appearance}
          data-size={size}
          className={cn(
            hoverCardContentVariants({ appearance, size }),
            className
          )}
          {...props}
        >
          {children}
          {withArrow && (
            <PreviewCardPrimitive.Arrow
              className={cn(
                "cn-hover-card-arrow z-50",
                appearance === "inverted"
                  ? "bg-neutral-text fill-neutral-text"
                  : "bg-neutral-surface fill-neutral-surface"
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
