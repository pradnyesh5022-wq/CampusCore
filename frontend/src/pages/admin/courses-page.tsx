import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { FormSheet } from '@/components/common/form-sheet';
import { courseService, departmentService } from '@/services/resources';
import { toast } from 'sonner';

export function CoursesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ department_id: '', course_name: '', duration: '' });

  const load = async () => {
    setLoading(true);
    try {
      const [courses, departmentsData] = await Promise.all([courseService.list(), departmentService.list()]);
      setItems(courses);
      setDepartments(departmentsData);
    } catch {
      toast.error('Unable to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const payload = { department_id: Number(form.department_id), course_name: form.course_name, duration: Number(form.duration) };
      if (editing) {
        await courseService.update(editing.id, payload);
        toast.success('Course updated');
      } else {
        await courseService.create(payload);
        toast.success('Course created');
      }
      setOpen(false);
      setEditing(null);
      setForm({ department_id: '', course_name: '', duration: '' });
      await load();
    } catch {
      toast.error('Operation failed');
    }
  };

  return (
    <PageShell title="Courses" description="Create and manage available courses.">
      <DataTable
        title="Courses"
        description="Search course catalog"
        data={items}
        loading={loading}
        searchPlaceholder="Search courses"
        onAdd={() => {
          setEditing(null);
          setForm({ department_id: '', course_name: '', duration: '' });
          setOpen(true);
        }}
        onEdit={(row) => {
          setEditing(row);
          setForm({ department_id: String(row.department_id), course_name: row.course_name, duration: String(row.duration) });
          setOpen(true);
        }}
        onDelete={async (row) => {
          try {
            await courseService.remove(row.id);
            toast.success('Course deleted');
            await load();
          } catch {
            toast.error('Deletion failed');
          }
        }}
        columns={[
          { key: 'course_name', header: 'Course' },
          { key: 'duration', header: 'Duration (months)' },
          { key: 'department_id', header: 'Department ID' },
        ]}
      />

      <FormSheet open={open} title={editing ? 'Edit course' : 'Create course'} description="Manage course details and department assignment." onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Department
            <select value={form.department_id} onChange={(event) => setForm({ ...form, department_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required>
              <option value="">Select department</option>
              {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Course name
            <input value={form.course_name} onChange={(event) => setForm({ ...form, course_name: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Duration (months)
            <input type="number" value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required />
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
