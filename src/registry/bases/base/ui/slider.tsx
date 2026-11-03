"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "cn"

type SliderTooltipProp =
  | boolean
  | string
  | ((value: number, index: number) => React.ReactNode)
  | null

interface SliderProps extends SliderPrimitive.Root.Props {
  /**
   * Optional tooltip displayed on each thumb showing its real-time value.
   * - `null` | `false` | `undefined` (default): hidden.
   * - `true` (e.g. `<Slider tooltip />`): shows the real-time numeric value.
   * - `string` (e.g. `<Slider tooltip="Volume" />` or `<Slider tooltip="%" />`): customizes the tooltip label with the real-time value.
   */
  tooltip?: SliderTooltipProp
}

const UNIT_SUFFIXES = new Set([
  "%",
  "°",
  "px",
  "rem",
  "em",
  "vh",
  "vw",
  "ms",
  "s",
  "dB",
  "Hz",
  "kHz",
  "MB",
  "GB",
  "kg",
  "lb",
  "cm",
  "mm",
  "m",
  "km",
  "fps",
  "x",
])

const CURRENCY_PREFIXES = new Set(["$", "€", "£", "¥", "₹"])

function normalizeSliderValues(
  val: number | readonly number[] | undefined,
  fallback: number[]
): number[] {
  if (Array.isArray(val)) {
    return val.length > 0 ? [...val] : fallback
  }
  if (typeof val === "number" && !Number.isNaN(val)) {
    return [val]
  }
  return fallback
}

function formatSliderTooltip(
  tooltip: SliderTooltipProp | undefined,
  thumbValue: number,
  index: number
): React.ReactNode {
  if (typeof tooltip === "function") {
    return tooltip(thumbValue, index)
  }

  if (tooltip === true || tooltip === "true") {
    return thumbValue
  }

  if (typeof tooltip === "string") {
    const trimmed = tooltip.trim()
    if (!trimmed) return null

    if (trimmed.includes("{value}")) {
      return trimmed.replace(/\{value\}/g, String(thumbValue))
    }

    if (UNIT_SUFFIXES.has(trimmed)) {
      const noSpace = trimmed === "%" || trimmed === "°"
      return noSpace ? `${thumbValue}${trimmed}` : `${thumbValue} ${trimmed}`
    }

    if (CURRENCY_PREFIXES.has(trimmed)) {
      return `${trimmed}${thumbValue}`
    }

    // If the caller already interpolated a live number into the string, render as-is
    if (/\d/.test(trimmed)) {
      return trimmed
    }

    return (
      <span className="inline-flex items-center gap-1">
        <span className="opacity-80">{trimmed}:</span>
        <span>{thumbValue}</span>
      </span>
    )
  }

  return null
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  tooltip = null,
  onValueChange,
  onValueCommitted,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  ...props
}: SliderProps) {
  const isControlled = value !== undefined

  const [internalValues, setInternalValues] = React.useState<number[]>(() =>
    normalizeSliderValues(value ?? defaultValue, [min])
  )
  const [isDragging, setIsDragging] = React.useState(false)
  const [changingThumbIndex, setChangingThumbIndex] = React.useState<
    number | null
  >(null)

  const isPointerDownRef = React.useRef(false)
  const hideTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  const clearHideTimeout = React.useCallback(() => {
    if (hideTimeoutRef.current !== null) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }, [])

  React.useEffect(() => {
    return () => {
      if (hideTimeoutRef.current !== null) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])

  const currentValues = isControlled
    ? normalizeSliderValues(value, internalValues)
    : internalValues

  const handleValueChange: NonNullable<
    SliderPrimitive.Root.Props["onValueChange"]
  > = (newValue, eventDetails) => {
    clearHideTimeout()

    const activeIdx =
      typeof eventDetails.activeThumbIndex === "number" &&
      eventDetails.activeThumbIndex >= 0
        ? eventDetails.activeThumbIndex
        : 0

    setChangingThumbIndex(activeIdx)

    if (eventDetails.reason === "drag") {
      setIsDragging(true)
    } else {
      setIsDragging(false)
      if (!isPointerDownRef.current) {
        hideTimeoutRef.current = setTimeout(() => {
          setChangingThumbIndex(null)
          hideTimeoutRef.current = null
        }, 650)
      }
    }

    if (!isControlled) {
      setInternalValues(normalizeSliderValues(newValue, [min]))
    }

    onValueChange?.(newValue, eventDetails)
  }

  const handleValueCommitted: NonNullable<
    SliderPrimitive.Root.Props["onValueCommitted"]
  > = (committedValue, eventDetails) => {
    setIsDragging(false)
    if (!isPointerDownRef.current && eventDetails.reason !== "keyboard") {
      clearHideTimeout()
      setChangingThumbIndex(null)
    }
    onValueCommitted?.(committedValue, eventDetails)
  }

  const handleRootPointerDown: NonNullable<
    SliderPrimitive.Root.Props["onPointerDown"]
  > = (e) => {
    isPointerDownRef.current = true
    clearHideTimeout()
    onPointerDown?.(e)
  }

  const handleRootPointerUp: NonNullable<
    SliderPrimitive.Root.Props["onPointerUp"]
  > = (e) => {
    isPointerDownRef.current = false
    setIsDragging(false)
    clearHideTimeout()
    setChangingThumbIndex(null)
    onPointerUp?.(e)
  }

  const handleRootPointerCancel: NonNullable<
    SliderPrimitive.Root.Props["onPointerCancel"]
  > = (e) => {
    isPointerDownRef.current = false
    setIsDragging(false)
    clearHideTimeout()
    setChangingThumbIndex(null)
    onPointerCancel?.(e)
  }

  const showTooltip =
    tooltip !== null &&
    tooltip !== undefined &&
    tooltip !== false &&
    (typeof tooltip !== "string" || tooltip.trim().length > 0)

  return (
    <SliderPrimitive.Root
      className={cn(
        "cn-slider group/slider relative flex w-full touch-none items-center select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      data-slot="slider"
      data-dragging={isDragging ? "" : undefined}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      onValueChange={handleValueChange}
      onValueCommitted={handleValueCommitted}
      onPointerDown={handleRootPointerDown}
      onPointerUp={handleRootPointerUp}
      onPointerCancel={handleRootPointerCancel}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full grow touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="cn-slider-track relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-interactive select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="cn-slider-range h-full bg-primary-fill select-none transition-[width,height,inset-inline-start,bottom] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-dragging:transition-none group-data-dragging/slider:transition-none data-[orientation=vertical]:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: currentValues.length }, (_, index) => {
          const thumbValue = currentValues[index] ?? min
          const tooltipContent = showTooltip
            ? formatSliderTooltip(tooltip, thumbValue, index)
            : null
          const isThumbChanging = changingThumbIndex === index

          return (
            <SliderPrimitive.Thumb
              data-slot="slider-thumb"
              data-changing={isThumbChanging ? "" : undefined}
              key={index}
              index={index}
              onPointerDown={() => {
                isPointerDownRef.current = true
                clearHideTimeout()
                setChangingThumbIndex(index)
              }}
              onBlur={() => {
                if (!isPointerDownRef.current) {
                  clearHideTimeout()
                  setChangingThumbIndex((prev) =>
                    prev === index ? null : prev
                  )
                }
              }}
              className="cn-slider-thumb group/slider-thumb block size-5 shrink-0 cursor-grab rounded-full border-2 border-primary-fill bg-neutral-surface shadow-md select-none transition-[inset-inline-start,bottom,box-shadow,background-color,border-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] data-dragging:transition-[box-shadow,background-color,border-color] group-data-dragging/slider:transition-[box-shadow,background-color,border-color] hover:ring-4 hover:ring-primary-interactive-focus/30 focus-visible:ring-4 focus-visible:ring-primary-interactive-focus/30 focus-visible:outline-hidden active:cursor-grabbing active:ring-4 active:ring-primary-interactive-focus/40 disabled:pointer-events-none disabled:opacity-50"
            >
              {tooltipContent !== null && (
                <span
                  data-slot="slider-tooltip"
                  className="cn-slider-tooltip pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 -translate-x-1/2 translate-y-0.5 scale-95 rounded-sm bg-neutral-text px-2 py-0.5 font-mono text-[11px] leading-tight font-medium whitespace-nowrap text-neutral-surface tabular-nums opacity-0 shadow-sm select-none transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/slider-thumb:translate-y-0 group-hover/slider-thumb:scale-100 group-hover/slider-thumb:opacity-100 group-data-changing/slider-thumb:translate-y-0 group-data-changing/slider-thumb:scale-100 group-data-changing/slider-thumb:opacity-100 group-data-[orientation=vertical]/slider:top-1/2 group-data-[orientation=vertical]/slider:bottom-auto group-data-[orientation=vertical]/slider:left-[calc(100%+8px)] group-data-[orientation=vertical]/slider:-translate-x-0.5 group-data-[orientation=vertical]/slider:-translate-y-1/2 group-data-[orientation=vertical]/slider:group-hover/slider-thumb:translate-x-0 group-data-[orientation=vertical]/slider:group-hover/slider-thumb:-translate-y-1/2 group-data-[orientation=vertical]/slider:group-data-changing/slider-thumb:translate-x-0 group-data-[orientation=vertical]/slider:group-data-changing/slider-thumb:-translate-y-1/2"
                >
                  {tooltipContent}
                  <span
                    aria-hidden="true"
                    className="cn-slider-tooltip-arrow absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 rounded-[1px] bg-neutral-text group-data-[orientation=vertical]/slider:top-1/2 group-data-[orientation=vertical]/slider:bottom-auto group-data-[orientation=vertical]/slider:-left-1 group-data-[orientation=vertical]/slider:translate-x-0 group-data-[orientation=vertical]/slider:-translate-y-1/2"
                  />
                </span>
              )}
            </SliderPrimitive.Thumb>
          )
        })}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
export type { SliderProps, SliderTooltipProp }
