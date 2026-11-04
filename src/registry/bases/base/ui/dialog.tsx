"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "icons"
import { cn } from "cn"

import { Button } from "@/registry/bases/base/ui/button"

export type DialogSize = "sm" | "default" | "lg" | "xl" | "full"

const DialogContext = React.createContext<{ size: DialogSize }>({
  size: "default",
})

const dialogContentVariants = cva(
  "cn-dialog-content fixed top-1/2 start-1/2 z-50 grid w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 bg-neutral-surface text-neutral-text shadow-2xl outline-none duration-200 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
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
        "cn-dialog-overlay fixed inset-0 isolate z-50 bg-black/50 backdrop-blur-xs duration-200 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-ending-style:opacity-0 data-starting-style:opacity-0",
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
   * Modal size tier (`sm` | `default` | `lg` | `xl` | `full`) controlling max-width, internal padding, and density.
   * @default "default"
   */
  size?: DialogSize
  /**
   * Whether to show the top-right icon close button.
   * @default true
   */
  showCloseButton?: boolean
}

function DialogContent({
  className,
  children,
  size = "default",
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogContext.Provider value={{ size }}>
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
                  className="cn-dialog-close absolute top-3 end-3 sm:top-4 sm:end-4 text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-interactive-focus disabled:pointer-events-none transition-colors"
                />
              }
            >
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </DialogPortal>
    </DialogContext.Provider>
  )
}

export interface DialogHeaderProps extends React.ComponentProps<"div"> {}

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  const { size } = React.useContext(DialogContext)
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "cn-dialog-header relative flex flex-col text-start pe-8",
        size === "sm" && "gap-1 pb-1 pe-6",
        size === "default" && "gap-1.5 pb-2 pe-8",
        (size === "lg" || size === "xl" || size === "full") && "gap-2 pb-3 pe-9",
        className
      )}
      {...props}
    />
  )
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("cn-dialog-body flex-1 overflow-y-auto py-1", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { size } = React.useContext(DialogContext)
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "cn-dialog-footer flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        size === "sm" && "pt-1 sm:gap-2",
        size === "default" && "pt-2 sm:gap-2.5",
        (size === "lg" || size === "xl" || size === "full") && "pt-3 sm:gap-3",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  const { size } = React.useContext(DialogContext)
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "cn-dialog-title cn-font-heading font-semibold leading-none tracking-tight text-neutral-text",
        size === "sm" && "text-base",
        size === "default" && "text-lg",
        (size === "lg" || size === "xl" || size === "full") && "text-xl",
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
