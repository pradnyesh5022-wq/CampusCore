import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { resultService } from '@/services/resources';
import { toast } from 'sonner';

export function StudentResultsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await resultService.list();
      setItems(data);
    } catch {
      toast.error('Unable to load results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  return (
    <PageShell title="Results" description="View your academic performance.">
      <DataTable title="Results" description="Current result records" data={items} loading={loading} searchPlaceholder="Search results" columns={[{ key: 'student_id', header: 'Student ID' }, { key: 'exam_id', header: 'Exam ID' }, { key: 'marks_obtained', header: 'Marks' }, { key: 'grade', header: 'Grade' }]} />
    </PageShell>
  );
}
