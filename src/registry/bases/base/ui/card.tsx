"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

export type CardVariant = "default" | "tint" | "outline" | "ghost"

export type CardIntent =
  | "neutral"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger"

export type CardSize = "sm" | "default" | "lg"

type CanonicalCardVariant = "default" | "outline" | "ghost"

const CARD_INTENT_VARIANT_CLASSES: Record<
  CardIntent,
  Record<CanonicalCardVariant, string>
> = {
  neutral: {
    default:
      "border-transparent [--current-surface:var(--neutral-surface-alt)] bg-(--current-surface) text-neutral-text",
    outline:
      "border-neutral-interactive [--current-surface:var(--neutral-surface)] bg-(--current-surface) text-neutral-text dark:bg-transparent",
    ghost: "border-transparent bg-transparent text-neutral-text shadow-none",
  },
  primary: {
    default:
      "border-transparent [--current-surface:var(--primary-surface-alt)] bg-(--current-surface) text-primary-text",
    outline:
      "border-primary-interactive [--current-surface:var(--primary-surface)] dark:[--current-surface:var(--neutral-surface)] bg-(--current-surface) dark:bg-transparent text-primary-text",
    ghost: "border-transparent bg-transparent text-primary-text shadow-none",
  },
  info: {
    default:
      "border-transparent [--current-surface:var(--info-surface-alt)] bg-(--current-surface) text-info-text",
    outline:
      "border-info-interactive [--current-surface:var(--info-surface)] dark:[--current-surface:var(--neutral-surface)] bg-(--current-surface) dark:bg-transparent text-info-text",
    ghost: "border-transparent bg-transparent text-info-text shadow-none",
  },
  success: {
    default:
      "border-transparent [--current-surface:var(--success-surface-alt)] bg-(--current-surface) text-success-text",
    outline:
      "border-success-interactive [--current-surface:var(--success-surface)] dark:[--current-surface:var(--neutral-surface)] bg-(--current-surface) dark:bg-transparent text-success-text",
    ghost: "border-transparent bg-transparent text-success-text shadow-none",
  },
  warning: {
    default:
      "border-transparent [--current-surface:var(--warning-surface-alt)] bg-(--current-surface) text-warning-text",
    outline:
      "border-warning-interactive [--current-surface:var(--warning-surface)] dark:[--current-surface:var(--neutral-surface)] bg-(--current-surface) dark:bg-transparent text-warning-text",
    ghost: "border-transparent bg-transparent text-warning-text shadow-none",
  },
  danger: {
    default:
      "border-transparent [--current-surface:var(--danger-surface-alt)] bg-(--current-surface) text-danger-text",
    outline:
      "border-danger-interactive [--current-surface:var(--danger-surface)] dark:[--current-surface:var(--neutral-surface)] bg-(--current-surface) dark:bg-transparent text-danger-text",
    ghost: "border-transparent bg-transparent text-danger-text shadow-none",
  },
}

const CARD_INTERACTIVE_INTENT_CLASSES: Record<
  CardIntent,
  Record<CanonicalCardVariant, string>
> = {
  neutral: {
    default:
      "hover:[--current-surface:var(--neutral-interactive)] active:[--current-surface:var(--neutral-interactive-hover)] [&[data-pressed]]:[--current-surface:var(--neutral-interactive-hover)] focus-visible:border-neutral-interactive-focus focus-visible:ring-neutral-interactive-focus/30",
    outline:
      "hover:border-neutral-interactive-hover hover:[--current-surface:var(--neutral-surface-alt)] hover:bg-(--current-surface) active:[--current-surface:var(--neutral-interactive)] active:bg-(--current-surface) [&[data-pressed]]:[--current-surface:var(--neutral-interactive)] [&[data-pressed]]:bg-(--current-surface) focus-visible:border-neutral-interactive-focus focus-visible:ring-neutral-interactive-focus/30",
    ghost:
      "hover:[--current-surface:var(--neutral-surface-alt)] hover:bg-(--current-surface) active:[--current-surface:var(--neutral-interactive)] active:bg-(--current-surface) [&[data-pressed]]:[--current-surface:var(--neutral-interactive)] [&[data-pressed]]:bg-(--current-surface) focus-visible:border-neutral-interactive-focus focus-visible:ring-neutral-interactive-focus/30",
  },
  primary: {
    default:
      "hover:[--current-surface:var(--primary-interactive)] active:[--current-surface:var(--primary-interactive-hover)] [&[data-pressed]]:[--current-surface:var(--primary-interactive-hover)] focus-visible:border-primary-interactive-focus focus-visible:ring-primary-interactive-focus/30",
    outline:
      "hover:border-primary-interactive-hover hover:[--current-surface:var(--primary-surface-alt)] hover:bg-(--current-surface) active:[--current-surface:var(--primary-interactive)] active:bg-(--current-surface) [&[data-pressed]]:[--current-surface:var(--primary-interactive)] [&[data-pressed]]:bg-(--current-surface) focus-visible:border-primary-interactive-focus focus-visible:ring-primary-interactive-focus/30",
    ghost:
      "hover:[--current-surface:var(--primary-surface-alt)] hover:bg-(--current-surface) active:[--current-surface:var(--primary-interactive)] active:bg-(--current-surface) [&[data-pressed]]:[--current-surface:var(--primary-interactive)] [&[data-pressed]]:bg-(--current-surface) focus-visible:border-primary-interactive-focus focus-visible:ring-primary-interactive-focus/30",
  },
  info: {
    default:
      "hover:[--current-surface:var(--info-interactive)] active:[--current-surface:var(--info-interactive-hover)] [&[data-pressed]]:[--current-surface:var(--info-interactive-hover)] focus-visible:border-info-interactive-focus focus-visible:ring-info-interactive-focus/30",
    outline:
      "hover:border-info-interactive-hover hover:[--current-surface:var(--info-surface-alt)] hover:bg-(--current-surface) active:[--current-surface:var(--info-interactive)] active:bg-(--current-surface) [&[data-pressed]]:[--current-surface:var(--info-interactive)] [&[data-pressed]]:bg-(--current-surface) focus-visible:border-info-interactive-focus focus-visible:ring-info-interactive-focus/30",
    ghost:
      "hover:[--current-surface:var(--info-surface-alt)] hover:bg-(--current-surface) active:[--current-surface:var(--info-interactive)] active:bg-(--current-surface) [&[data-pressed]]:[--current-surface:var(--info-interactive)] [&[data-pressed]]:bg-(--current-surface) focus-visible:border-info-interactive-focus focus-visible:ring-info-interactive-focus/30",
  },
  success: {
    default:
      "hover:[--current-surface:var(--success-interactive)] active:[--current-surface:var(--success-interactive-hover)] [&[data-pressed]]:[--current-surface:var(--success-interactive-hover)] focus-visible:border-success-interactive-focus focus-visible:ring-success-interactive-focus/30",
    outline:
      "hover:border-success-interactive-hover hover:[--current-surface:var(--success-surface-alt)] hover:bg-(--current-surface) active:[--current-surface:var(--success-interactive)] active:bg-(--current-surface) [&[data-pressed]]:[--current-surface:var(--success-interactive)] [&[data-pressed]]:bg-(--current-surface) focus-visible:border-success-interactive-focus focus-visible:ring-success-interactive-focus/30",
    ghost:
      "hover:[--current-surface:var(--success-surface-alt)] hover:bg-(--current-surface) active:[--current-surface:var(--success-interactive)] active:bg-(--current-surface) [&[data-pressed]]:[--current-surface:var(--success-interactive)] [&[data-pressed]]:bg-(--current-surface) focus-visible:border-success-interactive-focus focus-visible:ring-success-interactive-focus/30",
  },
  warning: {
    default:
      "hover:[--current-surface:var(--warning-interactive)] active:[--current-surface:var(--warning-interactive-hover)] [&[data-pressed]]:[--current-surface:var(--warning-interactive-hover)] focus-visible:border-warning-interactive-focus focus-visible:ring-warning-interactive-focus/30",
    outline:
      "hover:border-warning-interactive-hover hover:[--current-surface:var(--warning-surface-alt)] hover:bg-(--current-surface) active:[--current-surface:var(--warning-interactive)] active:bg-(--current-surface) [&[data-pressed]]:[--current-surface:var(--warning-interactive)] [&[data-pressed]]:bg-(--current-surface) focus-visible:border-warning-interactive-focus focus-visible:ring-warning-interactive-focus/30",
    ghost:
      "hover:[--current-surface:var(--warning-surface-alt)] hover:bg-(--current-surface) active:[--current-surface:var(--warning-interactive)] active:bg-(--current-surface) [&[data-pressed]]:[--current-surface:var(--warning-interactive)] [&[data-pressed]]:bg-(--current-surface) focus-visible:border-warning-interactive-focus focus-visible:ring-warning-interactive-focus/30",
  },
  danger: {
    default:
      "hover:[--current-surface:var(--danger-interactive)] active:[--current-surface:var(--danger-interactive-hover)] [&[data-pressed]]:[--current-surface:var(--danger-interactive-hover)] focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    outline:
      "hover:border-danger-interactive-hover hover:[--current-surface:var(--danger-surface-alt)] hover:bg-(--current-surface) active:[--current-surface:var(--danger-interactive)] active:bg-(--current-surface) [&[data-pressed]]:[--current-surface:var(--danger-interactive)] [&[data-pressed]]:bg-(--current-surface) focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    ghost:
      "hover:[--current-surface:var(--danger-surface-alt)] hover:bg-(--current-surface) active:[--current-surface:var(--danger-interactive)] active:bg-(--current-surface) [&[data-pressed]]:[--current-surface:var(--danger-interactive)] [&[data-pressed]]:bg-(--current-surface) focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
  },
}

const cardVariants = cva(
  "cn-card group/card relative flex flex-col overflow-hidden border bg-clip-padding py-(--card-spacing) text-sm transition-[background-color,color,border-color,box-shadow,--current-surface] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] has-[>img:first-child]:pt-0",
  {
    variants: {
      variant: {
        default: "cn-card-variant-default",
        tint: "cn-card-variant-default",
        outline: "cn-card-variant-outline",
        ghost: "cn-card-variant-ghost",
      },
      size: {
        sm: "cn-card-size-sm gap-3 rounded-xl [--card-spacing:--spacing(4)] *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        default:
          "cn-card-size-default gap-4 rounded-2xl [--card-spacing:--spacing(5)] *:[img:first-child]:rounded-t-2xl *:[img:last-child]:rounded-b-2xl",
        lg: "cn-card-size-lg gap-5 rounded-3xl [--card-spacing:--spacing(6)] *:[img:first-child]:rounded-t-3xl *:[img:last-child]:rounded-b-3xl",
      },
      interactive: {
        true: "cn-card-interactive cursor-pointer select-none outline-none focus-visible:ring-3",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
)

export interface CardProps
  extends useRender.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {
  /**
   * Structural surface variant (`default` | `tint` | `outline` | `ghost`).
   * `default` and `tint` render a soft tinted surface; `outline` renders a 1px border; `ghost` renders a transparent surface.
   * @default "default"
   */
  variant?: CardVariant
  /**
   * Semantic OKLCH color intent (`neutral` | `primary` | `info` | `success` | `warning` | `danger`).
   * @default "neutral"
   */
  intent?: CardIntent
  /**
   * Proportional padding and corner radius tier following `P = R + 2px` at 1x (`sm`: 14px radius / 16px padding, `default`: 18px radius / 20px padding, `lg`: 22px radius / 24px padding).
   * @default "default"
   */
  size?: CardSize
  /**
   * Enables hover/active surface & border transitions, pointer cursor, keyboard focus ring (`focus-visible`), and Enter/Space activation.
   * @default false
   */
  interactive?: boolean
}

function Card({
  className,
  variant = "default",
  intent = "neutral",
  size = "default",
  interactive = false,
  render,
  tabIndex,
  onKeyDown,
  onKeyUp,
  onBlur,
  onClick,
  ...props
}: CardProps) {
  const [isPressed, setIsPressed] = React.useState(false)

  const canonicalVariant: CanonicalCardVariant =
    variant === "outline"
      ? "outline"
      : variant === "ghost"
        ? "ghost"
        : "default"

  const resolvedIntent: CardIntent = intent ?? "neutral"
  const resolvedSize: CardSize = size ?? "default"
  const isInteractive = Boolean(interactive)

  const intentClasses =
    CARD_INTENT_VARIANT_CLASSES[resolvedIntent]?.[canonicalVariant]
  const interactiveClasses = isInteractive
    ? CARD_INTERACTIVE_INTENT_CLASSES[resolvedIntent]?.[canonicalVariant]
    : undefined

  const resolvedTabIndex =
    tabIndex !== undefined
      ? tabIndex
      : isInteractive && !render
        ? 0
        : undefined

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    onKeyDown?.(e)
    if (e.defaultPrevented || !isInteractive) return
    if (e.key === "Enter" || e.key === " ") {
      if (!render) {
        if (e.key === " ") {
          e.preventDefault()
        }
        setIsPressed(true)
        if (e.key === "Enter") {
          e.currentTarget.click()
        }
      } else {
        setIsPressed(true)
      }
    }
  }

  const handleKeyUp: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    onKeyUp?.(e)
    if (!isInteractive) return
    if (e.key === "Enter" || e.key === " ") {
      setIsPressed(false)
      if (!render && e.key === " ") {
        e.currentTarget.click()
      }
    }
  }

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    onBlur?.(e)
    if (isPressed) {
      setIsPressed(false)
    }
  }

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        tabIndex: resolvedTabIndex,
        onClick,
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
        onBlur: handleBlur,
        className: cn(
          cardVariants({
            variant,
            size: resolvedSize,
            interactive: isInteractive,
          }),
          intentClasses,
          interactiveClasses,
          className
        ),
      } as Record<string, unknown>,
      props as Record<string, unknown>
    ),
    render,
    state: {
      slot: "card",
      variant: canonicalVariant,
      intent: resolvedIntent,
      size: resolvedSize,
      interactive: isInteractive,
      pressed: isPressed,
    },
    stateAttributesMapping: {
      interactive: (val) => (val ? { "data-interactive": "" } : null),
      pressed: (val) => (val ? { "data-pressed": "" } : null),
    },
  })
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "cn-card-header group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-[inherit] px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "cn-card-title cn-font-heading text-base font-medium leading-snug group-data-[size=sm]/card:text-sm group-data-[size=lg]/card:text-lg",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "cn-card-description text-neutral-text-secondary text-sm group-data-[size=sm]/card:text-xs",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "cn-card-action col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("cn-card-content px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "cn-card-footer flex items-center rounded-b-[inherit] px-(--card-spacing) [.border-t]:pt-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
