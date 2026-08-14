import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { FormSheet } from '@/components/common/form-sheet';
import { attendanceService } from '@/services/resources';
import { toast } from 'sonner';

export function AttendancePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ student_id: '', faculty_id: '', course_id: '', date: '', status: 'Present' });

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const payload = { student_id: Number(form.student_id), faculty_id: Number(form.faculty_id), course_id: Number(form.course_id), date: form.date, status: form.status };
      if (editing) {
        await attendanceService.update(editing.id, payload);
        toast.success('Attendance updated');
      } else {
        await attendanceService.create(payload);
        toast.success('Attendance recorded');
      }
      setOpen(false);
      setEditing(null);
      setForm({ student_id: '', faculty_id: '', course_id: '', date: '', status: 'Present' });
      await load();
    } catch {
      toast.error('Operation failed');
    }
  };

  return (
    <PageShell title="Attendance" description="Record and review daily attendance.">
      <DataTable title="Attendance" description="Search attendance entries" data={items} loading={loading} searchPlaceholder="Search attendance" onAdd={() => { setEditing(null); setForm({ student_id: '', faculty_id: '', course_id: '', date: '', status: 'Present' }); setOpen(true); }} onEdit={(row) => { setEditing(row); setForm({ student_id: String(row.student_id), faculty_id: String(row.faculty_id), course_id: String(row.course_id), date: row.date, status: row.status }); setOpen(true); }} onDelete={async (row) => { try { await attendanceService.remove(row.id); toast.success('Attendance deleted'); await load(); } catch { toast.error('Deletion failed'); } }} columns={[{ key: 'student_id', header: 'Student ID' }, { key: 'course_id', header: 'Course ID' }, { key: 'status', header: 'Status' }, { key: 'date', header: 'Date' }]} />

      <FormSheet open={open} title={editing ? 'Edit attendance' : 'Record attendance'} description="Capture attendance details." onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Student ID<input type="number" value={form.student_id} onChange={(event) => setForm({ ...form, student_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Faculty ID<input type="number" value={form.faculty_id} onChange={(event) => setForm({ ...form, faculty_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Course ID<input type="number" value={form.course_id} onChange={(event) => setForm({ ...form, course_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950"><option>Present</option><option>Absent</option><option>Late</option></select></label>
          </div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Date<input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm">Cancel</button><button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">Save</button></div>
        </form>
      </FormSheet>
    </PageShell>
  );
}
