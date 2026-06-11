# Mothership Project Website

Showcase site for the Mothership project — a coordinated aerial–ground (UGV + UAV) framework for search and rescue.

Live site: https://sethfarrell.github.io/mothership_project/

## Stack

- [Vite](https://vitejs.dev/) + React 19 + TypeScript
- Tailwind CSS 4 with shadcn/ui components
- Deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

## Development

Requires Node.js 20+ and pnpm.

```bash
pnpm install      # install dependencies
pnpm dev          # local dev server at http://localhost:3000
pnpm build        # production build into dist/
pnpm preview      # preview the production build
pnpm check        # typecheck
```

## Editing the site

- Page content lives in `client/src/pages/Home.tsx` (sections: Hero, Overview, UGV Hardware, UGV Autonomy, UAV Hardware, UAV Software, Future Work).
- Images live in `client/src/assets/` and are imported at the top of `Home.tsx`.
- Global theme/colors/fonts: `client/src/index.css` (design tokens) and `client/index.html` (Google Fonts).
- Routes are defined in `client/src/App.tsx`.

## Deployment

Every push to `main` triggers the GitHub Actions workflow, which builds the site and publishes it to GitHub Pages. The Vite `base` in `vite.config.ts` is set to `/mothership_project/` and must match the repository name.
