import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginPage from "@/app/(auth)/login/page";

const { push, setUser, login } = vi.hoisted(() => ({
  push: vi.fn(),
  setUser: vi.fn(),
  login: vi.fn(),
}));

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ setUser }) }));
vi.mock("@/services/authService", () => ({ login }));

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows validation when credentials are missing", () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByRole("button", { name: "Log In" }));
    expect(screen.getByText("Please enter your email and password.")).toBeInTheDocument();
    expect(login).not.toHaveBeenCalled();
  });

  it("logs in and routes team leads to their dashboard", async () => {
    login.mockResolvedValue({ id: "4", fullName: "Lead", email: "lead@example.com", role: "team_lead" });
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "lead@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "secret123" } });
    fireEvent.click(screen.getByRole("button", { name: "Log In" }));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/team-lead"));
    expect(setUser).toHaveBeenCalled();
  });
});
