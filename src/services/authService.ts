import type { User } from "@/types";

/**
 * Mock auth service — Week 1 scope has no live backend.
 * These functions simulate network calls so real API logic can be
 * dropped in later without changing how components call them.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function mockLogin(email: string, password: string): Promise<User> {
  // Simulated network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: "mock-user-1",
    fullName: "Demo Student",
    email,
    role: "student",
  };
}

export async function mockSignup(fullName: string, email: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: "mock-user-1",
    fullName,
    email,
    role: "student",
  };
}
