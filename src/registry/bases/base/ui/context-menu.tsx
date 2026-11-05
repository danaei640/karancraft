"use client"

import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { IconPlaceholder } from "@/app/(create)/components/icon-placeholder"

export type ContextMenuSize = "sm" | "default" | "lg"

interface ContextMenuDensityContextProps {
  size: ContextMenuSize
  hasIcons: boolean
  hasCheckmarks: boolean
}

const ContextMenuDensityContext = React.createContext<ContextMenuDensityContextProps>({
  size: "default",
  hasIcons: false,
  hasCheckmarks: false,
})

function ContextMenu({ ...props }: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuPortal({ ...props }: ContextMenuPrimitive.Portal.Props) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

function ContextMenuTrigger({
  className,
  ...props
}: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("cn-context-menu-trigger select-none", className)}
      {...props}
    />
  )
}

const contextMenuContentVariants = cva(
  "cn-context-menu-content cn-context-menu-content-logical cn-menu-target cn-menu-translucent z-50 origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none",
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

export interface ContextMenuContentProps
  extends ContextMenuPrimitive.Popup.Props,
    Pick<
      ContextMenuPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset"
    >,
    VariantProps<typeof contextMenuContentVariants> {
  /**
   * Proportional sizing scale for the context menu and its contained items (`sm` | `default` | `lg`).
   * @default "default"
   */
  size?: ContextMenuSize
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

function ContextMenuContent({
  className,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 2,
  size = "default",
  hasIcons = false,
  hasCheckmarks = false,
  children,
  ...props
}: ContextMenuContentProps) {
  const contextValue = React.useMemo(
    () => ({ size, hasIcons, hasCheckmarks }),
    [size, hasIcons, hasCheckmarks]
  )

  return (
    <ContextMenuDensityContext.Provider value={contextValue}>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Positioner
          className="isolate z-50 outline-none"
          align={align}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}
        >
          <ContextMenuPrimitive.Popup
            data-slot="context-menu-content"
            data-size={size}
            data-has-icons={hasIcons ? "" : undefined}
            data-has-checkmarks={hasCheckmarks ? "" : undefined}
            className={cn(
              contextMenuContentVariants({ size }),
              "max-h-(--available-height)",
              className
            )}
            {...props}
          >
            {children}
          </ContextMenuPrimitive.Popup>
        </ContextMenuPrimitive.Positioner>
      </ContextMenuPrimitive.Portal>
    </ContextMenuDensityContext.Provider>
  )
}

function ContextMenuGroup({ ...props }: ContextMenuPrimitive.Group.Props) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

export interface ContextMenuLabelProps extends ContextMenuPrimitive.GroupLabel.Props {
  inset?: boolean
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuLabelProps) {
  const { hasIcons } = React.useContext(ContextMenuDensityContext)
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset || hasIcons}
      className={cn("cn-context-menu-label", className)}
      {...props}
    />
  )
}

export interface ContextMenuItemProps extends ContextMenuPrimitive.Item.Props {
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
   * Shorthand keyboard shortcut text (e.g., "⌘C").
   */
  shortcut?: string
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  icon,
  subText,
  secondaryContent,
  shortcut,
  children,
  ...props
}: ContextMenuItemProps) {
  const { hasIcons, size } = React.useContext(ContextMenuDensityContext)
  const shouldIndent = (inset || hasIcons) && !icon

  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={shouldIndent}
      data-variant={variant}
      data-size={size}
      className={cn(
        "cn-context-menu-item group/context-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        size === "sm" && "py-1 px-2 text-xs rounded-md gap-2",
        size === "lg" && "py-2 px-3.5 text-base rounded-xl gap-3",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0 text-neutral-text-muted group-hover/context-menu-item:text-neutral-text group-focus/context-menu-item:text-neutral-text",
            variant === "destructive" && "text-danger-text group-hover/context-menu-item:text-danger-text",
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
        <ContextMenuShortcut className="ms-auto">{shortcut}</ContextMenuShortcut>
      )}
    </ContextMenuPrimitive.Item>
  )
}

function ContextMenuSub({ ...props }: ContextMenuPrimitive.SubmenuRoot.Props) {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  )
}

export interface ContextMenuSubTriggerProps extends ContextMenuPrimitive.SubmenuTrigger.Props {
  inset?: boolean
  icon?: React.ReactNode
  subText?: React.ReactNode
  secondaryContent?: React.ReactNode
}

function ContextMenuSubTrigger({
  className,
  inset,
  icon,
  subText,
  secondaryContent,
  children,
  ...props
}: ContextMenuSubTriggerProps) {
  const { hasIcons, size } = React.useContext(ContextMenuDensityContext)
  const shouldIndent = (inset || hasIcons) && !icon

  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={shouldIndent}
      data-size={size}
      className={cn(
        "cn-context-menu-sub-trigger flex cursor-default items-center outline-hidden select-none data-popup-open:bg-neutral-interactive-hover data-popup-open:text-neutral-text [&_svg]:pointer-events-none [&_svg]:shrink-0",
        size === "sm" && "py-1 px-2 text-xs rounded-md gap-2",
        size === "lg" && "py-2 px-3.5 text-base rounded-xl gap-3",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0 text-neutral-text-muted group-hover/context-menu-sub-trigger:text-neutral-text",
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
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

function ContextMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 2,
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuContent>) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      className={cn(
        "cn-context-menu-sub-content cn-menu-target cn-menu-translucent w-auto",
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

export interface ContextMenuCheckboxItemProps extends ContextMenuPrimitive.CheckboxItem.Props {
  inset?: boolean
  icon?: React.ReactNode
  subText?: React.ReactNode
  secondaryContent?: React.ReactNode
  shortcut?: string
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  icon,
  subText,
  secondaryContent,
  shortcut,
  ...props
}: ContextMenuCheckboxItemProps) {
  const { size } = React.useContext(ContextMenuDensityContext)

  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      data-size={size}
      className={cn(
        "cn-context-menu-checkbox-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
        <ContextMenuShortcut className="ms-auto pe-4">{shortcut}</ContextMenuShortcut>
      )}

      {secondaryContent && (
        <span className="ms-auto shrink-0 ps-3 pe-4 text-neutral-text-muted text-xs">
          {secondaryContent}
        </span>
      )}

      <span
        className="cn-context-menu-item-indicator pointer-events-none absolute end-2"
        data-slot="context-menu-checkbox-item-indicator"
      >
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
            className="size-4"
          />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioGroup({ ...props }: ContextMenuPrimitive.RadioGroup.Props) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

export interface ContextMenuRadioItemProps extends ContextMenuPrimitive.RadioItem.Props {
  inset?: boolean
  icon?: React.ReactNode
  subText?: React.ReactNode
  secondaryContent?: React.ReactNode
  shortcut?: string
}

function ContextMenuRadioItem({
  className,
  children,
  inset,
  icon,
  subText,
  secondaryContent,
  shortcut,
  ...props
}: ContextMenuRadioItemProps) {
  const { size } = React.useContext(ContextMenuDensityContext)

  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      data-size={size}
      className={cn(
        "cn-context-menu-radio-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
        <ContextMenuShortcut className="ms-auto pe-4">{shortcut}</ContextMenuShortcut>
      )}

      {secondaryContent && (
        <span className="ms-auto shrink-0 ps-3 pe-4 text-neutral-text-muted text-xs">
          {secondaryContent}
        </span>
      )}

      <span
        className="cn-context-menu-item-indicator pointer-events-none absolute end-2"
        data-slot="context-menu-radio-item-indicator"
      >
        <ContextMenuPrimitive.RadioItemIndicator>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
            className="size-4"
          />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("cn-context-menu-separator", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn("cn-context-menu-shortcut", className)}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  contextMenuContentVariants,
}
