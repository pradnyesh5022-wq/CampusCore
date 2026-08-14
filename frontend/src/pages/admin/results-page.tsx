import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { FormSheet } from '@/components/common/form-sheet';
import { resultService } from '@/services/resources';
import { toast } from 'sonner';

export function ResultsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ student_id: '', exam_id: '', marks_obtained: '', grade: 'A' });

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const payload = { student_id: Number(form.student_id), exam_id: Number(form.exam_id), marks_obtained: Number(form.marks_obtained), grade: form.grade };
      if (editing) {
        await resultService.update(editing.id, payload);
        toast.success('Result updated');
      } else {
        await resultService.create(payload);
        toast.success('Result created');
      }
      setOpen(false);
      setEditing(null);
      setForm({ student_id: '', exam_id: '', marks_obtained: '', grade: 'A' });
      await load();
    } catch {
      toast.error('Operation failed');
    }
  };

  return (
    <PageShell title="Results" description="Track student outcomes and grades.">
      <DataTable title="Results" description="Search marks and grades" data={items} loading={loading} searchPlaceholder="Search results" onAdd={() => { setEditing(null); setForm({ student_id: '', exam_id: '', marks_obtained: '', grade: 'A' }); setOpen(true); }} onEdit={(row) => { setEditing(row); setForm({ student_id: String(row.student_id), exam_id: String(row.exam_id), marks_obtained: String(row.marks_obtained), grade: row.grade }); setOpen(true); }} onDelete={async (row) => { try { await resultService.remove(row.id); toast.success('Result deleted'); await load(); } catch { toast.error('Deletion failed'); } }} columns={[{ key: 'student_id', header: 'Student ID' }, { key: 'exam_id', header: 'Exam ID' }, { key: 'marks_obtained', header: 'Marks' }, { key: 'grade', header: 'Grade' }]} />

      <FormSheet open={open} title={editing ? 'Edit result' : 'Create result'} description="Add or update result entries." onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Student ID<input type="number" value={form.student_id} onChange={(event) => setForm({ ...form, student_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Exam ID<input type="number" value={form.exam_id} onChange={(event) => setForm({ ...form, exam_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Marks obtained<input type="number" value={form.marks_obtained} onChange={(event) => setForm({ ...form, marks_obtained: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Grade<select value={form.grade} onChange={(event) => setForm({ ...form, grade: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950"><option>A</option><option>B</option><option>C</option><option>D</option><option>F</option></select></label>
          </div>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm">Cancel</button><button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">Save</button></div>
        </form>
      </FormSheet>
    </PageShell>
  );
}
