import { PageShell } from '@/components/common/page-shell';
import { StatCard } from '@/components/common/stat-card';
import { BookOpen, ClipboardCheck, DollarSign, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getStudentDashboard } from '@/services/dashboard';
import { LoadingState } from '@/components/common/loading-state';

export function StudentDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentDashboard()
      .then((response) => setData(response.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;

  return (
    <PageShell title="Student Hub" description="Personal academic and fee overview.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Student" value={data?.student_name ?? '—'} icon={<ClipboardCheck size={18} />} />
        <StatCard title="Attendance" value={data?.attendance_records ?? 0} icon={<BookOpen size={18} />} />
        <StatCard title="Results" value={data?.result_records ?? 0} icon={<FileText size={18} />} />
        <StatCard title="Fees" value={data?.fee_records ?? 0} icon={<DollarSign size={18} />} />
      </div>
    </PageShell>
  );
}
