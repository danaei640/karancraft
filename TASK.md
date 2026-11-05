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
| **Drawer** | Native Base UI touch/gesture drawer with swipe handle and physics (`floating={true}` default), converts to shadcn sheet when `floating={false}`. Complete slot composition (`DrawerHeader`, `DrawerContent`, `DrawerBody`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, `DrawerClose`). | `[x] Modernized` |
| **Sheet** | Built on unified Drawer, defaulting to `floating={false}` and `side="right"`, exact shadcn sheet transitions (300ms/500ms slide), flush docked edges with border along docked edge, and full slot composition. | `[x] Modernized` |
| **Popover** | Floating portal anchored to trigger with smart collision detection, Base UI pseudo-element arrow pointer (`withArrow`), shadcn animations, and crisp `border border-neutral-interactive/80`. | `[x] Modernized` |
| **HoverCard** | Rich preview card with hover delay, Base UI pseudo-element arrow pointer (`withArrow`), shadcn animations, and crisp `border border-neutral-interactive/80` (single neutral surface mode). | `[x] Modernized` |
| **Tooltip** | Fast hover & keyboard focus micro-popup, always-inverted high contrast (`bg-neutral-text text-neutral-surface`), Base UI pseudo-element arrow pointer (`withArrow`), 150ms spring easing. | `[x] Modernized` |
| **DropdownMenu** | Fluent UI v9 inspired multi-slot items (`icon`, `subText`, `secondaryContent`, `shortcut`), 3-tier density context (`sm`, `default`, `lg`), gutter synchronization, RTL mirrored chevrons. | `[x] Modernized` |
| **ContextMenu** | Pointer-anchored context menu sharing identical item slot architecture, sizing scale, and token wiring with DropdownMenu. | `[x] Modernized` |
| **Menubar** | Desktop command bar coordinating top-level horizontal triggers with nested dropdown menus, checkbox items, and radio groups across 3 height scales. | `[x] Modernized` |
| **Tabs** | 3 styling variants (`default` pill, `line` underline, `enclosed` card), vertical orientation (`border-e-2` indicator), leading icon slots, and proportional sizing context. | `[x] Modernized` |
| **Breadcrumb** | Navigational trail with proportional typography context (`sm`, `default`, `lg`), leading icon slots on links/pages, and dropdown ellipsis integration. | `[x] Modernized` |
| **Pagination** | Page navigation bar supporting proportional button sizing (`icon-xs` to `icon-lg`), responsive previous/next text labels, and bidirectional RTL arrow flipping. | `[x] Modernized` |
| **NavigationMenu** | Site navigation header with animated morphing viewport dimensions, rotating chevrons, and rich card flyouts. | `[x] Modernized` |

---

## 🎯 Active Sprint Queue: Overlays & Modals (Batch 1 Completed)

| Priority | Component | Target Scope & Objectives | Status |
| :--- | :--- | :--- | :--- |
| **P0** | **Dialog** | Base UI dialog primitive sync, animated soft backdrop blur (`backdrop-blur-sm`), header/title/description/body/footer slot architecture, close button with accessible contrast, and smooth scale-in transition (`ease-[cubic-bezier(0.22,1,0.36,1)]`). | `[x] Completed` |
| **P0** | **AlertDialog** | Destructive & urgent confirmation modal, accessible `alertdialog` role, prominent cancel/action button pairing with danger intent support, and focus trap guarantees. | `[x] Completed` |
| **P1** | **Sheet** | Side sliding drawer panel (left, right, top, bottom, start, end), smooth 300ms/500ms slide motion, responsive viewport sizing (`w-full sm:max-w-md`), unified drawer architecture, and `floating: boolean = false` docked default with border. | `[x] Completed` |
| **P1** | **Drawer** | Native Base UI touch/gesture drawer with swipe-to-dismiss handle, gesture physics, responsive desktop modal fallback, and `floating: boolean = true` default converting to sheet when `false`. | `[x] Completed` |
| **P1** | **Popover** | Floating portal anchored to trigger with smart collision detection, working Base UI pseudo-element arrow pointer (`withArrow`), soft shadow tiering, low-visual-load padding, and restored shadcn border. | `[x] Completed` |
| **P2** | **Tooltip** | Instant hover & keyboard focus micro-popup, always-inverted high contrast (`bg-neutral-text text-neutral-surface`), collision avoidance, and working Base UI pseudo-element arrow tip (`withArrow`). | `[x] Completed` |
| **P2** | **HoverCard** | Rich preview card with sighted user hover delay, accessible anchor positioning, smooth fade-in, working Base UI pseudo-element arrow tip (`withArrow`), and restored shadcn border. | `[x] Completed` |

---

## 📋 Remaining Baseline Components (Catalog for Review & Upgrade)

Total Remaining in Repository: **25 components**

### Cluster 1: Overlays & Modals (7 Components) — [100% Complete]
- [x] **Dialog** — Modal window with animated backdrop blur, entry/exit scale transition, and header/content/footer slots.
- [x] **AlertDialog** — Interruptive modal for destructive actions, accessible alert role, keyboard trap.
- [x] **Sheet** — Slide-over panel (left, right, top, bottom, start, end), responsive slide animations.
- [x] **Drawer** — Mobile-friendly bottom drawer with swipe/drag gestures and responsive desktop fallback.
- [x] **Popover** — Floating rich content panel anchored to trigger with collision detection and arrow tip.
- [x] **Tooltip** — Fast hover/focus micro-popup with low visual load and accessible contrast.
- [x] **HoverCard** — Rich link preview popup with sighted hover delay and accessible anchor positioning.

### Cluster 2: Menus & Navigation (7 Components) — [100% Complete]
- [x] **DropdownMenu** — Hierarchical flyout menu with submenus, checkbox/radio items, and Kbd shortcut labels.
- [x] **ContextMenu** — Right-click context popup menu matching DropdownMenu visual tokens.
- [x] **Menubar** — Desktop application top horizontal bar with nested dropdown menus.
- [x] **NavigationMenu** — Top-level site navigation header with animated viewport indicator.
- [x] **Breadcrumb** — Nav trail with customizable separators, current page marker, and ellipsis menu.
- [x] **Pagination** — Page numbering with prev/next buttons matching Button sizing, compact responsive mode.
- [x] **Tabs** — Underline, pill, and enclosed card tab styles with smooth active highlight transition.

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

### [DEC-010] Unified Drawer & Sheet Architecture with Floating vs Docked Modes
- **Context**: Separate Sheet and Drawer implementations led to duplication and confusion over swipe physics vs edge docking.
- **Decision**: Unify `Sheet` and `Drawer` into a single, cohesive drawer primitive:
  1. `Drawer` defaults to `floating={true}` (shadcn drawer style with touch swipe handle, rounded card margins, swipe physics, and bottom positioning by default).
  2. Setting `floating={false}` immediately converts the component to shadcn sheet style (flush docked against screen edges with border along docked edge, no swipe handle, and exact 300ms/500ms slide transitions).
  3. `Sheet` is re-exported as `Drawer` with `floating={false}` and `side="right"` default.
  4. Both share complete slot composition: `DrawerHeader` (with close button positioned at `top-4 end-4`), `DrawerContent`, `DrawerBody`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, and `DrawerClose`.
- **Impact**: Single unified codebase for sliding and drawer panels, seamless DX when switching between docked sheet and floating gesture drawer, and exact shadcn animations.

### [DEC-011] Strict RTL/LTR Logical Coordinates & Header Close Button Standard
- **Context**: Hardcoded physical utilities (`left-2`, `right-2`, `pl-*`, `pr-*`) break layout when flipped to RTL. Additionally, having `noCloseButton` / `showCloseButton` spread across multiple layers cluttered overlay APIs.
- **Decision**: Ban all physical direction classes in favor of CSS logical properties (`start-*`, `end-*`, `ps-*`, `pe-*`, `ms-*`, `me-*`, `text-start`, `text-end`). Standardize the close button directly inside the header slot (`*Header`) positioned at `end-0`.
- **Impact**: Seamless bidirectional support for RTL and LTR languages with consistent header action layouts and streamlined prop APIs.

### [DEC-012] Borderless Dialog with Proportional Density & Single Icon Close
- **Context**: Enforcing borders increased visual clutter over modal backdrops. Furthermore, hardcoding absolute positioning on `DialogClose` caused footer actions to overlap with top-corner close buttons.
- **Decision**:
  1. Dialog content is borderless, elevated exclusively via `shadow-2xl` and backdrop contrast.
  2. Single built-in icon close button (`✕`) rendered at `top-3 end-3` / `sm:top-4 sm:end-4` (`showCloseButton={true}` by default). No text "Close" button at top.
  3. `DialogClose` remains an unstyled Base UI primitive wrapper so it can be used naturally in footers (e.g. Cancel button) without breaking document flow.
  4. Animations and transitions synchronize to shadcn's 200ms `zoom-in-95` / `zoom-out-95` and `fade-in-0` / `fade-out-0`.
  5. The `size` prop (`sm`, `default`, `lg`, `xl`, `full`) drives proportional container padding (`p-4` to `p-10`), gap density (`gap-3` to `gap-6`), and title typography scale.
- **Impact**: Zero overlapping close buttons, clean borderless aesthetics, and robust composition.

### [DEC-013] Borderless AlertDialog with Strict Start-Alignment & Proportional Density
- **Context**: `.cn-alert-dialog-header` previously had `place-items-center text-center`, causing the Title to render centered while the Description rendered start-aligned. The content container also had an unwanted 1px border.
- **Decision**:
  1. Strictly enforce start-alignment across all header elements (`AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription` all `text-start items-start`).
  2. Remove borders entirely from `AlertDialogContent`, elevating via `shadow-2xl` and dark backdrop.
  3. Adopt the identical proportional size scale (`sm` to `full`) for container padding (`p-4` to `p-10`), internal gap density, and title typography as `Dialog`.
  4. Synchronize entry/exit transitions to shadcn's 200ms `zoom-in-95` / `zoom-out-95` and `fade-in-0` / `fade-out-0`.
- **Impact**: Eliminates visual misalignment, ensures clean borderless presentation, and maintains complete token and padding parity with Dialog.

### [DEC-014] Popover/HoverCard Shadcn Borders & Base UI CSS Arrow Standard
- **Context**: Floating micro-overlays (`Popover`, `HoverCard`) without borders lacked edge definition on light surfaces. Base UI `<Arrow>` was also failing to render because Base UI provides an empty `<div>` with `data-side` rather than an SVG.
- **Decision**:
  1. Restore shadcn styling on `Popover` and `HoverCard` with crisp `border border-neutral-interactive/80`, `shadow-md`, and standard neutral surface `bg-neutral-surface`. Removed unnecessary `appearance` variants from `HoverCard`.
  2. Standardize Base UI CSS pseudo-element geometry across all arrow-capable primitives (`Tooltip`, `Popover`, `HoverCard`): popup container set to `relative`, rotated diamond arrow element positioned at `-top-1.25` / `-bottom-1.25` / `-left-1.25` / `-right-1.25` with directional border resets and `inline-start` / `inline-end` support.
  3. Dialog and AlertDialog remain strictly borderless, relying on deep `shadow-2xl` and backdrop contrast.
- **Impact**: Pixel-perfect pointing arrows with matching border and background on tooltips, popovers, and hover cards, with clear edge definition matching shadcn.

### [DEC-015] Fluent UI-Inspired Menu Slot Architecture & Density Synchronization
- **Context**: Menu items (`DropdownMenu`, `ContextMenu`, `Menubar`) previously required verbose nested `<span>` tags for icons, shortcut badges, and descriptors. Items without icons also suffered from misaligned text baselines next to items with icons.
- **Decision**:
  1. Adopt Fluent UI v9 inspired multi-slot item architecture: first-class `icon`, `subText` (multiline subtitle), `secondaryContent`, and `shortcut` props on `DropdownMenuItem`, `ContextMenuItem`, and `MenubarItem`.
  2. Implement `DropdownMenuDensityContext` providing 3-tier density scale (`sm`, `default`, `lg`), `hasIcons` gutter reservation, and `hasCheckmarks` alignment.
  3. Strict RTL logical coordinates: logical padding (`ps-2` / `pe-2`, `ps-7` with icon gutter), `ms-auto` for secondary content / shortcuts, and `cn-rtl-flip` for submenu arrows.
- **Impact**: Clean ergonomic DX, zero boilerplate layout wrappers, and consistent text baseline alignment across mixed menu items.

### [DEC-016] Tabs Multi-Variant Matrix & Bidirectional Indicator Alignment
- **Context**: Tabs only supported a single default pill style, lacked proportional density scaling, and could not be oriented vertically without custom CSS overrides.
- **Decision**:
  1. Provide 3 first-class stylistic variants: `default` (floating pill highlight), `line` (active underline), and `enclosed` (elevated card segmented container).
  2. Standardize 3 proportional height tiers (`sm` 32px, `default` 36px, `lg` 40px) with typography scaling and icon slot synchronization on `TabsTrigger`.
  3. Support `orientation="vertical"` with bidirectional inline indicator alignment (`border-e-2 data-[active]:border-primary-fill -me-px pe-3`).
- **Impact**: Complete flexibility for dashboard side navigation, settings panels, and card-based code/preview switchers.

### [DEC-017] Proportional Navigation Scaling & RTL Chevron Flipping
- **Context**: `Breadcrumb` and `Pagination` had inconsistent sizing that did not align with `Button` sizes or `IconPlaceholder` systems, and chevron arrows failed to flip in RTL layouts.
- **Decision**:
  1. `Breadcrumb` provides `size` context (`sm`, `default`, `lg`) driving text, separator icons, and leading `icon` affixes on `BreadcrumbLink` and `BreadcrumbPage`.
  2. `Pagination` supports 4 size tiers (`xs`, `sm`, `default`, `lg`) where `PaginationLink` automatically synchronizes to button icon sizes (`icon-xs` to `icon-lg`), and Previous/Next buttons use responsive logical padding (`ps-2! pe-3!`).
  3. All navigational chevrons in `Breadcrumb`, `Pagination`, and `NavigationMenu` use `cn-rtl-flip` for native bidirectional layout flipping.
- **Impact**: System-wide proportional sizing harmony between buttons and navigation controls with robust RTL support.



