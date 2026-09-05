import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AssignmentsPage from "@/app/assignments/page";

const { submitAssignment } = vi.hoisted(() => ({
  submitAssignment: vi.fn().mockResolvedValue({}),
}));
vi.mock("@/components/shared/ProtectedRoute", () => ({ default: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/services/api", () => ({
  getAssignments: vi.fn().mockResolvedValue([{ id: 9, title: "React Components", description: "Build a component.", due_date: null, course_id: 1, created_at: "2026-01-01" }]),
  submitAssignment,
}));

describe("AssignmentsPage", () => {
  it("opens and submits the assignment form", async () => {
    render(<AssignmentsPage />);
    await waitFor(() => expect(screen.getByText("React Components")).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "Submit assignment" }));
    fireEvent.change(screen.getByLabelText("File URL"), { target: { value: "https://example.com/work.pdf" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit work" }));
    await waitFor(() => expect(submitAssignment).toHaveBeenCalledWith(9, "https://example.com/work.pdf"));
    expect(await screen.findByText("Assignment submitted successfully.")).toBeInTheDocument();
  });
});
