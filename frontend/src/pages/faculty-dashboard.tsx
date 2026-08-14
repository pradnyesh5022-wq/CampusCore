import { PageShell } from '@/components/common/page-shell';
import { StatCard } from '@/components/common/stat-card';
import { BookOpen, ClipboardCheck, CalendarDays, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getFacultyDashboard } from '@/services/dashboard';
import { LoadingState } from '@/components/common/loading-state';

export function FacultyDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFacultyDashboard()
      .then((response) => setData(response.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;

  return (
    <PageShell title="Faculty Desk" description="Your teaching workspace and course overview.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Faculty" value={data?.faculty_name ?? '—'} icon={<ClipboardCheck size={18} />} />
        <StatCard title="Courses" value={data?.courses ?? 0} icon={<BookOpen size={18} />} />
        <StatCard title="Assignments" value={data?.assignments ?? 0} icon={<FileText size={18} />} />
        <StatCard title="Timetable" value={data?.timetable ?? 0} icon={<CalendarDays size={18} />} />
      </div>
    </PageShell>
  );
}
