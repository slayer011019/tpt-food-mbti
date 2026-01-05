# Repository Guidelines

## Project Structure & Module Organization

- `src/` contains all React source code.
- `src/pages/` holds route-level screens (e.g., `MainPage.jsx`).
- `src/components/` contains reusable UI components.
- `src/layouts/` defines shared layout shells.
- `src/data/` stores static data helpers.
- `src/assets/` is for images and static assets used by components.
- `public/` holds static files served as-is.
- Entry points: `src/main.jsx` (app bootstrap) and `src/App.jsx` (routes).

## Build, Test, and Development Commands

- `npm install`: install dependencies.
- `npm run dev`: start Vite dev server with HMR.
- `npm run build`: create a production build in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run lint`: run ESLint on the codebase.

## Coding Style & Naming Conventions

- Language: React with JSX, ES modules (`import/export`).
- Indentation: 2 spaces; semicolons are used.
- Filenames: `PascalCase.jsx` for components/pages (e.g., `ResultPage.jsx`).
- CSS: global styles in `src/index.css`; component styles in `src/App.css`.
- Linting: ESLint with React Hooks and React Refresh rules (`eslint.config.js`).

## Testing Guidelines

- No automated test framework is configured yet.
- If adding tests, document the tool and add scripts to `package.json`
  (for example, `npm run test`) and follow a `*.test.jsx` naming pattern.

## Commit & Pull Request Guidelines

- Git history shows short, descriptive messages (e.g., “Remove zip backups”).
  Use concise, present-tense summaries; add detail in the body if needed.
- PRs should include:
  - A brief description of changes and scope.
  - Screenshots or short clips for UI changes.
  - Links to relevant issues or tasks when applicable.

## Configuration Notes

- Vite config: `vite.config.js`.
- Tailwind setup: `tailwind.config.js` and `postcss.config.js`.
