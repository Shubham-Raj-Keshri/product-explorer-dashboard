"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="p-6 max-w-7xl mx-auto text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong
      </h1>

      <p className="text-gray-600 mb-6">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Try again
      </button>
    </main>
  );
}
