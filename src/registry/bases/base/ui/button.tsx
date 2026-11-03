"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "icons"
import { cn } from "cn"

import { useButtonGroupContext } from "@/registry/bases/base/ui/button-group"

export type ButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

export type ButtonIntent =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"

export type ButtonAlign = "start" | "center" | "end"

const INTENT_VARIANT_CLASSES: Record<ButtonIntent, Record<ButtonVariant, string>> = {
  primary: {
    default:
      "bg-primary-fill text-primary-on-fill hover:bg-primary-fill-hover active:bg-primary-fill-active [&[data-pressed]]:bg-primary-fill-active focus-visible:border-primary-interactive-focus focus-visible:ring-primary-interactive-focus/30",
    secondary:
      "bg-primary-interactive text-primary-text hover:bg-primary-interactive-hover active:bg-primary-interactive-active [&[data-pressed]]:bg-primary-interactive-active focus-visible:border-primary-interactive-focus focus-visible:ring-primary-interactive-focus/30",
    outline:
      "border-primary-interactive bg-neutral-surface dark:bg-transparent text-primary-text hover:bg-primary-interactive dark:hover:bg-primary-interactive hover:text-primary-text active:bg-primary-interactive-hover dark:active:bg-primary-interactive-hover [&[data-pressed]]:bg-primary-interactive-hover dark:[&[data-pressed]]:bg-primary-interactive-hover focus-visible:border-primary-interactive-focus focus-visible:ring-primary-interactive-focus/30",
    ghost:
      "bg-transparent text-primary-text hover:bg-primary-interactive hover:text-primary-text active:bg-primary-interactive-hover [&[data-pressed]]:bg-primary-interactive-hover focus-visible:border-primary-interactive-focus focus-visible:ring-primary-interactive-focus/30",
    link:
      "bg-transparent text-primary-text-secondary underline-offset-4 hover:text-primary-text hover:underline focus-visible:text-primary-text focus-visible:underline active:text-primary-text-secondary [&[data-pressed]]:text-primary-text-secondary focus-visible:ring-primary-interactive-focus/30",
  },
  neutral: {
    default:
      "bg-neutral-fill text-neutral-on-fill hover:bg-neutral-fill-hover active:bg-neutral-fill-active [&[data-pressed]]:bg-neutral-fill-active focus-visible:border-neutral-interactive-focus focus-visible:ring-neutral-interactive-focus/30",
    secondary:
      "bg-neutral-interactive text-neutral-text hover:bg-neutral-interactive-hover active:bg-neutral-interactive-active [&[data-pressed]]:bg-neutral-interactive-active focus-visible:border-neutral-interactive-focus focus-visible:ring-neutral-interactive-focus/30",
    outline:
      "border-neutral-interactive bg-neutral-surface dark:bg-transparent text-neutral-text hover:bg-neutral-interactive dark:hover:bg-neutral-interactive hover:text-neutral-text active:bg-neutral-interactive-hover dark:active:bg-neutral-interactive-hover [&[data-pressed]]:bg-neutral-interactive-hover dark:[&[data-pressed]]:bg-neutral-interactive-hover focus-visible:border-neutral-interactive-focus focus-visible:ring-neutral-interactive-focus/30",
    ghost:
      "bg-transparent text-neutral-text hover:bg-neutral-interactive hover:text-neutral-text active:bg-neutral-interactive-hover [&[data-pressed]]:bg-neutral-interactive-hover focus-visible:border-neutral-interactive-focus focus-visible:ring-neutral-interactive-focus/30",
    link:
      "bg-transparent text-neutral-text-secondary underline-offset-4 hover:text-neutral-text hover:underline focus-visible:text-neutral-text focus-visible:underline active:text-neutral-text-secondary [&[data-pressed]]:text-neutral-text-secondary focus-visible:ring-neutral-interactive-focus/30",
  },
  success: {
    default:
      "bg-success-fill text-success-on-fill hover:bg-success-fill-hover active:bg-success-fill-active [&[data-pressed]]:bg-success-fill-active focus-visible:border-success-interactive-focus focus-visible:ring-success-interactive-focus/30",
    secondary:
      "bg-success-interactive text-success-text hover:bg-success-interactive-hover active:bg-success-interactive-active [&[data-pressed]]:bg-success-interactive-active focus-visible:border-success-interactive-focus focus-visible:ring-success-interactive-focus/30",
    outline:
      "border-success-interactive bg-neutral-surface dark:bg-transparent text-success-text hover:bg-success-interactive dark:hover:bg-success-interactive hover:text-success-text active:bg-success-interactive-hover dark:active:bg-success-interactive-hover [&[data-pressed]]:bg-success-interactive-hover dark:[&[data-pressed]]:bg-success-interactive-hover focus-visible:border-success-interactive-focus focus-visible:ring-success-interactive-focus/30",
    ghost:
      "bg-transparent text-success-text hover:bg-success-interactive hover:text-success-text active:bg-success-interactive-hover [&[data-pressed]]:bg-success-interactive-hover focus-visible:border-success-interactive-focus focus-visible:ring-success-interactive-focus/30",
    link:
      "bg-transparent text-success-text-secondary underline-offset-4 hover:text-success-text hover:underline focus-visible:text-success-text focus-visible:underline active:text-success-text-secondary [&[data-pressed]]:text-success-text-secondary focus-visible:ring-success-interactive-focus/30",
  },
  warning: {
    default:
      "bg-warning-fill text-warning-on-fill hover:bg-warning-fill-hover active:bg-warning-fill-active [&[data-pressed]]:bg-warning-fill-active focus-visible:border-warning-interactive-focus focus-visible:ring-warning-interactive-focus/30",
    secondary:
      "bg-warning-interactive text-warning-text hover:bg-warning-interactive-hover active:bg-warning-interactive-active [&[data-pressed]]:bg-warning-interactive-active focus-visible:border-warning-interactive-focus focus-visible:ring-warning-interactive-focus/30",
    outline:
      "border-warning-interactive bg-neutral-surface dark:bg-transparent text-warning-text hover:bg-warning-interactive dark:hover:bg-warning-interactive hover:text-warning-text active:bg-warning-interactive-hover dark:active:bg-warning-interactive-hover [&[data-pressed]]:bg-warning-interactive-hover dark:[&[data-pressed]]:bg-warning-interactive-hover focus-visible:border-warning-interactive-focus focus-visible:ring-warning-interactive-focus/30",
    ghost:
      "bg-transparent text-warning-text hover:bg-warning-interactive hover:text-warning-text active:bg-warning-interactive-hover [&[data-pressed]]:bg-warning-interactive-hover focus-visible:border-warning-interactive-focus focus-visible:ring-warning-interactive-focus/30",
    link:
      "bg-transparent text-warning-text-secondary underline-offset-4 hover:text-warning-text hover:underline focus-visible:text-warning-text focus-visible:underline active:text-warning-text-secondary [&[data-pressed]]:text-warning-text-secondary focus-visible:ring-warning-interactive-focus/30",
  },
  info: {
    default:
      "bg-info-fill text-info-on-fill hover:bg-info-fill-hover active:bg-info-fill-active [&[data-pressed]]:bg-info-fill-active focus-visible:border-info-interactive-focus focus-visible:ring-info-interactive-focus/30",
    secondary:
      "bg-info-interactive text-info-text hover:bg-info-interactive-hover active:bg-info-interactive-active [&[data-pressed]]:bg-info-interactive-active focus-visible:border-info-interactive-focus focus-visible:ring-info-interactive-focus/30",
    outline:
      "border-info-interactive bg-neutral-surface dark:bg-transparent text-info-text hover:bg-info-interactive dark:hover:bg-info-interactive hover:text-info-text active:bg-info-interactive-hover dark:active:bg-info-interactive-hover [&[data-pressed]]:bg-info-interactive-hover dark:[&[data-pressed]]:bg-info-interactive-hover focus-visible:border-info-interactive-focus focus-visible:ring-info-interactive-focus/30",
    ghost:
      "bg-transparent text-info-text hover:bg-info-interactive hover:text-info-text active:bg-info-interactive-hover [&[data-pressed]]:bg-info-interactive-hover focus-visible:border-info-interactive-focus focus-visible:ring-info-interactive-focus/30",
    link:
      "bg-transparent text-info-text-secondary underline-offset-4 hover:text-info-text hover:underline focus-visible:text-info-text focus-visible:underline active:text-info-text-secondary [&[data-pressed]]:text-info-text-secondary focus-visible:ring-info-interactive-focus/30",
  },
  danger: {
    default:
      "bg-danger-fill text-danger-on-fill hover:bg-danger-fill-hover active:bg-danger-fill-active [&[data-pressed]]:bg-danger-fill-active focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    secondary:
      "bg-danger-interactive text-danger-text hover:bg-danger-interactive-hover active:bg-danger-interactive-active [&[data-pressed]]:bg-danger-interactive-active focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    outline:
      "border-danger-interactive bg-neutral-surface dark:bg-transparent text-danger-text hover:bg-danger-interactive dark:hover:bg-danger-interactive hover:text-danger-text active:bg-danger-interactive-hover dark:active:bg-danger-interactive-hover [&[data-pressed]]:bg-danger-interactive-hover dark:[&[data-pressed]]:bg-danger-interactive-hover focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    ghost:
      "bg-transparent text-danger-text hover:bg-danger-interactive hover:text-danger-text active:bg-danger-interactive-hover [&[data-pressed]]:bg-danger-interactive-hover focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    link:
      "bg-transparent text-danger-text-secondary underline-offset-4 hover:text-danger-text hover:underline focus-visible:text-danger-text focus-visible:underline active:text-danger-text-secondary [&[data-pressed]]:text-danger-text-secondary focus-visible:ring-danger-interactive-focus/30",
  },
}

const buttonVariants = cva(
  "cn-button group/button shrink-0 items-center whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "cn-button-variant-default",
        outline: "cn-button-variant-outline",
        secondary: "cn-button-variant-secondary",
        ghost: "cn-button-variant-ghost",
        link: "cn-button-variant-link",
      },
      size: {
        xs: "cn-button-size-xs h-6 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "cn-button-size-sm h-7 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        default: "cn-button-size-default h-8 gap-1.5 rounded-lg px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "cn-button-size-lg h-9 gap-2 rounded-lg px-3.5 text-sm [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "cn-button-size-icon-xs size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "cn-button-size-icon-sm size-7 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        icon: "cn-button-size-icon size-8 rounded-lg [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "cn-button-size-icon-lg size-9 rounded-lg [&_svg:not([class*='size-'])]:size-4",
      },
      wide: {
        true: "flex w-full",
        false: "inline-flex",
      },
      align: {
        start: "justify-start text-start",
        center: "justify-center text-center",
        end: "justify-end text-end",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      wide: false,
      align: "center",
    },
  }
)

export interface ButtonProps
  extends Omit<ButtonPrimitive.Props, "className">,
    VariantProps<typeof buttonVariants> {
  className?: string
  /**
   * Semantic color intent for the button across variants.
   * Defaults to `"primary"` for `variant="default"` and `"neutral"` for all other variants.
   */
  intent?: ButtonIntent
  /**
   * Expand button to full width (`w-full`).
   */
  wide?: boolean
  /**
   * Horizontal content alignment inside the button (`start` | `center` | `end`).
   */
  align?: ButtonAlign
  /**
   * Element or icon rendered before `children`.
   */
  leading?: React.ReactNode
  /**
   * Alias for `leading` — element or icon rendered before `children`.
   */
  icon?: React.ReactNode
  /**
   * Element or icon rendered after `children`.
   */
  trailing?: React.ReactNode
  /**
   * Displays an inline spinner in the leading slot and disables interactions.
   */
  loading?: boolean
}

function Button({
  className,
  variant,
  size,
  intent,
  wide = false,
  align = "center",
  leading,
  icon,
  trailing,
  loading = false,
  disabled,
  onKeyDown,
  onKeyUp,
  onBlur,
  children,
  ...props
}: ButtonProps) {
  const groupContext = useButtonGroupContext()
  const [isPressed, setIsPressed] = React.useState(false)
  const pressStartRef = React.useRef<number>(0)
  const releaseTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (releaseTimerRef.current) {
        clearTimeout(releaseTimerRef.current)
      }
    }
  }, [])

  const isDisabled = Boolean(disabled || groupContext?.disabled || loading)

  const handleKeyDown: NonNullable<ButtonPrimitive.Props["onKeyDown"]> = (e) => {
    onKeyDown?.(e)
    if (e.defaultPrevented || isDisabled) return
    if (e.key === "Enter" || e.key === " ") {
      if (!e.repeat) {
        if (releaseTimerRef.current) {
          clearTimeout(releaseTimerRef.current)
          releaseTimerRef.current = null
        }
        pressStartRef.current = performance.now()
        setIsPressed(true)
      }
    }
  }

  const handleKeyUp: NonNullable<ButtonPrimitive.Props["onKeyUp"]> = (e) => {
    onKeyUp?.(e)
    if (e.key === "Enter" || e.key === " ") {
      const elapsed = performance.now() - pressStartRef.current
      const minDuration = 150
      if (elapsed < minDuration) {
        if (releaseTimerRef.current) {
          clearTimeout(releaseTimerRef.current)
        }
        releaseTimerRef.current = setTimeout(() => {
          setIsPressed(false)
          releaseTimerRef.current = null
        }, minDuration - elapsed)
      } else {
        setIsPressed(false)
      }
    }
  }

  const handleBlur: NonNullable<ButtonPrimitive.Props["onBlur"]> = (e) => {
    onBlur?.(e)
    if (releaseTimerRef.current) {
      clearTimeout(releaseTimerRef.current)
      releaseTimerRef.current = null
    }
    setIsPressed(false)
  }

  const resolvedVariant: ButtonVariant =
    variant ?? groupContext?.variant ?? "default"
  const resolvedSize = size ?? groupContext?.size ?? "default"
  const resolvedIntent: ButtonIntent =
    intent ??
    groupContext?.intent ??
    (resolvedVariant === "default" ? "primary" : "neutral")

  const leadingNode = loading ? (
    <Loader2 className="animate-spin" aria-hidden="true" />
  ) : (
    leading ?? icon
  )
  const hasAffixes =
    (leadingNode !== undefined && leadingNode !== null) ||
    (trailing !== undefined && trailing !== null)

  const intentClasses = INTENT_VARIANT_CLASSES[resolvedIntent]?.[resolvedVariant]

  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      data-intent={resolvedIntent}
      data-wide={wide ? "" : undefined}
      data-align={align}
      data-loading={loading ? "" : undefined}
      data-pressed={isPressed ? "" : undefined}
      aria-busy={loading || undefined}
      disabled={isDisabled}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      className={cn(
        buttonVariants({ variant: resolvedVariant, size: resolvedSize, wide, align }),
        intentClasses,
        className
      )}
      {...props}
    >
      {hasAffixes ? (
        <>
          {leadingNode !== undefined && leadingNode !== null && (
            <span
              data-slot="button-leading"
              data-icon="inline-start"
              className={cn(
                "inline-flex shrink-0 items-center justify-center",
                align === "end" && "me-auto"
              )}
            >
              {leadingNode}
            </span>
          )}
          {children}
          {trailing !== undefined && trailing !== null && (
            <span
              data-slot="button-trailing"
              data-icon="inline-end"
              className={cn(
                "inline-flex shrink-0 items-center justify-center",
                align === "start" && "ms-auto"
              )}
            >
              {trailing}
            </span>
          )}
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
