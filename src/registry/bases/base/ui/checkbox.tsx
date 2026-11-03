"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group"
import { Check, Minus } from "icons"
import { cn } from "cn"

interface CheckboxGroupRegistryContextValue {
  registerChildValue: (value: string) => () => void
}

const CheckboxGroupRegistryContext =
  React.createContext<CheckboxGroupRegistryContextValue | null>(null)

function collectChildCheckboxValues(children: React.ReactNode): string[] {
  const values: string[] = []

  const visit = (node: React.ReactNode) => {
    React.Children.forEach(node, (child) => {
      if (!React.isValidElement(child)) return
      const childProps = child.props as Record<string, unknown>
      const isParent = Boolean(childProps?.parent)
      const rawValue =
        typeof childProps?.value === "string"
          ? childProps.value
          : typeof childProps?.name === "string"
            ? childProps.name
            : undefined

      if (
        !isParent &&
        rawValue &&
        (child.type === Checkbox ||
          (typeof child.type === "function" &&
            (child.type as { displayName?: string }).displayName ===
              "Checkbox"))
      ) {
        if (!values.includes(rawValue)) {
          values.push(rawValue)
        }
      }

      if (childProps?.children) {
        visit(childProps.children as React.ReactNode)
      }
    })
  }

  visit(children)
  return values
}

export type CheckboxProps = CheckboxPrimitive.Root.Props

function Checkbox({
  className,
  value,
  name,
  parent,
  indeterminate,
  ...props
}: CheckboxProps) {
  const registry = React.useContext(CheckboxGroupRegistryContext)
  const itemKey = value ?? name

  React.useEffect(() => {
    if (!registry || parent || !itemKey) return
    return registry.registerChildValue(itemKey)
  }, [registry, parent, itemKey])

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-parent={parent ? "true" : undefined}
      value={value}
      name={name}
      parent={parent}
      indeterminate={indeterminate}
      className={cn(
        "cn-checkbox peer relative shrink-0 cursor-pointer outline-none select-none after:absolute after:-inset-x-3 after:-inset-y-2 active:scale-95 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        keepMounted
        data-slot="checkbox-indicator"
        className="cn-checkbox-indicator group/indicator pointer-events-none grid place-content-center text-current"
      >
        <Check
          aria-hidden="true"
          strokeWidth={3}
          data-slot="checkbox-check-icon"
          className="cn-checkbox-check-icon col-start-1 row-start-1 scale-75 opacity-0 transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] [&_path]:[stroke-dasharray:24] [&_path]:[stroke-dashoffset:-24] [&_path]:transition-[stroke-dashoffset] [&_path]:duration-150 [&_path]:ease-[cubic-bezier(0.22,1,0.36,1)] group-data-checked/indicator:group-not-data-indeterminate/indicator:scale-100 group-data-checked/indicator:group-not-data-indeterminate/indicator:opacity-100 group-data-checked/indicator:group-not-data-indeterminate/indicator:[&_path]:[stroke-dashoffset:0]"
        />
        <Minus
          aria-hidden="true"
          strokeWidth={3}
          data-slot="checkbox-indeterminate-icon"
          className="cn-checkbox-indeterminate-icon col-start-1 row-start-1 scale-75 opacity-0 transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] [&_path]:[stroke-dasharray:16] [&_path]:[stroke-dashoffset:16] [&_path]:transition-[stroke-dashoffset] [&_path]:duration-150 [&_path]:ease-[cubic-bezier(0.22,1,0.36,1)] group-data-indeterminate/indicator:scale-100 group-data-indeterminate/indicator:opacity-100 group-data-indeterminate/indicator:[&_path]:[stroke-dashoffset:0]"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
Checkbox.displayName = "Checkbox"

export interface CheckboxGroupProps extends CheckboxGroupPrimitive.Props {
  /**
   * Layout orientation of the checkbox group (`vertical` | `horizontal`).
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal"
}

function CheckboxGroup({
  className,
  allValues: allValuesProp,
  orientation = "vertical",
  children,
  ...props
}: CheckboxGroupProps) {
  const [registeredValues, setRegisteredValues] = React.useState<string[]>([])

  const registerChildValue = React.useCallback((val: string) => {
    setRegisteredValues((prev) => (prev.includes(val) ? prev : [...prev, val]))
    return () => {
      setRegisteredValues((prev) => prev.filter((item) => item !== val))
    }
  }, [])

  const scannedValues = React.useMemo(
    () => collectChildCheckboxValues(children),
    [children]
  )

  const resolvedAllValues = React.useMemo(() => {
    if (allValuesProp && allValuesProp.length > 0) {
      return allValuesProp
    }
    const merged = [...scannedValues]
    for (const val of registeredValues) {
      if (!merged.includes(val)) {
        merged.push(val)
      }
    }
    return merged
  }, [allValuesProp, scannedValues, registeredValues])

  const registryContextValue = React.useMemo(
    () => ({ registerChildValue }),
    [registerChildValue]
  )

  return (
    <CheckboxGroupRegistryContext.Provider value={registryContextValue}>
      <CheckboxGroupPrimitive
        data-slot="checkbox-group"
        data-orientation={orientation}
        allValues={resolvedAllValues}
        className={cn(
          "cn-checkbox-group flex",
          orientation === "horizontal"
            ? "flex-row flex-wrap items-center gap-4"
            : "flex-col gap-2.5",
          className
        )}
        {...props}
      >
        {children}
      </CheckboxGroupPrimitive>
    </CheckboxGroupRegistryContext.Provider>
  )
}
CheckboxGroup.displayName = "CheckboxGroup"

export { Checkbox, CheckboxGroup }
