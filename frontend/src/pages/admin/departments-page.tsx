import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { FormSheet } from '@/components/common/form-sheet';
import { departmentService } from '@/services/resources';
import { toast } from 'sonner';

export function DepartmentsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ name: '', hod: '' });

  const load = async () => {
    setLoading(true);
    try {
      const data = await departmentService.list();
      setItems(data);
    } catch {
      toast.error('Unable to load departments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editing) {
        await departmentService.update(editing.id, form);
        toast.success('Department updated');
      } else {
        await departmentService.create(form);
        toast.success('Department created');
      }
      setOpen(false);
      setEditing(null);
      setForm({ name: '', hod: '' });
      await load();
    } catch {
      toast.error('Operation failed');
    }
  };

  return (
    <PageShell title="Departments" description="Manage academic departments and heads of department.">
      <DataTable
        title="Departments"
        description="Search departments and maintain records"
        data={items}
        loading={loading}
        searchPlaceholder="Search departments"
        onAdd={() => {
          setEditing(null);
          setForm({ name: '', hod: '' });
          setOpen(true);
        }}
        onEdit={(row) => {
          setEditing(row);
          setForm({ name: row.name, hod: row.hod });
          setOpen(true);
        }}
        onDelete={async (row) => {
          try {
            await departmentService.remove(row.id);
            toast.success('Department deleted');
            await load();
          } catch {
            toast.error('Deletion failed');
          }
        }}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'hod', header: 'HOD' },
        ]}
      />

      <FormSheet open={open} title={editing ? 'Edit department' : 'Create department'} description="Use this form to create or update a department." onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Department name
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            HOD
            <input value={form.hod} onChange={(event) => setForm({ ...form, hod: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required />
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
