@AGENTS.md

# Project: The Action List

A task/action management app built with Next.js App Router, React 19, and Tailwind CSS v4.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.7 |
| UI Library | React | 19.2.4 |
| Styling | Tailwind CSS v4 | ^4 |
| CSS Processing | @tailwindcss/postcss | ^4 |
| Fonts | next/font/google (Geist) | — |
| Linting | ESLint + eslint-config-next | ^9 |
| Package Manager | Yarn | — |
| Language | TypeScript (TSX) | — |

**TypeScript only.** All files use `.ts` / `.tsx`. Do not introduce `.js` or `.jsx` files.

**Tailwind v4 differences from v3:**
- No `tailwind.config.js` — configuration lives in CSS via `@theme` blocks in `globals.css`.
- Import Tailwind with `@import "tailwindcss"` (not `@tailwind base/components/utilities`).
- PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss`.

---

## Folder Structure

```
theactionlist/
├── public/                  # Static assets served at /
├── src/
│   └── app/                 # App Router root (Next.js)
│       ├── layout.tsx       # Root layout — fonts, html/body shell
│       ├── page.tsx         # Home page (route: /)
│       ├── globals.css      # Global styles + Tailwind import + CSS theme vars
│       └── favicon.ico
├── .gitignore
├── AGENTS.md                # AI agent rules (do not edit)
├── CLAUDE.md                # This file
├── eslint.config.mjs        # ESLint flat config
├── jsconfig.json            # Path aliases
├── next.config.mjs          # Next.js config
├── package.json
├── postcss.config.mjs       # PostCSS / Tailwind plugin
└── yarn.lock
```

### Conventions for new directories

As the project grows, add folders **inside `src/`** only:

```
src/
├── app/                     # Next.js routes and layouts only
│   ├── (auth)/              # Route group — auth pages
│   ├── (dashboard)/         # Route group — main app
│   └── api/                 # Route handlers (API endpoints)
├── components/              # Shared UI components
│   ├── ui/                  # Primitive/generic components (Button, Input, Modal)
│   └── [feature]/           # Feature-specific components
├── lib/                     # Pure utility functions and helpers
├── hooks/                   # Custom React hooks (use*.ts)
├── services/                # External API / data-fetching logic
├── store/                   # Global state (if added later)
└── styles/                  # Additional CSS modules (if needed)
```

Keep route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`) **inside `app/`** only. Do not put business logic in route files — delegate to components and hooks.

### Page / Module File Pattern

Each page or feature module follows a consistent internal file structure. Files are co-located in a folder named after the module:

```
src/app/[module]/
├── page.tsx         # Main component / rendered UI for the route
├── action.ts        # All event handlers and user-facing actions
├── service.ts       # API calls and external data-fetching logic
├── import.ts        # Shared imports and re-exports for the module
└── constant.ts      # Static constants and configuration values
```

| File | Purpose |
|---|---|
| `page.tsx` | Main component/page file — keep it thin, delegate to the others |
| `action.ts` | All actions and handlers (form submits, button clicks, etc.) |
| `service.ts` | API calls and services (fetch, mutations, external SDKs) |
| `import.ts` | Common imports/exports scoped to the module |
| `constant.ts` | Static constants and configuration values |

Not every module needs all five files — add only what the module requires. `page.tsx` is always present; the others are added as the module grows.

---

## OOP Concepts & Code Design

This project uses **functional React patterns** — not class components. Apply OOP principles through module and function design:

**Single Responsibility** — each file/component does one thing. A `TaskCard` renders a task; a `useTaskStore` hook manages task state. Never mix data-fetching with rendering in the same component.

**Encapsulation** — keep internal state and helpers private. Export only what consumers need. Prefer named exports for components and utilities; use default export only for Next.js route files (`page.tsx`, `layout.tsx`).

**Composition over inheritance** — build complex UI by composing small components. Pass children or render props instead of extending base components.

**Separation of concerns:**
- UI logic → `components/`
- Side effects / data fetching → `hooks/` or Server Components
- Business rules → `lib/`
- External calls → `services/`

**Avoid:**
- God components that handle state, data fetching, and rendering together
- Prop drilling more than two levels deep — use context or a hook instead
- Mutating props or external state directly

---

## Import Rules

### Path alias

`@/*` resolves to `./src/*` (configured in `jsconfig.json`).

Always use the alias for imports within `src/`. Never use relative `../../` paths that cross directory boundaries.

```js
// Good
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

// Bad
import Button from "../../components/ui/Button";
```

Relative imports are acceptable only within the same directory:
```js
import "./globals.css";           // same folder — ok
import { helper } from "./utils"; // same folder — ok
```

### Import order

Enforce this order (ESLint will warn on violations):

1. React (if explicit import needed)
2. Next.js built-ins (`next/link`, `next/image`, `next/font/*`)
3. Third-party packages
4. Internal aliases (`@/components`, `@/lib`, …)
5. Relative imports (`./`, `../`)
6. CSS / asset imports

```js
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import "./styles.css";
```

### No barrel re-exports by default

Avoid `index.ts` re-export barrels unless a folder has 5+ public exports. Prefer direct imports — they are easier to tree-shake and trace.

---

## Component Conventions

- **File name:** PascalCase matching the component name — `TaskCard.tsx`, `AddTaskModal.tsx`.
- **One component per file** (small helpers co-located are fine if not reused).
- **Default export** only for Next.js route files. All other components use **named exports**.

```tsx
// components/ui/Button.tsx
export function Button({ children, variant = "primary", ...props }) {
  return (
    <button className={clsx("...", variant === "primary" && "...")} {...props}>
      {children}
    </button>
  );
}
```

- Use **Server Components by default** in `app/`. Add `"use client"` only when the component needs browser APIs, event handlers, or React state/effects.
- Keep `"use client"` components as small and leaf-level as possible — push interactivity down the tree.

---

## Styling

- **Tailwind CSS v4** utility classes are the primary styling method.
- Global CSS variables and theme tokens are defined in `src/app/globals.css` under `@theme inline { ... }`.
- Use CSS variables for design tokens (colors, fonts). Do not hardcode hex values in JSX — reference a CSS variable or a Tailwind token.
- For conditional classes use the `clsx` package (add it when needed): `className={clsx("base", condition && "extra")}`.
- **No CSS Modules** unless a component genuinely can't be expressed with utility classes.
- **No inline `style={{}}` props** except for dynamic values that Tailwind cannot express (e.g., a user-supplied color).

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component files | PascalCase | `TaskCard.tsx` |
| Hook files | camelCase, `use` prefix | `useTaskList.ts` |
| Utility files | camelCase | `formatDate.ts` |
| Route directories | kebab-case | `app/task-detail/` |
| CSS class names | Tailwind utilities only | — |
| Variables / functions | camelCase | `taskList`, `fetchTasks` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_TASKS` |

---

## Next.js App Router Rules

- `page.tsx` — the rendered UI for a route. Keep it thin.
- `layout.tsx` — persistent shell wrapping child routes. Fonts and global providers go here.
- `loading.tsx` — automatic Suspense boundary for a route segment.
- `error.tsx` — error boundary (`"use client"` required).
- `route.ts` — API endpoint (replaces `pages/api/`). Lives at `app/api/[endpoint]/route.ts`.

**Data fetching:** prefer async Server Components for reads. Use Server Actions (`"use server"`) for mutations. Avoid client-side `fetch` in `useEffect` for initial data.

---

## Do's and Don'ts

**Do:**
- Read `node_modules/next/dist/docs/` before using any Next.js API — this version has breaking changes.
- Run `yarn lint` before committing.
- Keep components pure and side-effect-free where possible.
- Use `next/image` for all images and `next/link` for all internal navigation.
- Use `next/font` for web fonts — never `<link>` tags.

**Don't:**
- Don't use the Next.js Pages Router (`pages/` directory).
- Don't use `getServerSideProps`, `getStaticProps`, or `getInitialProps` — they are Pages Router APIs.
- Don't import from `next/router` — use `next/navigation` instead.
- Don't install class-based state libraries (MobX, etc.) — use hooks and context first.
- Don't commit `.env.local` or any file containing secrets.
- Don't add `console.log` statements to committed code.
