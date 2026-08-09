export interface User {
  id: string;
  fullName: string;
  email: string;
  role: "student" | "instructor" | "admin";
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
