# EduCore LMS Portal — Frontend

Frontend for **EduCore LMS**, a Learning Management System portal used by students, instructors, and team leads.

Built as part of **Weeks 1–4 — Domain 3 of 5 (Frontend Development)** of the Flycon AI Internship Program.

> **Week 1 scope:** foundation, layout shell, static pages, and reusable UI components.
>
> **Week 2 scope:** real authentication, backend API integration, protected routes, role-based dashboards, assignments, and code review cleanup.

## Tech Stack

* [Next.js 16](https://nextjs.org/) (App Router) + TypeScript
* [Tailwind CSS](https://tailwindcss.com/)
* Node.js / Express backend API
* JWT authentication
* Git / GitHub

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

For deployment, set `NEXT_PUBLIC_API_URL` to the backend API base URL. For
local development, copy `.env.example` to `.env.local` and adjust it if needed.

3. Open http://localhost:3000 in your browser.

> The frontend communicates with the EduCore LMS backend API running locally on port `5000`.

## Available Routes

| Route                   | Description          |
| ----------------------- | -------------------- |
| `/`                     | Landing page         |
| `/login`                | User login           |
| `/signup`               | User registration    |
| `/dashboard`            | Student dashboard    |
| `/dashboard/instructor` | Instructor dashboard |
| `/assignments` | Assignments and submissions |
| `/dashboard/certificates` | Certificates |
| `/dashboard/profile` | Profile editing |
| `/dashboard/settings` | Theme and notification settings |
| `/team-lead` | Team Lead user directory |

## Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── Modal.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   └── shared/
│       ├── AuthProvider.tsx
│       ├── ThemeProvider.tsx
│       └── ThemeToggle.tsx
├── hooks/
│   └── useTheme.ts
├── services/
│   └── authService.ts
├── lib/
│   └── utils.ts
├── types/
│   └── index.ts
└── assets/
    ├── images/
    └── icons/
```

## Features Implemented (Week 1)

* [x] Next.js + TypeScript + Tailwind CSS project setup
* [x] Clean, scalable folder structure
* [x] Route groups for authentication pages
* [x] Static Login and Signup page UIs
* [x] Student Dashboard shell with Sidebar and Topbar
* [x] Reusable UI component library — Button, Card, Input, Badge, Modal
* [x] Dark/Light mode toggle with `localStorage` persistence

## Features Implemented (Week 2)

Built as part of **Week 2 — Domain 3 of 5 (Frontend Development)** of the Flycon AI Internship Program.

* [x] Real user registration and login
* [x] Backend API authentication integration
* [x] JWT-based authentication
* [x] Protected routes
* [x] Authentication state persistence on page refresh
* [x] Role-based dashboard routing
* [x] Student Dashboard
* [x] Instructor Dashboard
* [x] Team Lead Dashboard
* [x] Assignment API integration
* [x] Assignment-related frontend functionality
* [x] Authentication validation and error handling
* [x] Dashboard authentication refresh fix
* [x] Week 2 code review and cleanup

## Week 3 — Advanced LMS Features

* [x] Notifications with read/unread state
* [x] Certificates page
* [x] Profile and Settings
* [x] Dark/Light mode
* [x] Responsive design
* [x] Backend/API integration
* [x] Student, Instructor, and Team Lead role walkthrough
* [x] Frontend testing and integration fixes

## Week 4 — Testing, Optimization & Deployment

* [x] Login, dashboard, and submission tests
* [x] Responsive QA across mobile/tablet/desktop
* [x] Performance optimization
* [x] Bug fixing and final UI polish
* [x] Production environment configuration
* [x] Production build validation
* [x] Deployment preparation
* [x] Final demo/rehearsal

### Production deployment

1. Deploy the backend API and confirm its public URL, including the `/api` path.
2. In the frontend hosting provider, set `NEXT_PUBLIC_API_URL` to that API URL, for example:

```text
NEXT_PUBLIC_API_URL=https://api.example.com/api
```

3. Configure the backend CORS policy to allow the deployed frontend origin.
4. Run the frontend build and deploy the generated Next.js application:

```bash
npm ci
npm run build
npm run start
```

Do not commit `.env.local`, JWTs, passwords, database credentials, or other secrets. The public `NEXT_PUBLIC_API_URL` value is configuration, not a secret, but it must be set before the production build because Next.js exposes it to the browser.

### Week 4 demo flow

Use a real account from the backend, then verify login, dashboard routing, assignments, notifications, certificates, profile, settings, dark mode, and refresh persistence. Repeat at mobile, tablet, and desktop widths. See [DEMO.md](DEMO.md) for the full walkthrough.

## Backend Integration

The frontend is integrated with the EduCore LMS backend API.

The backend provides:

* User registration
* User login
* JWT authentication
* Current-user authentication
* Role-based access
* Dashboard-related API functionality
* Assignment API functionality

The frontend uses an authentication service to communicate with the backend API and stores the authentication token locally for session persistence.

## Authentication & Routing

Week 2 introduced real authentication and protected application routes.

The application:

* Authenticates users through the backend API
* Stores the authentication token locally
* Restores authentication state after page refresh
* Redirects unauthenticated users to the login page
* Provides role-based dashboard access
* Supports different dashboard experiences for students, instructors, and team leads

## Design System

* Dark-first theme with a violet → cyan gradient accent
* Glassmorphism surfaces using the `glass-panel` utility
* Reusable and variant-driven UI components
* Responsive dashboard layout
* Consistent Sidebar and Topbar navigation

## Notes

* `next/font/google` was intentionally not used for headings/body text to keep the build independent of a network connection; the font stack falls back gracefully to system fonts.
* Authentication and dashboard functionality are connected to the backend API.
* LMS content is rendered from the backend API; empty API responses show explicit empty states rather than fabricated data.
* The frontend backend API is expected to run locally on `http://localhost:5000`.

## Development Progress

### Week 1 — Frontend Foundation

Completed the initial frontend foundation, including project setup, reusable components, authentication page UI, dashboard shell, layout structure, and theme support.

### Week 2 — Authentication & Application Features

Completed real authentication, backend integration, protected routing, role-based dashboards, assignment functionality, authentication persistence, and code review cleanup.

### Week 3 — Advanced LMS Features

Completed notifications, certificates, profile and settings workflows, theme support, responsive design, role walkthroughs, and frontend integration fixes.

### Week 4 — Testing, Optimization & Deployment

Completed responsive QA, performance-focused cleanup, bug fixing, UI polish, production configuration, build validation, deployment preparation, and final demo rehearsal. Deployment is prepared but not complete; no live frontend URL is currently published.

## Contributing

1. Create a feature branch from `master`:

```bash
git checkout -b feature/day-x-task-name
```

2. Make your changes and test them locally.

3. Commit with a clear message:

```bash
git add .
git commit -m "Describe your changes"
```

4. Push your branch:

```bash
git push -u origin feature/day-x-task-name
```

5. Open a Pull Request into `master`.

## Internship Program

This project is being developed as part of the **Flycon AI Internship Program — Domain 3 of 5: Frontend Development**.

Progress is organized by weekly development milestones, from frontend foundations in Week 1 through authentication, advanced LMS features, testing, optimization, and deployment preparation in Weeks 2–4.
