import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { IconPlaceholder } from "@/app/(create)/components/icon-placeholder"

export type BreadcrumbSize = "sm" | "default" | "lg"

interface BreadcrumbContextProps {
  size: BreadcrumbSize
}

const BreadcrumbContext = React.createContext<BreadcrumbContextProps>({
  size: "default",
})

const breadcrumbListVariants = cva(
  "cn-breadcrumb-list flex flex-wrap items-center wrap-break-word text-neutral-text-muted",
  {
    variants: {
      size: {
        sm: "text-xs gap-1 sm:gap-1.5",
        default: "text-sm gap-1.5 sm:gap-2",
        lg: "text-base gap-2 sm:gap-2.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface BreadcrumbProps
  extends React.ComponentProps<"nav">,
    VariantProps<typeof breadcrumbListVariants> {
  /**
   * Sizing scale for breadcrumb items, dividers, and typography (`sm` | `default` | `lg`).
   * @default "default"
   */
  size?: BreadcrumbSize
}

function Breadcrumb({
  className,
  size = "default",
  ...props
}: BreadcrumbProps) {
  return (
    <BreadcrumbContext.Provider value={{ size }}>
      <nav
        aria-label="breadcrumb"
        data-slot="breadcrumb"
        data-size={size}
        className={cn("cn-breadcrumb", className)}
        {...props}
      />
    </BreadcrumbContext.Provider>
  )
}

export interface BreadcrumbListProps extends React.ComponentProps<"ol"> {
  size?: BreadcrumbSize
}

function BreadcrumbList({ className, size: customSize, ...props }: BreadcrumbListProps) {
  const { size } = React.useContext(BreadcrumbContext)
  const resolvedSize = customSize ?? size

  return (
    <ol
      data-slot="breadcrumb-list"
      data-size={resolvedSize}
      className={cn(breadcrumbListVariants({ size: resolvedSize }), className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  const { size } = React.useContext(BreadcrumbContext)

  return (
    <li
      data-slot="breadcrumb-item"
      data-size={size}
      className={cn(
        "cn-breadcrumb-item inline-flex items-center",
        size === "sm" && "gap-1",
        size === "default" && "gap-1.5",
        size === "lg" && "gap-2",
        className
      )}
      {...props}
    />
  )
}

export interface BreadcrumbLinkProps extends useRender.ComponentProps<"a"> {
  /**
   * Optional leading icon displayed before the breadcrumb link label.
   */
  icon?: React.ReactNode
}

function BreadcrumbLink({
  className,
  render,
  icon,
  children,
  ...props
}: BreadcrumbLinkProps) {
  const { size } = React.useContext(BreadcrumbContext)

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "cn-breadcrumb-link inline-flex items-center gap-1.5 hover:text-neutral-text transition-colors outline-hidden focus-visible:ring-1 focus-visible:ring-primary-interactive-focus rounded-xs",
          size === "sm" ? "[&_svg]:size-3" : size === "lg" ? "[&_svg]:size-4" : "[&_svg]:size-3.5",
          className
        ),
        children: (
          <>
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
          </>
        ),
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  })
}

export interface BreadcrumbPageProps extends React.ComponentProps<"span"> {
  /**
   * Optional leading icon displayed before the current page title.
   */
  icon?: React.ReactNode
}

function BreadcrumbPage({
  className,
  icon,
  children,
  ...props
}: BreadcrumbPageProps) {
  const { size } = React.useContext(BreadcrumbContext)

  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "cn-breadcrumb-page inline-flex items-center gap-1.5 text-neutral-text font-normal",
        size === "sm" ? "[&_svg]:size-3" : size === "lg" ? "[&_svg]:size-4" : "[&_svg]:size-3.5",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  const { size } = React.useContext(BreadcrumbContext)

  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "cn-breadcrumb-separator inline-flex items-center text-neutral-text-muted/70",
        size === "sm" ? "[&>svg]:size-3" : size === "lg" ? "[&>svg]:size-4" : "[&>svg]:size-3.5",
        className
      )}
      {...props}
    >
      {children ?? (
        <IconPlaceholder
          lucide="ChevronRightIcon"
          tabler="IconChevronRight"
          hugeicons="ArrowRight01Icon"
          phosphor="CaretRightIcon"
          remixicon="RiArrowRightSLine"
          className="cn-rtl-flip"
        />
      )}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { size } = React.useContext(BreadcrumbContext)

  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "cn-breadcrumb-ellipsis inline-flex items-center justify-center text-neutral-text-muted hover:text-neutral-text transition-colors cursor-pointer",
        size === "sm" ? "size-4 [&>svg]:size-3" : size === "lg" ? "size-6 [&>svg]:size-4.5" : "size-5 [&>svg]:size-3.5",
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
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbListVariants,
}
