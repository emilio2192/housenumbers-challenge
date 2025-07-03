import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Create New Snippet - AI Snippets Service" },
    { name: "description", content: "Create a new code snippet" },
  ];
};

export default function NewSnippet() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Create New Snippet
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            This is the create page where users can add new code snippets.
          </p>
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <p className="text-lg text-gray-700">
              Form will go here for creating new snippets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 