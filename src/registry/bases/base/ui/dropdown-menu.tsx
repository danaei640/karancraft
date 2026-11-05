"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { IconPlaceholder } from "@/app/(create)/components/icon-placeholder"

export type DropdownMenuSize = "sm" | "default" | "lg"

interface DropdownMenuDensityContextProps {
  size: DropdownMenuSize
  hasIcons: boolean
  hasCheckmarks: boolean
}

const DropdownMenuDensityContext = React.createContext<DropdownMenuDensityContextProps>({
  size: "default",
  hasIcons: false,
  hasCheckmarks: false,
})

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

const dropdownMenuContentVariants = cva(
  "cn-dropdown-menu-content cn-dropdown-menu-content-logical cn-menu-target cn-menu-translucent z-50 origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden",
  {
    variants: {
      size: {
        sm: "min-w-40 p-1 text-xs",
        default: "min-w-48 p-1.5 text-sm",
        lg: "min-w-56 p-2 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface DropdownMenuContentProps
  extends MenuPrimitive.Popup.Props,
    Pick<
      MenuPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset"
    >,
    VariantProps<typeof dropdownMenuContentVariants> {
  /**
   * Proportional sizing scale for the dropdown menu and its contained items (`sm` | `default` | `lg`).
   * @default "default"
   */
  size?: DropdownMenuSize
  /**
   * Reserves an icon gutter across all items so text aligns evenly even if only some items have icons.
   * @default false
   */
  hasIcons?: boolean
  /**
   * Reserves a checkmark indicator gutter across all items.
   * @default false
   */
  hasCheckmarks?: boolean
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  size = "default",
  hasIcons = false,
  hasCheckmarks = false,
  className,
  children,
  ...props
}: DropdownMenuContentProps) {
  const contextValue = React.useMemo(
    () => ({ size, hasIcons, hasCheckmarks }),
    [size, hasIcons, hasCheckmarks]
  )

  return (
    <DropdownMenuDensityContext.Provider value={contextValue}>
      <MenuPrimitive.Portal>
        <MenuPrimitive.Positioner
          className="isolate z-50 outline-none"
          align={align}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}
        >
          <MenuPrimitive.Popup
            data-slot="dropdown-menu-content"
            data-size={size}
            data-has-icons={hasIcons ? "" : undefined}
            data-has-checkmarks={hasCheckmarks ? "" : undefined}
            className={cn(
              dropdownMenuContentVariants({ size }),
              "max-h-(--available-height) w-(--anchor-width)",
              className
            )}
            {...props}
          >
            {children}
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    </DropdownMenuDensityContext.Provider>
  )
}

const DropdownMenuGroupContext = React.createContext<boolean>(false)

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return (
    <DropdownMenuGroupContext.Provider value={true}>
      <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
    </DropdownMenuGroupContext.Provider>
  )
}

export interface DropdownMenuLabelProps extends React.ComponentProps<"div"> {
  inset?: boolean
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) {
  const { hasIcons } = React.useContext(DropdownMenuDensityContext)
  const isInsideGroup = React.useContext(DropdownMenuGroupContext)

  if (isInsideGroup) {
    return (
      <MenuPrimitive.GroupLabel
        data-slot="dropdown-menu-label"
        data-inset={inset || hasIcons}
        className={cn("cn-dropdown-menu-label", className)}
        {...props}
      />
    )
  }

  return (
    <div
      role="heading"
      aria-level={3}
      data-slot="dropdown-menu-label"
      data-inset={inset || hasIcons}
      className={cn("cn-dropdown-menu-label", className)}
      {...props}
    />
  )
}

export interface DropdownMenuItemProps extends MenuPrimitive.Item.Props {
  inset?: boolean
  variant?: "default" | "destructive"
  /**
   * Leading icon element rendered before the item label.
   */
  icon?: React.ReactNode
  /**
   * Optional multiline secondary descriptive text rendered below the primary label.
   */
  subText?: React.ReactNode
  /**
   * Secondary content (such as hotkey or badge) rendered on the opposite end.
   */
  secondaryContent?: React.ReactNode
  /**
   * Shorthand keyboard shortcut text (e.g., "⌘K").
   */
  shortcut?: string
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  icon,
  subText,
  secondaryContent,
  shortcut,
  children,
  ...props
}: DropdownMenuItemProps) {
  const { hasIcons, size } = React.useContext(DropdownMenuDensityContext)
  const shouldIndent = (inset || hasIcons) && !icon

  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={shouldIndent}
      data-variant={variant}
      data-size={size}
      className={cn(
        "cn-dropdown-menu-item group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        size === "sm" && "py-1 px-2 text-xs rounded-md gap-2",
        size === "lg" && "py-2 px-3.5 text-base rounded-xl gap-3",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0 text-neutral-text-muted group-hover/dropdown-menu-item:text-neutral-text group-focus/dropdown-menu-item:text-neutral-text",
            variant === "destructive" && "text-danger-text group-hover/dropdown-menu-item:text-danger-text",
            size === "sm" ? "[&_svg]:size-3.5" : size === "lg" ? "[&_svg]:size-5" : "[&_svg]:size-4"
          )}
        >
          {icon}
        </span>
      )}

      {subText ? (
        <div className="flex flex-col items-start gap-0.5 leading-tight">
          <span className="font-medium text-neutral-text">{children}</span>
          <span className="text-xs text-neutral-text-muted font-normal leading-normal">{subText}</span>
        </div>
      ) : (
        <span className="flex-1 truncate">{children}</span>
      )}

      {secondaryContent && (
        <span className="ms-auto shrink-0 ps-3 text-neutral-text-muted text-xs">
          {secondaryContent}
        </span>
      )}

      {shortcut && !secondaryContent && (
        <DropdownMenuShortcut className="ms-auto">{shortcut}</DropdownMenuShortcut>
      )}
    </MenuPrimitive.Item>
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

export interface DropdownMenuSubTriggerProps extends MenuPrimitive.SubmenuTrigger.Props {
  inset?: boolean
  icon?: React.ReactNode
  subText?: React.ReactNode
  secondaryContent?: React.ReactNode
}

function DropdownMenuSubTrigger({
  className,
  inset,
  icon,
  subText,
  secondaryContent,
  children,
  ...props
}: DropdownMenuSubTriggerProps) {
  const { hasIcons, size } = React.useContext(DropdownMenuDensityContext)
  const shouldIndent = (inset || hasIcons) && !icon

  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={shouldIndent}
      data-size={size}
      className={cn(
        "cn-dropdown-menu-sub-trigger flex cursor-default items-center outline-hidden select-none data-popup-open:bg-neutral-interactive-hover data-popup-open:text-neutral-text [&_svg]:pointer-events-none [&_svg]:shrink-0",
        size === "sm" && "py-1 px-2 text-xs rounded-md gap-2",
        size === "lg" && "py-2 px-3.5 text-base rounded-xl gap-3",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0 text-neutral-text-muted group-hover/dropdown-menu-sub-trigger:text-neutral-text",
            size === "sm" ? "[&_svg]:size-3.5" : size === "lg" ? "[&_svg]:size-5" : "[&_svg]:size-4"
          )}
        >
          {icon}
        </span>
      )}

      {subText ? (
        <div className="flex flex-col items-start gap-0.5 leading-tight">
          <span className="font-medium text-neutral-text">{children}</span>
          <span className="text-xs text-neutral-text-muted font-normal leading-normal">{subText}</span>
        </div>
      ) : (
        <span className="flex-1 truncate">{children}</span>
      )}

      {secondaryContent && (
        <span className="ms-auto shrink-0 ps-3 text-neutral-text-muted text-xs">
          {secondaryContent}
        </span>
      )}

      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
        className="cn-rtl-flip ms-auto size-4 shrink-0 text-neutral-text-muted"
      />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 2,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "cn-dropdown-menu-sub-content cn-menu-target cn-menu-translucent w-auto",
        className
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

export interface DropdownMenuCheckboxItemProps extends MenuPrimitive.CheckboxItem.Props {
  inset?: boolean
  icon?: React.ReactNode
  subText?: React.ReactNode
  secondaryContent?: React.ReactNode
  shortcut?: string
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  icon,
  subText,
  secondaryContent,
  shortcut,
  ...props
}: DropdownMenuCheckboxItemProps) {
  const { size } = React.useContext(DropdownMenuDensityContext)

  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      data-size={size}
      className={cn(
        "cn-dropdown-menu-checkbox-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        size === "sm" && "py-1 ps-2 pe-7 text-xs rounded-md gap-2",
        size === "lg" && "py-2 ps-3.5 pe-9 text-base rounded-xl gap-3",
        className
      )}
      checked={checked}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0 text-neutral-text-muted",
            size === "sm" ? "[&_svg]:size-3.5" : size === "lg" ? "[&_svg]:size-5" : "[&_svg]:size-4"
          )}
        >
          {icon}
        </span>
      )}

      {subText ? (
        <div className="flex flex-col items-start gap-0.5 leading-tight">
          <span className="font-medium text-neutral-text">{children}</span>
          <span className="text-xs text-neutral-text-muted font-normal leading-normal">{subText}</span>
        </div>
      ) : (
        <span className="flex-1 truncate">{children}</span>
      )}

      {shortcut && !secondaryContent && (
        <DropdownMenuShortcut className="ms-auto pe-4">{shortcut}</DropdownMenuShortcut>
      )}

      {secondaryContent && (
        <span className="ms-auto shrink-0 ps-3 pe-4 text-neutral-text-muted text-xs">
          {secondaryContent}
        </span>
      )}

      <span
        className="cn-dropdown-menu-item-indicator pointer-events-none absolute end-2"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
            className="size-4"
          />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <DropdownMenuGroupContext.Provider value={true}>
      <MenuPrimitive.RadioGroup
        data-slot="dropdown-menu-radio-group"
        {...props}
      />
    </DropdownMenuGroupContext.Provider>
  )
}

export interface DropdownMenuRadioItemProps extends MenuPrimitive.RadioItem.Props {
  inset?: boolean
  icon?: React.ReactNode
  subText?: React.ReactNode
  secondaryContent?: React.ReactNode
  shortcut?: string
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  icon,
  subText,
  secondaryContent,
  shortcut,
  ...props
}: DropdownMenuRadioItemProps) {
  const { size } = React.useContext(DropdownMenuDensityContext)

  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      data-size={size}
      className={cn(
        "cn-dropdown-menu-radio-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        size === "sm" && "py-1 ps-2 pe-7 text-xs rounded-md gap-2",
        size === "lg" && "py-2 ps-3.5 pe-9 text-base rounded-xl gap-3",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0 text-neutral-text-muted",
            size === "sm" ? "[&_svg]:size-3.5" : size === "lg" ? "[&_svg]:size-5" : "[&_svg]:size-4"
          )}
        >
          {icon}
        </span>
      )}

      {subText ? (
        <div className="flex flex-col items-start gap-0.5 leading-tight">
          <span className="font-medium text-neutral-text">{children}</span>
          <span className="text-xs text-neutral-text-muted font-normal leading-normal">{subText}</span>
        </div>
      ) : (
        <span className="flex-1 truncate">{children}</span>
      )}

      {shortcut && !secondaryContent && (
        <DropdownMenuShortcut className="ms-auto pe-4">{shortcut}</DropdownMenuShortcut>
      )}

      {secondaryContent && (
        <span className="ms-auto shrink-0 ps-3 pe-4 text-neutral-text-muted text-xs">
          {secondaryContent}
        </span>
      )}

      <span
        className="cn-dropdown-menu-item-indicator pointer-events-none absolute end-2"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
            className="size-4"
          />
        </MenuPrimitive.RadioItemIndicator>
      </span>
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("cn-dropdown-menu-separator", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("cn-dropdown-menu-shortcut", className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  dropdownMenuContentVariants,
}
