import * as React from "react"
import * as LucideIcons from "lucide-react"

export interface IconPlaceholderProps extends React.SVGProps<SVGSVGElement> {
  lucide?: string
  tabler?: string
  hugeicons?: string
  phosphor?: string
  remixicon?: string
  className?: string
  [key: string]: any
}

export function IconPlaceholder({
  lucide,
  className,
  ...props
}: IconPlaceholderProps) {
  if (lucide) {
    // Strip trailing 'Icon' if present (e.g. ChevronDownIcon -> ChevronDown)
    const normalizedName = lucide.replace(/Icon$/, "")
    const IconComponent = (LucideIcons as Record<string, any>)[normalizedName] ||
      (LucideIcons as Record<string, any>)[lucide]

    if (IconComponent) {
      return <IconComponent className={className} {...props} />
    }
  }

  // Fallback icon placeholder
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
