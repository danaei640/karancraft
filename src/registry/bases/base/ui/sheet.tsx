"use client"

import * as React from "react"
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  type DrawerProps,
  type DrawerContentProps,
  type DrawerHeaderProps,
  type DrawerSide,
  type DrawerSize,
} from "@/registry/bases/base/ui/drawer"

export type SheetSide = DrawerSide
export type SheetSize = DrawerSize

export interface SheetProps extends Omit<DrawerProps, "floating"> {
  /**
   * When false (default for Sheet), renders docked flush against the viewport edge with exact shadcn sheet styles.
   * When true, renders as a floating drawer card.
   * @default false
   */
  floating?: boolean
  /**
   * The edge of the screen from which the sheet slides in (`top` | `bottom` | `left` | `right` | `start` | `end`).
   * @default "right"
   */
  side?: SheetSide
}

function Sheet({ side = "right", floating = false, ...props }: SheetProps) {
  return <Drawer side={side} floating={floating} {...props} />
}

export interface SheetContentProps extends DrawerContentProps {}

function SheetContent({
  side,
  floating = false,
  ...props
}: SheetContentProps & { side?: SheetSide }) {
  return <DrawerContent side={side} floating={floating} {...props} />
}

const SheetTrigger = DrawerTrigger
const SheetPortal = DrawerPortal
const SheetOverlay = DrawerOverlay
const SheetClose = DrawerClose
const SheetHeader = DrawerHeader
const SheetBody = DrawerBody
const SheetFooter = DrawerFooter
const SheetTitle = DrawerTitle
const SheetDescription = DrawerDescription

export {
  Sheet,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
export type { DrawerHeaderProps as SheetHeaderProps }
