export default function LogoLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <img
        src="/logo.avif"
        alt="Loading..."
        width={80}
        height={80}
        className="animate-spin"
      />
      <span className="mt-4 text-primary-500 font-semibold">Loading...</span>
    </div>
  );
} 