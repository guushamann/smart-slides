<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `npx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `npx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

## Project Context

### Scaffolding

This project was scaffolded with the TanStack CLI:

```bash
npx @tanstack/cli@latest create my-tanstack-app --agent --package-manager npm --tailwind --add-ons tanstack-query,clerk,table,form
```

The generated project structure was preserved unless a clear reason to change it existed.

### TanStack Intent Skills

Installed and consulted during setup:

```bash
npx @tanstack/intent@latest install
npx @tanstack/intent@latest list
```

Skills loaded for this codebase:
- `@tanstack/react-start#react-start`
- `@tanstack/router-core#router-core`
- `@tanstack/react-table#getting-started`
- `@tanstack/table-core#core`

### Stack and Integrations

- **Framework**: React 19 with TanStack Start
- **Router**: TanStack Router (file-based)
- **Data**: TanStack Query
- **Auth**: Clerk (`@clerk/tanstack-react-start`)
- **Table**: TanStack Table v9 (`@tanstack/react-table`)
- **Form**: TanStack Form (`@tanstack/react-form`)
- **Store**: TanStack Store (`@tanstack/react-store`)
- **Styling**: Tailwind CSS v4 with shadcn/ui
- **Theme**: DesignSystems.one OKLCH token system applied to `:root` and dark mode
- **Icons**: Lucide React

### Theme and shadcn/ui

- The base theme lives in `src/styles.css` and uses the OKLCH tokens from `first.md`.
- shadcn/ui CSS variables (`--background`, `--foreground`, `--primary`, etc.) are mapped to the DesignSystems.one semantic aliases (`--color-bg`, `--color-fg`, `--color-brand`, etc.).
- Light and dark modes are driven by a class on `<html>` (`light`/`dark`) plus a `data-theme` attribute. The theme init script in `src/routes/__root.tsx` sets this before hydration.
- shadcn config is at `components.json`; the `cn` utility is at `src/lib/utils.ts`.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the Clerk keys:

```bash
cp .env.example .env.local
```

Required variables (Clerk):
- `VITE_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

### Running the Project

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run preview  # preview production build
```

### Demo Routes

- `/` — home
- `/about` — about page
- `/demo/tanstack-query` — TanStack Query demo
- `/demo/clerk` — Clerk auth demo
- `/demo/table` — TanStack Table v9 demo
- `/demo/form/simple` — TanStack Form simple demo
- `/demo/form/address` — TanStack Form address demo
- `/demo/store` — TanStack Store demo

### Key Architectural Decisions

- File-based routing via TanStack Router (`src/routes/`).
- Server functions live in route files or `src/integrations/` where appropriate.
- Clerk provider wraps the app shell in `src/routes/__root.tsx`.
- Theme state is persisted in `localStorage` and resolved before hydration to avoid flash.

### Known Gotchas

- `@tanstack/react-table` is v9; the old `useReactTable` v8 API does not work. Use `useTable`, `tableFeatures`, and `createColumnHelper` instead.
- Tailwind CSS v4 uses `@theme` instead of a `tailwind.config.js` file.
- shadcn components use the `#/*` path alias (also configured as `@/*` in `tsconfig.json`).

### Next Steps

- Add real data sources and replace the demo data in `src/data/`.
- Wire Clerk-protected routes using `beforeLoad` guards.
- Expand shadcn component library as needed.
- Set up deployment (Vercel/Netlify/Node) per TanStack Start deployment docs.
- Push to the remote repo at `https://github.com/guushamann/smart-slides.git` when ready.
