# Karan UI — Component Modernization Roadmap & Execution Board

> **Phase**: Component Review & Modernization (Upgrading baseline components to modern standards)  
> **Execution Mode**: Autonomous AI Agent Loop (Queue-driven, verified in long turns)  
> **Primary Tracking File**: `TASK.md` | **Operating Protocol**: `AGENTS.md`

---

## 🏆 Modernized Reference Benchmark (Golden Standard)

The following components have been **fully modernized**. Their prop architecture, token wiring, Base UI integration, accessible contrast, and story patterns serve as the official standard for all remaining components:

| Component | Primitives & Standards Established | Status |
| :--- | :--- | :--- |
| **Button** | 5 variants, 6 semantic intents, 4-tier heights (`xs` to `lg`) + `icon-*` square sizes, 150ms tactile feedback, `leading`/`trailing`/`loading` affixes, `wide` auto-alignment. | `[x] Modernized` |
| **Button Group** | Context provider (`useButtonGroupContext`), attached mode with border-collapse (`-ms-px`), radius normalization. | `[x] Modernized` |
| **Toggle** | Base UI toggle, variants (`default`, `outline`, `tint`), button-aligned size scale + `icon-*` tiers. | `[x] Modernized` |
| **Toggle Group** | Attached/spaced toolbar modes, single/multi select, `ToggleGroupSeparator`, border collapse. | `[x] Modernized` |
| **Input** | 4-tier height scale (`xs` to `lg` — **no** `icon-*`), password peek toggle, file upload with browse button & clear, group context sync. | `[x] Modernized` |
| **Textarea** | Proportional typography, semantic focus rings, auto-size support, group context synchronization. | `[x] Modernized` |
| **Checkbox** | Base UI checkbox, indeterminate state support, proportional square indicators, semantic intent colors. | `[x] Modernized` |
| **Checkbox Group** | Group state provider, automatic parent indeterminate calculation, multi-selection syncing. | `[x] Modernized` |
| **Radio Group** | Accessible keyboard navigation, radio circle indicator, horizontal & vertical orientations. | `[x] Modernized` |
| **Switch** | Proportional 4-tier switch scale, spring thumb animation, semantic intent fills, accessible toggle. | `[x] Modernized` |
| **Slider** | Base UI slider, dual-thumb range support, tick marks, dynamic radius tokens, accessible drag & keyboard. | `[x] Modernized` |
| **Select** | Base UI select, custom scrollable popover, item icons, group separators, keyboard navigation. | `[x] Modernized` |
| **Card** | Header, Title, Description, Content, Footer slots, semantic intent borders/accents (`data-intent`). | `[x] Modernized` |
| **Field** | Multi-intent `FieldCaption` / `FormCaption` (`neutral`, `danger`, `success`, `warning`, `info`, `primary`), description spacing. | `[x] Modernized` |
| **Toast** | Native Base UI toast implementation (replacing legacy sonner), swipe dismissal, semantic intent icons. | `[x] Modernized` |
| **Theme Provider** | Dynamic OKLCH color engine, multi-accent selection, radius & spacing multipliers, typeset specs. | `[x] Modernized` |
| **Dialog** | Base UI dialog primitive sync, animated soft backdrop blur (`backdrop-blur-sm`), header/title/description/body/footer slot architecture, close button in header slot at `end-0`, and smooth scale-in transition (`ease-[cubic-bezier(0.22,1,0.36,1)]`). | `[x] Modernized` |
| **AlertDialog** | Destructive & urgent confirmation modal, accessible `alertdialog` role, prominent cancel/action button pairing with danger intent support, focus trap guarantees. | `[x] Modernized` |
| **Drawer** | Native Base UI touch/gesture drawer with swipe-to-dismiss handle, `floating: boolean = true` default mode, 6-way side positioning (`start`, `end`, `top`, `bottom`, `left`, `right`). | `[x] Modernized` |
| **Sheet** | Unified on Base UI drawer, `floating: boolean = true` default, smooth side sliding drawer panel on any edge, responsive viewport sizing. | `[x] Modernized` |
| **Popover** | Floating portal anchored to trigger with collision detection, arrow pointer, soft shadow tiering, low-visual-load padding, `appearance="default" \| "inverted"`. | `[x] Modernized` |
| **HoverCard** | Rich preview card with sighted user hover delay, accessible anchor positioning, smooth fade-in, and `appearance="default" \| "inverted"`. | `[x] Modernized` |
| **Tooltip** | Fast hover & keyboard focus micro-popup, always-inverted high contrast (`bg-neutral-text text-neutral-surface`), arrow pointer, 150ms spring easing. | `[x] Modernized` |

---

## 🎯 Active Sprint Queue: Overlays & Modals (Batch 1 Completed)

| Priority | Component | Target Scope & Objectives | Status |
| :--- | :--- | :--- | :--- |
| **P0** | **Dialog** | Base UI dialog primitive sync, animated soft backdrop blur (`backdrop-blur-sm`), header/title/description/body/footer slot architecture, close button with accessible contrast, and smooth scale-in transition (`ease-[cubic-bezier(0.22,1,0.36,1)]`). | `[x] Completed` |
| **P0** | **AlertDialog** | Destructive & urgent confirmation modal, accessible `alertdialog` role, prominent cancel/action button pairing with danger intent support, and focus trap guarantees. | `[x] Completed` |
| **P1** | **Sheet** | Side sliding drawer panel (left, right, top, bottom, start, end), smooth slide-in motion, responsive viewport sizing (`w-full sm:max-w-md`), unified drawer architecture, and `floating: boolean = true` default. | `[x] Completed` |
| **P1** | **Drawer** | Native Base UI touch/gesture drawer with swipe-to-dismiss handle, vaul-like bottom sheet behavior, responsive desktop modal fallback, and `floating: boolean = true` default. | `[x] Completed` |
| **P1** | **Popover** | Floating portal anchored to trigger with smart collision detection, arrow pointer, soft shadow tiering, low-visual-load padding, and `appearance="default" \| "inverted"`. | `[x] Completed` |
| **P2** | **Tooltip** | Instant hover & keyboard focus micro-popup, always-inverted high contrast (`bg-neutral-text text-neutral-surface`), collision avoidance, and optional arrow tip. | `[x] Completed` |
| **P2** | **HoverCard** | Rich preview card with sighted user hover delay, accessible anchor positioning, smooth fade-in, and `appearance="default" \| "inverted"`. | `[x] Completed` |

---

## 📋 Remaining Baseline Components (Catalog for Review & Upgrade)

Total Remaining in Repository: **32 components**

### Cluster 1: Overlays & Modals (7 Components) — [100% Complete]
- [x] **Dialog** — Modal window with animated backdrop blur, entry/exit scale transition, and header/content/footer slots.
- [x] **AlertDialog** — Interruptive modal for destructive actions, accessible alert role, keyboard trap.
- [x] **Sheet** — Slide-over panel (left, right, top, bottom, start, end), responsive slide animations.
- [x] **Drawer** — Mobile-friendly bottom drawer with swipe/drag gestures and responsive desktop fallback.
- [x] **Popover** — Floating rich content panel anchored to trigger with collision detection and arrow tip.
- [x] **Tooltip** — Fast hover/focus micro-popup with low visual load and accessible contrast.
- [x] **HoverCard** — Rich link preview popup with sighted hover delay and accessible anchor positioning.

### Cluster 2: Menus & Navigation (7 Components)
- [ ] **DropdownMenu** — Hierarchical flyout menu with submenus, checkbox/radio items, and Kbd shortcut labels.
- [ ] **ContextMenu** — Right-click context popup menu matching DropdownMenu visual tokens.
- [ ] **Menubar** — Desktop application top horizontal bar with nested dropdown menus.
- [ ] **NavigationMenu** — Top-level site navigation header with animated viewport indicator.
- [ ] **Breadcrumb** — Nav trail with customizable separators, current page marker, and ellipsis menu.
- [ ] **Pagination** — Page numbering with prev/next buttons matching Button sizing, compact responsive mode.
- [ ] **Tabs** — Underline, pill, and enclosed card tab styles with smooth active highlight transition.

### Cluster 3: Data Display & Layout (12 Components)
- [ ] **Table** — Semantic table with sticky headers, hover highlights, zebra striping, and row selection.
- [ ] **Calendar** — Date grid picker, single date, date range, and keyboard navigation.
- [ ] **Carousel** — Touch/swipe carousel built with Embla, dot indicators, and autoplay support.
- [ ] **Chart** — Recharts wrappers with OKLCH theme colors and low-visual-load tooltip cards.
- [ ] **Accordion** — Vertically stacked collapsible panels with animated height reveal and chevron rotation.
- [ ] **Collapsible** — Standalone expand/collapse primitive with smooth height animation.
- [ ] **CollapsibleSection** — Full-width header row with trailing chevron and container below.
- [ ] **Resizable** — Keyboard-accessible split layout panels with draggable divider handles.
- [ ] **ScrollArea** — Custom cross-browser scrollbar with hover-reveal track and radius harmonization.
- [ ] **Sidebar** — Desktop/mobile responsive navigation sidebar with collapsible rail and flyouts.
- [ ] **Item** — Flexible list item primitive with leading avatar/icon, title, subtitle, and trailing action.
- [ ] **Empty** — Empty state layout with illustration slot, headline, description, and action CTA.

### Cluster 4: Feedback & Surface Utilities (9 Components)
- [ ] **Alert** — Callout banner with semantic intents (`neutral`, `primary`, `success`, `warning`, `danger`, `info`) and low visual load.
- [ ] **Badge** — Pill and tag badges with semantic intent fills, subtle outlines, and dot indicators.
- [ ] **Progress** — Deterministic and indeterminate progress bar with semantic fills and size tiers.
- [ ] **Skeleton** — Soft shimmer placeholder shapes (circle, line, card block) for loading states.
- [ ] **Avatar** — Image with fallback initials, online/offline presence indicator, and stacked group cluster.
- [ ] **Separator** — Horizontal and vertical rules with optional centered text divider.
- [ ] **Kbd** — Keyboard keycap badge with clean monospace font and border contrast.
- [ ] **Label** — Form label with required asterisk and disabled opacity states.
- [ ] **AspectRatio** — Responsive container maintaining fixed aspect ratios (`16:9`, `4:3`, `1:1`).

### Cluster 5: Extended Input Primitives (4 Components)
- [ ] **Combobox** — Typeahead autocomplete with fuzzy search, async loading, and option groups.
- [ ] **Command** — Palette modal (`Cmd + K`) with search, categorized commands, and item shortcuts.
- [ ] **InputGroup** — Attached compound input with prefix/suffix addons, select dropdowns, and button triggers.
- [ ] **InputOTP** — Segmented one-time passcode inputs with cursor pulse and auto-advance.

---

## 🏛️ Curated UI/UX Decisions Log (Intent & System Standards)

### [DEC-001] Native Base UI Primitive Foundation
- **Decision**: Adopt `@base-ui/react` exclusively for all headless primitives. Completely replaced sonner with native Base UI toast.
- **Impact**: All registry components rely on Base UI without legacy Radix wrappers.

### [DEC-002] Mathematical OKLCH Color Engine & 6 Universal Intents
- **Decision**: Standardized 6 semantic intents across the system: `neutral`, `primary`, `success`, `warning`, `danger`, and `info`, calculated via OKLCH for perceptual lightness parity.
- **Impact**: All components use semantic variables (`--*-fill`, `--*-interactive`, `--*-surface`, `--*-text`).

### [DEC-003] Proportional Sizing & Dynamic Radius Multipliers
- **Decision**: Established 4-tier vertical height scale: `xs` (24px), `sm` (28px), `default` (32px), `lg` (36px). Curvature synchronizes to `--radius-*` tokens.
- **Impact**: Seamless vertical alignment across controls in toolbars and form layouts.

### [DEC-004] Ergonomic Affix Slots & Directional Alignment
- **Decision**: Provided first-class `leading`, `trailing`, and `loading` props on interactive elements. `wide` automatically anchors items (`ms-auto`/`me-auto`).
- **Impact**: Eliminates boilerplate layout wrappers and prevents loading layout shift.

### [DEC-005] Tactile Press Feedback & Attached Border Collapse
- **Decision**: 150ms minimum keyboard press timer, cubic-bezier easing, and `-ms-px` / `-mt-px` border collapse in `data-attached` groups.
- **Impact**: Grouped controls render as single solid toolbars with crisp 1px borders.

### [DEC-006] Generalized Multi-Intent Field Captions
- **Decision**: Deprecated rigid `FieldError` in favor of `FieldCaption` (aliased as `FormCaption`), supporting neutral hints, warnings, info, and errors.
- **Impact**: Forms convey multi-state feedback consistently without ad-hoc color classes.

### [DEC-007] True Story Source Extraction & Zero-Placeholder Workbench
- **Decision**: Banned hardcoded snippet strings. Wired `src/lib/story-source.ts` to dynamically extract live Storybook source code with interactive code toggle.
- **Impact**: Workbench previews are 100% truthful to underlying code.

### [DEC-008] Scoped Sizing: 'icon-*' Variants Restricted to Button-Like Controls
- **Context**: General inputs, textareas, cards, and containers do not have square icon variants and should not have `icon-*` size props.
- **Decision**: `icon-*` size tiers (`icon-xs`, `icon-sm`, `icon`, `icon-lg`) are strictly reserved for button-like interactive triggers (`Button`, `Toggle`, and icon action triggers). All other controls use standard proportional scale (`xs`, `sm`, `default`, `lg`).
- **Impact**: Clean, typed props without meaningless size options on inputs or data components.

### [DEC-009] Color Contrast Hierarchy & Visual Load Management
- **Context**: High contrast is essential for accessibility (WCAG AA/AAA), but over-saturating borders, high-contrast heavy fills, or stark pure-black outlines cause high visual fatigue and clutter.
- **Decision**: Maintain strict WCAG contrast for text and interactive indicators against surfaces, while keeping background surfaces, borders, and secondary states softly tiered using OKLCH chroma balance. Semantic intents use contextual subtle tinting in resting states and reserve full saturation for active/focused moments.
- **Impact**: Clean, modern, calm UI with low visual load, crystal-clear readability, and zero contrast issues in both dark and light modes.

### [DEC-010] Unified Drawer & Sheet Architecture with Floating Mode Default
- **Context**: Separate Sheet and Drawer primitives created duplicate code and required custom `className` overrides to prevent sheet content from sticking directly to screen edges.
- **Decision**: Unify `Sheet` on `@base-ui/react/drawer`. Add `floating: boolean = true` as default across Drawer and Sheet, rendering detached cards with margin and rounded corners while allowing `floating={false}` for edge-to-edge flush styling.
- **Impact**: Single unified codebase for sliding panels, native gesture drag-to-dismiss physics everywhere, and clean DX without repetitive CSS overrides.

### [DEC-011] Strict RTL/LTR Logical Coordinates & Header Close Button Standard
- **Context**: Hardcoded physical utilities (`left-2`, `right-2`, `pl-*`, `pr-*`) break layout when flipped to RTL. Additionally, having `noCloseButton` / `showCloseButton` spread across multiple layers cluttered overlay APIs.
- **Decision**: Ban all physical direction classes in favor of CSS logical properties (`start-*`, `end-*`, `ps-*`, `pe-*`, `ms-*`, `me-*`, `text-start`, `text-end`). Standardize the close button directly inside the header slot (`*Header`) positioned at `end-0`.
- **Impact**: Seamless bidirectional support for RTL and LTR languages with consistent header action layouts and streamlined prop APIs.

### [DEC-012] Borderless Dialog with Proportional Density & Explicit Header Close
- **Context**: Default dialog containers often enforced heavy 1px borders increasing visual clutter over dark backdrops. Automatic close button injection also removed consumer control over whether a close button was desired in custom modal layouts.
- **Decision**:
  1. Dialog content is borderless, elevated exclusively via `shadow-2xl` and backdrop contrast.
  2. Animations and transitions synchronize to shadcn's 200ms `zoom-in-95` / `zoom-out-95` and `fade-in-0` / `fade-out-0`.
  3. The close button is never automatically injected; consumers explicitly place `<DialogClose />` inside `<DialogHeader>` to dock it at `top-0 end-0`.
  4. The `size` prop (`sm`, `default`, `lg`, `xl`, `full`) drives proportional container padding (`p-4` to `p-10`), gap density (`gap-3` to `gap-6`), and title typography scale.
- **Impact**: Low-visual-load modal cards, explicit DX composability, and balanced optical density across all viewport tiers.

### [DEC-013] Borderless AlertDialog with Strict Start-Alignment & Proportional Density
- **Context**: `.cn-alert-dialog-header` previously had `place-items-center text-center`, causing the Title to render centered while the Description rendered start-aligned. The content container also had an unwanted 1px border.
- **Decision**:
  1. Strictly enforce start-alignment across all header elements (`AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription` all `text-start items-start`).
  2. Remove borders entirely from `AlertDialogContent`, elevating via `shadow-2xl` and dark backdrop.
  3. Adopt the identical proportional size scale (`sm` to `full`) for container padding (`p-4` to `p-10`), internal gap density, and title typography as `Dialog`.
  4. Synchronize entry/exit transitions to shadcn's 200ms `zoom-in-95` / `zoom-out-95` and `fade-in-0` / `fade-out-0`.
- **Impact**: Eliminates visual misalignment, ensures clean borderless presentation, and maintains complete token and padding parity with Dialog.

