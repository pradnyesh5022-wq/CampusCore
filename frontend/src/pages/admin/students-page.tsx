import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { FormSheet } from '@/components/common/form-sheet';
import { studentService } from '@/services/resources';
import { toast } from 'sonner';

export function StudentsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ user_id: '', department_id: '', roll_no: '', full_name: '', phone: '', semester: '' });

  const load = async (search = '') => {
    setLoading(true);
    try {
      const data = await studentService.list(search);
      setItems(data);
    } catch {
      toast.error('Unable to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const payload = {
        user_id: Number(form.user_id),
        department_id: Number(form.department_id),
        roll_no: form.roll_no,
        full_name: form.full_name,
        phone: form.phone,
        semester: Number(form.semester),
      };
      if (editing) {
        await studentService.update(editing.id, payload);
        toast.success('Student updated');
      } else {
        await studentService.create(payload);
        toast.success('Student created');
      }
      setOpen(false);
      setEditing(null);
      setForm({ user_id: '', department_id: '', roll_no: '', full_name: '', phone: '', semester: '' });
      await load();
    } catch {
      toast.error('Operation failed');
    }
  };

  return (
    <PageShell title="Students" description="Manage student records, roll numbers, and semesters.">
      <DataTable
        title="Students"
        description="Search students by name or roll number"
        data={items}
        loading={loading}
        searchPlaceholder="Search students"
        onAdd={() => {
          setEditing(null);
          setForm({ user_id: '', department_id: '', roll_no: '', full_name: '', phone: '', semester: '' });
          setOpen(true);
        }}
        onEdit={(row) => {
          setEditing(row);
          setForm({ user_id: String(row.user_id), department_id: String(row.department_id), roll_no: row.roll_no, full_name: row.full_name, phone: row.phone, semester: String(row.semester) });
          setOpen(true);
        }}
        onDelete={async (row) => {
          try {
            await studentService.remove(row.id);
            toast.success('Student deleted');
            await load();
          } catch {
            toast.error('Deletion failed');
          }
        }}
        columns={[
          { key: 'full_name', header: 'Name' },
          { key: 'roll_no', header: 'Roll No' },
          { key: 'semester', header: 'Semester' },
          { key: 'phone', header: 'Phone' },
        ]}
      />

      <FormSheet open={open} title={editing ? 'Edit student' : 'Create student'} description="Add or update student records." onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              User ID
              <input type="number" value={form.user_id} onChange={(event) => setForm({ ...form, user_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Department ID
              <input type="number" value={form.department_id} onChange={(event) => setForm({ ...form, department_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Roll number
              <input value={form.roll_no} onChange={(event) => setForm({ ...form, roll_no: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Semester
              <input type="number" value={form.semester} onChange={(event) => setForm({ ...form, semester: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required />
            </label>
          </div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Full name
            <input value={form.full_name} onChange={(event) => setForm({ ...form, full_name: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Phone
            <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required />
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm">Cancel</button>
            <button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">Save</button>
          </div>
        </form>
      </FormSheet>
    </PageShell>
  );
}
