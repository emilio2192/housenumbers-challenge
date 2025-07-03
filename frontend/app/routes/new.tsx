import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import Button from "~/components/Button";
import Header from "~/components/Header";
import { useCreateSnippet } from "~/utils/useCreateSnippet";

export const meta: MetaFunction = () => {
  return [
    { title: "Create New Snippet - AI Snippets Service" },
    { name: "description", content: "Create a new code snippet" },
  ];
};
const TEXT = {
  buttonBack: "Back",
  title: "Create New Snippet",
};
export default function NewSnippet() {
  const navigate = useNavigate();
  const { submit, loading, error } = useCreateSnippet();
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const result = await submit(text);
    if (result) {
      navigate(`/snippets/${result.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        buttonText={TEXT.buttonBack}
        onButtonClick={() => navigate("/")}
      />
      <main className="flex flex-col items-center justify-center w-full mt-12">
        <div className="flex flex-col items-center w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 self-start">
            {TEXT.title}
          </h1>
          <textarea 
            className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none" 
            placeholder="Enter your text to be summarized here..."
            onChange={(e) => setText(e.target.value)}
           />
          {error && (
            <div className="text-red-600 mt-2 w-full text-left">{error}</div>
          )}
          <Button className="self-end mt-4" onClick={handleSubmit} disabled={loading || text.length === 0}>
            Save Snippet
          </Button>
        </div>
      </main>
    </div>
  );
} 