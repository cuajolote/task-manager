# Task Manager

A task management application built with Next.js, React 18, TypeScript, and Tailwind CSS.

## Features

- **Authentication** — Simulated JWT login and registration with cookie-based session persistence
- **Task CRUD** — Create, read, update, and delete tasks with real-time UI updates
- **Status management** — Track tasks as Pending, In Progress, or Completed
- **Filtering** — Filter tasks by status and search by title
- **Responsive design** — Works on mobile, tablet, and desktop
- **Form validation** — Client-side validation using Zod schemas

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Validation**: Zod
- **UI Components**: shadcn/ui + Tailwind CSS
- **Mock Backend**: Next.js API Route Handlers (in-memory data)

## Project Structure

```
src/
├── app/                    # Next.js routes and API handlers
│   ├── (auth)/             # Public pages (login, register)
│   ├── (dashboard)/        # Protected pages (task list)
│   └── api/                # Mock REST API
│       ├── _db/            # In-memory database with seed data
│       ├── auth/           # Auth endpoints (login, register, logout)
│       └── tasks/          # Task CRUD endpoints
├── components/             # React components
│   ├── ui/                 # Base components (shadcn/ui)
│   ├── tasks/              # Task-specific components
│   ├── auth/               # Auth forms
│   └── layout/             # Header, layout wrappers
├── hooks/                  # Custom hooks (useAuth, useTasks)
├── stores/                 # Zustand stores (auth, tasks)
├── lib/                    # Utilities, types, validation schemas
└── middleware.ts           # Route protection
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repo-url>
cd task-manager
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Demo Credentials

The app comes with a pre-seeded user account:

- **Email**: john@example.com
- **Password**: password123

You can also register a new account through the registration page.

## Architecture Decisions

- **Next.js API Routes as mock backend** — Instead of using external mock tools (json-server, MSW), the API is implemented as Next.js route handlers. This keeps everything in one project and simulates a real full-stack setup.
- **Zustand over Redux** — For a project this size, Zustand provides sufficient state management with minimal boilerplate. The auth store uses the `persist` middleware to survive page refreshes.
- **Simulated JWT** — The token is a base64-encoded JSON payload stored as an httpOnly cookie. The middleware checks for token existence to protect routes. No cryptographic verification is needed for a demo.
- **Zod for validation** — Schemas are defined once and shared between form validation and type inference, reducing duplication.
- **shadcn/ui** — Components are copied into the project (not installed as a dependency), allowing full customization while maintaining a consistent design system.
