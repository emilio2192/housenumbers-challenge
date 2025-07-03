import type { MetaFunction } from "@remix-run/node";
import SummaryCard from "~/components/SummaryCard";
import { useSummaries } from "~/utils/useSummaries";
import LogoLoader from "~/components/LogoLoader";
import Header from "~/components/Header";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "AI Snippets Service - Home" },
    { name: "description", content: "Welcome to the AI Snippets Service" },
  ];
};
const TEXT = {
  title: "AI Snippets Service",
  newSummary: "New Summary",
  noSummaries: "No summaries yet."
};

export default function Index() {
  const { summaries, loading, error } = useSummaries();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header 
        buttonText={TEXT.newSummary} 
        onButtonClick={() => navigate("/new")} 
      />
      <main className="flex flex-col items-center justify-center w-full mt-12">
        <div className="flex flex-col items-center w-1/2">
          {loading && <LogoLoader />}
          {error && <div className="text-red-500 py-8">Error: {error}</div>}
          {!loading && !error && summaries.length === 0 && (
            <div className="text-gray-500 py-8">{TEXT.noSummaries}</div>
          )}
          {!loading && !error && summaries.map(summary => (
            <SummaryCard key={summary.id} id={summary.id} summary={summary.summary} />
          ))}
        </div>
      </main>
    </div>
  );
}
