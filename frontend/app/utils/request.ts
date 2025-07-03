import type { ApiResponse, Summary, Snippet } from "~/types/api";

export async function getSummaries(): Promise<ApiResponse<Summary[]>> {
  const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/snippets`);
  if (!res.ok) throw new Error("Failed to fetch summaries");
  return res.json();
}

export async function getSnippet(id: string): Promise<ApiResponse<Snippet>> {
  const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/snippets/${id}`);
  if (!res.ok) throw new Error("Failed to fetch snippet");
  return res.json();
}

export async function createSnippet(text: string): Promise<ApiResponse<Snippet>> {
  // Escape the text for JSON
  const escapedText = text.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/snippets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: escapedText }),
  });
  if (!res.ok) throw new Error("Failed to create snippet");
  return res.json();
} 