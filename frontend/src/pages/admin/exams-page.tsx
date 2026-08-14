import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { FormSheet } from '@/components/common/form-sheet';
import { examService } from '@/services/resources';
import { toast } from 'sonner';

export function ExamsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ course_id: '', exam_name: '', exam_date: '', total_marks: '' });

  const load = async () => {
    setLoading(true);
    try {
      const data = await examService.list();
      setItems(data);
    } catch {
      toast.error('Unable to load exams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const payload = { course_id: Number(form.course_id), exam_name: form.exam_name, exam_date: form.exam_date, total_marks: Number(form.total_marks) };
      if (editing) {
        await examService.update(editing.id, payload);
        toast.success('Exam updated');
      } else {
        await examService.create(payload);
        toast.success('Exam created');
      }
      setOpen(false);
      setEditing(null);
      setForm({ course_id: '', exam_name: '', exam_date: '', total_marks: '' });
      await load();
    } catch {
      toast.error('Operation failed');
    }
  };

  return (
    <PageShell title="Exams" description="Plan and manage academic examinations.">
      <DataTable title="Exams" description="Search exams by name or date" data={items} loading={loading} searchPlaceholder="Search exams" onAdd={() => { setEditing(null); setForm({ course_id: '', exam_name: '', exam_date: '', total_marks: '' }); setOpen(true); }} onEdit={(row) => { setEditing(row); setForm({ course_id: String(row.course_id), exam_name: row.exam_name, exam_date: row.exam_date, total_marks: String(row.total_marks) }); setOpen(true); }} onDelete={async (row) => { try { await examService.remove(row.id); toast.success('Exam deleted'); await load(); } catch { toast.error('Deletion failed'); } }} columns={[{ key: 'exam_name', header: 'Exam' }, { key: 'exam_date', header: 'Date' }, { key: 'total_marks', header: 'Marks' }]} />

      <FormSheet open={open} title={editing ? 'Edit exam' : 'Create exam'} description="Create or edit exam schedules." onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Course ID<input type="number" value={form.course_id} onChange={(event) => setForm({ ...form, course_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Total marks<input type="number" value={form.total_marks} onChange={(event) => setForm({ ...form, total_marks: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          </div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Exam name<input value={form.exam_name} onChange={(event) => setForm({ ...form, exam_name: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Exam date<input type="date" value={form.exam_date} onChange={(event) => setForm({ ...form, exam_date: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm">Cancel</button><button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">Save</button></div>
        </form>
      </FormSheet>
    </PageShell>
  );
}
