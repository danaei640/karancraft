"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { X } from "icons"
import { cn } from "cn"

import { Button } from "@/registry/bases/base/ui/button"

export type DrawerSide = "top" | "bottom" | "left" | "right" | "start" | "end"
export type DrawerSize = "sm" | "default" | "lg" | "xl" | "full"

type DrawerContextProps = {
  hasSnapPoints: boolean
  modal: DrawerPrimitive.Root.Props["modal"]
  showSwipeHandle: boolean
  swipeDirection?: DrawerPrimitive.Root.Props["swipeDirection"]
  side: DrawerSide
  floating: boolean
  size: DrawerSize
}

const DrawerContext = React.createContext<DrawerContextProps | null>(null)

export function useDrawer() {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error("useDrawer must be used within a Drawer.")
  }
  return context
}

export interface DrawerProps extends DrawerPrimitive.Root.Props {
  /**
   * The edge from which the drawer slides in (`top` | `bottom` | `left` | `right` | `start` | `end`).
   * Defaults to `"bottom"` when floating=true, and `"right"` when floating=false.
   */
  side?: DrawerSide
  /**
   * When true (default for Drawer), renders with shadcn drawer styles (bottom/floating drawer with swipe handle and gesture physics).
   * When false, converts to exact shadcn sheet styles (docked flush against viewport edge with slide transitions).
   * @default true
   */
  floating?: boolean
  /**
   * Size scale for drawer width (on side drawers) or height (on vertical drawers).
   * @default "default"
   */
  size?: DrawerSize
  /**
   * Whether to show a touch swipe handle pill on the dismissible edge.
   * Only active when floating=true. Defaults to true for bottom/top drawers in floating mode.
   */
  showSwipeHandle?: boolean
}

function resolveDefaultSwipeDirection(side: DrawerSide): NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]> {
  if (side === "top") return "up"
  if (side === "bottom") return "down"
  if (side === "left" || side === "start") return "left"
  return "right"
}

function Drawer({
  side: customSide,
  floating = true,
  size = "default",
  modal = true,
  showSwipeHandle,
  snapPoints,
  swipeDirection: customSwipeDirection,
  ...props
}: DrawerProps) {
  const side = customSide ?? (floating ? "bottom" : "right")
  const resolvedSwipeDirection = floating
    ? (customSwipeDirection ?? resolveDefaultSwipeDirection(side))
    : customSwipeDirection

  const isVertical = resolvedSwipeDirection === "down" || resolvedSwipeDirection === "up"
  const resolvedShowSwipeHandle = floating && (showSwipeHandle ?? (isVertical || side === "bottom"))
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0

  const contextValue = React.useMemo<DrawerContextProps>(
    () => ({
      hasSnapPoints,
      modal,
      showSwipeHandle: resolvedShowSwipeHandle,
      swipeDirection: resolvedSwipeDirection,
      side,
      floating,
      size,
    }),
    [hasSnapPoints, modal, resolvedShowSwipeHandle, resolvedSwipeDirection, side, floating, size]
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        data-side={side}
        data-floating={floating ? "true" : "false"}
        data-size={size}
        modal={modal}
        snapPoints={snapPoints}
        swipeDirection={resolvedSwipeDirection}
        {...props}
      />
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/80 duration-300 select-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-ending-style:pointer-events-none data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function DrawerSwipeHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      className={cn(
        "cn-drawer-swipe-handle mx-auto mt-4 mb-2 h-1.5 w-12 shrink-0 cursor-grab rounded-full bg-neutral-interactive/80 active:cursor-grabbing hover:bg-neutral-interactive",
        className
      )}
      {...props}
    />
  )
}

export interface DrawerContentProps extends DrawerPrimitive.Popup.Props {
  /**
   * Optional override for floating mode.
   * If false, converts into shadcn sheet styling.
   */
  floating?: boolean
  /**
   * Optional override for side edge.
   */
  side?: DrawerSide
  /**
   * Optional override for size.
   */
  size?: DrawerSize
}

function DrawerContent({
  className,
  children,
  floating: contentFloating,
  side: contentSide,
  size: contentSize,
  ...props
}: DrawerContentProps) {
  const context = useDrawer()
  const isFloating = contentFloating ?? context.floating
  const side = contentSide ?? context.side
  const resolvedSize = contentSize ?? context.size
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = context

  const contentClasses = isFloating
    ? cn(
        "cn-drawer-popup fixed z-50 flex flex-col bg-neutral-surface text-neutral-text border border-neutral-interactive/80 shadow-2xl outline-none transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:opacity-0 data-starting-style:opacity-0",
        side === "bottom" &&
          "inset-x-0 bottom-0 rounded-t-[16px] max-h-[85dvh] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom data-ending-style:translate-y-full data-starting-style:translate-y-full sm:inset-x-4 sm:bottom-4 sm:mx-auto sm:max-w-lg sm:rounded-2xl",
        side === "top" &&
          "inset-x-0 top-0 rounded-b-[16px] max-h-[85dvh] data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top data-ending-style:-translate-y-full data-starting-style:-translate-y-full sm:inset-x-4 sm:top-4 sm:mx-auto sm:max-w-lg sm:rounded-2xl",
        side === "left" &&
          "inset-y-2 left-2 w-3/4 sm:max-w-sm rounded-2xl data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
        side === "right" &&
          "inset-y-2 right-2 w-3/4 sm:max-w-sm rounded-2xl data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right data-ending-style:translate-x-full data-starting-style:translate-x-full",
        side === "start" &&
          "inset-y-2 start-2 w-3/4 sm:max-w-sm rounded-2xl ltr:data-[state=closed]:slide-out-to-left rtl:data-[state=closed]:slide-out-to-right ltr:data-[state=open]:slide-in-from-left rtl:data-[state=open]:slide-in-from-right ltr:data-ending-style:-translate-x-full rtl:data-ending-style:translate-x-full ltr:data-starting-style:-translate-x-full rtl:data-starting-style:translate-x-full",
        side === "end" &&
          "inset-y-2 end-2 w-3/4 sm:max-w-sm rounded-2xl ltr:data-[state=closed]:slide-out-to-right rtl:data-[state=closed]:slide-out-to-left ltr:data-[state=open]:slide-in-from-right rtl:data-[state=open]:slide-in-from-left ltr:data-ending-style:translate-x-full rtl:data-ending-style:-translate-x-full ltr:data-starting-style:translate-x-full rtl:data-starting-style:-translate-x-full",
        className
      )
    : cn(
        "cn-sheet-content fixed z-50 flex flex-col bg-neutral-surface text-neutral-text shadow-xl outline-none transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-ending-style:opacity-0 data-starting-style:opacity-0",
        side === "top" &&
          "inset-x-0 top-0 border-b border-neutral-interactive/80 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top data-ending-style:-translate-y-full data-starting-style:-translate-y-full",
        side === "bottom" &&
          "inset-x-0 bottom-0 border-t border-neutral-interactive/80 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom data-ending-style:translate-y-full data-starting-style:translate-y-full",
        side === "left" &&
          "inset-y-0 left-0 h-full w-3/4 border-r border-neutral-interactive/80 sm:max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
        side === "right" &&
          "inset-y-0 right-0 h-full w-3/4 border-l border-neutral-interactive/80 sm:max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right data-ending-style:translate-x-full data-starting-style:translate-x-full",
        side === "start" &&
          "inset-y-0 start-0 h-full w-3/4 border-e border-neutral-interactive/80 sm:max-w-sm ltr:data-[state=closed]:slide-out-to-left rtl:data-[state=closed]:slide-out-to-right ltr:data-[state=open]:slide-in-from-left rtl:data-[state=open]:slide-in-from-right ltr:data-ending-style:-translate-x-full rtl:data-ending-style:translate-x-full ltr:data-starting-style:-translate-x-full rtl:data-starting-style:translate-x-full",
        side === "end" &&
          "inset-y-0 end-0 h-full w-3/4 border-s border-neutral-interactive/80 sm:max-w-sm ltr:data-[state=closed]:slide-out-to-right rtl:data-[state=closed]:slide-out-to-left ltr:data-[state=open]:slide-in-from-right rtl:data-[state=open]:slide-in-from-left ltr:data-ending-style:translate-x-full rtl:data-ending-style:-translate-x-full ltr:data-starting-style:translate-x-full rtl:data-starting-style:-translate-x-full",
        className
      )

  return (
    <DrawerPortal data-slot="drawer-portal">
      {modal !== false && <DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />}
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        className="pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto"
      >
        <DrawerPrimitive.Popup
          data-slot={isFloating ? "drawer-popup" : "sheet-content"}
          data-side={side}
          data-floating={isFloating ? "true" : "false"}
          data-size={resolvedSize}
          data-snap-points={hasSnapPoints ? "" : undefined}
          className={contentClasses}
          {...props}
        >
          {isFloating && showSwipeHandle && side === "bottom" && <DrawerSwipeHandle />}
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            className="flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain select-text"
          >
            {children}
          </DrawerPrimitive.Content>
          {isFloating && showSwipeHandle && side === "top" && <DrawerSwipeHandle />}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

export interface DrawerHeaderProps extends React.ComponentProps<"div"> {
  /**
   * When true (default), renders a close button in the header.
   * @default true
   */
  showCloseButton?: boolean
}

function DrawerHeader({
  className,
  children,
  showCloseButton = true,
  ...props
}: DrawerHeaderProps) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "cn-drawer-header relative flex shrink-0 flex-col gap-1.5 p-4 sm:p-6 text-start",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DrawerPrimitive.Close
          data-slot="drawer-close"
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Close"
              className="cn-drawer-close absolute top-4 end-4 text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/60 active:bg-neutral-interactive focus-visible:ring-2 focus-visible:ring-primary-interactive-focus/40"
            />
          }
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Close</span>
        </DrawerPrimitive.Close>
      )}
    </div>
  )
}

function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-body"
      className={cn("cn-drawer-body flex-1 overflow-y-auto px-4 sm:px-6 py-2", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "cn-drawer-footer mt-auto flex shrink-0 flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2.5 p-4 sm:p-6",
        className
      )}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "cn-drawer-title cn-font-heading text-lg font-semibold leading-none tracking-tight text-neutral-text",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(
        "cn-drawer-description text-sm text-neutral-text-muted leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

function DrawerSwipeArea({ ...props }: DrawerPrimitive.SwipeArea.Props) {
  return <DrawerPrimitive.SwipeArea data-slot="drawer-swipe-area" {...props} />
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerSwipeArea,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
