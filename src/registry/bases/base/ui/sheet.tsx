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

export interface SheetProps extends DrawerProps {
  /**
   * The edge from which the sheet slides in (`top` | `bottom` | `left` | `right` | `start` | `end`).
   * @default "right"
   */
  side?: SheetSide
}

function Sheet({ side = "right", floating = true, ...props }: SheetProps) {
  return <Drawer side={side} floating={floating} {...props} />
}

export interface SheetContentProps extends DrawerContentProps {}

function SheetContent({
  side,
  floating,
  ...props
}: SheetContentProps & { side?: SheetSide }) {
  return <DrawerContent floating={floating} {...props} />
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
