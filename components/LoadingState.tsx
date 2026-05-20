export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink to-light-blue">
      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin-slow" />
      <p className="mt-5 text-white text-lg font-medium">Загружаем интересные посты...</p>
    </div>
  );
}