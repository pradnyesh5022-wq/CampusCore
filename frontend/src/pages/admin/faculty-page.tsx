import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { FormSheet } from '@/components/common/form-sheet';
import { facultyService } from '@/services/resources';
import { toast } from 'sonner';

export function FacultyPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ user_id: '', department_id: '', faculty_code: '', full_name: '', designation: '', phone: '' });

  const load = async () => {
    setLoading(true);
    try {
      const data = await facultyService.list();
      setItems(data);
    } catch {
      toast.error('Unable to load faculty');
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
        faculty_code: form.faculty_code,
        full_name: form.full_name,
        designation: form.designation,
        phone: form.phone,
      };
      if (editing) {
        await facultyService.update(editing.id, payload);
        toast.success('Faculty updated');
      } else {
        await facultyService.create(payload);
        toast.success('Faculty created');
      }
      setOpen(false);
      setEditing(null);
      setForm({ user_id: '', department_id: '', faculty_code: '', full_name: '', designation: '', phone: '' });
      await load();
    } catch {
      toast.error('Operation failed');
    }
  };

  return (
    <PageShell title="Faculty" description="Manage teaching staff profiles and departments.">
      <DataTable title="Faculty" description="Search faculty profiles" data={items} loading={loading} searchPlaceholder="Search faculty" onAdd={() => { setEditing(null); setForm({ user_id: '', department_id: '', faculty_code: '', full_name: '', designation: '', phone: '' }); setOpen(true); }} onEdit={(row) => { setEditing(row); setForm({ user_id: String(row.user_id), department_id: String(row.department_id), faculty_code: row.faculty_code, full_name: row.full_name, designation: row.designation, phone: row.phone }); setOpen(true); }} onDelete={async (row) => { try { await facultyService.remove(row.id); toast.success('Faculty deleted'); await load(); } catch { toast.error('Deletion failed'); } }} columns={[{ key: 'full_name', header: 'Name' }, { key: 'faculty_code', header: 'Faculty Code' }, { key: 'designation', header: 'Designation' }]} />

      <FormSheet open={open} title={editing ? 'Edit faculty' : 'Create faculty'} description="Add or update faculty records." onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">User ID<input type="number" value={form.user_id} onChange={(event) => setForm({ ...form, user_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Department ID<input type="number" value={form.department_id} onChange={(event) => setForm({ ...form, department_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Faculty code<input value={form.faculty_code} onChange={(event) => setForm({ ...form, faculty_code: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Designation<input value={form.designation} onChange={(event) => setForm({ ...form, designation: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          </div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full name<input value={form.full_name} onChange={(event) => setForm({ ...form, full_name: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Phone<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm">Cancel</button><button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">Save</button></div>
        </form>
      </FormSheet>
    </PageShell>
  );
}
