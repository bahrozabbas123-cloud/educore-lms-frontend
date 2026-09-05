# EduCore LMS Week 4 Demo Flow

## Local setup

1. Start the backend on port 5000.
2. Copy `.env.example` to `.env.local`.
3. Run `npm run dev` and open `http://localhost:3000`.

## Walkthrough

1. Open `/login`, sign in with a seeded student account, and confirm the redirect to `/dashboard`.
2. Check the dashboard cards for enrolled courses, pending assignments, and certificates.
3. Open `/assignments`, select an assignment, enter a real file URL, and submit it.
4. Open the header notification bell and verify unread, read, and mark-all-read behavior.
5. Open `/dashboard/certificates` and review issued certificates returned by the API.
6. Open `/dashboard/profile`, edit the authenticated user's name or email, and save.
7. Open `/dashboard/settings`, toggle dark/light mode, refresh, and confirm persistence.
8. Sign in as an instructor and verify authenticated dashboard navigation. Instructor-specific reporting is not exposed by the current backend.
9. Sign in as a Team Lead and verify redirect to `/team-lead` and the real role directory.
10. Repeat the flow on mobile, tablet, and desktop widths. Use the deployed URL once the frontend is deployed with `NEXT_PUBLIC_API_URL` set to the deployed backend API.

## API configuration

Set `NEXT_PUBLIC_API_URL` to the backend API base URL, including `/api`, for example:

```text
NEXT_PUBLIC_API_URL=https://api.example.com/api
```
