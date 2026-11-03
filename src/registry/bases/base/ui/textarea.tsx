"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { useButtonGroupContext } from "@/registry/bases/base/ui/button-group"

export type TextareaVariant = "default" | "outline" | "ghost"
export type TextareaSize = "xs" | "sm" | "default" | "lg"

const textareaWrapperVariants = cva(
  "cn-textarea group/textarea-wrapper relative flex w-full min-w-0 flex-col overflow-hidden border bg-clip-padding py-0 outline-none transition-[background-color,color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] has-[:disabled]:pointer-events-none has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 has-[textarea[aria-invalid=true]]:border-danger-fill dark:has-[textarea[aria-invalid=true]]:border-danger-fill/60 has-[textarea[aria-invalid=true]]:ring-3 has-[textarea[aria-invalid=true]]:ring-danger-interactive-focus/20 dark:has-[textarea[aria-invalid=true]]:ring-danger-interactive-focus/40",
  {
    variants: {
      variant: {
        default:
          "cn-textarea-variant-default border-transparent bg-neutral-interactive/60 text-neutral-text dark:bg-neutral-interactive/50 hover:bg-neutral-interactive dark:hover:bg-neutral-interactive/80 has-[:focus-visible]:border-primary-interactive-focus has-[:focus-visible]:bg-neutral-surface dark:has-[:focus-visible]:bg-neutral-surface-alt has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-primary-interactive-focus/30",
        outline:
          "cn-textarea-variant-outline border-neutral-interactive bg-neutral-surface text-neutral-text dark:bg-transparent hover:border-neutral-interactive-hover hover:bg-neutral-surface-alt/60 dark:hover:border-neutral-interactive-hover dark:hover:bg-neutral-interactive/30 has-[:focus-visible]:border-primary-interactive-focus has-[:focus-visible]:bg-neutral-surface dark:has-[:focus-visible]:bg-transparent has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-primary-interactive-focus/30",
        ghost:
          "cn-textarea-variant-ghost border-transparent bg-transparent text-neutral-text hover:bg-neutral-interactive/60 dark:hover:bg-neutral-interactive/50 has-[:focus-visible]:border-primary-interactive-focus has-[:focus-visible]:bg-neutral-surface dark:has-[:focus-visible]:bg-neutral-surface-alt has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-primary-interactive-focus/30",
      },
      size: {
        xs: "cn-textarea-size-xs rounded-md text-xs",
        sm: "cn-textarea-size-sm rounded-md text-xs",
        default: "cn-textarea-size-default rounded-lg text-sm",
        lg: "cn-textarea-size-lg rounded-lg text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const TEXTAREA_INNER_SIZE: Record<TextareaSize, string> = {
  xs: "min-h-14 px-2 py-1.5 text-xs leading-relaxed",
  sm: "min-h-16 px-2.5 py-1.5 text-xs leading-relaxed",
  default: "min-h-20 px-3 py-2 text-sm leading-relaxed",
  lg: "min-h-24 px-3.5 py-2.5 text-sm leading-relaxed",
}

const FADER_HEIGHT_BY_SIZE: Record<TextareaSize, number> = {
  xs: 16,
  sm: 18,
  default: 22,
  lg: 24,
}

export interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "size">,
    VariantProps<typeof textareaWrapperVariants> {
  /**
   * Visual surface variant (`default` | `outline` | `ghost`).
   * @default "default"
   */
  variant?: TextareaVariant
  /**
   * Proportional corner radius, padding, and font size tier (`xs` | `sm` | `default` | `lg`).
   * @default "default"
   */
  size?: TextareaSize
  /**
   * Maximum height before the textarea stops auto-expanding and switches to vertical auto-scroll
   * with zero padding on the scroll dimension and dynamic fader effects on scrollable sides.
   * Accepts a pixel number (e.g. `140`) or CSS length string (e.g. `"9rem"`, `"160px"`).
   */
  maxHeight?: number | string
  /**
   * Optional className applied to the outer wrapper element.
   */
  wrapperClassName?: string
}

function Textarea({
  className,
  wrapperClassName,
  variant,
  size,
  maxHeight,
  disabled,
  style,
  onScroll,
  onChange,
  onInput,
  value,
  defaultValue,
  ref,
  ...props
}: TextareaProps) {
  const groupContext = useButtonGroupContext()
  const internalRef = React.useRef<HTMLTextAreaElement | null>(null)
  const [canScrollUp, setCanScrollUp] = React.useState(false)
  const [canScrollDown, setCanScrollDown] = React.useState(false)

  const setMergedRef = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      internalRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ;(ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
          node
      }
    },
    [ref]
  )

  const groupVariant: TextareaVariant | undefined =
    groupContext?.variant === "outline"
      ? "outline"
      : groupContext?.variant === "ghost"
        ? "ghost"
        : groupContext?.variant === "default" ||
            groupContext?.variant === "secondary"
          ? "default"
          : undefined

  const resolvedVariant: TextareaVariant = variant ?? groupVariant ?? "default"
  const resolvedSize: TextareaSize = size ?? groupContext?.size ?? "default"
  const isDisabled = Boolean(disabled || groupContext?.disabled)

  const resolvedMaxHeight =
    typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight

  const updateScrollMetrics = React.useCallback(() => {
    const el = internalRef.current
    if (!el) return

    const threshold = 2
    const nextScrollUp = el.scrollTop > threshold
    const nextScrollDown =
      el.scrollHeight - el.scrollTop - el.clientHeight > threshold

    setCanScrollUp((prev) => (prev !== nextScrollUp ? nextScrollUp : prev))
    setCanScrollDown((prev) =>
      prev !== nextScrollDown ? nextScrollDown : prev
    )
  }, [])

  React.useEffect(() => {
    const el = internalRef.current
    if (!el) return

    updateScrollMetrics()

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => {
        updateScrollMetrics()
      })
      observer.observe(el)
      return () => observer.disconnect()
    }
  }, [updateScrollMetrics, value, defaultValue, resolvedMaxHeight, resolvedSize])

  const handleScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    updateScrollMetrics()
    onScroll?.(event)
  }

  const handleInput = (event: React.InputEvent<HTMLTextAreaElement>) => {
    updateScrollMetrics()
    onInput?.(event)
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateScrollMetrics()
    onChange?.(event)
  }

  const fadeSize = FADER_HEIGHT_BY_SIZE[resolvedSize]
  const scrollMaskImage = React.useMemo(() => {
    if (canScrollUp && canScrollDown) {
      return `linear-gradient(to bottom, transparent 0px, black ${fadeSize}px, black calc(100% - ${fadeSize}px), transparent 100%)`
    }
    if (canScrollUp) {
      return `linear-gradient(to bottom, transparent 0px, black ${fadeSize}px, black 100%)`
    }
    if (canScrollDown) {
      return `linear-gradient(to bottom, black 0px, black calc(100% - ${fadeSize}px), transparent 100%)`
    }
    return undefined
  }, [canScrollUp, canScrollDown, fadeSize])

  const hasScroll = canScrollUp || canScrollDown

  return (
    <div
      data-slot="textarea-wrapper"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      data-scroll={hasScroll ? "true" : undefined}
      data-scroll-top={canScrollUp ? "true" : undefined}
      data-scroll-bottom={canScrollDown ? "true" : undefined}
      data-disabled={isDisabled ? "true" : undefined}
      className={cn(
        textareaWrapperVariants({
          variant: resolvedVariant,
          size: resolvedSize,
        }),
        wrapperClassName
      )}
    >
      <textarea
        ref={setMergedRef}
        data-slot="textarea"
        data-variant={resolvedVariant}
        data-size={resolvedSize}
        data-scroll-top={canScrollUp ? "true" : undefined}
        data-scroll-bottom={canScrollDown ? "true" : undefined}
        disabled={isDisabled}
        value={value}
        defaultValue={defaultValue}
        onScroll={handleScroll}
        onInput={handleInput}
        onChange={handleChange}
        style={{
          ...style,
          ...(resolvedMaxHeight ? { maxHeight: resolvedMaxHeight } : undefined),
          ...(scrollMaskImage
            ? {
                WebkitMaskImage: scrollMaskImage,
                maskImage: scrollMaskImage,
              }
            : undefined),
        }}
        className={cn(
          "cn-textarea-input flex field-sizing-content w-full resize-none overflow-y-auto border-0 bg-transparent outline-none selection:bg-primary-fill selection:text-primary-on-fill placeholder:text-neutral-text-muted disabled:cursor-not-allowed",
          TEXTAREA_INNER_SIZE[resolvedSize],
          className
        )}
        {...props}
      />
      <span
        aria-hidden="true"
        data-slot="textarea-fader-top"
        data-active={canScrollUp ? "true" : undefined}
        className={cn(
          "cn-textarea-fader-top pointer-events-none absolute inset-x-0 top-0 z-10 h-5 opacity-0 transition-opacity duration-150",
          canScrollUp && "opacity-100"
        )}
      />
      <span
        aria-hidden="true"
        data-slot="textarea-fader-bottom"
        data-active={canScrollDown ? "true" : undefined}
        className={cn(
          "cn-textarea-fader-bottom pointer-events-none absolute inset-x-0 bottom-0 z-10 h-5 opacity-0 transition-opacity duration-150",
          canScrollDown && "opacity-100"
        )}
      />
    </div>
  )
}

export { Textarea, textareaWrapperVariants }
