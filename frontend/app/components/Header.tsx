import Button from "./Button";

interface HeaderProps {
  buttonText: string;
  onButtonClick: () => void;
}

export default function Header({ buttonText, onButtonClick }: HeaderProps) {
  return (
    <header className="flex flex-row justify-between items-center px-12 py-8 w-full max-w-6xl mx-auto">
      <div className="flex flex-row items-end gap-6">
        <img src="/logo.avif" alt="AI Snippets Service" width={150} height={48} />
        <h1 className="text-4xl font-bold text-gray-800">AI Snippets Service</h1>
      </div>
      <Button onClick={onButtonClick}>{buttonText}</Button>
    </header>
  );
} 