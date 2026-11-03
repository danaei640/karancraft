"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { ChevronDown } from "icons"
import { cn } from "cn"

export interface CollapsibleSectionProps
  extends Omit<CollapsiblePrimitive.Root.Props, "title"> {
  /**
   * Optional shorthand label rendered inside the trigger row when not composing `<CollapsibleSectionTrigger>` directly.
   */
  label?: React.ReactNode
  /**
   * Alias for `label` — content rendered inside the trigger row when using shorthand mode.
   */
  title?: React.ReactNode
  /**
   * Additional class names for the trigger row in shorthand mode.
   */
  triggerClassName?: string
  /**
   * Additional class names for the content div below the trigger row in shorthand mode.
   */
  contentClassName?: string
}

function CollapsibleSection({
  label,
  title,
  triggerClassName,
  contentClassName,
  className,
  children,
  ...props
}: CollapsibleSectionProps) {
  const shorthandTrigger = label ?? title

  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible-section"
      className={cn(
        "cn-collapsible-section group/collapsible-section flex w-full flex-col",
        className
      )}
      {...props}
    >
      {shorthandTrigger !== undefined ? (
        <>
          <CollapsibleSectionTrigger className={triggerClassName}>
            {shorthandTrigger}
          </CollapsibleSectionTrigger>
          <CollapsibleSectionContent className={contentClassName}>
            {children}
          </CollapsibleSectionContent>
        </>
      ) : (
        children
      )}
    </CollapsiblePrimitive.Root>
  )
}
CollapsibleSection.displayName = "CollapsibleSection"

export type CollapsibleSectionTriggerProps = CollapsiblePrimitive.Trigger.Props

function CollapsibleSectionTrigger({
  className,
  children,
  ...props
}: CollapsibleSectionTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-section-trigger"
      className={cn(
        "cn-collapsible-section-trigger group/collapsible-section-trigger relative flex w-full cursor-pointer items-center justify-between gap-3 text-start outline-none select-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span
        data-slot="collapsible-section-trigger-label"
        className="cn-collapsible-section-trigger-label flex min-w-0 flex-1 items-center gap-2 text-start"
      >
        {children}
      </span>
      <ChevronDown
        aria-hidden="true"
        data-slot="collapsible-section-trigger-icon"
        className="cn-collapsible-section-trigger-icon pointer-events-none ms-auto size-4 shrink-0"
      />
    </CollapsiblePrimitive.Trigger>
  )
}
CollapsibleSectionTrigger.displayName = "CollapsibleSectionTrigger"

export type CollapsibleSectionContentProps = CollapsiblePrimitive.Panel.Props

function CollapsibleSectionContent({
  className,
  children,
  ...props
}: CollapsibleSectionContentProps) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-section-panel"
      className="cn-collapsible-section-panel h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0"
      {...props}
    >
      <div
        data-slot="collapsible-section-content"
        className={cn("cn-collapsible-section-content", className)}
      >
        {children}
      </div>
    </CollapsiblePrimitive.Panel>
  )
}
CollapsibleSectionContent.displayName = "CollapsibleSectionContent"

export {
  CollapsibleSection,
  CollapsibleSectionTrigger,
  CollapsibleSectionContent,
}
