import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "AI Snippets Service - Home" },
    { name: "description", content: "Welcome to the AI Snippets Service" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            AI Snippets Service
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your code snippets into clear, concise summaries using AI-powered analysis.
          </p>
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Snippets Listing
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              This is the listing page where all snippets will be displayed.
            </p>
            <div className="space-y-4">
              <p className="text-gray-600">
                • List of all snippets will appear here
              </p>
              <p className="text-gray-600">
                • Each snippet will have a link to its details page
              </p>
              <p className="text-gray-600">
                • Navigation to create new snippets will be available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
