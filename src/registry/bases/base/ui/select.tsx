"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, ChevronDown, ChevronsUpDown, ChevronUp } from "icons"
import { cn } from "cn"

import { useButtonGroupContext } from "@/registry/bases/base/ui/button-group"

export type SelectVariant = "default" | "outline" | "ghost"
export type SelectSize = "xs" | "sm" | "default" | "lg"

const selectTriggerVariants = cva(
  "cn-select-trigger group/select-trigger inline-flex w-fit items-center justify-between whitespace-nowrap border bg-clip-padding font-medium outline-none select-none transition-[background-color,color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-placeholder:text-neutral-text-muted data-placeholder:font-normal focus-visible:border-primary-interactive-focus focus-visible:ring-3 focus-visible:ring-primary-interactive-focus/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 aria-invalid:border-danger-fill dark:aria-invalid:border-danger-fill/60 aria-invalid:ring-3 aria-invalid:ring-danger-interactive-focus/20 dark:aria-invalid:ring-danger-interactive-focus/40 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:truncate [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "cn-select-trigger-variant-default border-transparent bg-neutral-interactive text-neutral-text hover:bg-neutral-interactive-hover active:bg-neutral-interactive-active data-popup-open:bg-neutral-interactive-hover",
        outline:
          "cn-select-trigger-variant-outline border-neutral-interactive bg-neutral-surface text-neutral-text dark:bg-transparent hover:border-neutral-interactive-hover hover:bg-neutral-interactive dark:hover:bg-neutral-interactive active:bg-neutral-interactive-hover data-popup-open:border-neutral-interactive-hover data-popup-open:bg-neutral-interactive",
        ghost:
          "cn-select-trigger-variant-ghost border-transparent bg-transparent text-neutral-text hover:bg-neutral-interactive active:bg-neutral-interactive-hover data-popup-open:bg-neutral-interactive",
      },
      size: {
        xs: "cn-select-trigger-size-xs h-6 gap-1 rounded-md px-2 text-xs *:data-[slot=select-value]:gap-1 [&_svg:not([class*='size-'])]:size-3",
        sm: "cn-select-trigger-size-sm h-7 gap-1.5 rounded-md px-2.5 text-xs *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        default:
          "cn-select-trigger-size-default h-8 gap-1.5 rounded-lg px-3 text-sm *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4",
        lg: "cn-select-trigger-size-lg h-9 gap-2 rounded-lg px-3.5 text-sm *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface SelectContextValue {
  variant?: SelectVariant
  size?: SelectSize
  alignWithItem?: boolean
  placeholder?: React.ReactNode
  disabled?: boolean
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

function useSelectContext() {
  return React.useContext(SelectContext)
}

const SelectGroupPresentContext = React.createContext<boolean>(false)

function extractItemsFromChildren(
  children: React.ReactNode,
  acc: Record<string, React.ReactNode> = {}
): Record<string, React.ReactNode> {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    const childProps = child.props as Record<string, any>
    if (
      childProps &&
      "value" in childProps &&
      childProps.value !== undefined &&
      childProps.value !== null &&
      (child.type === SelectItem ||
        (child.type as any)?.displayName === "SelectItem" ||
        childProps["data-slot"] === "select-item")
    ) {
      const key = String(childProps.value)
      acc[key] = childProps.label ?? childProps.children
      return
    }
    if (childProps?.children) {
      extractItemsFromChildren(childProps.children, acc)
    }
  })
  return acc
}

export interface SelectProps<
  Value = any,
  Multiple extends boolean | undefined = false,
> extends SelectPrimitive.Root.Props<Value, Multiple> {
  /**
   * Visual surface variant inherited by `SelectTrigger` (`default` | `outline` | `ghost`).
   * @default "default"
   */
  variant?: SelectVariant
  /**
   * Proportional height, corner radius, padding, and font size tier (`xs` | `sm` | `default` | `lg`).
   * Matches `Button` and `Input` dimensions 1:1.
   * @default "default"
   */
  size?: SelectSize
  /**
   * Alias for Base UI's `alignItemWithTrigger` on `SelectPositioner`.
   * When `true`, overlaps the trigger so the selected item's text aligns with the trigger text.
   * When `false`, positions the popup below/above the trigger like a standard dropdown menu.
   * @default true
   */
  alignWithItem?: boolean
  /**
   * Native Base UI `SelectPositioner` prop (`alignItemWithTrigger`).
   */
  alignItemWithTrigger?: boolean
  /**
   * Optional placeholder text inherited by `SelectValue` when no value is selected.
   */
  placeholder?: React.ReactNode
}

function Select<Value = any, Multiple extends boolean | undefined = false>({
  variant,
  size,
  alignWithItem,
  alignItemWithTrigger,
  placeholder,
  disabled,
  items,
  children,
  ...props
}: SelectProps<Value, Multiple>) {
  const resolvedAlignWithItem = alignWithItem ?? alignItemWithTrigger

  const resolvedItems = React.useMemo(() => {
    if (items !== undefined) return items
    const extracted = extractItemsFromChildren(children)
    return Object.keys(extracted).length > 0 ? extracted : undefined
  }, [items, children])

  const contextValue = React.useMemo<SelectContextValue>(
    () => ({
      variant,
      size,
      alignWithItem: resolvedAlignWithItem,
      placeholder,
      disabled,
    }),
    [variant, size, resolvedAlignWithItem, placeholder, disabled]
  )

  return (
    <SelectContext.Provider value={contextValue}>
      <SelectPrimitive.Root
        disabled={disabled}
        items={resolvedItems}
        {...props}
      >
        {children}
      </SelectPrimitive.Root>
    </SelectContext.Provider>
  )
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectGroupPresentContext.Provider value={true}>
      <SelectPrimitive.Group
        data-slot="select-group"
        className={cn("cn-select-group", className)}
        {...props}
      />
    </SelectGroupPresentContext.Provider>
  )
}

function SelectValue({
  className,
  placeholder,
  ...props
}: SelectPrimitive.Value.Props) {
  const selectContext = useSelectContext()
  const resolvedPlaceholder = selectContext?.placeholder ?? placeholder

  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      placeholder={resolvedPlaceholder}
      className={cn("cn-select-value", className)}
      {...props}
    />
  )
}

export interface SelectTriggerProps
  extends Omit<SelectPrimitive.Trigger.Props, "className">,
    VariantProps<typeof selectTriggerVariants> {
  className?: string
  /**
   * Visual emphasis variant (`default` | `outline` | `ghost`).
   */
  variant?: SelectVariant
  /**
   * Proportional height, corner radius, padding, and font size tier (`xs` | `sm` | `default` | `lg`).
   * Matches `Button` and `Input` dimensions 1:1.
   */
  size?: SelectSize
  /**
   * Optional shorthand placeholder if `children` is omitted.
   */
  placeholder?: React.ReactNode
}

function SelectTrigger({
  className,
  variant,
  size,
  placeholder,
  disabled,
  children,
  ...props
}: SelectTriggerProps) {
  const selectContext = useSelectContext()
  const groupContext = useButtonGroupContext()

  const groupVariant: SelectVariant | undefined =
    groupContext?.variant === "outline"
      ? "outline"
      : groupContext?.variant === "ghost"
        ? "ghost"
        : groupContext?.variant === "default" ||
            groupContext?.variant === "secondary"
          ? "default"
          : undefined

  const resolvedVariant: SelectVariant =
    variant ?? selectContext?.variant ?? groupVariant ?? "default"
  const resolvedSize: SelectSize =
    size ?? selectContext?.size ?? groupContext?.size ?? "default"
  const isDisabled = Boolean(
    disabled || selectContext?.disabled || groupContext?.disabled
  )

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      disabled={isDisabled}
      className={cn(
        selectTriggerVariants({ variant: resolvedVariant, size: resolvedSize }),
        className
      )}
      {...props}
    >
      {children ?? <SelectValue placeholder={placeholder} />}
      <SelectPrimitive.Icon
        data-slot="select-icon"
        render={
          <ChevronsUpDown
            aria-hidden="true"
            className="cn-select-trigger-icon pointer-events-none shrink-0 text-neutral-text-muted transition-colors group-hover/select-trigger:text-neutral-text"
          />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

export interface SelectContentProps
  extends SelectPrimitive.Popup.Props,
    Pick<
      SelectPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
    > {
  /**
   * Alias for Base UI's `alignItemWithTrigger` on `SelectPositioner`.
   * When `true`, overlaps the trigger so the selected item's text aligns with the trigger text.
   * When `false`, positions the popup below/above the trigger like a standard dropdown menu.
   * @default true
   */
  alignWithItem?: boolean
  /**
   * Size scale inherited from `Select` (`xs` | `sm` | `default` | `lg`).
   */
  size?: SelectSize
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  alignWithItem,
  alignItemWithTrigger,
  size,
  ...props
}: SelectContentProps) {
  const selectContext = useSelectContext()
  const resolvedAlignWithItem =
    alignWithItem ??
    alignItemWithTrigger ??
    selectContext?.alignWithItem ??
    true
  const resolvedSize: SelectSize = size ?? selectContext?.size ?? "default"

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={resolvedAlignWithItem}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-size={resolvedSize}
          data-align-trigger={resolvedAlignWithItem}
          className={cn(
            "cn-select-content cn-select-content-logical group/select-content relative isolate z-50 max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-[align-trigger=true]:animate-none",
            resolvedSize === "xs" || resolvedSize === "sm"
              ? "rounded-lg"
              : "rounded-xl",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List
            data-slot="select-list"
            className="cn-select-list max-h-(--available-height) scroll-py-1 overflow-y-auto p-1 outline-none"
          >
            {children}
          </SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  const insideGroup = React.useContext(SelectGroupPresentContext)

  if (!insideGroup) {
    return (
      <div
        data-slot="select-label"
        aria-hidden="true"
        className={cn("cn-select-label", className)}
        {...(props as React.ComponentProps<"div">)}
      />
    )
  }

  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("cn-select-label", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  const selectContext = useSelectContext()
  const resolvedSize: SelectSize = selectContext?.size ?? "default"

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-size={resolvedSize}
      className={cn(
        "cn-select-item relative flex w-full cursor-default items-center outline-hidden select-none transition-colors duration-100 focus:bg-neutral-interactive hover:bg-neutral-interactive data-highlighted:bg-neutral-interactive active:bg-neutral-interactive-hover data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        resolvedSize === "xs" || resolvedSize === "sm"
          ? "gap-1.5 rounded-sm py-1 pe-6 ps-2 text-xs [&_svg:not([class*='size-'])]:size-3.5"
          : "gap-2 rounded-lg py-1.5 pe-7 ps-2.5 text-sm [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText
        data-slot="select-item-text"
        className="cn-select-item-text flex flex-1 items-center gap-2 whitespace-nowrap"
      >
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        data-slot="select-item-indicator"
        render={<span className="cn-select-item-indicator" />}
      >
        <Check
          aria-hidden="true"
          className="cn-select-item-indicator-icon pointer-events-none"
        />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
SelectItem.displayName = "SelectItem"

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("cn-select-separator pointer-events-none", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn("cn-select-scroll-up-button top-0 w-full", className)}
      {...props}
    >
      <ChevronUp aria-hidden="true" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn("cn-select-scroll-down-button bottom-0 w-full", className)}
      {...props}
    >
      <ChevronDown aria-hidden="true" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
}
