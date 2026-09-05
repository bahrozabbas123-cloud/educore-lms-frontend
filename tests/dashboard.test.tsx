import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DashboardPage from "@/app/dashboard/page";

vi.mock("@/components/shared/ProtectedRoute", () => ({ default: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/services/api", () => ({
  getDashboard: vi.fn().mockResolvedValue({ enrolledCourses: 3, pendingAssignments: 2, certificatesEarned: 1 }),
}));

describe("DashboardPage", () => {
  it("renders live summary cards", async () => {
    render(<DashboardPage />);
    await waitFor(() => expect(screen.getByText("Enrolled Courses")).toBeInTheDocument());
    expect(screen.getByText("Pending Assignments")).toBeInTheDocument();
    expect(screen.getByText("Certificates Earned")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
