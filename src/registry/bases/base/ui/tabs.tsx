"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

export type TabsVariant = "default" | "line" | "enclosed"
export type TabsSize = "sm" | "default" | "lg"

interface TabsContextProps {
  variant: TabsVariant
  size: TabsSize
  orientation: "horizontal" | "vertical"
}

const TabsContext = React.createContext<TabsContextProps>({
  variant: "default",
  size: "default",
  orientation: "horizontal",
})

export interface TabsProps extends TabsPrimitive.Root.Props {
  /**
   * Visual appearance variant (`default` pill | `line` underline | `enclosed` segmented card).
   * @default "default"
   */
  variant?: TabsVariant
  /**
   * Sizing scale (`sm` | `default` | `lg`) controlling height and typography.
   * @default "default"
   */
  size?: TabsSize
}

function Tabs({
  className,
  orientation = "horizontal",
  variant = "default",
  size = "default",
  ...props
}: TabsProps) {
  const contextValue = React.useMemo(
    () => ({ variant, size, orientation }),
    [variant, size, orientation]
  )

  return (
    <TabsContext.Provider value={contextValue}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        data-variant={variant}
        data-size={size}
        className={cn(
          "cn-tabs group/tabs flex flex-col data-[orientation=vertical]:flex-row gap-3",
          className
        )}
        orientation={orientation}
        {...props}
      />
    </TabsContext.Provider>
  )
}

const tabsListVariants = cva(
  "cn-tabs-list group/tabs-list inline-flex items-center text-neutral-text-muted select-none",
  {
    variants: {
      variant: {
        default:
          "cn-tabs-list-variant-default w-fit items-center justify-center rounded-xl bg-neutral-surface-alt/70 p-1 border border-neutral-interactive/60 data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-col gap-1 shadow-2xs",
        line:
          "cn-tabs-list-variant-line w-full items-center justify-start rounded-none bg-transparent p-0 border-b border-neutral-interactive/60 data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-e data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-fit gap-1 h-auto",
        enclosed:
          "cn-tabs-list-variant-enclosed w-fit items-center justify-center rounded-xl bg-neutral-surface border border-neutral-interactive/80 p-1 data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-col gap-1 shadow-xs",
      },
      size: {
        sm: "h-8 text-xs p-0.5",
        default: "h-9 text-sm p-1",
        lg: "h-10 text-base p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TabsListProps
  extends TabsPrimitive.List.Props,
    VariantProps<typeof tabsListVariants> {
  variant?: TabsVariant
  size?: TabsSize
}

function TabsList({
  className,
  variant: customVariant,
  size: customSize,
  children,
  ...props
}: TabsListProps) {
  const context = React.useContext(TabsContext)
  const variant = customVariant ?? context.variant
  const size = customSize ?? context.size
  const orientation = context.orientation

  const contextValue = React.useMemo(
    () => ({ variant, size, orientation }),
    [variant, size, orientation]
  )

  return (
    <TabsContext.Provider value={contextValue}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        data-size={size}
        data-orientation={orientation}
        className={cn(tabsListVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </TabsContext.Provider>
  )
}

export interface TabsTriggerProps extends TabsPrimitive.Tab.Props {
  /**
   * Leading icon element rendered before the tab label.
   */
  icon?: React.ReactNode
}

function TabsTrigger({
  className,
  icon,
  children,
  ...props
}: TabsTriggerProps) {
  const { variant, size, orientation } = React.useContext(TabsContext)

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      data-variant={variant}
      data-size={size}
      data-orientation={orientation}
      className={cn(
        "cn-tabs-trigger relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-interactive-focus disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer select-none",
        size === "sm" && "text-xs gap-1.5 px-2.5 py-1",
        size === "default" && "text-sm gap-2 px-3.5 py-1.5",
        size === "lg" && "text-base gap-2.5 px-4 py-2",
        variant === "line" && [
          "h-auto rounded-none bg-transparent! shadow-none text-neutral-text-muted hover:text-neutral-text border-transparent hover:border-neutral-interactive/70 data-[active]:text-neutral-text data-active:text-neutral-text",
          orientation === "horizontal"
            ? "border-b-2 data-[active]:border-primary-fill data-active:border-primary-fill -mb-px pb-2"
            : "border-e-2 data-[active]:border-primary-fill data-active:border-primary-fill -me-px pe-3 text-start w-full justify-start",
        ],
        variant === "default" && [
          "rounded-lg text-neutral-text-muted hover:text-neutral-text border border-transparent",
          "data-[active]:bg-neutral-surface data-active:bg-neutral-surface data-[active]:text-neutral-text data-active:text-neutral-text data-[active]:shadow-xs data-active:shadow-xs data-[active]:border-neutral-interactive/80 data-active:border-neutral-interactive/80",
          "dark:data-[active]:bg-neutral-interactive dark:data-active:bg-neutral-interactive dark:data-[active]:text-neutral-text dark:data-active:text-neutral-text",
        ],
        variant === "enclosed" && [
          "rounded-lg text-neutral-text-muted hover:text-neutral-text border border-transparent",
          "data-[active]:bg-neutral-surface-alt data-active:bg-neutral-surface-alt data-[active]:text-neutral-text data-active:text-neutral-text data-[active]:border-neutral-interactive/80 data-active:border-neutral-interactive/80",
        ],
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0 text-neutral-text-muted group-data-[active]/tabs-trigger:text-neutral-text",
            size === "sm" ? "[&_svg]:size-3.5" : size === "lg" ? "[&_svg]:size-5" : "[&_svg]:size-4"
          )}
        >
          {icon}
        </span>
      )}
      {children}
    </TabsPrimitive.Tab>
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
