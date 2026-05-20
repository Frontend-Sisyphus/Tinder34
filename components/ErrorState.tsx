interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-grayish to-purple">
      <div className="bg-white p-10 rounded-2xl text-center shadow-2xl max-w-md">
        <h2 className="text-3xl mb-4">😔 Ошибка</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-blue text-white rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
}