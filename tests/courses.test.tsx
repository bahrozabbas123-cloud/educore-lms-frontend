import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CoursesPage from "@/app/courses/page";

vi.mock("@/components/shared/ProtectedRoute", () => ({ default: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/services/api", () => ({
  getCourses: vi.fn().mockResolvedValue([]),
}));

describe("CoursesPage", () => {
  it("shows the backend-backed empty state when no courses are enrolled", async () => {
    render(<CoursesPage />);
    await waitFor(() => expect(screen.getByText("No courses available yet")).toBeInTheDocument());
    expect(screen.getByText("Your enrolled courses will appear here when a course is assigned to your account.")).toBeInTheDocument();
  });
});