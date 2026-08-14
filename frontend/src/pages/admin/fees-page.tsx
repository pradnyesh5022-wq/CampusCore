import { useEffect, useState } from 'react';
import { PageShell } from '@/components/common/page-shell';
import { DataTable } from '@/components/common/data-table';
import { FormSheet } from '@/components/common/form-sheet';
import { feeService } from '@/services/resources';
import { toast } from 'sonner';

export function FeesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ student_id: '', amount: '', status: 'Paid', payment_mode: 'Cash' });

  const load = async () => {
    setLoading(true);
    try {
      const data = await feeService.list();
      setItems(data);
    } catch {
      toast.error('Unable to load fees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const payload = { student_id: Number(form.student_id), amount: Number(form.amount), status: form.status, payment_mode: form.payment_mode };
      if (editing) {
        await feeService.update(editing.id, payload);
        toast.success('Fee updated');
      } else {
        await feeService.create(payload);
        toast.success('Fee created');
      }
      setOpen(false);
      setEditing(null);
      setForm({ student_id: '', amount: '', status: 'Paid', payment_mode: 'Cash' });
      await load();
    } catch {
      toast.error('Operation failed');
    }
  };

  return (
    <PageShell title="Fees" description="Track student payments and fee status.">
      <DataTable title="Fees" description="Search fee records" data={items} loading={loading} searchPlaceholder="Search fees" onAdd={() => { setEditing(null); setForm({ student_id: '', amount: '', status: 'Paid', payment_mode: 'Cash' }); setOpen(true); }} onEdit={(row) => { setEditing(row); setForm({ student_id: String(row.student_id), amount: String(row.amount), status: row.status, payment_mode: row.payment_mode }); setOpen(true); }} onDelete={async (row) => { try { await feeService.remove(row.id); toast.success('Fee deleted'); await load(); } catch { toast.error('Deletion failed'); } }} columns={[{ key: 'student_id', header: 'Student ID' }, { key: 'amount', header: 'Amount' }, { key: 'status', header: 'Status' }, { key: 'payment_mode', header: 'Payment Mode' }]} />

      <FormSheet open={open} title={editing ? 'Edit fee' : 'Create fee'} description="Manage student fee entries." onClose={() => setOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Student ID<input type="number" value={form.student_id} onChange={(event) => setForm({ ...form, student_id: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Amount<input type="number" step="0.01" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950" required /></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950"><option>Paid</option><option>Pending</option><option>Overdue</option></select></label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Payment mode<select value={form.payment_mode} onChange={(event) => setForm({ ...form, payment_mode: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none dark:border-slate-800 dark:bg-slate-950"><option>Cash</option><option>Card</option><option>Bank Transfer</option></select></label>
          </div>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm">Cancel</button><button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">Save</button></div>
        </form>
      </FormSheet>
    </PageShell>
  );
}
