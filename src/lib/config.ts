const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

export const API_BASE_URL = (
  configuredApiUrl || "https://educore-lms-backend-full-fxjr.vercel.app/api"
).replace(/\/+$/, "");