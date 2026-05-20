export default function EmptyState() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-light-blue to-pink">
      <div className="bg-white p-12 rounded-3xl text-center shadow-2xl">
        <h2 className="text-4xl mb-4">🎉 Вы всё просмотрели!</h2>
        <p className="text-gray-600 mb-6 text-lg">Отличная работа! Возвращайтесь позже за новыми постами</p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-blue text-white rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Обновить
        </button>
      </div>
    </div>
  );
}