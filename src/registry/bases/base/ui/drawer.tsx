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
  swipeDirection: NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>
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
   * @default "bottom"
   */
  side?: DrawerSide
  /**
   * When true (default), renders as a floating card with an inset margin, rounded corners, and soft shadow.
   * When false, renders flush against the viewport edge.
   * @default true
   */
  floating?: boolean
  /**
   * Size scale for drawer width (on side drawers) or max-height (on vertical drawers).
   * @default "default"
   */
  size?: DrawerSize
  /**
   * Whether to show a touch swipe handle pill on the dismissible edge.
   * Defaults to `true` for bottom and top drawers, and `false` for side drawers.
   */
  showSwipeHandle?: boolean
}

function resolveSwipeDirection(side: DrawerSide): NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]> {
  if (side === "top") return "up"
  if (side === "bottom") return "down"
  if (side === "left" || side === "start") return "left"
  return "right"
}

function Drawer({
  side = "bottom",
  floating = true,
  size = "default",
  modal = true,
  showSwipeHandle,
  snapPoints,
  swipeDirection: customSwipeDirection,
  ...props
}: DrawerProps) {
  const resolvedSwipeDirection = customSwipeDirection ?? resolveSwipeDirection(side)
  const isVertical = resolvedSwipeDirection === "down" || resolvedSwipeDirection === "up"
  const resolvedShowSwipeHandle = showSwipeHandle ?? isVertical
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
        "cn-drawer-overlay fixed inset-0 z-50 min-h-dvh bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] select-none data-ending-style:pointer-events-none data-ending-style:opacity-0 data-starting-style:opacity-0",
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
        "cn-drawer-swipe-handle mx-auto my-2.5 h-1.5 w-12 shrink-0 cursor-grab rounded-full bg-neutral-interactive/90 active:cursor-grabbing hover:bg-neutral-interactive",
        className
      )}
      {...props}
    />
  )
}

const SIDE_DRAWER_WIDTHS: Record<DrawerSize, string> = {
  sm: "w-72 sm:w-80",
  default: "w-[85vw] sm:w-96",
  lg: "w-[90vw] sm:w-[32rem]",
  xl: "w-[95vw] sm:w-[40rem]",
  full: "w-[calc(100vw-1.5rem)] data-[floating=false]:w-screen",
}

const VERTICAL_DRAWER_HEIGHTS: Record<DrawerSize, string> = {
  sm: "max-h-[40dvh]",
  default: "max-h-[65dvh]",
  lg: "max-h-[85dvh]",
  xl: "max-h-[92dvh]",
  full: "max-h-[calc(100dvh-1.5rem)] data-[floating=false]:max-h-dvh",
}

export interface DrawerContentProps extends DrawerPrimitive.Popup.Props {
  /**
   * Optional override for floating mode.
   */
  floating?: boolean
  /**
   * Optional override for size.
   */
  size?: DrawerSize
}

function DrawerContent({
  className,
  children,
  floating: contentFloating,
  size: contentSize,
  ...props
}: DrawerContentProps) {
  const context = useDrawer()
  const isFloating = contentFloating ?? context.floating
  const resolvedSize = contentSize ?? context.size
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = context
  const swipeAxis = swipeDirection === "down" || swipeDirection === "up" ? "y" : "x"

  const sizeClasses = swipeAxis === "x"
    ? SIDE_DRAWER_WIDTHS[resolvedSize]
    : VERTICAL_DRAWER_HEIGHTS[resolvedSize]

  const floatingClasses = isFloating
    ? [
        "rounded-2xl shadow-2xl",
        swipeDirection === "down" && "inset-x-3 bottom-3",
        swipeDirection === "up" && "inset-x-3 top-3",
        swipeDirection === "left" && "inset-y-3 start-3",
        swipeDirection === "right" && "inset-y-3 end-3",
      ].filter(Boolean).join(" ")
    : [
        "shadow-2xl",
        swipeDirection === "down" && "inset-x-0 bottom-0 rounded-t-2xl",
        swipeDirection === "up" && "inset-x-0 top-0 rounded-b-2xl",
        swipeDirection === "left" && "inset-y-0 start-0 rounded-e-2xl",
        swipeDirection === "right" && "inset-y-0 end-0 rounded-s-2xl",
      ].filter(Boolean).join(" ")

  return (
    <DrawerPortal data-slot="drawer-portal">
      {modal !== false && <DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />}
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        className="pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          data-swipe-axis={swipeAxis}
          data-swipe-direction={swipeDirection}
          data-floating={isFloating ? "true" : "false"}
          data-size={resolvedSize}
          data-snap-points={hasSnapPoints ? "" : undefined}
          className={cn(
            "cn-drawer-popup group/drawer-popup pointer-events-auto fixed z-50 flex flex-col bg-neutral-surface text-neutral-text transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none overflow-hidden",
            floatingClasses,
            sizeClasses,
            // Axis x
            swipeAxis === "x" && "flex-col",
            // Closing / Opening transitions
            "data-ending-style:opacity-0 data-starting-style:opacity-0",
            swipeDirection === "down" && "data-ending-style:translate-y-full data-starting-style:translate-y-full",
            swipeDirection === "up" && "data-ending-style:-translate-y-full data-starting-style:-translate-y-full",
            swipeDirection === "left" && "data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
            swipeDirection === "right" && "data-ending-style:translate-x-full data-starting-style:translate-x-full",
            className
          )}
          {...props}
        >
          {showSwipeHandle && swipeDirection === "down" && <DrawerSwipeHandle />}
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            className="flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain select-text"
          >
            {children}
          </DrawerPrimitive.Content>
          {showSwipeHandle && swipeDirection === "up" && <DrawerSwipeHandle />}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

export interface DrawerHeaderProps extends React.ComponentProps<"div"> {
  /**
   * When true (default), renders a close button at the inline end of the header.
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
        "cn-drawer-header relative flex shrink-0 flex-col gap-1.5 p-4 pe-10 text-start",
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
              className="cn-drawer-close absolute top-3.5 end-3.5 text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/60 active:bg-neutral-interactive focus-visible:ring-2 focus-visible:ring-primary-interactive-focus/40"
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
      className={cn("cn-drawer-body flex-1 overflow-y-auto px-4 py-2", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "cn-drawer-footer mt-auto flex shrink-0 flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2.5 p-4",
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

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
