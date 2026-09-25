<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Modern Technologies & Version Verification

## 1. Always Verify Latest Versions
- Never rely on static internal training knowledge for library versions, APIs, conventions, or deprecation status.
- Actively verify current package versions, official documentation, or upstream repository releases before recommending or installing dependencies.

## 2. Prefer the Most Modern Solutions
- Always evaluate and select the modern, next-generation industry standards rather than superseded or legacy choices.
- **Example**: While Radix UI was previously the standard headless foundation, modern ecosystems (such as Shadcn v4) have adopted Base UI (`@base-ui/react`) as the newer, more performant, and superior foundation.
- Never scaffold deprecated versions, legacy patterns (e.g., outdated Tailwind configs or older primitive libraries), or superseded tooling unless explicitly demanded by the user.
