"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button, type ButtonProps } from "@/registry/bases/base/ui/button"

export type AlertDialogSize = "sm" | "default" | "lg" | "xl" | "full"

const AlertDialogContext = React.createContext<{ size: AlertDialogSize }>({
  size: "default",
})

const alertDialogContentVariants = cva(
  "cn-alert-dialog-content fixed top-1/2 start-1/2 z-50 grid w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 bg-neutral-surface text-neutral-text shadow-2xl outline-none duration-200 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  {
    variants: {
      size: {
        sm: "max-w-sm p-4 gap-3 rounded-xl",
        default: "max-w-lg p-6 gap-4 rounded-2xl",
        lg: "max-w-2xl p-6 sm:p-8 gap-5 rounded-2xl",
        xl: "max-w-4xl p-6 sm:p-8 gap-6 rounded-3xl",
        full: "max-w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100vw-4rem)] sm:max-h-[calc(100dvh-4rem)] p-6 sm:p-10 gap-6 rounded-3xl overflow-y-auto",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "cn-alert-dialog-overlay fixed inset-0 isolate z-50 bg-black/50 backdrop-blur-xs duration-200 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  )
}

export interface AlertDialogContentProps
  extends Omit<AlertDialogPrimitive.Popup.Props, "className">,
    VariantProps<typeof alertDialogContentVariants> {
  className?: string
  /**
   * Alert dialog size tier (`sm` | `default` | `lg` | `xl` | `full`) controlling width, padding, and density.
   * @default "default"
   */
  size?: AlertDialogSize
}

function AlertDialogContent({
  className,
  size = "default",
  children,
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogContext.Provider value={{ size }}>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Popup
          data-slot="alert-dialog-content"
          data-size={size}
          className={cn(alertDialogContentVariants({ size }), className)}
          {...props}
        >
          {children}
        </AlertDialogPrimitive.Popup>
      </AlertDialogPortal>
    </AlertDialogContext.Provider>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { size } = React.useContext(AlertDialogContext)
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "cn-alert-dialog-header relative flex flex-col text-start items-start",
        size === "sm" && "gap-1 pb-1",
        size === "default" && "gap-1.5 pb-2",
        (size === "lg" || size === "xl" || size === "full") && "gap-2 pb-3",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { size } = React.useContext(AlertDialogContext)
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "cn-alert-dialog-footer flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        size === "sm" && "pt-1 sm:gap-2",
        size === "default" && "pt-2 sm:gap-2.5",
        (size === "lg" || size === "xl" || size === "full") && "pt-3 sm:gap-3",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "cn-alert-dialog-media mb-2 flex items-center justify-start text-start",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  const { size } = React.useContext(AlertDialogContext)
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "cn-alert-dialog-title cn-font-heading font-semibold leading-none tracking-tight text-neutral-text text-start",
        size === "sm" && "text-base",
        size === "default" && "text-lg",
        (size === "lg" || size === "xl" || size === "full") && "text-xl",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "cn-alert-dialog-description text-sm text-neutral-text-muted leading-relaxed text-start",
        className
      )}
      {...props}
    />
  )
}

export interface AlertDialogActionProps extends ButtonProps {}

function AlertDialogAction({
  className,
  variant = "default",
  intent = "primary",
  ...props
}: AlertDialogActionProps) {
  return (
    <Button
      data-slot="alert-dialog-action"
      variant={variant}
      intent={intent}
      className={cn("cn-alert-dialog-action", className)}
      {...props}
    />
  )
}

export interface AlertDialogCancelProps
  extends AlertDialogPrimitive.Close.Props,
    Pick<ButtonProps, "variant" | "size"> {
  className?: string
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      render={<Button variant={variant} size={size} />}
      className={cn("cn-alert-dialog-cancel", className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  alertDialogContentVariants,
}
