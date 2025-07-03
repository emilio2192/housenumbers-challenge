import React from "react";

interface SummaryCardProps {
  summary: string;
  id: string;
}

const SummaryCard = React.memo(function SummaryCard({ summary, id }: SummaryCardProps) {
  return (
    <a 
      className="border-b-2 border-gray-300 p-4 text-gray-800 hover:border-primary-500 transition-colors duration-200 break-words whitespace-pre-line w-full " 
      href={`/snippets/${id}`}
    >
      {summary}
    </a>
  );
});

export default SummaryCard;