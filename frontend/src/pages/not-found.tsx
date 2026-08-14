export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
      <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Page not found</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">The requested view does not exist.</p>
      </div>
    </div>
  );
}
