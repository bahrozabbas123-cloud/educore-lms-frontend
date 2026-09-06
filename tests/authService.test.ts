import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentUser, login } from "@/services/authService";

describe("authService", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("posts the backend login contract and stores the JWT and mapped user", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          token: "jwt-token",
          user: {
            id: 7,
            full_name: "Team Lead",
            email: "lead@example.com",
            role: "Team Lead",
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const user = await login("lead@example.com", "secret123");

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:5000/api/auth/login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "lead@example.com", password: "secret123" }),
      })
    );
    expect(localStorage.getItem("token")).toBe("jwt-token");
    expect(JSON.parse(localStorage.getItem("user") || "null")).toEqual(user);
    expect(user.role).toBe("team_lead");
  });

  it("restores the current user with the stored JWT", async () => {
    localStorage.setItem("token", "jwt-token");
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          user: { id: 9, full_name: "Instructor", email: "instructor@example.com", role: "Instructor" },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    const user = await getCurrentUser();

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:5000/api/auth/me",
      expect.objectContaining({
        method: "GET",
        headers: { Authorization: "Bearer jwt-token" },
      })
    );
    expect(user.role).toBe("instructor");
    expect(JSON.parse(localStorage.getItem("user") || "null")).toEqual(user);
  });
});
