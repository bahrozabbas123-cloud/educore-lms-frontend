import type { User } from "@/types";
import { API_BASE_URL } from "@/lib/config";


export interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Certificate {
  id: number;
  course_id: number | null;
  course_title: string | null;
  student_name: string;
  issued_at: string;
}

export interface Assignment {
  id: number;
  course_id: number;
  title: string;
  description: string | null;
  due_date: string | null;
  created_at: string;
}

interface ApiOptions extends RequestInit {
  auth?: boolean;
}

async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (options.auth !== false && typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const data = (await response.json().catch(() => ({}))) as T & { message?: string };

  if (!response.ok) {
    throw new Error(data.message || "The request could not be completed.");
  }

  return data;
}

export async function getNotifications() {
  const data = await request<{ notifications: Notification[] }>("/notifications");
  return data.notifications;
}

export async function markNotificationRead(id: number) {
  return request<{ notification: Notification }>(`/notifications/${id}/read`, { method: "PATCH" });
}

export async function markAllNotificationsRead() {
  return request<{ success: boolean }>("/notifications/read-all", { method: "PATCH" });
}

export async function getCertificates() {
  const data = await request<{ certificates: Certificate[] }>("/certificates");
  return data.certificates;
}

export async function updateProfile(fullName: string, email: string) {
  const data = await request<{ user: { id: number; full_name: string; email: string; role: string } }>(
    "/auth/me",
    { method: "PUT", body: JSON.stringify({ full_name: fullName, email }) }
  );

  const user: User = {
    id: String(data.user.id),
    fullName: data.user.full_name,
    email: data.user.email,
    role: data.user.role.toLowerCase().replace(" ", "_") as User["role"],
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export async function getAssignments() {
  const data = await request<{ assignments: Assignment[] }>("/assignments");
  return data.assignments;
}

export async function submitAssignment(assignmentId: number, fileUrl?: string) {
  return request<{ submission: unknown }>("/assignments/submit", {
    method: "POST",
    body: JSON.stringify({ assignment_id: assignmentId, file_url: fileUrl }),
  });
}

export async function getDashboard() {
  const data = await request<{ data: { enrolledCourses: number; pendingAssignments: number; certificatesEarned: number } }>(
    "/dashboard"
  );
  return data.data;
}

export async function getUsersWithRoles() {
  const data = await request<{ users: Array<{ id: number; full_name: string; email: string; role: string }> }>(
    "/roles/users"
  );
  return data.users;
}
