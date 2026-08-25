"use client";

import { useState } from "react";

type Submission = {
  id: number;
  student: string;
  assignment: string;
  submittedAt: string;
  status: "Pending" | "Approved" | "Rejected";
};

const initialSubmissions: Submission[] = [
  {
    id: 1,
    student: "Test Student",
    assignment: "HTML & CSS Basics",
    submittedAt: "August 25, 2026",
    status: "Pending",
  },
  {
    id: 2,
    student: "Ali Khan",
    assignment: "JavaScript Fundamentals",
    submittedAt: "August 24, 2026",
    status: "Pending",
  },
  {
    id: 3,
    student: "Sara Ahmed",
    assignment: "React Components",
    submittedAt: "August 23, 2026",
    status: "Approved",
  },
];

export default function TeamLeadDashboard() {
  const [submissions, setSubmissions] =
    useState<Submission[]>(initialSubmissions);

  const [feedback, setFeedback] = useState<Record<number, string>>({});

  const updateStatus = (
    id: number,
    status: "Approved" | "Rejected"
  ) => {
    setSubmissions((current) =>
      current.map((submission) =>
        submission.id === id
          ? { ...submission, status }
          : submission
      )
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Team Lead Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Review team submissions, approve or reject work, and provide
            feedback.
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Total Submissions
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {submissions.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Pending Reviews
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {
                submissions.filter(
                  (submission) => submission.status === "Pending"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Approved
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {
                submissions.filter(
                  (submission) => submission.status === "Approved"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Submissions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Team Submissions
          </h2>

          <div className="mt-5 space-y-5">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="rounded-xl bg-white p-6 shadow"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {submission.assignment}
                    </h3>

                    <p className="mt-2 text-gray-600">
                      Student: {submission.student}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Submitted: {submission.submittedAt}
                    </p>
                  </div>

                  <span
                    className={`h-fit rounded-full px-3 py-1 text-sm font-medium ${
                      submission.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : submission.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>

                {/* Feedback */}
                <div className="mt-5">
                  <label className="mb-2 block font-medium text-gray-700">
                    Feedback
                  </label>

                  <textarea
                    value={feedback[submission.id] || ""}
                    onChange={(event) =>
                      setFeedback({
                        ...feedback,
                        [submission.id]: event.target.value,
                      })
                    }
                    placeholder="Write feedback for the student..."
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() =>
                      updateStatus(submission.id, "Approved")
                    }
                    className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(submission.id, "Rejected")
                    }
                    className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}