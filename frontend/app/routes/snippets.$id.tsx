import type { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import Button from "~/components/Button";

export const meta: MetaFunction = () => {
  return [
    { title: "Snippet Details - AI Snippets Service" },
    { name: "description", content: "View snippet details" },
  ];
};

export default function SnippetDetails() {
  const params = useParams();
  const snippetId = params.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Snippet Details
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            This is the details page for viewing snippet information.
          </p>
                      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Snippet ID: {snippetId}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Details for snippet with ID: {snippetId} will be displayed here.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => console.log('Edit snippet')}>
                  Edit Snippet
                </Button>
                <Button onClick={() => console.log('Back to list')}>
                  Back to List
                </Button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
} 