# Karan UI — Autonomous Task Roadmap & Execution Queue

> **Phase**: Component Development, Enhancement & Token Harmonization  
> **Execution Mode**: Autonomous AI Agent Loop (Multi-Step Long Turns, Zero Micro-Yields)  
> **Primary Tracking File**: `TASK.md` | **Agent Operating Protocol**: `AGENTS.md`

---

## 🤖 Autonomous AI Loop Protocol

When initiating a turn, the AI agent must operate under **long, self-directed turns**:
1. **Consult the Active Queue**: Look at the current uncompleted items under **Active Sprint Queue** below.
2. **Execute Full 4-Phase Lifecycle**: Complete all sub-steps (Phase A: API/Props, Phase B: Tokens/Styles, Phase C: Stories/Canvas, Phase D: Registry/Meta) without halting midway.
3. **Continuous Verification**: Execute `pnpm exec tsc --noEmit` and `node scripts/build-registry.mjs` before marking any item completed.
4. **Update `TASK.md`**: Mark the completed checkboxes `[x]` and log any high-signal design decision in the **UI/UX Decisions Log**.
5. **Autonomously Advance**: Proceed immediately to the next queued component in the active batch during the same turn. Do **not** yield to ask "Should I continue?" or "What next?". Only yield when the active batch is finished, or if a hard blocking ambiguity arises.

---

## 🎯 Active Sprint Queue (Next Up for Autonomous Processing)

| Priority | Component | Cluster | Target Objective | Status |
| :--- | :--- | :--- | :--- | :--- |
| **P0** | **Input** | Actions & Inputs | Add size scale (`xs`, `sm`, `default`, `lg`), `leading`/`trailing` affixes, clear button, and intent validation rings | `[ ] Queued` |
| **P0** | **Textarea** | Actions & Inputs | Align with Input sizing, semantic intents, autosize options, and field caption synergy | `[ ] Queued` |
| **P1** | **Checkbox & CheckboxGroup** | Actions & Inputs | Base UI primitive sync, indeterminate states, cards/list layouts, and semantic intent rings | `[ ] Queued` |
| **P1** | **RadioGroup** | Actions & Inputs | Card item variants, indicator animations, keyboard navigation, and attached toolbar styles | `[ ] Queued` |
| **P1** | **Switch** | Actions & Inputs | 4-tier sizing scale (`xs` to `lg`), inline icons in thumb/track, and semantic intent colors | `[ ] Queued` |
| **P2** | **Slider** | Actions & Inputs | Multi-thumb range, step marks, tooltip value popups, and radius integration | `[ ] Queued` |

---

## 📋 Hierarchical Component Enhancement Roadmap

Legend: `[x]` Completed | `[/]` In Progress | `[ ]` Queued | `[-]` Deferred

### 1. Actions & Inputs
- [x] **Button**
  - [x] Phase A: Standardize 5 variants (`default`, `outline`, `secondary`, `ghost`, `link`) and 6 intents (`neutral`, `primary`, `success`, `warning`, `danger`, `info`).
  - [x] Phase B: Proportional 4-tier sizing (`xs`, `sm`, `default`, `lg`, plus `icon-*` equivalents) and tactile 150ms press feedback.
  - [x] Phase C: Storybook stories covering variants, intents, affixes, wide alignment, and loading states.
  - [x] Phase D: Registered in `components-meta.ts` and `scripts/build-registry.mjs`.
- [x] **Toggle & ToggleGroup**
  - [x] Phase A: Base UI `@base-ui/react/toggle` integration with variants (`default`, `outline`, `tint`) and sizing matching Button.
  - [x] Phase B: Attached contiguous group mode with collapsed inner borders (`-ms-px` / `-mt-px`), rounded corner normalization, and `ToggleGroupSeparator`.
  - [x] Phase C: Rich stories for single selection, multiple selection, orientations, sizes, and toolbar scenarios.
  - [x] Phase D: Registry manifest built and documented in `components-meta.ts`.
- [ ] **Input**
  - [ ] Phase A: Add size tiers (`xs`: 24px, `sm`: 28px, `default`: 32px, `lg`: 36px) matching Button heights.
  - [ ] Phase B: First-class `leading` and `trailing` slots (icons, inline badges, action buttons, password peek).
  - [ ] Phase C: Support semantic intent states (`neutral`, `primary`, `success`, `warning`, `danger`).
  - [ ] Phase D: Storybook stories with args controls and rich usage guide in `components-meta.ts`.
- [ ] **Textarea**
  - [ ] Phase A: Semantic intent borders/rings matching Input.
  - [ ] Phase B: Sizing scales and proportional typography/padding.
  - [ ] Phase C: Character count indicator and resize constraints.
  - [ ] Phase D: Portable stories and metadata synchronization.
- [ ] **Checkbox & CheckboxGroup**
  - [ ] Phase A: Base UI `@base-ui/react/checkbox` parity with indeterminate support.
  - [ ] Phase B: Semantic intent checks and card/tile selection variants.
  - [ ] Phase C: Stories covering standalone, group, nested children, and validation states.
  - [ ] Phase D: Metadata update and registry compilation.
- [ ] **RadioGroup**
  - [ ] Phase A: Keyboard navigation, Base UI radio group architecture.
  - [ ] Phase B: Standard radio circles and segmented card selector variants.
  - [ ] Phase C: Stories with label/description layouts and horizontal/vertical orientations.
  - [ ] Phase D: Registry verification and documentation.
- [ ] **Switch**
  - [ ] Phase A: Proportional sizing (`xs`, `sm`, `default`, `lg`) matching toggle heights.
  - [ ] Phase B: Intent fill colors, smooth spring transitions, thumb icons.
  - [ ] Phase C: Stories for form controls, compact settings list, and disabled states.
  - [ ] Phase D: Metadata and registry output.
- [ ] **Slider**
  - [ ] Phase A: Base UI slider integration, single & dual thumb range support.
  - [ ] Phase B: Tick marks, value badge floating tooltip, intent tracks.
  - [ ] Phase C: Stories with custom steps, vertical orientation, and live inputs.
  - [ ] Phase D: Registry generation and metadata documentation.
- [ ] **Select**
  - [ ] Phase A: Base UI `@base-ui/react/select` with custom scrollable popover and keyboard navigation.
  - [ ] Phase B: Size alignment, intent states, item icons, group separators.
  - [ ] Phase C: Stories for single select, multi-select, and disabled options.
  - [ ] Phase D: Metadata guide and build registry check.
- [ ] **Combobox**
  - [ ] Phase A: Fuzzy search filtering, async loading states, virtualized long lists.
  - [ ] Phase B: Empty search fallback, multi-tag selection chips.
  - [ ] Phase C: Stories with large datasets and custom option renderers.
  - [ ] Phase D: Registry manifest verification.
- [ ] **InputOTP**
  - [ ] Phase A: Numeric and alphanumeric OTP slots with active cursor pulse.
  - [ ] Phase B: Separator slot styling, paste handler, size tiers.
  - [ ] Phase C: Stories for 4-digit and 6-digit codes.
  - [ ] Phase D: Metadata and registry build.

---

### 2. Overlays & Dialogs
- [ ] **Dialog & AlertDialog**
  - [ ] Phase A: Base UI dialog primitive, smooth backdrop blur, entry/exit scale transition.
  - [ ] Phase B: Header, title, description, body, footer layout slots with sticky scrolling.
  - [ ] Phase C: Stories for modal forms, destructive confirmations, and full-screen dialogs.
  - [ ] Phase D: Metadata updates and registry build.
- [ ] **Drawer & Sheet**
  - [ ] Phase A: Edge sliding drawers (left, right, top, bottom) with gesture dismissal support.
  - [ ] Phase B: Backdrop dimming, responsive breakpoints (drawer on mobile, sheet on desktop).
  - [ ] Phase C: Stories with complex navigation and nested scroll areas.
  - [ ] Phase D: Registry verification.
- [ ] **Popover & HoverCard**
  - [ ] Phase A: Base UI anchor positioning with collision detection and offset spacing.
  - [ ] Phase B: Soft shadow, arrow tip, seamless surface contrast.
  - [ ] Phase C: Stories for user profile previews, rich interactive widgets, and tooltips.
  - [ ] Phase D: Metadata and registry build.
- [ ] **Tooltip**
  - [ ] Phase A: Fast hover delay, keyboard focus activation, collision handling.
  - [ ] Phase B: Proportional micro-typography, high-contrast dark/light styling.
  - [ ] Phase C: Stories covering all sides (`top`, `bottom`, `left`, `right`) and shortcuts.
  - [ ] Phase D: Registry synchronization.

---

### 3. Navigation & Menus
- [ ] **DropdownMenu & ContextMenu**
  - [ ] Phase A: Base UI menu primitive with nested submenus, radio/checkbox menu items.
  - [ ] Phase B: Keyboard navigation, shortcut badges (`Kbd`), danger item coloring.
  - [ ] Phase C: Stories for user account menus, right-click file actions, and nested flyouts.
  - [ ] Phase D: Metadata and registry build.
- [ ] **Menubar**
  - [ ] Phase A: Horizontal desktop application menu bar with seamless keyboard navigation.
  - [ ] Phase B: Item separators, icon affixes, active highlight pills.
  - [ ] Phase C: Stories modeling standard File/Edit/View desktop menu structures.
  - [ ] Phase D: Registry verification.
- [ ] **NavigationMenu**
  - [ ] Phase A: Accessible mega-menu with viewport indicator animation.
  - [ ] Phase B: Responsive mobile collapse and link hover states.
  - [ ] Phase C: Stories for SaaS marketing header and documentation layout.
  - [ ] Phase D: Metadata documentation.
- [ ] **Breadcrumb**
  - [ ] Phase A: Accessible `nav` landmark, separator customization (slash, chevron, dot).
  - [ ] Phase B: Ellipsis dropdown for truncated intermediate levels.
  - [ ] Phase C: Stories for deep hierarchies and route integration.
  - [ ] Phase D: Registry verification.
- [ ] **Pagination**
  - [ ] Phase A: Previous/Next buttons with page number list and active state.
  - [ ] Phase B: Sizing scale matching Button, responsive compact mode.
  - [ ] Phase C: Stories for various page counts and edge boundaries.
  - [ ] Phase D: Metadata documentation.
- [ ] **Tabs**
  - [ ] Phase A: Line, pill, and enclosed card tab variants with animated active pill.
  - [ ] Phase B: Sizing tiers, icon tabs, vertical orientation support.
  - [ ] Phase C: Stories for settings panels, code snippets, and nested tabs.
  - [ ] Phase D: Registry verification.

---

### 4. Data Display & Layout
- [ ] **Card**
  - [ ] Phase A: Header, Title, Description, Content, Footer slots.
  - [ ] Phase B: Interactive hover cards, semantic intent borders/accents (`data-intent`).
  - [ ] Phase C: Stories for metrics dashboards, pricing tiers, and article cards.
  - [ ] Phase D: Metadata and registry build.
- [ ] **Table**
  - [ ] Phase A: Semantic table structure with sticky headers and footer aggregates.
  - [ ] Phase B: Row selection checkboxes, zebra striping, hover highlights.
  - [ ] Phase C: Stories for data tables with sorting icons and status badges.
  - [ ] Phase D: Registry build.
- [ ] **Calendar**
  - [ ] Phase A: Date picker grid with month/year navigation, range selection.
  - [ ] Phase B: OKLCH selection highlights, disabled date styles.
  - [ ] Phase C: Stories for single date, date range, and booking presets.
  - [ ] Phase D: Metadata and registry build.
- [ ] **Carousel**
  - [ ] Phase A: Embla carousel integration with smooth swipe and navigation arrows.
  - [ ] Phase B: Dot pagination, autoplay plugins, responsive slides per view.
  - [ ] Phase C: Stories for image showcases and card carousels.
  - [ ] Phase D: Registry verification.
- [ ] **Chart**
  - [ ] Phase A: Recharts integration with custom accessible tooltips and theme colors.
  - [ ] Phase B: Line, Area, Bar, Pie charts matching OKLCH design tokens.
  - [ ] Phase C: Stories with interactive mock data feeds.
  - [ ] Phase D: Metadata and registry build.
- [ ] **Accordion & Collapsible / CollapsibleSection**
  - [ ] Phase A: Smooth height animation (`data-open`/`data-closed`), chevron rotation.
  - [ ] Phase B: Bordered vs separated card variants, compact vs spacious modes.
  - [ ] Phase C: Stories for FAQs, filter sidebars, and nested trees.
  - [ ] Phase D: Registry build.
- [ ] **Resizable**
  - [ ] Phase A: Keyboard-accessible split panels with drag handles.
  - [ ] Phase B: Collapsible panels, persistence hooks.
  - [ ] Phase C: Stories for IDE-style layout and email client splits.
  - [ ] Phase D: Registry verification.
- [ ] **ScrollArea**
  - [ ] Phase A: Cross-browser custom scrollbars with hover reveal.
  - [ ] Phase B: Horizontal and vertical scrollbars matching theme radii.
  - [ ] Phase C: Stories with overflowing text and cards.
  - [ ] Phase D: Metadata and registry build.
- [ ] **Sidebar**
  - [ ] Phase A: Collapsible collapsible sidebar with icon-only and full modes.
  - [ ] Phase B: Header, content, groups, items, footer, and submenus.
  - [ ] Phase C: Stories for dashboard layouts with mobile drawer fallback.
  - [ ] Phase D: Registry verification.
- [ ] **Item & Empty**
  - [ ] Phase A: Flexible list item with leading icon/avatar, title, subtitle, trailing action.
  - [ ] Phase B: Empty state container with illustration slot, title, description, and CTA.
  - [ ] Phase C: Stories for search results, inbox lists, and zero-data states.
  - [ ] Phase D: Metadata and registry build.

---

### 5. Feedback, Utilities & Foundations
- [x] **Toast**
  - [x] Phase A: Native Base UI toast primitive replacing sonner.
  - [x] Phase B: Semantic intent icons, duration control, swipe dismissal, action button.
  - [x] Phase C: Stories for success, info, warning, error, and promise toast states.
  - [x] Phase D: Registered across all 56 components in the registry.
- [x] **Field**
  - [x] Phase A: Multi-intent `FieldCaption` / `FormCaption` (`neutral`, `danger`, `success`, `warning`, `info`, `primary`) replacing monolithic red `FieldError`.
  - [x] Phase B: Tightened description spacing (`[[data-slot=field-label]+&]:-mt-1`), horizontal and vertical field layouts.
  - [x] Phase C: Stories for form controls with dynamic multi-intent captions.
  - [x] Phase D: Documented in `components-meta.ts` and registry.
- [x] **ThemeProvider**
  - [x] Phase A: Dynamic OKLCH color generator, multi-accent selection, radius scaling.
  - [x] Phase B: Integration with `@wrksz/themes` and dynamic documentElement CSS sync.
  - [x] Phase C: Theme controls stories and workbench customizer.
  - [x] Phase D: Complete registry and story registration.
- [ ] **Alert**
  - [ ] Phase A: Semantic intent icons and surface tinting (`neutral`, `primary`, `success`, `warning`, `danger`, `info`).
  - [ ] Phase B: Dismissible close button, title and description slots.
  - [ ] Phase C: Stories for system announcements, validation summaries, and banners.
  - [ ] Phase D: Metadata update and registry compilation.
- [ ] **Badge**
  - [ ] Phase A: Solid fill, secondary tint, outline, and ghost variants.
  - [ ] Phase B: Semantic intent mappings, dot indicator, size tiers (`sm`, `default`, `lg`).
  - [ ] Phase C: Stories for status pills, numeric counters, and removable tag badges.
  - [ ] Phase D: Metadata documentation.
- [ ] **Progress**
  - [ ] Phase A: Accessible `aria-valuenow` indicator, indeterminate striped animation.
  - [ ] Phase B: Intent fill colors, size tiers, inside/outside label text.
  - [ ] Phase C: Stories for upload progress, multi-step wizards, and circular variants.
  - [ ] Phase D: Registry build.
- [ ] **Skeleton**
  - [ ] Phase A: Shimmer animation with soft neutral gradient.
  - [ ] Phase B: Pre-configured shapes (avatar circle, text line, card block).
  - [ ] Phase C: Stories for card loading skeleton and profile feed loading.
  - [ ] Phase D: Metadata documentation.
- [ ] **Avatar**
  - [ ] Phase A: Image fallback chaining, initials generator, size tiers (`xs` to `xl`).
  - [ ] Phase B: Presence indicator dot (online/offline/busy), avatar group overlapping cluster.
  - [ ] Phase C: Stories for user profiles and stacked avatar rows.
  - [ ] Phase D: Registry build.
- [ ] **Separator**
  - [ ] Phase A: Horizontal and vertical orientations with decorative aria attributes.
  - [ ] Phase B: Inset spacing, optional centered label slot.
  - [ ] Phase C: Stories for list dividers and section headers.
  - [ ] Phase D: Metadata verification.
- [ ] **Kbd & Label**
  - [ ] Phase A: Clean keycap styling with border contrast, mono font sizing.
  - [ ] Phase B: Label required indicator star, disabled association, cursor pointer.
  - [ ] Phase C: Stories for shortcut combos (`⌘ + K`, `Shift + Enter`).
  - [ ] Phase D: Registry build.

---

## 🏛️ Curated UI/UX Decisions Log (Intent & System Standards)

*Rules for this log: Record high-signal architectural or system decisions only. Do not add trivial bug fixes or routine CSS edits. Keep each entry focused on intent, problem, decision, and impact.*

### [DEC-001] Native Base UI Primitive Foundation
- **Context**: Radix UI was previously the standard, but Base UI (`@base-ui/react`) provides superior performance, modern unstyled accessibility primitives, and aligns with shadcn v4 direction. External packages like sonner introduced unnecessary runtime bloat.
- **Decision**: Adopt `@base-ui/react` exclusively for all headless primitives. Completely replaced sonner with a native Base UI toast implementation.
- **Impact**: All registry components rely on Base UI; no legacy Radix wrappers.

### [DEC-002] Mathematical OKLCH Color Engine & 6 Universal Intents
- **Context**: Traditional HSL/Hex palettes suffer from perceptual non-uniformity across hues (e.g. yellows appear significantly lighter than blues at equal lightness).
- **Decision**: Implemented an automated OKLCH color generator in `src/lib/color-system/` providing mathematically guaranteed contrast. Standardized 6 semantic intents across the entire design system: `neutral`, `primary`, `success`, `warning`, `danger`, and `info`.
- **Impact**: Every component (Button, Badge, Card, Alert, FieldCaption, etc.) resolves styling through semantic intent tokens (`--*-fill`, `--*-interactive`, `--*-surface`, `--*-text`) rather than hardcoded hex values.

### [DEC-003] Proportional Sizing & Dynamic Radius Multipliers
- **Context**: Disconnected heights and corner radii between buttons, inputs, toggles, and icon triggers create visual disharmony when placed side-by-side.
- **Decision**: Established a strict 4-tier vertical height scale: `xs` (24px), `sm` (28px), `default` (32px), `lg` (36px), paired with square `icon-*` equivalents (`icon-xs`: 24px, `icon-sm`: 28px, `icon`: 32px, `icon-lg`: 36px). Corner curvature is synchronized to the global ThemeProvider `--radius-*` multiplier.
- **Impact**: Inputs, buttons, toggles, and selectors align seamlessly in toolbars and forms without manual padding overrides.

### [DEC-004] Ergonomic Affix Slots & Directional Alignment
- **Context**: Components frequently require leading icons, trailing chevrons, and loading spinners, which previously required consumers to write cumbersome nested wrappers.
- **Decision**: Provided first-class `leading`, `trailing`, and `loading` props on interactive elements. When set to `wide` (full width), `align="start"` automatically anchors trailing items to the far end (`ms-auto`), and `align="end"` anchors leading items to the far start (`me-auto`).
- **Impact**: Eliminates boilerplate icon layout markup and ensures layout shift-free loading states.

### [DEC-005] Tactile Press Feedback & Attached Border Collapse
- **Context**: Pure CSS `:active` states fail to provide visible feedback when buttons or toggles are activated via keyboard shortcuts or rapid clicks. Adjacent borders in grouped controls double in thickness without special handling.
- **Decision**: Added a 150ms minimum `isPressed` timer for keyboard activation, silky transitions (`cubic-bezier(0.22, 1, 0.36, 1)`), and `-ms-px` / `-mt-px` border collapse with corner normalization in `data-attached` groups.
- **Impact**: Grouped controls (Button groups, Toggle groups) render as single solid toolbars with crisp 1px borders and responsive tactile feedback.

### [DEC-006] Generalized Multi-Intent Field Captions
- **Context**: Form controls traditionally only showed error messages via `FieldError` in red, lacking support for helper guidance, success confirmations, or warning notices.
- **Decision**: Deprecated rigid `FieldError` in favor of `FieldCaption` (aliased as `FormCaption`), which accepts `intent="neutral" | "danger" | "success" | "warning" | "info" | "primary"`.
- **Impact**: Forms convey multi-state feedback consistently without ad-hoc color classes.

### [DEC-007] True Story Source Extraction & Zero-Placeholder Workbench
- **Context**: Component preview pages often showed static or fabricated code snippets that drifted out of sync with actual component source and story definitions.
- **Decision**: Banned hardcoded snippet strings. Wired `src/lib/story-source.ts` to dynamically extract live Storybook source code and deliver toggleable "View Code" / "Hide Code" on both the interactive Canvas and individual Stories.
- **Impact**: The workbench at `/components/[slug]` is guaranteed 100% truthful to the underlying code.
