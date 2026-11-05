"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "cn"

function TooltipProvider({
  delay = 200,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

export interface TooltipContentProps
  extends Omit<TooltipPrimitive.Popup.Props, "className">,
    Pick<
      TooltipPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset"
    > {
  className?: string
  /**
   * When true (default), renders a subtle arrow pointing toward the anchor element.
   * @default true
   */
  withArrow?: boolean
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  withArrow = true,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal data-slot="tooltip-portal">
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "cn-tooltip-content relative z-50 w-fit max-w-xs origin-(--transform-origin) rounded-md bg-neutral-text px-2.5 py-1 text-xs font-medium text-neutral-surface shadow-md outline-none transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            className
          )}
          {...props}
        >
          {children}
          {withArrow && (
            <TooltipPrimitive.Arrow
              className={cn(
                "cn-tooltip-arrow z-50 size-2 rotate-45 bg-neutral-text pointer-events-none",
                "data-[side=bottom]:-top-1",
                "data-[side=top]:-bottom-1",
                "data-[side=right]:-left-1",
                "data-[side=left]:-right-1",
                "data-[side=inline-start]:-end-1",
                "data-[side=inline-end]:-start-1"
              )}
            />
          )}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
