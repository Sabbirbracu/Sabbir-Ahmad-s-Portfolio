# Sabbir Ahmad — Portfolio

Next.js portfolio site for Sabbir Ahmad, with a public portfolio, project case studies, articles, and an admin area.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Redux Toolkit Query
- Radix UI / shadcn-style components

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set the backend API in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend.example.com/api
```

## Production

```bash
npm run build
npm run start
```

The same `NEXT_PUBLIC_API_BASE_URL` variable must be configured in the deployment environment.

## Project structure

```text
src/
  app/          Next.js routes and root providers
  components/   Reusable UI and page sections
  data/         Static portfolio content
  hooks/        Shared React hooks
  lib/          Shared utilities
  store/        Redux store and API services
  types/        Shared TypeScript types
public/         Static assets
```
