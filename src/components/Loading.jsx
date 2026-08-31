export const LoadingAnimation = () => {
  return (
    <div className="inline-block w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
  );
};

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--primary)]/20 border-t-[var(--primary)] mb-4"></div>
      <p className="text-sm font-semibold text-[var(--text-secondary)] animate-pulse">Loading SportsSquad...</p>
    </div>
  );
};
  