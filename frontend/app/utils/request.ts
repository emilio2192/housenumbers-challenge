import type { ApiResponse, Summary } from "~/types/api";

export async function getSummaries(): Promise<ApiResponse<Summary[]>> {
  const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/snippets`);
  if (!res.ok) throw new Error("Failed to fetch summaries");
  return res.json();
} 