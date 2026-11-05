<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

@TASK.md

# Modern Technologies & Version Verification

## 1. Always Verify Latest Versions
- Never rely on static internal training knowledge for library versions, APIs, conventions, or deprecation status.
- Actively verify current package versions, official documentation, or upstream repository releases before recommending or installing dependencies.

## 2. Prefer the Most Modern Solutions
- Always evaluate and select modern, next-generation industry standards rather than superseded or legacy choices.
- **Example**: While Radix UI was previously the standard headless foundation, modern ecosystems (such as Shadcn v4) have adopted Base UI (`@base-ui/react`) as the newer, more performant, and superior foundation.
- Never scaffold deprecated versions, legacy patterns (e.g., outdated Tailwind configs or older primitive libraries), or superseded tooling unless explicitly demanded by the user.

---

# Base UI Syntax & Shadcn UI Synergy (Mandatory Documentation Rule)

## 1. Outdated Knowledge Warning & Zero-Radix Mandate
- **Internal Knowledge Is Outdated**: AI training weights predominantly default to Radix UI and older shadcn patterns. **Do NOT rely on internal training knowledge for UI primitives, component anatomy, prop names, or state attributes.**
- **Strictly No Radix UI**: This project does NOT use Radix UI (`@radix-ui/*` is NOT installed and must never be imported or referenced).
- **Sole Headless Foundation**: All UI primitives MUST be built on **Base UI (`@base-ui/react`)**.

## 2. Mandatory Online Documentation Verification (Every Component)
Before writing or modifying ANY component code, the AI agent **MUST actively check both online documentations**:
1. **Base UI Online Docs (`https://base-ui.com/react/components/<component>`)**:
   - Check current subcomponents, imports, and namespaces (e.g. `import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"`).
   - Check exact prop names, controlled/uncontrolled state handlers (`open`, `onOpenChange`, `defaultOpen`).
   - Check polymorphism: Base UI uses the `render` prop (e.g. `render={<button ... />}`), **never** Radix's `asChild`.
   - Check state & animation data attributes: `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`, `data-side`, `data-align`, `data-pressed`.
   - Check anatomy specifics: Base UI primitives use `Popup`, `Backdrop`, `Positioner`, `Arrow` (distinct from Radix `Content` / `Overlay`).
2. **Shadcn UI Online Docs (`https://ui.shadcn.com/docs/components/<component>`)**:
   - Check visual styling, typography, padding, border radius, shadows, borders, and interaction states.
   - Check component ergonomics and slot architecture (`Header`, `Title`, `Description`, `Content`/`Body`, `Footer`, `Action`, `Cancel`, `Close`).
   - Retain `data-slot="<component-slot>"` attributes on all exported components for uniform styling and ecosystem consistency.

## 3. Dual Architecture: Syntax of Base UI + UI of Shadcn
- **Syntax & Mechanics**: Pure Base UI (`@base-ui/react`). Wrap Base UI primitives, follow Base UI prop types, use `render` prop, and target Base UI `data-*` attributes for animations.
- **UI & Aesthetics**: Faithful to Shadcn UI. Preserve Shadcn's clean modern design, ergonomic slot structure, and CVA variant recipes mapped to project OKLCH tokens (`--neutral-*`, `--primary-*`, `--*-surface`, `--*-text`).


# Autonomous AI Execution Loop & Long Turns Protocol

## 1. Mandatory Queue & Intent Ingestion
- At the start of every turn or session, the AI agent **must inspect [TASK.md](file:///Users/ahmadreza/Documents/karancraft/TASK.md)** (or `tasks.md`) using `view_file`.
- Ingest the **Active Sprint Queue**, the current completion state, and the curated **UI/UX Decision Log** (`[DEC-001]` through `[DEC-007]`) to preserve user intent across all components.

## 2. Zero Micro-Yield Principle (Autonomous Execution)
- **Do not stop or yield after trivial micro-steps** (e.g., creating a single story, editing a single prop, or running a single command) to ask "Should I continue?" or "What should I do next?".
- The AI agent is expected to execute in **long, productive turns**: picking items from the active queue in [TASK.md](file:///Users/ahmadreza/Documents/karancraft/TASK.md), implementing changes end-to-end, validating them, updating the task board, and continuing to subsequent queued items autonomously.
- **When to yield**:
  1. The assigned batch or sprint goal defined in [TASK.md](file:///Users/ahmadreza/Documents/karancraft/TASK.md) is fully completed and verified.
  2. A genuine architectural contradiction or ambiguous UX fork arises that cannot be resolved from existing precedents in git history or the Decision Log.
  3. An unexpected fatal tooling or runtime blocker occurs that requires user environment intervention.

## 3. 4-Phase Component Lifecycle Loop
For every component targeted in the queue, execute all 4 phases autonomously within the turn before marking it done:
1. **Phase A — Online Docs Check & Base UI Prop Architecture**:
   - **MANDATORY**: Actively verify both **Base UI** online documentation (`https://base-ui.com/react/components/<slug>`) and **Shadcn UI** online documentation (`https://ui.shadcn.com/docs/components/<slug>`) via search or URL reading before writing code.
   - Inspect existing implementation and align with modern Base UI (`@base-ui/react`) primitives.
   - Strictly prohibit Radix UI (`@radix-ui/*`) packages and patterns (use `render` prop, never `asChild`).
   - Implement universal semantic intents (`neutral`, `primary`, `success`, `warning`, `danger`, `info`).
   - Implement proportional sizing (`xs`, `sm`, `default`, `lg`, and square `icon-*` tiers).
   - Support ergonomic affix slots (`leading`, `trailing`, `loading`) and alignment modes (`wide`, `align`).
   - Ensure tactile interaction states (`data-pressed`, minimum 150ms keyboard press timer, keyboard a11y).
2. **Phase B — Tokens & OKLCH Styling**:
   - Wire styles into `src/registry/styles/style-karan.css` and component CVA recipes using CSS variables (`--primary-fill`, `--neutral-interactive`, `--*-surface`, `--*-text`, etc.).
   - Support attached/joined states with border collapse (`-ms-px` / `-mt-px`) and radius normalization.
   - Verify dark and light mode contrast and state hierarchy (default, hover, active/pressed, focus, disabled).
3. **Phase C — Stories & Canvas Test Harness**:
   - Author / update `<ComponentName>.stories.tsx` in `src/stories/components/`.
   - Provide a comprehensive `Default` story with full `argTypes` controls for the interactive workbench canvas.
   - Create variant stories covering intents, sizes, states, edge cases, and real-world compound patterns.
4. **Phase D — Registry & Workbench Metadata Integration**:
   - Update component metadata in `src/lib/components-meta.ts` (category, description, props documentation, rich `usageGuide` with installation and features).
   - Verify registration in `src/lib/portable-stories.tsx`.
   - Run verification suite:
     - Typecheck: `pnpm exec tsc --noEmit`
     - Registry build: `node scripts/build-registry.mjs`
   - Mark component as completed `[x]` in [TASK.md](file:///Users/ahmadreza/Documents/karancraft/TASK.md) with brief notes.
   - Advance immediately to the next queued item.

---

# Component Pages: Canvas & Stories Code Toggle Rule

- Every component page (`/components/[slug]`) **must** support toggling "View Code" / "Hide Code" on both the interactive **Canvas** and every individual **Story** (as well as "View All Code" across stories).
- When adding or updating any component:
  1. Author a corresponding `<ComponentName>.stories.tsx` file in `src/stories/components/` with a `Default` story (accepting `args` / `props` for live Canvas controls) and variant stories.
  2. Register the component in `src/lib/portable-stories.tsx`, `src/lib/components-meta.ts`, and `scripts/build-registry.mjs`.
  3. Story and Canvas source code is automatically extracted by `src/lib/story-source.ts` and passed to `ComponentWorkbench` via `src/app/components/[slug]/page.tsx`—never hardcode placeholder snippet strings that bypass real story source code.

---

# UI/UX Decision Governance & Intent Tracking

1. **Check Decisions Before Designing**: Always review the **UI/UX Decision Log** in [TASK.md](file:///Users/ahmadreza/Documents/karancraft/TASK.md) and past git commits before altering or adding component APIs or styles to maintain global consistency.
2. **Curated Decision Recording**: When an architectural or UX pattern decision is established:
   - Record it under the Decision Log in [TASK.md](file:///Users/ahmadreza/Documents/karancraft/TASK.md).
   - Keep it curated, high-signal, and concise (ID, title, context, decision, rationale).
   - **Do not overload** the list with minor bug fixes or trivial routine CSS tweaks; log only structural, design-token, or systemic UX decisions.
3. **Quality Gate Checklist**:
   - [ ] Online Base UI and Shadcn documentation checked before coding.
   - [ ] Base UI primitive used without legacy/Radix wrappers (`render` prop, `data-open`/`data-closed`, zero `@radix-ui/*`).
   - [ ] Shadcn UI visual aesthetic and ergonomic slot architecture preserved.
   - [ ] Semantic intents resolved properly across variants.
   - [ ] Sizing and radius multiplier tokens honored.
   - [ ] `Default` story has live interactive canvas controls.
   - [ ] Code toggle in workbench works with real story source.
   - [ ] `pnpm exec tsc --noEmit` clean.
   - [ ] `node scripts/build-registry.mjs` builds all registry items.

