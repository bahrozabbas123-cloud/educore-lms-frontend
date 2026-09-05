export interface User {
  id: string;
  fullName: string;
  email: string;
  role: "student" | "instructor" | "team_lead" | "admin";
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number; // 0-100
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
}

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
