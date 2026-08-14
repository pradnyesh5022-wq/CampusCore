import { Bell, Search, Menu, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface TopNavProps {
  onMenuClick?: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between rounded-[24px] border border-slate-200/70 bg-white/80 px-4 py-3 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.3)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden" aria-label="Open menu">
          <Menu size={18} />
        </button>
        <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 md:flex">
          <Search size={16} />
          <span>Search people, courses, records</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 md:flex">
          <Sparkles size={16} />
          <span>Live campus insights</span>
        </div>
        <button className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-right shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user?.username ?? 'Guest'}</p>
          <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{user?.role ?? 'visitor'}</p>
        </div>
      </div>
    </header>
  );
}
