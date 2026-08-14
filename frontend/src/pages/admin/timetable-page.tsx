import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { FormSheet } from '@/components/common/form-sheet';
import { timetableService } from '@/services/resources';
import { toast } from 'sonner';

export function TimetablePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ course_id: '', faculty_id: '', day: 'Monday', start_time: '', end_time: '', room_no: '' });

  const load = async () => {
    setLoading(true);
    try {
      const data = await timetableService.list();
      setItems(data);
    } catch {
      toast.error('Unable to load timetable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const payload = { course_id: Number(form.course_id), faculty_id: Number(form.faculty_id), day: form.day, start_time: form.start_time, end_time: form.end_time, room_no: form.room_no };
      if (editing) {
        await timetableService.update(editing.id, payload);
        toast.success('Timetable updated');
      } else {
        await timetableService.create(payload);
        toast.success('Timetable created');
      }
      setOpen(false);
      setEditing(null);
      setForm({ course_id: '', faculty_id: '', day: 'Monday', start_time: '', end_time: '', room_no: '' });
      await load();
    } catch {
      toast.error('Operation failed');
    }
  };

  return (
    <PageShell title="Timetable" description="Schedule academic sessions and classrooms.">
      <DataTable title="Timetable" description="Search schedule entries" data={items} loading={loading} searchPlaceholder="Search timetable" onAdd={() => { setEditing(null); setForm({ course_id: '', faculty_id: '', day: 'Monday', start_time: '', end_time: '', room_no: '' }); setOpen(true); }} onEdit={(row) => { setEditing(row); setForm({ course_id: String(row.course_id), faculty_id: String(row.faculty_id), day: row.day, start_time: row.start_time, end_time: row.end_time, room_no: row.room_no }); setOpen(true); }} onDelete={async (row) => { try { await timetableService.remove(row.id); toast.success('Timetable deleted'); await load(); } catch { toast.error('Deletion failed'); } }} columns={[{ key: 'day', header: 'Day' }, { key: 'start_time', header: 'Start' }, { key: 'end_time', header: 'End' }, { key: 'room_no', header: 'Room' }]} />

      <FormSheet open={open} title={editing ? 'Edit timetable' : 'Create timetable'} description="Plan lessons for a room and instructor." onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Course ID<input type="number" value={form.course_id} onChange={(event) => setForm({ ...form, course_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Faculty ID<input type="number" value={form.faculty_id} onChange={(event) => setForm({ ...form, faculty_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Day<select value={form.day} onChange={(event) => setForm({ ...form, day: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950"><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option></select></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Room<input value={form.room_no} onChange={(event) => setForm({ ...form, room_no: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Start time<input value={form.start_time} onChange={(event) => setForm({ ...form, start_time: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">End time<input value={form.end_time} onChange={(event) => setForm({ ...form, end_time: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          </div>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm">Cancel</button><button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">Save</button></div>
        </form>
      </FormSheet>
    </PageShell>
  );
}
