"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button, type ButtonProps } from "@/registry/bases/base/ui/button"

export type AlertDialogSize = "sm" | "default" | "lg"

const alertDialogContentVariants = cva(
  "cn-alert-dialog-content fixed top-1/2 start-1/2 z-50 grid w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 bg-neutral-surface text-neutral-text border border-neutral-interactive/80 dark:border-neutral-interactive/50 shadow-2xl rounded-2xl p-6 outline-none transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  {
    variants: {
      size: {
        sm: "max-w-md",
        default: "max-w-lg",
        lg: "max-w-xl",
      },
    },
    defaultVariants: {
      size: "sm",
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
        "cn-alert-dialog-overlay fixed inset-0 isolate z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
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
   * Alert dialog size tier (`sm` | `default` | `lg`).
   * @default "sm"
   */
  size?: AlertDialogSize
}

function AlertDialogContent({
  className,
  size = "sm",
  children,
  ...props
}: AlertDialogContentProps) {
  return (
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
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "cn-alert-dialog-header flex flex-col gap-2 pb-4 text-start",
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
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "cn-alert-dialog-footer flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2.5 pt-4",
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
        "cn-alert-dialog-media mb-2 flex items-center justify-center text-start",
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
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "cn-alert-dialog-title cn-font-heading text-lg font-semibold leading-none tracking-tight text-neutral-text",
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
        "cn-alert-dialog-description text-sm text-neutral-text-muted leading-relaxed",
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
