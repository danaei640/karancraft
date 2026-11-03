# Contextual Component Layering & Color Harmony (`karan-ui`)

Solves low-contrast background muddiness and color disharmony when layering interactive components (such as secondary/outline/ghost `Button`, `Input`, `Badge`, `Select`, `Switch`, and dividers) inside tinted or colored containers like `Card`, `Alert`, and overlays.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions and CSS specifications govern the token and styling implementation:

- **Confirmed Decision 1 — Dynamic Surface-Relative Contrast (`color-mix`)**: Interactive background tokens (`--color-<intent>-interactive`, `--color-<intent>-interactive-hover`, `--color-<intent>-interactive-active`) dynamically blend in OKLCH space against a contextual `--current-surface` CSS variable using a deterministic nested `color-mix()` expression rather than relying on static lightness stops or a separate Radix-style alpha scale.
- **Confirmed Decision 2 — Non-Bypassing Intent Harmony via Base Token Aliasing**: Colored containers (`primary`, `info`, `success`, `warning`, `danger`) alias only the canonical base tokens (`--neutral-surface*`, `--neutral-fill*`, `--neutral-text*`, `--neutral-interactive-focus`, and the base anchor `--neutral-interactive-active`) to their corresponding `--<intent>-*` variables—never overwriting `--color-neutral-interactive*` with static values—so both hue harmony and dynamic `color-mix()` surface contrast are preserved simultaneously.
- **Confirmed Decision 3 — Registered `@property --current-surface` for Smooth Transitions**: `--current-surface` is formally registered via CSS `@property` (`syntax: '<color>'; inherits: true; initial-value: transparent;`) so interactive containers smoothly interpolate `--current-surface` and all descendant `color-mix()` backgrounds on hover/active states instead of snapping.
- **Confirmed Decision 4 — Single-Intent Subtree Scope**: Mixing conflicting explicit intents inside a colored container (e.g., an explicit `danger` button inside a `primary` tint card) is intentionally unsupported by design, keeping the CSS cascade pure and deterministic.

---

## 1. Overview & Core Concept

- **What It Solves**:
  1. **Same-Scale Lightness Compression**: Previously, `--<intent>-surface-alt` (`L=0.95` light / `0.195` dark) and `--<intent>-interactive` (`L=0.91` light / `0.25` dark) were fixed static stops. Placing a `secondary` Button, `Input`, or `Badge` inside a `tint` (`default`) Card reduced its background contrast delta by nearly half—and when hovering an `interactive` Card (`L=0.91`), child controls using `bg-*-interactive` (`L=0.91`) disappeared completely into the card background.
  2. **Neutral-on-Intent Color Clash**: Default child components (`Button variant="secondary"`, `Button variant="outline"`, `Input`, `Badge`, `Separator`) use `neutral` tokens. Inside a colored `Card` (`primary`, `info`, `success`, `warning`, `danger`), those gray controls clashed visually with the tinted surface.
- **Why Not a Separate Alpha Scale (Radix Approach)**:
  - A static 12-step translucent scale is calibrated against a single fixed page background (`surface`). When layered over `surface-alt` or an `interactive` hover surface, fixed alpha stops still lose perceptual contrast or shift chroma unpredictably, and require maintaining duplicate `-alpha` utility classes across every component.
- **Key Value**: Every component in `karan-ui` keeps its existing Tailwind utility classes (`bg-neutral-interactive`, `hover:bg-neutral-interactive-hover`, `text-neutral-text`, etc.) while automatically adapting both its **perceptual contrast depth** and **hue harmony** to any container it sits inside.

---

## 2. User Experience & Visual Design

- **Key Layering Scenarios Covered**:
  1. **Neutral Tinted Card (`<Card variant="default" intent="neutral">`)**:
     - Card sets `--current-surface` to its own background (`var(--neutral-surface-alt)`).
     - Child `secondary` Buttons, `Input` fields, `Select` triggers, `Badge`s, `Switch`es, and `TabsList`s automatically step their interactive backgrounds deeper in OKLCH contrast against `--current-surface`, remaining crisp and legible in both Light and Dark modes.
  2. **Colored Tinted or Outline Card (`<Card intent="primary | info | success | warning | danger">`)**:
     - Card aliases the canonical `--neutral-*` base tokens within its subtree to its own `<intent>` palette and sets `--current-surface` to match its variant (`var(--<intent>-surface-alt)` for `default`/`tint`, `var(--neutral-surface)` for `outline`).
     - Any default child component (`<Button variant="secondary">`, `<Button variant="outline">`, `<Button variant="ghost">`, `<Badge variant="secondary">`, `<Input>`, `<Separator>`) automatically adopts the parent Card's hue, text hierarchy, focus ring, and surface-relative `color-mix()` interactive contrast without requiring manual `intent="..."` props on every child.
  3. **Interactive Tinted Card (`<Card interactive variant="default">`) & Smooth `@property` Interpolation**:
     - `--current-surface` is registered in CSS via:
       ```css
       @property --current-surface {
         syntax: "<color>";
         inherits: true;
         initial-value: transparent;
       }
       ```
     - Interactive cards include `--current-surface` in their `transition-property` list (`transition-[background-color,color,border-color,box-shadow,--current-surface]`). When hovering or pressing an interactive Card, `--current-surface` interpolates smoothly alongside the card's hovered surface so nested badges, buttons, or chips transition seamlessly without discrete string snapping.
  4. **Other Elevated / Tinted Surfaces (`Alert`, `AccordionItem[data-open]`, `Dialog`, `Drawer`, `Sheet`, `Popover`, `SelectContent`)**:
     - Containers that render on `surface-alt` update `--current-surface` so controls nested inside modals, drawers, open accordion panels, and alerts enjoy the same stepped contrast.

- **Visual Identity & OKLCH Math**:
  - **Contrast & Chroma Anchor**:
    - For each intent, the contrast anchor is `color-mix(in oklch, var(--<intent>-interactive-active) 70%, var(--<intent>-text) 30%)` (`L ≈ 0.635` in light mode, `L ≈ 0.544` in dark mode, with rich gamut-clamped chroma `C ≈ 0.31 × maxChroma`).
  - **Root Canvas (`--current-surface: var(--neutral-surface)`)**:
    - Light mode (`L = 0.985`): `interactive` (78% surface / 22% anchor) resolves to `L ≈ 0.91`, `interactive-hover` (67% / 33%) to `L ≈ 0.87`, `interactive-active` (56% / 44%) to `L ≈ 0.83`.
    - Dark mode (`L = 0.15`): `interactive` resolves to `L ≈ 0.24`, `interactive-hover` to `L ≈ 0.28`, `interactive-active` to `L ≈ 0.33`.
  - **Inside Tinted Surface (`--current-surface: var(--<intent>-surface-alt)`)**:
    - Light mode (`L = 0.95`): `interactive` shifts down to `L ≈ 0.88`, `interactive-hover` to `L ≈ 0.846`, and `interactive-active` to `L ≈ 0.811`, preserving the full `ΔL ≈ 0.07` perceptual contrast step and rich intent chroma.
    - Dark mode (`L = 0.195`): `interactive` shifts up to `L ≈ 0.272`, `interactive-hover` to `L ≈ 0.31`, and `interactive-active` to `L ≈ 0.35`, preserving crisp elevation in dark mode.
  - **Outline Controls on Tinted Surfaces**:
    - `outline` Buttons and `outline` Inputs use `--current-surface` / `--neutral-surface` with `--color-neutral-interactive-hover` borders when nested inside tinted surfaces so bordered controls remain clearly delineated.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Two-Tier CSS Custom Property Architecture (Base Palette Vars -> Dynamic Theme Vars)**
  - *Chosen Approach*: Keep `--<intent>-*` from the palette generator as the canonical base tokens, register `@property --current-surface`, and resolve Tailwind's `--color-<intent>-interactive*` theme tokens via an explicit nested `color-mix(in oklch, ...)` formula against `var(--current-surface)`.
  - *Why*: Works with 100% of existing Tailwind utility classes (`bg-neutral-interactive`, `hover:bg-neutral-interactive-hover`, etc.) and live Theme Customizer updates (`useColorPalette`) with zero runtime JavaScript overhead during rendering.
  - *Alternatives Considered*: React Context propagation to every child primitive was rejected because it cannot style plain DOM elements, dividers, or third-party primitives and adds unnecessary client re-renders.

- **Decision 2: Non-Bypassing CSS Variable Aliasing on `[data-intent]` Containers**
  - *Chosen Approach*: Containers with `data-intent="primary | info | success | warning | danger"` alias **only** the canonical base tokens (`--neutral-surface`, `--neutral-surface-alt`, `--neutral-fill`, `--neutral-fill-hover`, `--neutral-fill-active`, `--neutral-text`, `--neutral-text-secondary`, `--neutral-text-muted`, `--neutral-on-fill`, `--neutral-interactive-focus`, and the base anchor `--neutral-interactive-active`) to their `--<intent>-*` counterparts. They **never** alias `--color-neutral-interactive*` directly to static `--<intent>-interactive*` values, ensuring `--color-neutral-interactive*` always computes through the dynamic `color-mix(in oklch, var(--current-surface) ..., ...)` pipeline using the aliased intent base tokens.
  - *Why*: Prevents circular CSS variable references and prevents static `--<intent>-interactive` tokens from bypassing the dynamic surface-relative `color-mix()` contrast calculation.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Token Flow Diagram

```
┌────────────────────────────────────────────────────────────────────────────┐
│                   1. CSS @property & Root Palette (:root / .dark)          │
│                                                                            │
│   @property --current-surface {                                            │
│     syntax: "<color>"; inherits: true; initial-value: transparent;         │
│   }                                                                        │
│   Generates 6 Sets × 13 Base Tokens (--neutral-*, --primary-*, etc.)       │
│   Sets root context: --current-surface: var(--neutral-surface);            │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                2. Container Layer (Card, Alert, Dialog, Accordion)         │
│                                                                            │
│  A. Surface Context Update (by data-variant & interactive state):          │
│     • variant="default" (tint) ──► --current-surface: var(--*-surface-alt) │
│     • interactive :hover       ──► --current-surface: var(--*-interactive) │
│     • interactive :active      ──► --current-surface:                      │
│                                      var(--*-interactive-hover)            │
│     • variant="outline"        ──► --current-surface: var(--*-surface)     │
│                                                                            │
│  B. Base-Only Intent Aliasing (when data-intent != "neutral"):             │
│     • --neutral-surface*            ──► var(--<intent>-surface*)           │
│     • --neutral-fill*               ──► var(--<intent>-fill*)              │
│     • --neutral-text*               ──► var(--<intent>-text*)              │
│     • --neutral-on-fill             ──► var(--<intent>-on-fill)            │
│     • --neutral-interactive-focus   ──► var(--<intent>-interactive-focus)  │
│     • --neutral-interactive-active  ──► var(--<intent>-interactive-active) │
│     (Does NOT overwrite --color-neutral-interactive* with static tokens)   │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│           3. Dynamic OKLCH Resolution (@theme inline / style-karan.css)    │
│                                                                            │
│  For every <intent> in (neutral, primary, info, success, warning, danger): │
│                                                                            │
│  • --color-<intent>-interactive:                                           │
│      color-mix(                                                            │
│        in oklch,                                                           │
│        var(--current-surface) 78%,                                         │
│        color-mix(                                                          │
│          in oklch,                                                         │
│          var(--<intent>-interactive-active) 70%,                           │
│          var(--<intent>-text) 30%                                          │
│        ) 22%                                                               │
│      )                                                                     │
│                                                                            │
│  • --color-<intent>-interactive-hover:                                     │
│      color-mix(                                                            │
│        in oklch,                                                           │
│        var(--current-surface) 67%,                                         │
│        color-mix(                                                          │
│          in oklch,                                                         │
│          var(--<intent>-interactive-active) 70%,                           │
│          var(--<intent>-text) 30%                                          │
│        ) 33%                                                               │
│      )                                                                     │
│                                                                            │
│  • --color-<intent>-interactive-active:                                    │
│      color-mix(                                                            │
│        in oklch,                                                           │
│        var(--current-surface) 56%,                                         │
│        color-mix(                                                          │
│          in oklch,                                                         │
│          var(--<intent>-interactive-active) 70%,                           │
│          var(--<intent>-text) 30%                                          │
│        ) 44%                                                               │
│      )                                                                     │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│        4. Child Components (Button, Input, Badge, Select, Switch, Tabs)    │
│    Consume --color-neutral-interactive* / --color-<intent>-interactive*    │
│    with automatic stepped contrast, full chroma & smooth hover transitions │
└────────────────────────────────────────────────────────────────────────────┘
```

### Interactive Component & Showcase Verification
- **Card Stories & Component Page (`/components/card`)**:
  - Update `Card.stories.tsx` to showcase layered child components (`Button` variants `default`, `secondary`, `outline`, `ghost`, `Badge`s, `Input`s, and dividers) inside `tint` (`default`), `outline`, and `ghost` cards across all 6 intents (`neutral`, `primary`, `info`, `success`, `warning`, `danger`), demonstrating automatic contrast and intent harmony with full "View Code" / "Hide Code" support.
- **Registry Synchronization**:
  - Rebuild all static registry JSON definitions (`scripts/build-registry.mjs`) so the updated CSS token architecture and stories stay in sync.
