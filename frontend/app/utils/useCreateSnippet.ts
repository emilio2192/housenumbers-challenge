import { useState } from "react";
import { createSnippet } from "~/utils/request";
import type { Snippet } from "~/types/api";

export function useCreateSnippet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snippet, setSnippet] = useState<Snippet | null>(null);

  async function submit(text: string) {
    setLoading(true);
    setError(null);
    setSnippet(null);
    try {
      const response = await createSnippet(text);
      setSnippet(response.data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create snippet");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error, snippet };
} 