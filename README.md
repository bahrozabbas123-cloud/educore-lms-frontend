# EduCore LMS Portal — Frontend

Frontend for **EduCore LMS**, a Learning Management System portal used by
students, instructors, and team leads.

Built as part of **Week 1 — Domain 3 of 5 (Frontend Development)** of the
Flycon AI Internship Program.

> **Week 1 scope:** foundation, layout shell, static pages, and reusable UI
> components only. No live backend / API integration yet.

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- Git / GitHub

## Getting Started

1. Clone the repo and install dependencies:

   ```bash
   git clone https://github.com/bahrozabbas123-cloud/educore-lms-frontend.git
   cd educore-lms-frontend
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Routes

| Route         | Description                              |
| ------------- | ----------------------------------------- |
| `/`           | Landing page                              |
| `/login`      | Static login page UI                      |
| `/signup`     | Static signup page UI                     |
| `/dashboard`  | Student dashboard shell (sidebar + topbar) |

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx       # Static login UI
│   │   └── signup/page.tsx      # Static signup UI
│   ├── dashboard/
│   │   ├── layout.tsx           # Wraps Sidebar + Topbar around dashboard pages
│   │   └── page.tsx             # Dashboard content area (empty state)
│   ├── layout.tsx                # Root layout, wraps <ThemeProvider>
│   ├── page.tsx                   # Landing page
│   └── globals.css
├── components/
│   ├── ui/                        # Reusable component library
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── Modal.tsx
│   ├── layout/                     # App shell pieces
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   └── shared/
│       ├── ThemeProvider.tsx        # Dark/light mode context (bonus)
│       └── ThemeToggle.tsx
├── hooks/
│   └── useTheme.ts                   # Consume ThemeProvider context
├── services/
│   └── authService.ts                 # Mock auth functions (no live API yet)
├── lib/
│   └── utils.ts                        # Small shared helpers
├── types/
│   └── index.ts                         # Shared TypeScript interfaces
└── assets/
    ├── images/
    └── icons/
```

## Features Implemented (Week 1)

- [x] Next.js + TypeScript + Tailwind CSS project setup
- [x] Clean, scalable folder structure (components, hooks, services, lib, types, assets)
- [x] Route groups for auth pages (`/login`, `/signup`)
- [x] Static Login and Signup page UIs (no auth logic yet)
- [x] Student Dashboard shell — Sidebar, Topbar, content area
- [x] Reusable UI component library — Button, Card, Input, Badge, Modal
- [x] Bonus: Dark/Light mode toggle (persisted via `localStorage`)

## Design System

- Dark-first theme with a violet → cyan gradient accent
- Glassmorphism surfaces (`glass-panel` utility class in `globals.css`)
- All components are variant-driven and reusable across the app

## Notes

- `next/font/google` was intentionally not used for headings/body text to
  keep the build independent of a network connection; the font stack falls
  back gracefully to system fonts. This can be swapped in later once the
  project has stable internet during CI/build.
- All data on the dashboard (courses, assignments, certificates) is currently
  static placeholder content. Live API integration will be added in a later
  week.

## Contributing

1. Create a feature branch off `dev`: `git checkout -b feature/day-x-task-name`
2. Commit with clear messages
3. Push and open a Pull Request into `dev` for review
