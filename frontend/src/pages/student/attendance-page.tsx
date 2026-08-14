import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { attendanceService } from '@/services/resources';
import { toast } from 'sonner';

export function StudentAttendancePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await attendanceService.list();
      setItems(data);
    } catch {
      toast.error('Unable to load attendance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  return (
    <PageShell title="Attendance" description="Review your attendance history.">
      <DataTable title="Attendance" description="Recent attendance entries" data={items} loading={loading} searchPlaceholder="Search attendance" columns={[{ key: 'student_id', header: 'Student ID' }, { key: 'course_id', header: 'Course ID' }, { key: 'status', header: 'Status' }, { key: 'date', header: 'Date' }]} />
    </PageShell>
  );
}
