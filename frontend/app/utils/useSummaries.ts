import { useEffect, useState } from "react";
import type { Summary } from "~/types/api";
import { getSummaries } from "~/utils/request";

export function useSummaries() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getSummaries()
      .then((data) => {
        setSummaries(data.data || []);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { summaries, loading, error };
} 