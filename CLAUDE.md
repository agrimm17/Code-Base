# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install all dependencies (root + client + server)
npm run install:all

# Run both client and server concurrently
npm run dev

# Run client only (Vite dev server)
npm run dev:client

# Run server only (Express on port 5001)
npm run dev:server

# Build client for production
npm run build

# Lint client code
npm run lint --prefix client
```

No test suite is configured.

## Architecture

This is a personal portfolio website with a React frontend (Vite) and a small Express backend.

**Client** (`client/src/`):
- `main.jsx` → wraps `App` in `ColorModeContext` (theme provider)
- `App.jsx` → MUI AppBar + Drawer nav, React Router routes for `/`, `/projects`, `/contact`
- `pages/` → one component per route (`IntroductionPage`, `ProjectsPage`, `ContactPage`)
- `data/projects.js` → single source of truth for all project entries displayed on `ProjectsPage`
- `theme/` → `theme.js` defines 4 MUI themes (dark + 3 pastels); `ColorModeContext.jsx` persists selection to `localStorage`
- `components/WelcomeOverlay.jsx` → modal shown on first visit (state persisted to `localStorage`)

**Server** (`server/`):
- Express app on port 5001
- `/api/contact` — sends email via nodemailer (requires `.env` with mail credentials)
- `/api/projects` — serves project data

**Adding a new project**: edit `client/src/data/projects.js` and add a thumbnail to `client/public/thumbnails/`.

**Environment**: server reads from `server/.env` — needs mail credentials for the contact form to work.
