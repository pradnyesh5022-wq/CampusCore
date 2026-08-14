import { PageShell } from '@/components/common/page-shell';
import { SectionCard } from '@/components/common/section-card';
import { useEffect, useMemo, useState } from 'react';
import { getAdminDashboard } from '@/services/dashboard';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export function AnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getAdminDashboard().then((response) => setData(response.data));
  }, []);

  const chartData = useMemo(() => [
    { name: 'Students', value: data?.analytics?.students ?? 0 },
    { name: 'Faculty', value: data?.analytics?.faculty ?? 0 },
    { name: 'Courses', value: data?.analytics?.courses ?? 0 },
    { name: 'Assignments', value: data?.analytics?.assignments ?? 0 },
  ], [data]);

  return (
    <PageShell title="Analytics" description="Visual summaries of campus metrics.">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Campus overview" description="A quick snapshot of institutional activity.">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#0f172a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Key statistics" description="Core numbers from the dashboard API.">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950"><span>Attendance percentage</span><strong>{data?.analytics?.attendance_percentage ?? 0}%</strong></div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950"><span>Fees collected</span><strong>{data?.analytics?.fees_collected ?? 0}</strong></div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950"><span>Users</span><strong>{data?.analytics?.users ?? 0}</strong></div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950"><span>Departments</span><strong>{data?.analytics?.departments ?? 0}</strong></div>
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
