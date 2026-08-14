import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { FormSheet } from '@/components/common/form-sheet';
import { assignmentService } from '@/services/resources';
import { toast } from 'sonner';

export function AssignmentsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ course_id: '', faculty_id: '', title: '', description: '', due_date: '' });

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const payload = { course_id: Number(form.course_id), faculty_id: Number(form.faculty_id), title: form.title, description: form.description, due_date: form.due_date };
      if (editing) {
        await assignmentService.update(editing.id, payload);
        toast.success('Assignment updated');
      } else {
        await assignmentService.create(payload);
        toast.success('Assignment created');
      }
      setOpen(false);
      setEditing(null);
      setForm({ course_id: '', faculty_id: '', title: '', description: '', due_date: '' });
      await load();
    } catch {
      toast.error('Operation failed');
    }
  };

  return (
    <PageShell title="Assignments" description="Create and monitor academic assignments.">
      <DataTable title="Assignments" description="Search assignment records" data={items} loading={loading} searchPlaceholder="Search assignments" onAdd={() => { setEditing(null); setForm({ course_id: '', faculty_id: '', title: '', description: '', due_date: '' }); setOpen(true); }} onEdit={(row) => { setEditing(row); setForm({ course_id: String(row.course_id), faculty_id: String(row.faculty_id), title: row.title, description: row.description, due_date: row.due_date }); setOpen(true); }} onDelete={async (row) => { try { await assignmentService.remove(row.id); toast.success('Assignment deleted'); await load(); } catch { toast.error('Deletion failed'); } }} columns={[{ key: 'title', header: 'Title' }, { key: 'due_date', header: 'Due Date' }, { key: 'course_id', header: 'Course ID' }]} />

      <FormSheet open={open} title={editing ? 'Edit assignment' : 'Create assignment'} description="Add or update assignment details." onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Course ID<input type="number" value={form.course_id} onChange={(event) => setForm({ ...form, course_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Faculty ID<input type="number" value={form.faculty_id} onChange={(event) => setForm({ ...form, faculty_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          </div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Due date<input type="date" value={form.due_date} onChange={(event) => setForm({ ...form, due_date: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm">Cancel</button><button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">Save</button></div>
        </form>
      </FormSheet>
    </PageShell>
  );
}
