import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useNavigate, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import Header from "~/components/Header";
import Button from "~/components/Button";
import { useSnippet } from "~/utils/useSnippet";
import LogoLoader from "~/components/LogoLoader";

export const meta: MetaFunction = () => {
  return [
    { title: "Snippet Details - AI Snippets Service" },
    { name: "description", content: "View snippet details" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const snippetId = params.id;
  
  // Handle missing or empty ID
  if (!snippetId || snippetId.trim() === '') {
    throw redirect("/not-found");
  }
  
  // Handle invalid ID format (basic validation)
  if (!/^[a-zA-Z0-9-]+$/.test(snippetId)) {
    throw redirect("/not-found");
  }

  return { snippetId };
}

const TEXT = {
  buttonBack: "Back",
  notFoundTitle: "Snippet Not Found",
  notFoundMessage: "The snippet you're looking for doesn't exist or has been removed.",
  backToHome: "Back to Home",
  details: "Snippet Details",
  summary: "Summary",
  originalText: "Original Text",
  created: "Created:",
  updated: "Updated:",
};

function formatDate(dateString: string) {
  const d = new Date(dateString);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function SnippetDetails() {
  const { snippetId } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const { snippet, loading, error } = useSnippet(snippetId);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        buttonText={TEXT.buttonBack} 
        onButtonClick={() => navigate("/")} 
      />
      <main className="flex flex-col items-center justify-center w-full mt-12">
        <div className="flex flex-col items-center w-1/2">
          {loading && <LogoLoader />}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl w-full text-center">
              <h2 className="text-xl font-semibold text-red-800 mb-2">{TEXT.notFoundTitle}</h2>
              <p className="text-red-600 mb-4">{TEXT.notFoundMessage}</p>
              <Button onClick={() => navigate("/")}>{TEXT.backToHome}</Button>
            </div>
          )}
          {!loading && !error && snippet && (
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {TEXT.details}
              </h1>
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">{TEXT.summary}</h2>
                  <p className="text-gray-600">{snippet.summary}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">{TEXT.originalText}</h2>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
                    {snippet.text}
                  </pre>
                </div>
                <div className="text-sm text-gray-500">
                  <p>{TEXT.created} {formatDate(snippet.createdAt)}</p>
                  <p>{TEXT.updated} {formatDate(snippet.updatedAt)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 