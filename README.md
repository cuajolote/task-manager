# Task Manager

A full-featured task management application with authentication, CRUD operations, and responsive design.

**Live demo**: [https://cuajolote-task-manager.vercel.app/login](https://cuajolote-task-manager.vercel.app/login)

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) (App Router) | React framework with file-based routing and API routes |
| [TypeScript](https://www.typescriptlang.org/) | Static typing — zero `any` across the entire codebase |
| [Zustand](https://zustand-demo.pmnd.rs/) | Lightweight state management with persist middleware |
| [Zod](https://zod.dev/) | Schema validation with automatic TypeScript type inference |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS with responsive design |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible, customizable UI components |
| [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) | Unit and component testing |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/cuajolote/task-manager.git
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

### Tests

```bash
npm test
```

14 test suites, 64 tests covering stores, validation schemas, API client, and UI components.

## Demo Credentials

The app comes with a pre-seeded user account:

| Field | Value |
|---|---|
| Email | john@example.com |
| Password | password123 |

You can also register a new account through the registration page.

## Features

- **Authentication** — Simulated JWT with login, register, and logout. Session persists across page reloads via cookies + localStorage.
- **Task CRUD** — Create, edit, and delete tasks with real-time UI updates and toast notifications.
- **Status tracking** — Manage tasks as Pending, In Progress, or Completed.
- **Filtering** — Filter by status and search by title (client-side).
- **Form validation** — Zod schemas validate inputs before sending to the API, showing inline error messages.
- **Responsive design** — Mobile-first layout with adaptive grid (1 → 2 → 3 columns).
- **Loading states** — Skeleton loaders while fetching data.

## Project Structure

```
src/
├── app/                        # Next.js pages and API
│   ├── (auth)/                 # Public pages (login, register)
│   ├── (dashboard)/            # Protected pages (task list)
│   └── api/                    # Mock REST API
│       ├── _db/                # In-memory database with seed data
│       ├── auth/               # Login, register, logout endpoints
│       └── tasks/              # Task CRUD endpoints
│
├── components/                 # React components
│   ├── ui/                     # Base components (shadcn/ui)
│   ├── tasks/                  # TaskCard, TaskFilters, TaskFormDialog, etc.
│   ├── auth/                   # LoginForm, RegisterForm
│   └── layout/                 # Header
│
├── hooks/                      # Custom hooks
│   ├── use-auth.ts             # Auth lifecycle (login, register, logout)
│   └── use-tasks.ts            # Task CRUD + client-side filtering
│
├── stores/                     # Zustand stores
│   ├── auth.store.ts           # User session (persisted to localStorage)
│   └── task.store.ts           # Task list, filters, loading state
│
├── lib/                        # Shared utilities
│   ├── types.ts                # All TypeScript interfaces
│   ├── api-client.ts           # HTTP client with auto auth headers
│   ├── validations/            # Zod schemas (task, auth)
│   └── utils.ts                # Tailwind class merge helper
│
├── __tests__/                  # Unit and component tests
│   ├── stores/                 # Zustand store tests
│   ├── validations/            # Zod schema tests
│   ├── components/             # React component tests
│   ├── lib/                    # Utility and API client tests
│   └── api/                    # Mock DB helper tests
│
└── middleware.ts                # Route protection (redirects to /login if no token)
```

## Architecture Decisions

- **Next.js API Routes as mock backend** — The API lives inside the same project as route handlers, simulating a real backend with in-memory data and 300ms latency.
- **Zustand over Redux** — Minimal boilerplate for this project's scale. The auth store uses `persist` middleware; the task store doesn't (data is fetched fresh on mount).
- **Simulated JWT** — Base64-encoded payload stored as an httpOnly cookie. The middleware checks for token existence to protect routes.
- **Zod for validation** — Schemas are defined once; TypeScript types are inferred with `z.infer`, keeping validation rules and types in sync.
- **Custom hooks as service layer** — `useTasks` and `useAuth` bridge the API client and Zustand stores, keeping components free of data-fetching logic.
- **shadcn/ui** — Components are copied into the project (not a dependency), allowing full customization while maintaining a consistent design system.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm test` | Run all tests |
| `npm run lint` | Run ESLint |
