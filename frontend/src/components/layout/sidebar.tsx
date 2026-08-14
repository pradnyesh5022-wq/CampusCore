import { LayoutDashboard, GraduationCap, BookOpen, Settings, Users, CalendarDays, FileText, DollarSign, Menu, Moon, Sun, LogOut, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/theme-context';
import { useAuth } from '@/contexts/auth-context';

const adminLinks = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/students', label: 'Students', icon: GraduationCap },
  { to: '/faculty', label: 'Faculty', icon: Users },
  { to: '/courses', label: 'Courses', icon: BookOpen },
  { to: '/attendance', label: 'Attendance', icon: CalendarDays },
  { to: '/exams', label: 'Exams', icon: FileText },
  { to: '/fees', label: 'Fees', icon: DollarSign },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const facultyLinks = [
  { to: '/faculty-dashboard', label: 'Faculty Desk', icon: LayoutDashboard },
  { to: '/assignments', label: 'Assignments', icon: FileText },
  { to: '/timetable', label: 'Timetable', icon: CalendarDays },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const studentLinks = [
  { to: '/student-dashboard', label: 'Student Hub', icon: LayoutDashboard },
  { to: '/results', label: 'Results', icon: FileText },
  { to: '/attendance', label: 'Attendance', icon: CalendarDays },
  { to: '/fees', label: 'Fees', icon: DollarSign },
  { to: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const links = user?.role === 'faculty' ? facultyLinks : user?.role === 'student' ? studentLinks : adminLinks;

  return (
    <aside className={cn('hidden h-screen w-72 flex-col border-r border-slate-200/70 bg-white/80 px-4 py-5 shadow-[18px_0_70px_-45px_rgba(15,23,42,0.3)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 lg:flex', collapsed && 'w-20 px-2')}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-slate-900 p-2 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900">
            <GraduationCap size={18} />
          </div>
          {!collapsed ? <div><p className="text-sm font-semibold">CampusCore</p><p className="text-xs text-slate-500">Premium console</p></div> : null}
        </div>
        {onToggle ? <button onClick={onToggle} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Toggle sidebar"><Menu size={18} /></button> : null}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-3 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
        <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
          <Sparkles size={16} />
          {user?.role ? `${user.role[0].toUpperCase()}${user.role.slice(1)} workspace` : 'Workspace'}
        </div>
      </div>

      <nav className="mt-6 space-y-1.5">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => cn('flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition', isActive ? 'bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800')}
          >
            <Icon size={18} />
            {!collapsed ? <span>{label}</span> : null}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-2">
        <button onClick={toggleTheme} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          {!collapsed ? <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span> : null}
        </button>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          <LogOut size={18} />
          {!collapsed ? <span>Logout</span> : null}
        </button>
      </div>
    </aside>
  );
}
