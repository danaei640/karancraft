"use client"

import * as React from "react"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  type DropdownMenuSize,
} from "@/registry/bases/base/ui/dropdown-menu"

export type MenubarSize = DropdownMenuSize

interface MenubarContextProps {
  size: MenubarSize
}

const MenubarContext = React.createContext<MenubarContextProps>({
  size: "default",
})

const menubarVariants = cva(
  "cn-menubar flex items-center gap-1 border border-neutral-interactive/80 bg-neutral-surface-alt/60 p-1 shadow-2xs",
  {
    variants: {
      size: {
        sm: "h-8 rounded-lg text-xs",
        default: "h-9 rounded-xl text-sm",
        lg: "h-10 rounded-xl text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface MenubarProps
  extends MenubarPrimitive.Props,
    VariantProps<typeof menubarVariants> {
  size?: MenubarSize
}

function Menubar({
  className,
  size = "default",
  ...props
}: MenubarProps) {
  return (
    <MenubarContext.Provider value={{ size }}>
      <MenubarPrimitive
        data-slot="menubar"
        data-size={size}
        className={cn(menubarVariants({ size }), className)}
        {...props}
      />
    </MenubarContext.Provider>
  )
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPortal>) {
  return <DropdownMenuPortal data-slot="menubar-portal" {...props} />
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuTrigger>) {
  const { size } = React.useContext(MenubarContext)

  return (
    <DropdownMenuTrigger
      data-slot="menubar-trigger"
      data-size={size}
      className={cn(
        "cn-menubar-trigger flex items-center outline-hidden select-none cursor-default font-medium text-neutral-text hover:bg-neutral-interactive aria-expanded:bg-neutral-interactive",
        size === "sm" && "px-2 py-0.5 text-xs rounded-md",
        size === "default" && "px-2.5 py-1 text-sm rounded-lg",
        size === "lg" && "px-3 py-1.5 text-base rounded-lg",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  size: customSize,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  const { size } = React.useContext(MenubarContext)
  const resolvedSize = customSize ?? size

  return (
    <DropdownMenuContent
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      size={resolvedSize}
      className={cn(
        "cn-menubar-content cn-menubar-content-logical cn-menu-target cn-menu-translucent",
        className
      )}
      {...props}
    />
  )
}

function MenubarItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      data-slot="menubar-item"
      className={cn("cn-menubar-item group/menubar-item", className)}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuCheckboxItem>) {
  return (
    <DropdownMenuCheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn("cn-menubar-checkbox-item", className)}
      {...props}
    />
  )
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
  return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarRadioItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioItem>) {
  return (
    <DropdownMenuRadioItem
      data-slot="menubar-radio-item"
      className={cn("cn-menubar-radio-item", className)}
      {...props}
    />
  )
}

function MenubarLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel>) {
  return (
    <DropdownMenuLabel
      data-slot="menubar-label"
      className={cn("cn-menubar-label", className)}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return (
    <DropdownMenuSeparator
      data-slot="menubar-separator"
      className={cn("cn-menubar-separator", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
  return (
    <DropdownMenuShortcut
      data-slot="menubar-shortcut"
      className={cn("cn-menubar-shortcut ms-auto", className)}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuSub>) {
  return <DropdownMenuSub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger>) {
  return (
    <DropdownMenuSubTrigger
      data-slot="menubar-sub-trigger"
      className={cn("cn-menubar-sub-trigger", className)}
      {...props}
    />
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
  return (
    <DropdownMenuSubContent
      data-slot="menubar-sub-content"
      className={cn(
        "cn-menubar-sub-content cn-menu-target cn-menu-translucent",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  menubarVariants,
}
