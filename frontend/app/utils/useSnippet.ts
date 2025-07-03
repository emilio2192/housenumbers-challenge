import { useEffect, useState } from "react";
import type { Snippet } from "~/types/api";
import { getSnippet } from "~/utils/request";

export function useSnippet(id: string) {
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No snippet ID provided");
      setLoading(false);
      return;
    }

    async function fetchSnippet() {
      try {
        setLoading(true);
        setError(null);
        const response = await getSnippet(id);
        setSnippet(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch snippet");
      } finally {
        setLoading(false);
      }
    }

    fetchSnippet();
  }, [id]);

  return { snippet, loading, error };
} 