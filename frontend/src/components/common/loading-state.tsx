export function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="h-24 animate-pulse rounded-[28px] border border-slate-200/70 bg-slate-200/70 dark:border-slate-800 dark:bg-slate-800/70" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-[28px] border border-slate-200/70 bg-slate-200/70 dark:border-slate-800 dark:bg-slate-800/70" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-[28px] border border-slate-200/70 bg-slate-200/70 dark:border-slate-800 dark:bg-slate-800/70" />
    </div>
  );
}
