const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

export const API_BASE_URL = (
  configuredApiUrl || "https://backend-lms-iota-gray.vercel.app/api"
).replace(/\/+$/, "");
