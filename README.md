# TODO App (FSD + React + Redux Toolkit + MUI)

Production-like TODO application built with:

- React + TypeScript
- Feature-Sliced Design (FSD) architecture
- Redux Toolkit for state management
- localStorage persistence
- Material UI (MUI)
- Drag & Drop ordering (dnd-kit)
- ESLint + Prettier
- Husky + lint-staged (pre-commit checks)
- Vite
- Absolute imports (path aliases)

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run dev server

```bash
npm run dev
```

### 3. Build

```bash
npm run build
npm run preview
```

## Code quality

- Lint: `npm run lint`
- Fix lint: `npm run lint:fix`
- Format: `npm run format`
- Check formatting: `npm run format:check`

## Git Hooks (Husky + lint-staged)

On every git commit:
   - Runs eslint --fix on staged files
   - Runs prettier --write on staged files
   - Prevents committing broken or badly formatted code

## Drag & Drop Ordering

- Implemented using dnd-kit
- Works in "All" mode without active search/filter
- This is a conscious UX/architecture tradeoff to avoid inconsistent ordering when list is filtered

## Persistence

- All TODO items are stored in localStorage
- State is restored automatically on app reload

## What could be improved if this was a real product

- Backend API + RTK Query / React Query
- User authentication
- Tests (unit / e2e)
- Virtualization for very large lists
- Better offline / sync strategies
- Accessibility audit
- i18n
- CI pipeline
