import { Activity, AlertCircle, BookOpen, GraduationCap, Users } from 'lucide-react';
import { PageShell } from '@/components/common/page-shell';
import { StatCard } from '@/components/common/stat-card';
import { LoadingState } from '@/components/common/loading-state';
import { useEffect, useState } from 'react';
import { getAdminDashboard } from '@/services/dashboard';

interface DashboardAnalytics {
  students?: number;
  faculty?: number;
  courses?: number;
  attendance_percentage?: number;
}

interface RecentStudent {
  id?: number;
  name?: string;
  roll_no?: string | number;
  semester?: string | number;
}

interface DashboardData {
  analytics?: DashboardAnalytics;
  recent_students?: RecentStudent[];
}

export function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminDashboard()
      .then((response) => setData(response.data))
      .catch(() => setError('We could not load the latest dashboard data. Please refresh and try again.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <PageShell title="Dashboard" description="Real-time overview of your campus operations.">
        <div className="rounded-[28px] border border-red-200 bg-red-50/80 p-6 text-red-700 shadow-sm dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5" size={20} />
            <div>
              <h2 className="font-semibold">Unable to load dashboard data</h2>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  const analytics = data?.analytics ?? {};
  const recentStudents = data?.recent_students ?? [];

  return (
    <PageShell title="Dashboard" description="Real-time overview of your campus operations.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Students" value={analytics.students ?? 0} icon={<GraduationCap size={18} />} trend="Live" />
        <StatCard title="Faculty" value={analytics.faculty ?? 0} icon={<Users size={18} />} trend="Updated" />
        <StatCard title="Courses" value={analytics.courses ?? 0} icon={<BookOpen size={18} />} trend="Active" />
        <StatCard title="Attendance" value={`${analytics.attendance_percentage ?? 0}%`} icon={<Activity size={18} />} trend="This term" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent students</h2>
              <p className="text-sm text-slate-500">Fresh registrations and active learners in the system.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">Live</span>
          </div>
          <div className="mt-4 space-y-3">
            {recentStudents.length > 0 ? recentStudents.map((student) => (
              <div key={student.id ?? `${student.name}-${student.roll_no}`} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{student.name ?? 'Unnamed student'}</p>
                  <p className="text-slate-500">Roll No: {student.roll_no ?? '—'}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Semester {student.semester ?? '—'}</span>
              </div>
            )) : (
              <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">No recent student records available yet.</div>
            )}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Campus pulse</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
              <p className="font-medium text-slate-900 dark:text-slate-100">Attendance trend</p>
              <p className="mt-1">Current average attendance is {analytics.attendance_percentage ?? 0}% for the active term.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
              <p className="font-medium text-slate-900 dark:text-slate-100">Academic coverage</p>
              <p className="mt-1">{analytics.courses ?? 0} active courses are being coordinated across the institution.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
              <p className="font-medium text-slate-900 dark:text-slate-100">Staff readiness</p>
              <p className="mt-1">{analytics.faculty ?? 0} faculty members are available for the current academic cycle.</p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
