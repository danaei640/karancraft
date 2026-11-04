import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, "..")
const REGISTRY_PATH = path.join(ROOT, "src", "registry")
const OUTPUT_PATH = path.join(ROOT, "public", "r")

const COMPONENT_METADATA = {
  button: { title: "Button", description: "Displays a button or a component that looks like a button." },
  badge: { title: "Badge", description: "Displays a badge or a component that looks like a badge." },
  card: { title: "Card", description: "Displays a card with header, content, and footer." },
  input: { title: "Input", description: "Displays a form input field or a component that looks like an input field." },
  textarea: { title: "Textarea", description: "Displays a form textarea or a component that looks like a textarea." },
  switch: { title: "Switch", description: "A control that allows the user to toggle between checked and not checked." },
  slider: { title: "Slider", description: "An input where the user selects a value from within a given range." },
  checkbox: { title: "Checkbox", description: "A control that allows the user to toggle between checked, unchecked, and indeterminate states." },
  "checkbox-group": { title: "Checkbox Group", description: "Provides shared state and automatic parent indeterminate synchronization for a group of checkboxes." },
  "radio-group": { title: "Radio Group", description: "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time." },
  dialog: { title: "Dialog", description: "A window overlaid on either the primary window or another dialog window." },
  "alert-dialog": { title: "Alert Dialog", description: "A modal dialog that interrupts the user with important content and expects a response." },
  alert: { title: "Alert", description: "Displays a callout for user attention." },
  popover: { title: "Popover", description: "Displays rich content in a portal, triggered by a button." },
  tabs: { title: "Tabs", description: "A set of layered sections of content—known as tab panels—that are displayed one at a time." },
  accordion: { title: "Accordion", description: "A vertically stacked set of interactive headings that each reveal a section of content." },
  avatar: { title: "Avatar", description: "An image element with a fallback for representing the user." },
  tooltip: { title: "Tooltip", description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it." },
  separator: { title: "Separator", description: "Visually or semantically separates content." },
  skeleton: { title: "Skeleton", description: "Use to show a placeholder while content is loading." },
  progress: { title: "Progress", description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar." },
  "dropdown-menu": { title: "Dropdown Menu", description: "Displays a menu to the user—such as a set of actions or functions—triggered by a button." },
  select: { title: "Select", description: "Displays a list of options for the user to pick from—triggered by a button." },
  breadcrumb: { title: "Breadcrumb", description: "Displays the path to the current resource using a hierarchy of links." },
  table: { title: "Table", description: "A responsive table component." },
  calendar: { title: "Calendar", description: "A date field component that allows users to enter and edit date." },
  carousel: { title: "Carousel", description: "A carousel with motion and swipe built using Embla." },
  sheet: { title: "Sheet", description: "Extends the Dialog component to display content that complements the main screen." },
  drawer: { title: "Drawer", description: "A drawer component for React." },
  collapsible: { title: "Collapsible", description: "An interactive component which can be expanded/collapsed." },
  "collapsible-section": { title: "Collapsible Section", description: "A collapsible section with a full-width trigger row (label + dedicated trailing chevron) and a content container below it." },
  command: { title: "Command", description: "Fast, composable, unstyled command menu for React." },
  "context-menu": { title: "Context Menu", description: "Displays a menu to the user — such as a set of actions or functions — triggered by a button." },
  "hover-card": { title: "Hover Card", description: "For sighted users to preview content available behind a link." },
  "input-otp": { title: "Input OTP", description: "A accessible and customizable one-time password component with copy paste functionality." },
  menubar: { title: "Menubar", description: "A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands." },
  "navigation-menu": { title: "Navigation Menu", description: "A collection of links for navigating websites." },
  pagination: { title: "Pagination", description: "Pagination with page navigation, next and previous links." },
  resizable: { title: "Resizable", description: "Accessible resizable panel groups and layouts with keyboard support." },
  "scroll-area": { title: "Scroll Area", description: "Augments native scroll functionality for custom, cross-browser styling." },
  sidebar: { title: "Sidebar", description: "A composable, themeable and customizable sidebar component." },
  toast: { title: "Toast", description: "A succinct message that is displayed temporarily." },
  "theme-provider": { title: "Theme Provider", description: "A comprehensive theme and component provider wrapping @wrksz/themes, toast, tooltip, typeset measurements, and color theme." },
  toggle: { title: "Toggle", description: "A two-state button that can be either on or off." },
  "toggle-group": { title: "Toggle Group", description: "A set of two-state buttons that can be toggled on or off." },
  field: { title: "Field", description: "Form control wrapper with label, subtitle description, input, and multi-intent bottom caption." },
}

function transformContentForRegistry(content) {
  let transformed = content

  // 1. Rewrite internal registry paths to consumer project paths
  transformed = transformed.replace(/@\/registry\/bases\/base\/ui\//g, "@/components/ui/")

  // 2. Transform IconPlaceholder to standard lucide-react icons
  const iconMatches = [...transformed.matchAll(/<IconPlaceholder[\s\S]*?lucide="([^"]+)"[\s\S]*?\/>/g)]
  const collectedIcons = new Set()

  for (const match of iconMatches) {
    const fullTag = match[0]
    const rawIcon = match[1]
    const lucideName = rawIcon.replace(/Icon$/, "")
    collectedIcons.add(lucideName)

    // Remove icon attributes and convert to Lucide component
    let cleanTag = fullTag
      .replace(/<IconPlaceholder/, `<${lucideName}`)
      .replace(/\s*lucide="[^"]*"/g, "")
      .replace(/\s*tabler="[^"]*"/g, "")
      .replace(/\s*hugeicons="[^"]*"/g, "")
      .replace(/\s*phosphor="[^"]*"/g, "")
      .replace(/\s*remixicon="[^"]*"/g, "")

    transformed = transformed.replace(fullTag, cleanTag)
  }

  // Replace IconPlaceholder import with Lucide import
  if (collectedIcons.size > 0) {
    const iconImportList = Array.from(collectedIcons).sort().join(", ")
    transformed = transformed.replace(
      /import\s+{\s*IconPlaceholder\s*}\s+from\s+["']@\/app\/\(create\)\/components\/icon-placeholder["']/,
      `import { ${iconImportList} } from "lucide-react"`
    )
  }

  return transformed
}

async function extractDependencies(content) {
  const deps = new Set()
  const regDeps = new Set()

  const importRegex = /import(?:[\s\S]*?)from\s+["'](.*?)["']/g
  let match
  while ((match = importRegex.exec(content)) !== null) {
    const pkg = match[1]
    if (pkg.startsWith("@base-ui/react")) {
      deps.add("@base-ui/react")
    } else if (pkg.startsWith("@wrksz/themes")) {
      deps.add("@wrksz/themes")
    } else if (
      pkg === "icons" ||
      pkg.startsWith("lucide-react") ||
      pkg.includes("icon-placeholder")
    ) {
      deps.add("lucide-react")
    } else if (pkg.startsWith("class-variance-authority")) {
      deps.add("class-variance-authority")
    } else if (pkg.startsWith("clsx")) {
      deps.add("clsx")
    } else if (pkg.startsWith("tailwind-merge")) {
      deps.add("tailwind-merge")
    } else if (pkg.startsWith("embla-carousel-react")) {
      deps.add("embla-carousel-react")
    } else if (pkg.startsWith("cmdk")) {
      deps.add("cmdk")
    } else if (pkg.startsWith("input-otp")) {
      deps.add("input-otp")
    } else if (pkg.startsWith("react-day-picker")) {
      deps.add("react-day-picker")
    } else if (pkg.startsWith("recharts")) {
      deps.add("recharts")
    } else if (pkg.startsWith("react-resizable-panels")) {
      deps.add("react-resizable-panels")
    } else if (pkg.startsWith("@/components/ui/") || pkg.startsWith("@/registry/bases/base/ui/")) {
      const regName = pkg.split("/").pop()?.replace(/\.(tsx|ts)$/, "")
      if (regName) regDeps.add(regName)
    }
  }

  return {
    dependencies: Array.from(deps),
    registryDependencies: Array.from(regDeps),
  }
}

async function main() {
  console.log("🔨 Building Karan-UI Shadcn Registry (Karan Style)...")

  await fs.mkdir(OUTPUT_PATH, { recursive: true })
  await fs.mkdir(path.join(OUTPUT_PATH, "styles"), { recursive: true })

  const items = []

  // 1. Build Karan Style definition
  const styleCssPath = path.join(REGISTRY_PATH, "styles", "style-karan.css")
  let styleCss = ""
  try {
    styleCss = await fs.readFile(styleCssPath, "utf-8")
  } catch (err) {
    console.warn("style-karan.css not found, skipping style content.")
  }

  const karanStyleItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "karan",
    type: "registry:style",
    title: "Karan Style",
    description: "Fluid, luminous, and soft style for karan-ui components.",
    dependencies: ["@base-ui/react", "class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        path: "styles/style-karan.css",
        content: styleCss,
        type: "registry:style",
        target: "styles/style-karan.css",
      },
    ],
    cssVars: {
      light: {
        radius: "0.625rem",
        "primary-surface": "oklch(0.985 0.01 264)",
        "primary-surface-alt": "oklch(0.95 0.016 264)",
        "primary-interactive": "oklch(0.91 0.024 264)",
        "primary-interactive-hover": "oklch(0.87 0.036 264)",
        "primary-interactive-active": "oklch(0.83 0.05 264)",
        "primary-interactive-focus": "oklch(0.5 0.14 264)",
        "primary-fill": "oklch(0.45 0.2 264)",
        "primary-fill-hover": "oklch(0.38 0.184 264)",
        "primary-fill-active": "oklch(0.32 0.17 264)",
        "primary-text": "oklch(0.18 0.09 264)",
        "primary-text-secondary": "oklch(0.38 0.07 264)",
        "primary-text-muted": "oklch(0.53 0.04 264)",
        "primary-on-fill": "oklch(0.98 0.006 264)",
        "neutral-surface": "oklch(0.985 0.0004 264)",
        "neutral-surface-alt": "oklch(0.95 0.0006 264)",
        "neutral-interactive": "oklch(0.91 0.0008 264)",
        "neutral-interactive-hover": "oklch(0.87 0.0013 264)",
        "neutral-interactive-active": "oklch(0.83 0.0018 264)",
        "neutral-interactive-focus": "oklch(0.5 0.0049 264)",
        "neutral-fill": "oklch(0.45 0.007 264)",
        "neutral-fill-hover": "oklch(0.38 0.0064 264)",
        "neutral-fill-active": "oklch(0.32 0.006 264)",
        "neutral-text": "oklch(0.18 0.0032 264)",
        "neutral-text-secondary": "oklch(0.38 0.0025 264)",
        "neutral-text-muted": "oklch(0.53 0.0014 264)",
        "neutral-on-fill": "oklch(0.98 0 264)",
        "info-surface": "oklch(0.985 0.008 294)",
        "info-surface-alt": "oklch(0.95 0.0128 294)",
        "info-interactive": "oklch(0.91 0.0192 294)",
        "info-interactive-hover": "oklch(0.87 0.0288 294)",
        "info-interactive-active": "oklch(0.83 0.04 294)",
        "info-interactive-focus": "oklch(0.5 0.112 294)",
        "info-fill": "oklch(0.45 0.16 294)",
        "info-fill-hover": "oklch(0.38 0.1472 294)",
        "info-fill-active": "oklch(0.32 0.136 294)",
        "info-text": "oklch(0.18 0.072 294)",
        "info-text-secondary": "oklch(0.38 0.056 294)",
        "info-text-muted": "oklch(0.53 0.032 294)",
        "info-on-fill": "oklch(0.98 0.0048 294)",
        "success-surface": "oklch(0.985 0.0076 155)",
        "success-surface-alt": "oklch(0.95 0.0122 155)",
        "success-interactive": "oklch(0.91 0.0182 155)",
        "success-interactive-hover": "oklch(0.87 0.0274 155)",
        "success-interactive-active": "oklch(0.83 0.038 155)",
        "success-interactive-focus": "oklch(0.5 0.1064 155)",
        "success-fill": "oklch(0.45 0.152 155)",
        "success-fill-hover": "oklch(0.38 0.1398 155)",
        "success-fill-active": "oklch(0.32 0.1292 155)",
        "success-text": "oklch(0.18 0.0684 155)",
        "success-text-secondary": "oklch(0.38 0.0532 155)",
        "success-text-muted": "oklch(0.53 0.0304 155)",
        "success-on-fill": "oklch(0.98 0.0046 155)",
        "warning-surface": "oklch(0.985 0.0072 85)",
        "warning-surface-alt": "oklch(0.95 0.0115 85)",
        "warning-interactive": "oklch(0.91 0.0173 85)",
        "warning-interactive-hover": "oklch(0.87 0.0259 85)",
        "warning-interactive-active": "oklch(0.83 0.036 85)",
        "warning-interactive-focus": "oklch(0.5 0.1008 85)",
        "warning-fill": "oklch(0.45 0.144 85)",
        "warning-fill-hover": "oklch(0.38 0.1325 85)",
        "warning-fill-active": "oklch(0.32 0.1224 85)",
        "warning-text": "oklch(0.18 0.0648 85)",
        "warning-text-secondary": "oklch(0.38 0.0504 85)",
        "warning-text-muted": "oklch(0.53 0.0288 85)",
        "warning-on-fill": "oklch(0.98 0.0043 85)",
        "danger-surface": "oklch(0.985 0.0096 25)",
        "danger-surface-alt": "oklch(0.95 0.0154 25)",
        "danger-interactive": "oklch(0.91 0.023 25)",
        "danger-interactive-hover": "oklch(0.87 0.0346 25)",
        "danger-interactive-active": "oklch(0.83 0.048 25)",
        "danger-interactive-focus": "oklch(0.5 0.1344 25)",
        "danger-fill": "oklch(0.45 0.192 25)",
        "danger-fill-hover": "oklch(0.38 0.1766 25)",
        "danger-fill-active": "oklch(0.32 0.1632 25)",
        "danger-text": "oklch(0.18 0.0864 25)",
        "danger-text-secondary": "oklch(0.38 0.0672 25)",
        "danger-text-muted": "oklch(0.53 0.0384 25)",
        "danger-on-fill": "oklch(0.98 0.0058 25)",
      },
      dark: {
        radius: "0.625rem",
        "primary-surface": "oklch(0.15 0.01 264)",
        "primary-surface-alt": "oklch(0.195 0.016 264)",
        "primary-interactive": "oklch(0.25 0.024 264)",
        "primary-interactive-hover": "oklch(0.31 0.036 264)",
        "primary-interactive-active": "oklch(0.37 0.05 264)",
        "primary-interactive-focus": "oklch(0.58 0.14 264)",
        "primary-fill": "oklch(0.65 0.2 264)",
        "primary-fill-hover": "oklch(0.72 0.184 264)",
        "primary-fill-active": "oklch(0.78 0.17 264)",
        "primary-text": "oklch(0.95 0.0608 264)",
        "primary-text-secondary": "oklch(0.76 0.07 264)",
        "primary-text-muted": "oklch(0.62 0.04 264)",
        "primary-on-fill": "oklch(0.15 0.006 264)",
        "neutral-surface": "oklch(0.15 0.0004 264)",
        "neutral-surface-alt": "oklch(0.195 0.0006 264)",
        "neutral-interactive": "oklch(0.25 0.0008 264)",
        "neutral-interactive-hover": "oklch(0.31 0.0013 264)",
        "neutral-interactive-active": "oklch(0.37 0.0018 264)",
        "neutral-interactive-focus": "oklch(0.58 0.0049 264)",
        "neutral-fill": "oklch(0.65 0.007 264)",
        "neutral-fill-hover": "oklch(0.72 0.0064 264)",
        "neutral-fill-active": "oklch(0.78 0.006 264)",
        "neutral-text": "oklch(0.95 0.0032 264)",
        "neutral-text-secondary": "oklch(0.76 0.0025 264)",
        "neutral-text-muted": "oklch(0.62 0.0014 264)",
        "neutral-on-fill": "oklch(0.15 0 264)",
        "info-surface": "oklch(0.15 0.008 294)",
        "info-surface-alt": "oklch(0.195 0.0128 294)",
        "info-interactive": "oklch(0.25 0.0192 294)",
        "info-interactive-hover": "oklch(0.31 0.0288 294)",
        "info-interactive-active": "oklch(0.37 0.04 294)",
        "info-interactive-focus": "oklch(0.58 0.112 294)",
        "info-fill": "oklch(0.65 0.16 294)",
        "info-fill-hover": "oklch(0.72 0.1472 294)",
        "info-fill-active": "oklch(0.78 0.136 294)",
        "info-text": "oklch(0.95 0.0608 294)",
        "info-text-secondary": "oklch(0.76 0.056 294)",
        "info-text-muted": "oklch(0.62 0.032 294)",
        "info-on-fill": "oklch(0.15 0.0048 294)",
        "success-surface": "oklch(0.15 0.0076 155)",
        "success-surface-alt": "oklch(0.195 0.0122 155)",
        "success-interactive": "oklch(0.25 0.0182 155)",
        "success-interactive-hover": "oklch(0.31 0.0274 155)",
        "success-interactive-active": "oklch(0.37 0.038 155)",
        "success-interactive-focus": "oklch(0.58 0.1064 155)",
        "success-fill": "oklch(0.65 0.152 155)",
        "success-fill-hover": "oklch(0.72 0.1398 155)",
        "success-fill-active": "oklch(0.78 0.1292 155)",
        "success-text": "oklch(0.95 0.0608 155)",
        "success-text-secondary": "oklch(0.76 0.0532 155)",
        "success-text-muted": "oklch(0.62 0.0304 155)",
        "success-on-fill": "oklch(0.15 0.0046 155)",
        "warning-surface": "oklch(0.15 0.0072 85)",
        "warning-surface-alt": "oklch(0.195 0.0115 85)",
        "warning-interactive": "oklch(0.25 0.0173 85)",
        "warning-interactive-hover": "oklch(0.31 0.0259 85)",
        "warning-interactive-active": "oklch(0.37 0.036 85)",
        "warning-interactive-focus": "oklch(0.58 0.1008 85)",
        "warning-fill": "oklch(0.65 0.144 85)",
        "warning-fill-hover": "oklch(0.72 0.1325 85)",
        "warning-fill-active": "oklch(0.78 0.1224 85)",
        "warning-text": "oklch(0.95 0.0608 85)",
        "warning-text-secondary": "oklch(0.76 0.0504 85)",
        "warning-text-muted": "oklch(0.62 0.0288 85)",
        "warning-on-fill": "oklch(0.15 0.0043 85)",
        "danger-surface": "oklch(0.15 0.0096 25)",
        "danger-surface-alt": "oklch(0.195 0.0154 25)",
        "danger-interactive": "oklch(0.25 0.023 25)",
        "danger-interactive-hover": "oklch(0.31 0.0346 25)",
        "danger-interactive-active": "oklch(0.37 0.048 25)",
        "danger-interactive-focus": "oklch(0.58 0.1344 25)",
        "danger-fill": "oklch(0.65 0.192 25)",
        "danger-fill-hover": "oklch(0.72 0.1766 25)",
        "danger-fill-active": "oklch(0.78 0.1632 25)",
        "danger-text": "oklch(0.95 0.0608 25)",
        "danger-text-secondary": "oklch(0.76 0.0672 25)",
        "danger-text-muted": "oklch(0.62 0.0384 25)",
        "danger-on-fill": "oklch(0.15 0.0058 25)",
      },
    },
  }

  await fs.writeFile(
    path.join(OUTPUT_PATH, "styles", "karan.json"),
    JSON.stringify(karanStyleItem, null, 2)
  )
  await fs.writeFile(
    path.join(OUTPUT_PATH, "karan.json"),
    JSON.stringify(karanStyleItem, null, 2)
  )
  items.push(karanStyleItem)

  // 2. Build UI Components
  const uiDir = path.join(REGISTRY_PATH, "bases", "base", "ui")
  let files = []
  try {
    files = await fs.readdir(uiDir)
  } catch (err) {
    console.error("UI directory not found:", uiDir)
  }

  for (const file of files) {
    if (!file.endsWith(".tsx") && !file.endsWith(".ts")) continue
    if (file.startsWith("_")) continue

    const name = file.replace(/\.(tsx|ts)$/, "")
    const filePath = path.join(uiDir, file)
    const rawContent = await fs.readFile(filePath, "utf-8")
    const content = transformContentForRegistry(rawContent)

    const { dependencies, registryDependencies } = await extractDependencies(rawContent)
    const meta = COMPONENT_METADATA[name] || {
      title: name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " "),
      description: `karan-ui ${name} component built with Base UI.`,
    }

    const item = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name,
      type: "registry:ui",
      title: meta.title,
      description: meta.description,
      dependencies,
      registryDependencies,
      files: [
        {
          path: `ui/${file}`,
          content,
          type: "registry:ui",
          target: `components/ui/${file}`,
        },
      ],
    }

    await fs.writeFile(
      path.join(OUTPUT_PATH, `${name}.json`),
      JSON.stringify(item, null, 2)
    )
    items.push(item)
    console.log(`  ✓ Built component: ${name}`)
  }

  // 3. Write Master Index
  const indexPayload = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "karan-ui",
    homepage: "https://karan-ui.dev",
    items,
  }

  await fs.writeFile(
    path.join(OUTPUT_PATH, "index.json"),
    JSON.stringify(indexPayload, null, 2)
  )

  console.log(`\n🎉 Successfully built ${items.length} registry items into public/r/!`)
}

main().catch(err => {
  console.error("Registry build failed:", err)
  process.exit(1)
})
