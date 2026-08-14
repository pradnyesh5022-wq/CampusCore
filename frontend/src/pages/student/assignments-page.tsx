import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { assignmentService } from '@/services/resources';
import { toast } from 'sonner';

export function StudentAssignmentsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await assignmentService.list();
      setItems(data);
    } catch {
      toast.error('Unable to load assignments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  return (
    <PageShell title="Assignments" description="See pending and completed assignments.">
      <DataTable title="Assignments" description="Assignments overview" data={items} loading={loading} searchPlaceholder="Search assignments" columns={[{ key: 'title', header: 'Title' }, { key: 'due_date', header: 'Due Date' }, { key: 'course_id', header: 'Course ID' }]} />
    </PageShell>
  );
}
