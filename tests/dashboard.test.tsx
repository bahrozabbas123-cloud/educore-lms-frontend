import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DashboardPage from "@/app/dashboard/page";

vi.mock("@/components/shared/ProtectedRoute", () => ({ default: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/services/api", () => ({
  getDashboard: vi.fn().mockResolvedValue({ enrolledCourses: 3, pendingAssignments: 2, certificatesEarned: 1 }),
  getCourses: vi.fn().mockResolvedValue([]),
  getAssignments: vi.fn().mockResolvedValue([]),
  getNotifications: vi.fn().mockResolvedValue([]),
}));

describe("DashboardPage", () => {
  it("renders live summary cards", async () => {
    render(<DashboardPage />);
    await waitFor(() => expect(screen.getByText("Enrolled courses")).toBeInTheDocument());
    expect(screen.getByText("Pending assignments")).toBeInTheDocument();
    expect(screen.getByText("Certificates earned")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Enrolled courses/i })).toHaveAttribute("href", "/courses");
    expect(screen.getByRole("link", { name: /Pending assignments/i })).toHaveAttribute("href", "/assignments");
    expect(screen.getByRole("link", { name: /Certificates earned/i })).toHaveAttribute("href", "/dashboard/certificates");
  });
});
