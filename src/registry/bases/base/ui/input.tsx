"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { Eye, EyeOff, X } from "icons"
import { cn } from "cn"

import { useButtonGroupContext } from "@/registry/bases/base/ui/button-group"

export type InputVariant = "default" | "outline" | "ghost"
export type InputSize = "xs" | "sm" | "default" | "lg"

const inputVariants = cva(
  "cn-input w-full min-w-0 border bg-clip-padding outline-none transition-[background-color,color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] selection:bg-primary-fill selection:text-primary-on-fill file:inline-flex file:items-center file:border-0 file:bg-transparent file:font-medium file:text-neutral-text placeholder:text-neutral-text-muted disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger-fill dark:aria-invalid:border-danger-fill/60 aria-invalid:ring-3 aria-invalid:ring-danger-interactive-focus/20 dark:aria-invalid:ring-danger-interactive-focus/40",
  {
    variants: {
      variant: {
        default:
          "cn-input-variant-default border-transparent bg-neutral-interactive/60 text-neutral-text dark:bg-neutral-interactive/50 hover:bg-neutral-interactive dark:hover:bg-neutral-interactive/80 focus-visible:border-primary-interactive-focus focus-visible:bg-neutral-surface dark:focus-visible:bg-neutral-surface-alt focus-visible:ring-3 focus-visible:ring-primary-interactive-focus/30",
        outline:
          "cn-input-variant-outline border-neutral-interactive bg-neutral-surface text-neutral-text dark:bg-transparent hover:border-neutral-interactive-hover hover:bg-neutral-surface-alt/60 dark:hover:border-neutral-interactive-hover dark:hover:bg-neutral-interactive/30 focus-visible:border-primary-interactive-focus focus-visible:bg-neutral-surface dark:focus-visible:bg-transparent focus-visible:ring-3 focus-visible:ring-primary-interactive-focus/30",
        ghost:
          "cn-input-variant-ghost border-transparent bg-transparent text-neutral-text hover:bg-neutral-interactive/60 dark:hover:bg-neutral-interactive/50 focus-visible:border-primary-interactive-focus focus-visible:bg-neutral-surface dark:focus-visible:bg-neutral-surface-alt focus-visible:ring-3 focus-visible:ring-primary-interactive-focus/30",
      },
      size: {
        xs: "cn-input-size-xs h-6 rounded-md px-2 text-xs file:h-4 file:text-xs",
        sm: "cn-input-size-sm h-7 rounded-md px-2.5 text-xs file:h-5 file:text-xs",
        default:
          "cn-input-size-default h-8 rounded-lg px-3 text-sm file:h-6 file:text-xs",
        lg: "cn-input-size-lg h-9 rounded-lg px-3.5 text-sm file:h-7 file:text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const PASSWORD_PADDING_END: Record<InputSize, string> = {
  xs: "pe-7",
  sm: "pe-7.5",
  default: "pe-8.5",
  lg: "pe-9.5",
}

const PASSWORD_TOGGLE_SIZE: Record<InputSize, string> = {
  xs: "end-1 size-4.5 rounded-sm [&_svg]:size-3",
  sm: "end-1 size-5 rounded-sm [&_svg]:size-3.5",
  default: "end-1 size-6 rounded-md [&_svg]:size-4",
  lg: "end-1 size-7 rounded-md [&_svg]:size-4",
}

const FILE_WRAPPER_SIZE: Record<InputSize, string> = {
  xs: "ps-1 pe-2 gap-1.5",
  sm: "ps-1 pe-2.5 gap-2",
  default: "ps-1 pe-3 gap-2.5",
  lg: "ps-1 pe-3.5 gap-2.5",
}

const FILE_BUTTON_SIZE: Record<InputSize, string> = {
  xs: "h-4 rounded-sm px-1.5 text-[11px]",
  sm: "h-5 rounded-sm px-2 text-xs",
  default: "h-6 rounded-md px-2.5 text-xs",
  lg: "h-7 rounded-md px-3 text-xs",
}

const FILE_BUTTON_VARIANT: Record<InputVariant, string> = {
  default:
    "bg-neutral-surface text-neutral-text shadow-2xs ring-1 ring-neutral-interactive/80 dark:bg-neutral-surface-alt group-hover/input-wrapper:bg-neutral-surface-alt dark:group-hover/input-wrapper:bg-neutral-interactive",
  outline:
    "bg-neutral-interactive text-neutral-text group-hover/input-wrapper:bg-neutral-interactive-hover",
  ghost:
    "bg-neutral-interactive text-neutral-text group-hover/input-wrapper:bg-neutral-interactive-hover",
}

const FILE_WRAPPER_FOCUS_VARIANT: Record<InputVariant, string> = {
  default:
    "has-[:focus-visible]:border-primary-interactive-focus has-[:focus-visible]:bg-neutral-surface dark:has-[:focus-visible]:bg-neutral-surface-alt has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-primary-interactive-focus/30",
  outline:
    "has-[:focus-visible]:border-primary-interactive-focus has-[:focus-visible]:bg-neutral-surface dark:has-[:focus-visible]:bg-transparent has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-primary-interactive-focus/30",
  ghost:
    "has-[:focus-visible]:border-primary-interactive-focus has-[:focus-visible]:bg-neutral-surface dark:has-[:focus-visible]:bg-neutral-surface-alt has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-primary-interactive-focus/30",
}

const WRAPPER_LAYOUT_CLASS_RE =
  /^(?:w-|max-w-|min-w-|flex|grow|shrink|basis-|self-|col-|row-|m[xytrblse]?-|order-)/

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  /**
   * Visual emphasis variant of the input (`default` | `outline` | `ghost`).
   */
  variant?: InputVariant
  /**
   * Proportional height, corner radius, padding, and font size tier (`xs` | `sm` | `default` | `lg`).
   * Matches `Button` dimensions at each corresponding tier.
   */
  size?: InputSize
  /**
   * Native HTML `size` attribute for character width if needed.
   */
  htmlSize?: number
  /**
   * When `type="password"`, displays a trailing button to toggle password visibility.
   * Defaults to `true` for password inputs.
   */
  passwordToggle?: boolean
  /**
   * Alias for `passwordToggle`.
   */
  showPasswordToggle?: boolean
  /**
   * Initial visibility state when `type="password"` and password toggle is enabled.
   */
  defaultPasswordVisible?: boolean
  /**
   * When `type="file"`, customizes the Browse trigger badge label.
   * Pass `null` or `false` to hide the trigger badge.
   * @default "Browse"
   */
  browseLabel?: React.ReactNode
  /**
   * When `type="file"`, customizes the status text shown when no file is selected.
   * @default "No file selected"
   */
  noFileLabel?: React.ReactNode
  /**
   * When `type="file"`, customizes how a single selected file's label is rendered.
   * Defaults to displaying `file.name`.
   */
  fileSelectedLabel?: (file: File) => React.ReactNode
  /**
   * When `type="file"` and `multiple` files are selected, customizes the summary label.
   * Supports a template string with `{count}` (e.g. `"{count} files selected"`) or a render function.
   * @default "{count} files selected"
   */
  filesSelectedLabel?:
    | string
    | ((count: number, files: File[]) => React.ReactNode)
  /**
   * When `type="file"`, shows a trailing clear button when one or more files are selected.
   * @default true
   */
  fileClearable?: boolean
  /**
   * Accessible label for the trailing file clear button.
   * @default "Clear selected files"
   */
  clearFileLabel?: string
  /**
   * Optional className applied to the outer wrapper when password toggle or file input is rendered.
   */
  wrapperClassName?: string
}

function Input({
  className,
  wrapperClassName,
  type = "text",
  variant,
  size,
  htmlSize,
  passwordToggle,
  showPasswordToggle,
  defaultPasswordVisible = false,
  browseLabel = "Browse",
  noFileLabel = "No file selected",
  fileSelectedLabel,
  filesSelectedLabel = "{count} files selected",
  fileClearable = true,
  clearFileLabel = "Clear selected files",
  disabled,
  onChange,
  ref,
  ...props
}: InputProps) {
  const groupContext = useButtonGroupContext()
  const [ isPasswordVisible, setIsPasswordVisible ] = React.useState(
    defaultPasswordVisible
  )
  const [ selectedFiles, setSelectedFiles ] = React.useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const setMergedFileRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      fileInputRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ;(ref as React.MutableRefObject<HTMLInputElement | null>).current = node
      }
    },
    [ ref ]
  )

  const groupVariant: InputVariant | undefined =
    groupContext?.variant === "outline"
      ? "outline"
      : groupContext?.variant === "ghost"
        ? "ghost"
        : groupContext?.variant === "default" ||
            groupContext?.variant === "secondary"
          ? "default"
          : undefined

  const resolvedVariant: InputVariant = variant ?? groupVariant ?? "default"

  const resolvedSize: InputSize = size ?? groupContext?.size ?? "default"
  const isDisabled = Boolean(disabled || groupContext?.disabled)

  const isFileType = type === "file"
  const isPasswordType = type === "password"
  const hasPasswordToggle =
    isPasswordType && (passwordToggle ?? showPasswordToggle ?? true)
  const effectiveType =
    hasPasswordToggle && isPasswordVisible ? "text" : type

  if (isFileType) {
    const tokens = (className ?? "").split(/\s+/).filter(Boolean)
    const forwardedWrapperClasses = tokens.filter((t) =>
      WRAPPER_LAYOUT_CLASS_RE.test(t)
    )

    const hasFiles = selectedFiles.length > 0
    const showClearButton = fileClearable && hasFiles && !isDisabled

    const renderedFileStatus: React.ReactNode = !hasFiles
      ? noFileLabel
      : selectedFiles.length === 1
        ? fileSelectedLabel
          ? fileSelectedLabel(selectedFiles[0])
          : selectedFiles[0].name
        : typeof filesSelectedLabel === "function"
          ? filesSelectedLabel(selectedFiles.length, selectedFiles)
          : filesSelectedLabel.replace(
              /\{count\}/g,
              String(selectedFiles.length)
            )

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files ? Array.from(event.target.files) : []
      setSelectedFiles(files)
      onChange?.(event)
    }

    const handleClearFiles = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      setSelectedFiles([])
    }

    return (
      <div
        data-slot="input"
        data-type="file"
        data-variant={resolvedVariant}
        data-size={resolvedSize}
        data-disabled={isDisabled ? "true" : undefined}
        aria-invalid={props["aria-invalid"]}
        className={cn(
          inputVariants({ variant: resolvedVariant, size: resolvedSize }),
          "cn-input-file group/input-wrapper relative inline-flex items-center overflow-hidden select-none",
          FILE_WRAPPER_SIZE[resolvedSize],
          FILE_WRAPPER_FOCUS_VARIANT[resolvedVariant],
          showClearButton && PASSWORD_PADDING_END[resolvedSize],
          isDisabled && "pointer-events-none cursor-not-allowed opacity-50",
          forwardedWrapperClasses,
          className,
          wrapperClassName
        )}
      >
        <InputPrimitive
          ref={setMergedFileRef}
          type="file"
          size={htmlSize}
          disabled={isDisabled}
          onChange={handleFileChange}
          data-slot="input-file-native"
          className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...props}
        />
        {browseLabel !== null && browseLabel !== false && (
          <span
            data-slot="input-file-button"
            className={cn(
              "cn-input-file-button pointer-events-none inline-flex shrink-0 items-center justify-center font-medium leading-none whitespace-nowrap transition-colors duration-150",
              FILE_BUTTON_SIZE[resolvedSize],
              FILE_BUTTON_VARIANT[resolvedVariant]
            )}
          >
            {browseLabel}
          </span>
        )}
        <span
          data-slot="input-file-label"
          className={cn(
            "cn-input-file-label pointer-events-none min-w-0 flex-1 truncate leading-none",
            hasFiles ? "text-neutral-text font-medium" : "text-neutral-text-muted"
          )}
        >
          {renderedFileStatus}
        </span>
        {showClearButton && (
          <button
            type="button"
            aria-label={clearFileLabel}
            data-slot="input-file-clear"
            onClick={handleClearFiles}
            className={cn(
              "cn-input-file-clear absolute top-1/2 z-20 inline-flex -translate-y-1/2 items-center justify-center text-neutral-text-muted transition-colors duration-150 outline-none select-none cursor-pointer hover:bg-neutral-interactive/80 hover:text-neutral-text active:bg-neutral-interactive-hover focus-visible:ring-2 focus-visible:ring-primary-interactive-focus/40 focus-visible:text-neutral-text [&_svg]:pointer-events-none [&_svg]:shrink-0",
              PASSWORD_TOGGLE_SIZE[resolvedSize]
            )}
          >
            <X aria-hidden="true" />
          </button>
        )}
      </div>
    )
  }

  if (!hasPasswordToggle) {
    return (
      <InputPrimitive
        ref={ref}
        type={effectiveType}
        size={htmlSize}
        disabled={isDisabled}
        onChange={onChange}
        data-slot="input"
        data-variant={resolvedVariant}
        data-size={resolvedSize}
        className={cn(
          inputVariants({ variant: resolvedVariant, size: resolvedSize }),
          className
        )}
        {...props}
      />
    )
  }

  const tokens = (className ?? "").split(/\s+/).filter(Boolean)
  const forwardedWrapperClasses = tokens.filter((t) =>
    WRAPPER_LAYOUT_CLASS_RE.test(t)
  )

  return (
    <div
      data-slot="input-wrapper"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={cn(
        "cn-input-wrapper group/input-wrapper relative inline-flex w-full min-w-0 items-center",
        resolvedSize === "xs" || resolvedSize === "sm"
          ? "rounded-md"
          : "rounded-lg",
        "[&>[data-slot=input]]:rounded-[inherit]",
        forwardedWrapperClasses,
        wrapperClassName
      )}
    >
      <InputPrimitive
        ref={ref}
        type={effectiveType}
        size={htmlSize}
        disabled={isDisabled}
        onChange={onChange}
        data-slot="input"
        data-variant={resolvedVariant}
        data-size={resolvedSize}
        className={cn(
          inputVariants({ variant: resolvedVariant, size: resolvedSize }),
          PASSWORD_PADDING_END[resolvedSize],
          className,
          "w-full"
        )}
        {...props}
      />
      <button
        type="button"
        disabled={isDisabled}
        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        aria-pressed={isPasswordVisible}
        data-slot="input-password-toggle"
        data-state={isPasswordVisible ? "visible" : "hidden"}
        onClick={() => setIsPasswordVisible((prev) => !prev)}
        className={cn(
          "cn-input-password-toggle absolute top-1/2 z-10 inline-flex -translate-y-1/2 items-center justify-center text-neutral-text-muted transition-colors duration-150 outline-none select-none cursor-pointer hover:bg-neutral-interactive/80 hover:text-neutral-text active:bg-neutral-interactive-hover focus-visible:ring-2 focus-visible:ring-primary-interactive-focus/40 focus-visible:text-neutral-text disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          PASSWORD_TOGGLE_SIZE[resolvedSize]
        )}
      >
        {isPasswordVisible ? (
          <EyeOff aria-hidden="true" />
        ) : (
          <Eye aria-hidden="true" />
        )}
      </button>
    </div>
  )
}

export { Input, inputVariants }
