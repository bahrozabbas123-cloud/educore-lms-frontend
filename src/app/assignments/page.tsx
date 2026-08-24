"use client";

import { useEffect, useState } from "react";

type Assignment = {
  id: number;
  title: string;
  description: string;
  due_date: string;
  course_id: number;
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/assignments"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load assignments");
        }

        setAssignments(data.assignments);
      } catch (err) {
        console.error(err);
        setError("Unable to load assignments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const selected = assignments.find(
    (assignment) => assignment.id === selectedAssignment
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-gray-900">
            Weekly Assignments
          </h1>
          <p className="mt-4 text-gray-600">
            Loading assignments...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-gray-900">
            Weekly Assignments
          </h1>
          <p className="mt-4 text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900">
          Weekly Assignments
        </h1>

        <p className="mt-2 text-gray-600">
          View your assignments and submit your work.
        </p>

        {/* Assignment List */}
        {assignments.length === 0 ? (
          <div className="mt-8 rounded-xl bg-white p-8 text-center shadow">
            <p className="text-gray-600">
              No assignments available yet.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="rounded-xl bg-white p-6 shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {assignment.title}
                  </h2>

                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    Pending
                  </span>
                </div>

                <p className="mt-3 text-gray-600">
                  {assignment.description}
                </p>

                <p className="mt-4 text-sm text-gray-500">
                  Due:{" "}
                  {assignment.due_date
                    ? new Date(
                        assignment.due_date
                      ).toLocaleDateString()
                    : "No due date"}
                </p>

                <button
                  onClick={() =>
                    setSelectedAssignment(assignment.id)
                  }
                  className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Submit Assignment
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submission Form */}
        {selectedAssignment && selected && (
          <div className="mt-10 rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Submit Assignment
              </h2>

              <button
                onClick={() => setSelectedAssignment(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <p className="mt-2 text-gray-600">
              Assignment:{" "}
              <span className="font-medium text-gray-900">
                {selected.title}
              </span>
            </p>

            {/* Submission text */}
            <textarea
  placeholder="Write your submission..."
  className="mt-5 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  rows={5}
/>

            {/* File upload */}
            <div className="mt-5">
              <label className="mb-2 block font-medium text-gray-700">
                Upload your file
              </label>

              <input
                type="file"
                className="block w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            {/* Submit */}
            <button
              onClick={() => {
                alert("Assignment submitted successfully!");
                setSelectedAssignment(null);
              }}
              className="mt-5 rounded-lg bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </main>
  );
}