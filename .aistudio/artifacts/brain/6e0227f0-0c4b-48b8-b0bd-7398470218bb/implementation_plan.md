# Button Component & `/components/button` Workbench Plan

This plan refines the **Button** component's styling, prop architecture, and corner-radius progression while upgrading the `/components/button` interactive workbench with live state toggles (`loading`, `disabled`), cleaner story showcases, and complete integration documentation.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and design decisions were confirmed during clarification and govern this implementation:

- **Confirmed Decision 1 — Variant & Intent Consolidation**: Remove `destructive` from `variant` (`default | secondary | outline | ghost | link`) and consolidate destructive/error actions under `intent="danger"` across all variants.
- **Confirmed Decision 2 — Proportional Corner Radius Across Sizes**: Scale corner radii progressively across button sizes (`xs` / `icon-xs` → `rounded-md`, `sm` / `icon-sm` → `rounded-xl`, `default` / `icon` → `rounded-2xl`, `lg` / `icon-lg` → `rounded-4xl`) so every size shares a cohesive visual curvature relative to its height.
- **Confirmed Decision 3 — Smart Default Intent Resolution**: When no `intent` prop is explicitly provided, `variant="default"` resolves to `primary` intent, while `secondary`, `outline`, `ghost`, and `link` resolve to `neutral` intent by default (and adopt semantic colors when `intent` is explicitly passed).
- **Confirmed Decision 4 — `/components/button` Workbench & Guide**: Add interactive `loading` and `disabled` state toggles to the Canvas workbench alongside a complete **Usage Guide** tab (`Props Specification`, `Features & Implementation Recipes`, `API Reference`, and `Best Practices`).

---

## 1. Overview & Core Concept

- **What It Does**: Provides a foundational, token-driven `Button` primitive built on `@base-ui/react/button` that cleanly separates **structural emphasis** (`variant`) from **semantic color meaning** (`intent`), paired with a dedicated interactive playground and documentation experience at `/components/button`.
- **Target Audience / Persona**: Design system engineers and frontend developers inspecting, customizing, and copying production-ready button patterns from the Karan UI registry.
- **Key Value**: Eliminates redundant overlapping props (`variant="destructive"` vs `intent="danger"`), prevents unintended primary-color tinting on secondary/outline/ghost buttons when no intent is specified, harmonizes border radii across all four size tiers, and provides first-class `loading` and `disabled` interactive previews.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Interactive Canvas Exploration (`/components/button` → Canvas Tab)**:
   - Users toggle `variant` (`default`, `secondary`, `outline`, `ghost`, `link`), `intent` (`auto (default)`, `primary`, `neutral`, `success`, `info`, `danger`), `size` (`xs`, `sm`, `default`, `lg`, `icon-xs`, `icon-sm`, `icon`, `icon-lg`), `align` (`start`, `center`, `end`), `wide` (`boolean`), `loading` (`boolean`), and `disabled` (`boolean`).
   - Toggling `loading` automatically displays an inline spinner in the leading slot and disables pointer activation while preserving layout width and alignment.
   - Live JSX code generation at the bottom of the canvas updates immediately to reflect only non-default props for clean copy-paste output.
2. **Usage Guide Inspection (`/components/button` → Usage Guide Tab)**:
   - Users review the structured **Props Specification** table, copy multi-step implementation recipes (Semantic Intents, Progressive Sizes & Radii, Leading/Trailing Affixes & `icon` Alias, Full-Width & Alignment, and Async Loading States), and inspect exported TypeScript symbols.
3. **Curated Story Gallery (`/components/button` → Stories Tab)**:
   - Users browse side-by-side live stories for Default, Semantic Intents, Variants (Secondary, Outline, Ghost, Link), Proportional Size & Radius Scale, Leading & Trailing Slots, Wide & Alignment, and Loading / Disabled states, each with one-click code copying.

### Visual Identity & Theme
- **Proportional Corner Radius Math**:
  Instead of forcing a single `rounded-4xl` (`26px`) pill radius onto taller buttons while dropping `xs` abruptly to `10px`, button corner radii scale smoothly with button height using the theme's `--radius` token multiplier:
  - `xs` / `icon-xs` (`h-6` / `24px`): `rounded-md` (`calc(var(--radius) * 0.8)` → `8px` at `1x`)
  - `sm` / `icon-sm` (`h-8` / `32px`): `rounded-xl` (`calc(var(--radius) * 1.4)` → `14px` at `1x`)
  - `default` / `icon` (`h-9` / `36px`): `rounded-2xl` (`calc(var(--radius) * 1.8)` → `18px` at `1x`)
  - `lg` / `icon-lg` (`h-10` / `40px`): `rounded-4xl` (`calc(var(--radius) * 2.6)` → `26px` at `1x`)
- **60-30-10 Color & Intent Discipline**:
  - **Default Intent Behavior**:
    - `variant="default"` (without explicit `intent`) → `primary` high-contrast fill (`bg-primary-fill text-primary-on-fill`).
    - `variant="secondary" | "outline" | "ghost" | "link"` (without explicit `intent`) → `neutral` structural surface and text tokens (`bg-neutral-interactive`, `border-neutral-interactive`, `text-neutral-text`).
  - **Explicit Intent Override**: Passing `intent="primary" | "neutral" | "success" | "info" | "danger"` applies the corresponding 13-token OKLCH scale (`fill`, `interactive`, `interactive-hover`, `interactive-active`, `interactive-focus`, `text`, `on-fill`) tailored to the active `variant` in both Light and Dark modes.
- **Interactive Feedback & Motion**:
  - **Zero Vertical Shift on Press**: Active press uses semantic surface/focus color shifts (`active:bg-{intent}-interactive-focus` on solid fills, `active:bg-{intent}-interactive-active` on secondary/outline/ghost) with zero `translate-y` movement.
  - **Settling Curve**: All color, border, and ring transitions settle over `200ms` with `cubic-bezier(0.22, 1, 0.36, 1)`.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Removing `destructive` from `variant` & Unifying under `intent="danger"`**
  - *Chosen Approach*: `variant` strictly controls structural presentation (`default`, `secondary`, `outline`, `ghost`, `link`), while `intent` controls semantic color (`primary`, `neutral`, `success`, `info`, `danger`).
  - *Why*: Having `destructive` in both `variant` and `intent` created ambiguous combinations (such as `<Button variant="destructive" intent="success">`). Using `intent="danger"` allows a danger action to be rendered as a solid primary CTA (`variant="default" intent="danger"`), a soft surface button (`variant="secondary" intent="danger"`), an outlined button (`variant="outline" intent="danger"`), or a subtle ghost action (`variant="ghost" intent="danger"`).
  - *Alternatives Considered*: Keeping `variant="destructive"` as a legacy alias was rejected because it clutters the workbench controls and blurs the mental model between structure and color.

- **Decision 2: Smart Default Intent (`primary` for `default` variant, `neutral` for others)**
  - *Chosen Approach*: Leave `intent` optional (`undefined` by default). Internally resolve `const resolvedIntent = intent ?? (variant === "default" ? "primary" : "neutral")`.
  - *Why*: Previously, setting `intent="primary"` as a static default caused `secondary`, `outline`, and `ghost` buttons to appear blue/tinted instead of clean neutral gray unless the developer manually passed `intent="neutral"`. Resolving the default intent based on `variant` matches developer intuition out of the box.

- **Decision 3: Progressive Size-to-Radius Scale (`md` → `xl` → `2xl` → `4xl`)**
  - *Chosen Approach*: Bind each size variant to a stepped radius token from `--radius-md` through `--radius-4xl` rather than applying a blanket `rounded-4xl` on `.cn-button`.
  - *Why*: Keeps optical corner curvature consistent across `24px`, `32px`, `36px`, and `40px` button heights and scales proportionally when the user adjusts the global Corner Radius slider in Theme Studio.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        /components/button Workbench                       │
│                                                                           │
│  ┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────┐  │
│  │   Usage Guide Tab   │   │  Interactive Canvas │   │   Stories Tab   │  │
│  │  • Summary & CLI    │   │  • Viewport Switch  │   │  • Default      │  │
│  │  • Props Spec Table │   │  • Live JSX Preview │   │  • Intents      │  │
│  │  • 5 Code Recipes   │   │  • Prop Controls:   │   │  • Variants     │  │
│  │  • API Reference    │   │    variant, intent, │   │  • Sizes/Radii  │  │
│  │  • Best Practices   │   │    size, align,     │   │  • Affixes      │  │
│  └──────────┬──────────┘   │    wide, loading,   │   │  • Wide & Align │  │
│             │              │    disabled, text   │   │  • States       │  │
│             │              └──────────┬──────────┘   └────────┬────────┘  │
└─────────────┼─────────────────────────┼───────────────────────┼───────────┘
              │                         │                       │
              ▼                         ▼                       ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                         Button Primitive & CVA Engine                     │
│                                                                           │
│  1. Prop Resolution:                                                      │
│     • resolvedVariant = variant ?? "default"                              │
│     • resolvedIntent  = intent ?? (resolvedVariant === "default"          │
│                                    ? "primary" : "neutral")               │
│     • leadingNode     = loading ? <Spinner /> : (leading ?? icon)         │
│                                                                           │
│  2. Style Matrix:                                                         │
│     • INTENT_VARIANT_CLASSES[resolvedIntent][resolvedVariant]             │
│     • Size Radius Scale:                                                  │
│       xs / icon-xs ──► rounded-md    default / icon ──► rounded-2xl       │
│       sm / icon-sm ──► rounded-xl    lg / icon-lg   ──► rounded-4xl       │
│                                                                           │
│  3. Base UI Render (@base-ui/react/button):                               │
│     • data-slot="button" | data-variant | data-intent | data-size         │
│     • [data-slot="button-leading"] + children + [data-slot="button-trailing"]│
└───────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State
- **`ButtonVariant`**: `'default' | 'secondary' | 'outline' | 'ghost' | 'link'`
- **`ButtonIntent`**: `'primary' | 'neutral' | 'success' | 'info' | 'danger'`
- **`ButtonSize`**: `'xs' | 'sm' | 'default' | 'lg' | 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg'`
- **`ButtonAlign`**: `'start' | 'center' | 'end'`
- **Additional Behavioral Props**:
  - `wide?: boolean` (`flex w-full` vs `inline-flex`)
  - `leading?: React.ReactNode` and `icon?: React.ReactNode` (alias for `leading`)
  - `trailing?: React.ReactNode`
  - `loading?: boolean` (renders an animated `Loader2` spinner in the leading slot, sets `aria-busy="true"`, and disables button activation)

### Interactive Component & State Mapping
- **Canvas Prop Controls → Live Button**:
  - Selecting `intent: "auto"` (or empty default in Canvas) lets `Button` automatically use `primary` for `default` variant and `neutral` for `secondary`, `outline`, `ghost`, and `link`. Selecting an explicit intent (`primary`, `neutral`, `success`, `info`, `danger`) overrides the color palette across any selected variant.
  - Toggling `loading` in the Canvas immediately renders the spinner inside `data-slot="button-leading"` and updates the generated JSX snippet (`<Button loading>...</Button>`).
  - Any existing references to `variant="destructive"` in stories or other components are migrated to `intent="danger"` so the entire registry compiles cleanly with zero TypeScript errors.
