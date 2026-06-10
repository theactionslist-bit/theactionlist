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
| Fonts | next/font/google (Goudy Bookletter 1911 + Quicksand) | — |
| Forms | Formik + Yup | ^2.4.9 / ^1.7.1 |
| Icons | react-icons | ^5.6.0 |
| SVG | @svgr/webpack | ^8.1.0 |
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
│   ├── app/                 # App Router root (Next.js)
│   │   ├── (auth)/          # Route group — auth pages (no Header/Footer layout)
│   │   │   ├── forgot-password/    constant.ts  import.ts  page.tsx
│   │   │   ├── login/              constant.ts  import.ts  layout.tsx  page.tsx
│   │   │   ├── otp/                constant.ts  import.ts  page.tsx
│   │   │   ├── signup/             constant.ts  import.ts  page.tsx
│   │   │   └── layout.tsx
│   │   ├── (main)/          # Route group — main app (Header + Newsletter + Footer layout)
│   │   │   ├── about-us/           constant.ts  import.ts  page.tsx
│   │   │   ├── actionlist-detail/  page.tsx
│   │   │   ├── my-actions/         constant.ts  import.ts  page.tsx
│   │   │   ├── constant.ts  import.ts  layout.tsx  page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css      # Global styles + Tailwind import + @theme tokens + keyframes
│   │   └── layout.tsx       # Root layout — fonts, html/body shell
│   ├── assets/              # Static images and SVG icons, organised by feature
│   │   ├── ActionDetailCard/   RightArrow.svg  ShareNetwork.svg  TimeIcon.svg  heartIcon.svg
│   │   ├── Header/             Aboutyou.svg  Myactions.svg  Newsletter.svg  SuggestAction.svg
│   │   ├── LoginPage/          Login_page.png
│   │   ├── footer/             facebook.svg  instagram.svg  twitter.svg
│   │   └── (root)              BannerImage.jpg  DropDownArrow.svg  GoogleIcon.png  Logo.png
│   │                           Logo.svg  ModalImage.png  NoSavedActions.png  aboutus.jpg
│   │                           myaction.png  passwordEye.png  passwordhideEye.png
│   ├── components/          # Shared UI components
│   │   ├── ActionListCard/     constant.ts  import.ts  page.tsx
│   │   ├── Footer/             constant.ts  import.ts  page.tsx
│   │   ├── FormikControl/      page.tsx  (dispatches to sub-controls by `control` prop)
│   │   │   ├── Input/          constant.ts  import.ts  page.tsx
│   │   │   ├── Selector/       constant.ts  import.ts  page.tsx
│   │   │   └── Textarea/       page.tsx
│   │   ├── Header/             constant.ts  import.ts  page.tsx
│   │   ├── Logo.tsx
│   │   ├── MainBanner/         import.ts  page.tsx
│   │   ├── Modal/              constant.ts  import.ts  page.tsx
│   │   ├── Newsletter/         constant.ts  page.tsx
│   │   └── Onboarding/         constant.ts  import.ts  page.tsx
│   └── types/
│       └── global.d.ts      # SVG module declarations for @svgr/webpack
├── .gitignore
├── AGENTS.md                # AI agent rules (do not edit)
├── CLAUDE.md                # This file
├── eslint.config.mjs        # ESLint flat config
├── jsconfig.json            # Path aliases
├── next.config.mjs          # Next.js config (includes SVGR webpack rule)
├── package.json
├── postcss.config.mjs       # PostCSS / Tailwind plugin
└── yarn.lock
```

### Route Groups

| Group | Layout | Contains |
|---|---|---|
| `(main)` | HeaderSection + NewsletterSection + FooterSection | Home, About Us, My Actions, Actionlist Detail |
| `(auth)` | Passthrough `<>{children}</>` | Login, Signup, OTP, Forgot Password |

### Page / Module File Pattern

Every page and component folder follows this structure. Files are co-located with the module they belong to:

```
src/app/[module]/          (or src/components/[Component]/)
├── page.tsx         # Rendered UI — imports ONLY from ./import
├── constant.ts      # Static values only — NO imports allowed
├── import.ts        # Re-exports all external deps + re-exports from ./constant
├── action.ts        # Event handlers (add when needed)
└── service.ts       # API calls (add when needed)
```

| File | Purpose | Rule |
|---|---|---|
| `page.tsx` | Main component/page — keep it thin | Imports only from `"./import"` |
| `constant.ts` | Static strings, arrays, config values | **No imports** |
| `import.ts` | Single import source for the module | Re-exports everything the page needs |
| `action.ts` | Form submits, button click handlers | Add when interaction logic grows |
| `service.ts` | fetch/mutations/external SDK calls | Add when data-fetching logic grows |

**Enforced rule:** `constant.ts` never has an `import` statement. `import.ts` re-exports every external dependency (React hooks, next/image, third-party libs, SVG assets) **and** re-exports all values from `./constant`. `page.tsx` has exactly one import source: `"./import"`. No hardcoded strings, hex values, asset paths, or third-party imports directly in `page.tsx`.

Not every module needs all five files. `page.tsx` is always present; add the others as the module grows.

---

## OOP Concepts & Code Design

This project uses **functional React patterns** — not class components. Apply OOP principles through module and function design:

**Single Responsibility** — each file/component does one thing. A `TaskCard` renders a task; a `useTaskStore` hook manages task state. Never mix data-fetching with rendering in the same component.

**Encapsulation** — keep internal state and helpers private. Export only what consumers need. Use default exports for components; use named exports when a file has multiple public exports.

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
import ActionListCard from "@/components/ActionListCard/page";
import { formatDate } from "@/lib/utils";

// Bad
import ActionListCard from "../../components/ActionListCard/page";
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

### No barrel re-exports by default

Avoid `index.ts` re-export barrels unless a folder has 5+ public exports. Prefer direct imports — they are easier to tree-shake and trace. The `import.ts` in each module is module-scoped, not a project-wide barrel.

---

## SVG Handling

SVGs are imported as React components via `@svgr/webpack` (configured in `next.config.mjs`).

```ts
// src/types/global.d.ts declares the module shape:
// declare module "*.svg" { const ReactComponent: FC<SVGProps<SVGSVGElement>>; export default ReactComponent; }

// Usage — import as a component, never as a URL
import HeartIcon from "@/assets/ActionDetailCard/heartIcon.svg";

// Render with Tailwind classes; SVG inherits currentColor for stroke/fill
<HeartIcon className="w-5 h-5 stroke-current" />
```

**Never** use `<img src="…svg">` for SVG files — always import as a component so Tailwind classes and `currentColor` work correctly.

---

## Forms (Formik + Yup)

All forms in the project use **Formik** for state management and **Yup** for validation schemas.

**FormikControl** (`src/components/FormikControl/page.tsx`) is the single dispatch component for all form fields. Pass a `control` prop to select the input type:

```tsx
<FormikControl control="input"    name="email"  type="email" label="Email" />
<FormikControl control="select"   name="areas"  options={OPTIONS} placeholder="…" />
<FormikControl control="textarea" name="bio"    label="Bio" />
```

**Conventions:**
- Validation schemas (`Yup.object().shape(…)`) live in `import.ts` — Yup requires an `import` statement so it cannot go in `constant.ts`.
- Field config arrays (name, type, label, autoComplete, placeholder) live in `constant.ts`.
- `<Formik initialValues={…} validationSchema={…}>` wraps the form in `page.tsx`.

---

## Modal

The reusable Modal lives at `src/components/Modal/page.tsx`.

- Renders via `createPortal` into `document.body` — it appears outside the component tree.
- Body scroll is locked internally (`document.body.classList.add("overflow-hidden")`).
- Fully controlled: `isOpen` and `onClose` are required props.
- Entry animations (`modal-fade-in` for backdrop, `modal-scale-in` for the box) are defined as `@keyframes` in `globals.css`.

```tsx
import { Modal } from "@/components/Modal/page";

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Want to view your saved actions?"
  description="Sign in to access all your favourite actions in one place."
  primaryButtonText="Login"
  secondaryButtonText="Maybe later"
  onPrimaryAction={() => router.push("/login")}
/>
```

---

## Component Conventions

- **File name:** PascalCase matching the component name — `ActionListCard.tsx`, `Modal.tsx`.
- **One component per file** (small helpers co-located are fine if not reused).
- **Default exports** for components. Use named exports only when a file exports multiple public symbols.

```tsx
// components/ActionListCard/page.tsx
const ActionListCard = ({ text, ...props }: ActionListCardProps) => {
  return <div>…</div>;
};

export default ActionListCard;
```

- Use **Server Components by default** in `app/`. Add `"use client"` only when the component needs browser APIs, event handlers, or React state/effects.
- Keep `"use client"` components as small and leaf-level as possible — push interactivity down the tree.
- Click-outside detection pattern: `useRef<HTMLDivElement>` + `useEffect` with a `mousedown` listener on `document`. Conditionally attach (add/remove) the listener so it only runs when needed.

---

## Styling

- **Tailwind CSS v4** utility classes are the primary styling method.
- Global CSS variables and theme tokens are defined in `src/app/globals.css` under `@theme inline { ... }`.
- For conditional classes use the `clsx` package: `className={clsx("base", condition && "extra")}`.
- **No CSS Modules** unless a component genuinely can't be expressed with utility classes.
- Use **inline `style={{}}`** for values Tailwind cannot express — custom box-shadows, dynamic or user-supplied colors. For everything else, use utility classes.

### Design Tokens

These are the actual colour values in use throughout the app. Reference them directly in Tailwind classes or inline styles — do not introduce new hardcoded hex values without updating this list.

| Token | Value | Usage |
|---|---|---|
| Primary text | `#101010` | All body text, borders, button fills |
| Brand accent | `#D89593` | Active heart icon fill, highlights |
| Accent hover | `#C27E7A` | Link hover, accent interactions |
| Border / divider | `#DBDBDB` | Card borders, input borders, dividers |
| Muted text | `#10101099` | Placeholder text, secondary descriptions |
| Surface / input bg | `#F3F1EF` | Input field backgrounds, off-white surfaces |

**Typography classes:**
- `font-display` → Goudy Bookletter 1911 (headings, card body text)
- `font-sans` → Quicksand (labels, buttons, body copy)

Both are loaded via `next/font/google` in `src/app/layout.tsx` and exposed as CSS variables `--font-goudy` and `--font-quicksand`.

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component files | PascalCase | `ActionListCard.tsx` |
| Hook files | camelCase, `use` prefix | `useTaskList.ts` |
| Utility files | camelCase | `formatDate.ts` |
| Route directories | kebab-case | `app/actionlist-detail/` |
| CSS class names | Tailwind utilities only | — |
| Variables / functions | camelCase | `taskList`, `fetchTasks` |
| Constants | SCREAMING_SNAKE_CASE | `HOME_SAMPLE_CARDS` |

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
- Use `next/image` for all raster images and `next/link` for all internal navigation.
- Use `next/font` for web fonts — never `<link>` tags.
- Import SVGs as React components via `@svgr/webpack` — never as `<img src="…svg">`.
- Put Yup schemas in `import.ts` (they require an import), field configs in `constant.ts`.

**Don't:**
- Don't use the Next.js Pages Router (`pages/` directory).
- Don't use `getServerSideProps`, `getStaticProps`, or `getInitialProps` — they are Pages Router APIs.
- Don't import from `next/router` — use `next/navigation` instead.
- Don't install class-based state libraries (MobX, etc.) — use hooks and context first.
- Don't commit `.env.local` or any file containing secrets.
- Don't add `console.log` statements to committed code.
- Don't add imports directly to `constant.ts` — it must remain import-free.
- Don't hardcode hex values or asset paths in `page.tsx` — they belong in `constant.ts` or `import.ts`.
