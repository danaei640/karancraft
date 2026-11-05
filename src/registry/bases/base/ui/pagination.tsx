import * as React from "react"
import { cn } from "cn"

import { Button } from "@/registry/bases/base/ui/button"
import { IconPlaceholder } from "@/app/(create)/components/icon-placeholder"

export type PaginationSize = "xs" | "sm" | "default" | "lg"
type ButtonSize = React.ComponentProps<typeof Button>["size"]

interface PaginationContextProps {
  size: PaginationSize
}

const PaginationContext = React.createContext<PaginationContextProps>({
  size: "default",
})

export interface PaginationProps extends React.ComponentProps<"nav"> {
  /**
   * Sizing scale for pagination buttons, links, and icons (`xs` | `sm` | `default` | `lg`).
   * @default "default"
   */
  size?: PaginationSize
}

function Pagination({
  className,
  size = "default",
  ...props
}: PaginationProps) {
  return (
    <PaginationContext.Provider value={{ size }}>
      <nav
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        data-size={size}
        className={cn(
          "cn-pagination mx-auto flex w-full justify-center",
          className
        )}
        {...props}
      />
    </PaginationContext.Provider>
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("cn-pagination-content flex items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

export type PaginationLinkProps = {
  isActive?: boolean
  size?: ButtonSize
} & React.ComponentProps<"a">

function resolveButtonIconSize(size: PaginationSize): ButtonSize {
  if (size === "xs") return "icon-xs"
  if (size === "sm") return "icon-sm"
  if (size === "lg") return "icon-lg"
  return "icon"
}

function PaginationLink({
  className,
  isActive,
  size: customSize,
  ...props
}: PaginationLinkProps) {
  const { size } = React.useContext(PaginationContext)
  const resolvedSize = customSize ?? resolveButtonIconSize(size)

  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={resolvedSize}
      className={cn(
        "cn-pagination-link font-medium",
        isActive && "border-neutral-interactive bg-neutral-surface shadow-2xs font-semibold text-neutral-text",
        className
      )}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

export interface PaginationPreviousProps
  extends Omit<React.ComponentProps<typeof PaginationLink>, "size"> {
  text?: string
  size?: ButtonSize
}

function PaginationPrevious({
  className,
  text = "Previous",
  size: customSize,
  ...props
}: PaginationPreviousProps) {
  const { size } = React.useContext(PaginationContext)
  const resolvedSize = customSize ?? size

  return (
    <Button
      variant="ghost"
      size={resolvedSize}
      aria-label="Go to previous page"
      className={cn("cn-pagination-previous gap-1.5 ps-2! pe-3!", className)}
      nativeButton={false}
      render={
        <a
          data-slot="pagination-previous"
          {...props}
        />
      }
    >
      <IconPlaceholder
        lucide="ChevronLeftIcon"
        tabler="IconChevronLeft"
        hugeicons="ArrowLeft01Icon"
        phosphor="CaretLeftIcon"
        remixicon="RiArrowLeftSLine"
        data-icon="inline-start"
        className={cn(
          "cn-rtl-flip shrink-0",
          size === "xs" ? "size-3" : size === "lg" ? "size-4.5" : "size-4"
        )}
      />
      <span className="cn-pagination-previous-text hidden sm:inline">{text}</span>
    </Button>
  )
}

export interface PaginationNextProps
  extends Omit<React.ComponentProps<typeof PaginationLink>, "size"> {
  text?: string
  size?: ButtonSize
}

function PaginationNext({
  className,
  text = "Next",
  size: customSize,
  ...props
}: PaginationNextProps) {
  const { size } = React.useContext(PaginationContext)
  const resolvedSize = customSize ?? size

  return (
    <Button
      variant="ghost"
      size={resolvedSize}
      aria-label="Go to next page"
      className={cn("cn-pagination-next gap-1.5 ps-3! pe-2!", className)}
      nativeButton={false}
      render={
        <a
          data-slot="pagination-next"
          {...props}
        />
      }
    >
      <span className="cn-pagination-next-text hidden sm:inline">{text}</span>
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
        data-icon="inline-end"
        className={cn(
          "cn-rtl-flip shrink-0",
          size === "xs" ? "size-3" : size === "lg" ? "size-4.5" : "size-4"
        )}
      />
    </Button>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { size } = React.useContext(PaginationContext)

  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      data-size={size}
      className={cn(
        "cn-pagination-ellipsis flex items-center justify-center text-neutral-text-muted",
        size === "xs" && "size-6 text-xs [&>svg]:size-3",
        size === "sm" && "size-7 text-xs [&>svg]:size-3.5",
        size === "default" && "size-8 text-sm [&>svg]:size-4",
        size === "lg" && "size-9 text-base [&>svg]:size-4.5",
        className
      )}
      {...props}
    >
      <IconPlaceholder
        lucide="MoreHorizontalIcon"
        tabler="IconDots"
        hugeicons="MoreHorizontalCircle01Icon"
        phosphor="DotsThreeIcon"
        remixicon="RiMoreLine"
      />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
