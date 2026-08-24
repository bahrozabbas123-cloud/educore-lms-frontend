import type { User } from "@/types";

const API_URL = "http://localhost:5000/api/auth";

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    full_name: string;
    email: string;
    role?: string;
    role_id?: number;
  };
  message?: string;
}

function mapUser(user: NonNullable<AuthResponse["user"]>): User {
  const role = user.role?.toLowerCase();

  return {
    id: String(user.id),
    fullName: user.full_name,
    email: user.email,
    role:
      role === "instructor"
        ? "instructor"
        : role === "team lead" || role === "team_lead"
          ? "team_lead"
          : role === "admin"
            ? "admin"
            : "student",
  };
}
export async function login(
  email: string,
  password: string
): Promise<User> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data: AuthResponse = await response.json();

  if (!response.ok || !data.success || !data.user || !data.token) {
    throw new Error(data.message || "Login failed.");
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(mapUser(data.user)));

  return mapUser(data.user);
}

export async function signup(
  fullName: string,
  email: string,
  password: string
): Promise<User> {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: fullName,
      email,
      password,
    }),
  });

  const data: AuthResponse = await response.json();

  if (!response.ok || !data.success || !data.user) {
    throw new Error(data.message || "Signup failed.");
  }

  return mapUser(data.user);
}
export async function getCurrentUser(): Promise<User> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: AuthResponse = await response.json();

  if (!response.ok || !data.success || !data.user) {
    throw new Error(data.message || "Failed to get current user.");
  }

  const user = mapUser(data.user);

  localStorage.setItem("user", JSON.stringify(user));

  return user;
}