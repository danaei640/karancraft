# Base UI Syntax & Shadcn UI Aesthetic Rule

## 1. Outdated Knowledge Warning & Zero-Radix Mandate
- **Internal Knowledge Is Outdated**: AI training data predominantly defaults to Radix UI and legacy shadcn patterns. Do NOT rely on internal training memory for UI primitive APIs, component anatomy, prop names, or state attributes.
- **Strictly No Radix UI**: This project does NOT use Radix UI. Imports from `@radix-ui/*` are strictly forbidden.
- **Primitive Engine**: The sole headless primitive foundation is **Base UI (`@base-ui/react`)**.

---

## 2. Mandatory Online Documentation Verification
Before creating, refactoring, or modifying ANY component, you **MUST actively check both online documentations**:

### A. Check Base UI Documentation
- **Source**: `https://base-ui.com/react/components/<component>` (or web search: `Base UI react <component> documentation`).
- **Inspect and Verify**:
  1. **Exact Component Anatomy**: Specific subcomponent names and namespaces (e.g. `import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"`).
  2. **Props & Handlers**: Prop names, controlled/uncontrolled conventions (e.g. `open`, `onOpenChange`, `defaultOpen`), and render composition.
  3. **Polymorphism**: Base UI uses the `render` prop (e.g. `<DialogPrimitive.Trigger render={<Button ... />} />`), **never** `asChild`.
  4. **State & Animation Attributes**: Exact CSS data attributes exposed by Base UI:
     - `data-open`, `data-closed` (replaces `data-[state=open|closed]`)
     - `data-starting-style`, `data-ending-style` (for CSS transitions without keyframes)
     - `data-side`, `data-align`, `data-popup-open`, `data-pressed`, `data-checked`
  5. **Anatomy Differences**: Note distinct Base UI elements such as `Popup`, `Backdrop`, `Positioner`, and `Arrow` (as opposed to Radix `Content` / `Overlay`).

### B. Check Shadcn UI Documentation
- **Source**: `https://ui.shadcn.com/docs/components/<component>` (or web search: `shadcn ui <component> documentation`).
- **Inspect and Verify**:
  1. **Visual Design & Aesthetics**: Typography, padding, border radius, elevation/shadows, borders, and color contrasts.
  2. **Slot Structure & Composition**: Developer ergonomics and exported subcomponents (e.g. `*Header`, `*Title`, `*Description`, `*Content` / `*Body`, `*Footer`, `*Action`, `*Cancel`, `*Close`).
  3. **Data Slots**: Maintain `data-slot="<component-slot>"` attributes on every exported subcomponent for consistent styling hooks.
  4. **Component Ergonomics**: Intuitive defaults, convenient compound slots, and responsive layouts.

---

## 3. Dual Architecture: Base UI Syntax + Shadcn UI Aesthetic

```
┌─────────────────────────────────────────────────────────────┐
│                       Karan UI Component                    │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                 UI Layer: Shadcn                    │   │
│   │  • Visual look & feel, padding, typography, border  │   │
│   │  • Ergonomic slot architecture (Header/Body/Footer) │   │
│   │  • CVA styling recipes & tokens (OKLCH variables)   │   │
│   │  • data-slot attributes                             │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │             Syntax & Primitives: Base UI            │   │
│   │  • @base-ui/react headless primitives               │   │
│   │  • render prop polymorphism (no asChild)            │   │
│   │  • data-open, data-closed, data-starting-style      │   │
│   │  • Base UI Popover/Popup/Backdrop/Positioner        │   │
│   │  • Zero @radix-ui/* dependencies                    │   │
│   └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Implementation Rules
1. **Headless Syntax**: Always import and wrap `@base-ui/react` primitives. Follow Base UI typing conventions (e.g. `DialogPrimitive.Root.Props`, `DialogPrimitive.Popup.Props`).
2. **Visual Styling**: Match Shadcn's modern aesthetic, wired into project tokens (`--neutral-surface`, `--neutral-text`, `--primary-fill`, `--neutral-interactive`, etc.).
3. **No Legacy Patterns**: Never assume Radix attributes, Radix naming, or legacy Tailwind classes.
4. **Verification Step**: Always run `pnpm exec tsc --noEmit` and `node scripts/build-registry.mjs` to ensure types and registry sync cleanly.
