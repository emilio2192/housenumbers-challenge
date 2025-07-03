import Header from "~/components/Header";
import { useNavigate } from "@remix-run/react";

const TEXT = {
  title: "AI Snippets Service",
  return: "Return",
};

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <Header 
        buttonText={TEXT.return} 
        onButtonClick={() => navigate("/")} 
      />
      <main className="flex flex-1 flex-col items-center justify-center w-full min-h-[60vh]">
        <div className="flex flex-col items-center gap-2 max-w-md w-full">
          <img src="/not-found.svg" alt="Not Found" className="h-8 w-auto mb-1 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-700 text-center">Page Not Found</h2>
          <p className="text-gray-500 text-center">Sorry, the page you are looking for does not exist.</p>
        </div>
      </main>
    </div>
  );
} 