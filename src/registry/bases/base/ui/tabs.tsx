"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const TabsVariantContext = React.createContext<"default" | "line">("default")

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "cn-tabs group/tabs flex flex-col data-[orientation=vertical]:flex-row gap-3",
        className
      )}
      orientation={orientation}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "cn-tabs-list group/tabs-list inline-flex items-center text-neutral-text-muted select-none",
  {
    variants: {
      variant: {
        default:
          "cn-tabs-list-variant-default w-fit items-center justify-center rounded-full bg-neutral-surface-alt p-1 border border-neutral-interactive/60 h-9 data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-col gap-1 shadow-2xs",
        line:
          "cn-tabs-list-variant-line w-full items-center justify-start rounded-none bg-transparent p-0 border-b border-neutral-interactive/50 gap-1.5 h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  const currentVariant = variant || "default"
  return (
    <TabsVariantContext.Provider value={currentVariant}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={currentVariant}
        className={cn(tabsListVariants({ variant: currentVariant }), className)}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </TabsVariantContext.Provider>
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  const variant = React.useContext(TabsVariantContext)

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "cn-tabs-trigger relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-interactive-focus disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer select-none",
        variant === "line"
          ? "h-auto rounded-none bg-transparent! shadow-none px-3 pb-2.5 pt-1.5 text-neutral-text-muted hover:text-neutral-text border-b-2 border-transparent hover:border-neutral-interactive/70 data-[active]:border-primary-fill data-active:border-primary-fill data-[active]:text-neutral-text data-active:text-neutral-text -mb-px"
          : "h-full flex-1 rounded-full px-3.5 py-0 leading-none text-neutral-text-muted hover:text-neutral-text border border-transparent data-[active]:bg-neutral-surface data-active:bg-neutral-surface data-[active]:text-neutral-text data-active:text-neutral-text data-[active]:shadow-xs data-active:shadow-xs data-[active]:border-neutral-interactive/70 data-active:border-neutral-interactive/70 dark:data-[active]:bg-neutral-interactive dark:data-active:bg-neutral-interactive dark:data-[active]:text-neutral-text dark:data-active:text-neutral-text dark:data-[active]:border-neutral-interactive-hover dark:data-active:border-neutral-interactive-hover",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("cn-tabs-content flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
