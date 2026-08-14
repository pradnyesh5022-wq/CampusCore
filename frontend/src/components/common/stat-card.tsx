import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: string;
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn('rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900/70', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{value}</p>
        </div>
        {icon ? <div className="rounded-2xl bg-slate-100 p-2.5 text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">{icon}</div> : null}
      </div>
      {trend ? <p className="mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">{trend}</p> : null}
    </div>
  );
}
