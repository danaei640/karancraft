import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

export type ButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | "link"

export type ButtonIntent =
  | "neutral"
  | "primary"
  | "success"
  | "danger"
  | "info"
  | "destructive"

export type ButtonAlign = "start" | "center" | "end"

const INTENT_VARIANT_CLASSES: Record<ButtonIntent, Record<ButtonVariant, string>> = {
  primary: {
    default:
      "bg-primary-fill text-primary-on-fill hover:bg-primary-fill-hover active:bg-primary-interactive-focus focus-visible:border-primary-interactive-focus focus-visible:ring-primary-interactive-focus/30",
    secondary:
      "bg-primary-interactive text-primary-text hover:bg-primary-interactive-hover active:bg-primary-interactive-active focus-visible:border-primary-interactive-focus focus-visible:ring-primary-interactive-focus/30",
    outline:
      "border-primary-interactive bg-neutral-surface dark:bg-transparent text-primary-text hover:bg-primary-interactive hover:text-primary-text active:bg-primary-interactive-hover dark:hover:bg-primary-interactive/30 dark:active:bg-primary-interactive-active/50 focus-visible:border-primary-interactive-focus focus-visible:ring-primary-interactive-focus/30",
    ghost:
      "bg-transparent text-primary-text hover:bg-primary-interactive hover:text-primary-text active:bg-primary-interactive-hover dark:hover:bg-primary-interactive/50 dark:active:bg-primary-interactive-active/70 focus-visible:border-primary-interactive-focus focus-visible:ring-primary-interactive-focus/30",
    destructive:
      "bg-primary-surface hover:bg-primary-interactive active:bg-primary-interactive-hover dark:bg-primary-interactive text-primary-text dark:hover:bg-primary-interactive-hover dark:active:bg-primary-interactive-active focus-visible:border-primary-fill/40 focus-visible:ring-primary-interactive-focus/30",
    link:
      "bg-transparent text-primary-text underline-offset-4 hover:underline active:text-primary-interactive-focus focus-visible:ring-primary-interactive-focus/30",
  },
  neutral: {
    default:
      "bg-neutral-fill text-neutral-on-fill hover:bg-neutral-fill-hover active:bg-neutral-interactive-focus focus-visible:border-neutral-interactive-focus focus-visible:ring-neutral-interactive-focus/30",
    secondary:
      "bg-neutral-interactive text-neutral-text hover:bg-neutral-interactive-hover active:bg-neutral-interactive-active focus-visible:border-neutral-interactive-focus focus-visible:ring-neutral-interactive-focus/30",
    outline:
      "border-neutral-interactive bg-neutral-surface dark:bg-transparent text-neutral-text hover:bg-neutral-interactive hover:text-neutral-text active:bg-neutral-interactive-hover dark:hover:bg-neutral-interactive/30 dark:active:bg-neutral-interactive-active/50 focus-visible:border-neutral-interactive-focus focus-visible:ring-neutral-interactive-focus/30",
    ghost:
      "bg-transparent text-neutral-text hover:bg-neutral-interactive hover:text-neutral-text active:bg-neutral-interactive-hover dark:hover:bg-neutral-interactive/50 dark:active:bg-neutral-interactive-active/70 focus-visible:border-neutral-interactive-focus focus-visible:ring-neutral-interactive-focus/30",
    destructive:
      "bg-neutral-surface-alt hover:bg-neutral-interactive active:bg-neutral-interactive-hover text-neutral-text focus-visible:border-neutral-fill/40 focus-visible:ring-neutral-interactive-focus/30",
    link:
      "bg-transparent text-neutral-text underline-offset-4 hover:underline active:text-neutral-interactive-focus focus-visible:ring-neutral-interactive-focus/30",
  },
  success: {
    default:
      "bg-success-fill text-success-on-fill hover:bg-success-fill-hover active:bg-success-interactive-focus focus-visible:border-success-interactive-focus focus-visible:ring-success-interactive-focus/30",
    secondary:
      "bg-success-interactive text-success-text hover:bg-success-interactive-hover active:bg-success-interactive-active focus-visible:border-success-interactive-focus focus-visible:ring-success-interactive-focus/30",
    outline:
      "border-success-interactive bg-neutral-surface dark:bg-transparent text-success-text hover:bg-success-interactive hover:text-success-text active:bg-success-interactive-hover dark:hover:bg-success-interactive/30 dark:active:bg-success-interactive-active/50 focus-visible:border-success-interactive-focus focus-visible:ring-success-interactive-focus/30",
    ghost:
      "bg-transparent text-success-text hover:bg-success-interactive hover:text-success-text active:bg-success-interactive-hover dark:hover:bg-success-interactive/50 dark:active:bg-success-interactive-active/70 focus-visible:border-success-interactive-focus focus-visible:ring-success-interactive-focus/30",
    destructive:
      "bg-success-surface hover:bg-success-interactive active:bg-success-interactive-hover dark:bg-success-interactive text-success-text dark:hover:bg-success-interactive-hover dark:active:bg-success-interactive-active focus-visible:border-success-fill/40 focus-visible:ring-success-interactive-focus/30",
    link:
      "bg-transparent text-success-text underline-offset-4 hover:underline active:text-success-interactive-focus focus-visible:ring-success-interactive-focus/30",
  },
  info: {
    default:
      "bg-info-fill text-info-on-fill hover:bg-info-fill-hover active:bg-info-interactive-focus focus-visible:border-info-interactive-focus focus-visible:ring-info-interactive-focus/30",
    secondary:
      "bg-info-interactive text-info-text hover:bg-info-interactive-hover active:bg-info-interactive-active focus-visible:border-info-interactive-focus focus-visible:ring-info-interactive-focus/30",
    outline:
      "border-info-interactive bg-neutral-surface dark:bg-transparent text-info-text hover:bg-info-interactive hover:text-info-text active:bg-info-interactive-hover dark:hover:bg-info-interactive/30 dark:active:bg-info-interactive-active/50 focus-visible:border-info-interactive-focus focus-visible:ring-info-interactive-focus/30",
    ghost:
      "bg-transparent text-info-text hover:bg-info-interactive hover:text-info-text active:bg-info-interactive-hover dark:hover:bg-info-interactive/50 dark:active:bg-info-interactive-active/70 focus-visible:border-info-interactive-focus focus-visible:ring-info-interactive-focus/30",
    destructive:
      "bg-info-surface hover:bg-info-interactive active:bg-info-interactive-hover dark:bg-info-interactive text-info-text dark:hover:bg-info-interactive-hover dark:active:bg-info-interactive-active focus-visible:border-info-fill/40 focus-visible:ring-info-interactive-focus/30",
    link:
      "bg-transparent text-info-text underline-offset-4 hover:underline active:text-info-interactive-focus focus-visible:ring-info-interactive-focus/30",
  },
  danger: {
    default:
      "bg-danger-fill text-danger-on-fill hover:bg-danger-fill-hover active:bg-danger-interactive-focus focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    secondary:
      "bg-danger-interactive text-danger-text hover:bg-danger-interactive-hover active:bg-danger-interactive-active focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    outline:
      "border-danger-interactive bg-neutral-surface dark:bg-transparent text-danger-text hover:bg-danger-interactive hover:text-danger-text active:bg-danger-interactive-hover dark:hover:bg-danger-interactive/30 dark:active:bg-danger-interactive-active/50 focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    ghost:
      "bg-transparent text-danger-text hover:bg-danger-interactive hover:text-danger-text active:bg-danger-interactive-hover dark:hover:bg-danger-interactive/50 dark:active:bg-danger-interactive-active/70 focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    destructive:
      "bg-danger-surface hover:bg-danger-interactive active:bg-danger-interactive-hover dark:bg-danger-interactive text-danger-text dark:hover:bg-danger-interactive-hover dark:active:bg-danger-interactive-active focus-visible:border-danger-fill/40 focus-visible:ring-danger-interactive-focus/30",
    link:
      "bg-transparent text-danger-text underline-offset-4 hover:underline active:text-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
  },
  destructive: {
    default:
      "bg-danger-surface hover:bg-danger-interactive active:bg-danger-interactive-hover dark:bg-danger-interactive text-danger-text dark:hover:bg-danger-interactive-hover dark:active:bg-danger-interactive-active focus-visible:border-danger-fill/40 focus-visible:ring-danger-interactive-focus/30",
    secondary:
      "bg-danger-interactive text-danger-text hover:bg-danger-interactive-hover active:bg-danger-interactive-active focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    outline:
      "border-danger-interactive bg-neutral-surface dark:bg-transparent text-danger-text hover:bg-danger-interactive hover:text-danger-text active:bg-danger-interactive-hover dark:hover:bg-danger-interactive/30 dark:active:bg-danger-interactive-active/50 focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    ghost:
      "bg-transparent text-danger-text hover:bg-danger-interactive hover:text-danger-text active:bg-danger-interactive-hover dark:hover:bg-danger-interactive/50 dark:active:bg-danger-interactive-active/70 focus-visible:border-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
    destructive:
      "bg-danger-surface hover:bg-danger-interactive active:bg-danger-interactive-hover dark:bg-danger-interactive text-danger-text dark:hover:bg-danger-interactive-hover dark:active:bg-danger-interactive-active focus-visible:border-danger-fill/40 focus-visible:ring-danger-interactive-focus/30",
    link:
      "bg-transparent text-danger-text underline-offset-4 hover:underline active:text-danger-interactive-focus focus-visible:ring-danger-interactive-focus/30",
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
        destructive: "cn-button-variant-destructive",
        link: "cn-button-variant-link",
      },
      size: {
        default: "cn-button-size-default",
        xs: "cn-button-size-xs rounded-lg",
        sm: "cn-button-size-sm",
        lg: "cn-button-size-lg",
        icon: "cn-button-size-icon",
        "icon-xs": "cn-button-size-icon-xs rounded-lg",
        "icon-sm": "cn-button-size-icon-sm",
        "icon-lg": "cn-button-size-icon-lg",
      },
      wide: {
        true: "flex w-full",
        false: "inline-flex",
      },
      align: {
        start: "justify-start text-left",
        center: "justify-center text-center",
        end: "justify-end text-right",
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
}

function Button({
  className,
  variant = "default",
  size = "default",
  intent,
  wide = false,
  align = "center",
  leading,
  icon,
  trailing,
  children,
  ...props
}: ButtonProps) {
  const resolvedVariant: ButtonVariant = variant || "default"
  const leadingNode = leading ?? icon
  const hasAffixes = leadingNode !== undefined && leadingNode !== null || (trailing !== undefined && trailing !== null)

  const intentClasses = intent
    ? INTENT_VARIANT_CLASSES[intent]?.[resolvedVariant]
    : undefined

  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={resolvedVariant}
      data-size={size || "default"}
      data-intent={intent}
      data-wide={wide ? "" : undefined}
      data-align={align}
      className={cn(
        buttonVariants({ variant: resolvedVariant, size, wide, align }),
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
              className="inline-flex shrink-0 items-center justify-center"
            >
              {leadingNode}
            </span>
          )}
          {children}
          {trailing !== undefined && trailing !== null && (
            <span
              data-slot="button-trailing"
              data-icon="inline-end"
              className="inline-flex shrink-0 items-center justify-center"
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
