"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "icons"
import { cn } from "cn"

import { Button } from "@/registry/bases/base/ui/button"

export type DialogSize = "sm" | "default" | "lg" | "xl" | "full"

const dialogContentVariants = cva(
  "cn-dialog-content fixed top-1/2 start-1/2 z-50 grid w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 bg-neutral-surface text-neutral-text border border-neutral-interactive/80 dark:border-neutral-interactive/50 shadow-2xl rounded-2xl p-6 outline-none transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        default: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100vw-4rem)] sm:max-h-[calc(100dvh-4rem)] overflow-y-auto",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "cn-dialog-overlay fixed inset-0 isolate z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  )
}

export interface DialogContentProps
  extends Omit<DialogPrimitive.Popup.Props, "className">,
    VariantProps<typeof dialogContentVariants> {
  className?: string
  /**
   * Modal size tier (`sm` | `default` | `lg` | `xl` | `full`).
   * @default "default"
   */
  size?: DialogSize
  /**
   * Optional close button rendered directly inside the content (typically handled by DialogHeader).
   */
  showCloseButton?: boolean
}

function DialogContent({
  className,
  children,
  size = "default",
  showCloseButton,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        data-size={size}
        className={cn(dialogContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Close"
                className="cn-dialog-close absolute top-4 end-4 text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/60 active:bg-neutral-interactive focus-visible:ring-2 focus-visible:ring-primary-interactive-focus/40"
              />
            }
          >
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

export interface DialogHeaderProps extends React.ComponentProps<"div"> {
  /**
   * When true (default), renders a close button at the inline end of the header.
   * @default true
   */
  showCloseButton?: boolean
}

function DialogHeader({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "cn-dialog-header relative flex flex-col gap-1.5 pb-4 text-start pe-8",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Close"
              className="cn-dialog-close absolute top-0 end-0 -mt-1 -me-1 text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/60 active:bg-neutral-interactive active:text-neutral-text focus-visible:ring-2 focus-visible:ring-primary-interactive-focus/40"
            />
          }
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("cn-dialog-body flex-1 overflow-y-auto py-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "cn-dialog-footer flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2.5 pt-4",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "cn-dialog-title cn-font-heading text-lg font-semibold leading-none tracking-tight text-neutral-text",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "cn-dialog-description text-sm text-neutral-text-muted leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogBody,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  dialogContentVariants,
}
