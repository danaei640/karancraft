"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"

export interface RadioGroupProps extends RadioGroupPrimitive.Props {
  orientation?: "vertical" | "horizontal"
}

function RadioGroup({
  className,
  orientation = "vertical",
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      data-orientation={orientation}
      className={cn(
        "cn-radio-group w-full",
        orientation === "horizontal"
          ? "flex flex-row flex-wrap items-center gap-4"
          : "grid gap-3",
        className
      )}
      {...props}
    />
  )
}

export type RadioGroupIndicatorProps = RadioPrimitive.Indicator.Props

function RadioGroupIndicator({
  className,
  children,
  keepMounted = true,
  ...props
}: RadioGroupIndicatorProps) {
  return (
    <span
      data-slot="radio-group-indicator-control"
      className={cn(
        "bg-neutral-interactive group-hover/radio-group-item:bg-neutral-interactive-hover group-data-checked/radio-group-item:bg-primary-fill group-data-checked/radio-group-item:hover:bg-primary-fill-hover group-data-checked/radio-group-item:text-primary-on-fill dark:group-data-checked/radio-group-item:bg-primary-fill group-data-checked/radio-group-item:border-primary-fill relative flex size-4 shrink-0 aspect-square items-center justify-center rounded-full border border-transparent transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] group-active/radio-group-item:scale-95",
        className
      )}
    >
      <RadioPrimitive.Indicator
        keepMounted={keepMounted}
        data-slot="radio-group-indicator"
        className="cn-radio-group-indicator relative flex size-full items-center justify-center"
        {...props}
      >
        {children ?? (
          <span
            data-slot="radio-group-indicator-icon"
            className="cn-radio-group-indicator-icon"
          />
        )}
      </RadioPrimitive.Indicator>
    </span>
  )
}

export type RadioGroupItemProps = RadioPrimitive.Root.Props

function RadioGroupItem({
  className,
  children,
  ...props
}: RadioGroupItemProps) {
  const hasCustomChildren =
    children !== undefined &&
    children !== null &&
    children !== false &&
    React.Children.count(children) > 0

  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      data-custom={hasCustomChildren ? "" : undefined}
      className={cn(
        "cn-radio-group-item group/radio-group-item peer relative outline-none select-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        hasCustomChildren
          ? "flex cursor-pointer rounded-lg border p-3 text-start"
          : "aspect-square size-4 shrink-0 cursor-pointer rounded-full border after:absolute after:-inset-x-3 after:-inset-y-2 active:scale-95",
        className
      )}
      {...props}
    >
      {hasCustomChildren ? (
        children
      ) : (
        <RadioPrimitive.Indicator
          keepMounted
          data-slot="radio-group-indicator"
          className="cn-radio-group-indicator relative flex size-full items-center justify-center"
        >
          <span
            data-slot="radio-group-indicator-icon"
            className="cn-radio-group-indicator-icon"
          />
        </RadioPrimitive.Indicator>
      )}
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem, RadioGroupIndicator }

