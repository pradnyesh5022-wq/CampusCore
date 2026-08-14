import { motion } from 'framer-motion';
import { Search, Plus, Trash2, Pencil } from 'lucide-react';
import { useDeferredValue, useMemo, useState } from 'react';
import { EmptyState } from '@/components/common/empty-state';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  loading?: boolean;
}

export function DataTable<T extends Record<string, unknown>>({
  title,
  description,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  searchPlaceholder = 'Search…',
  emptyMessage = 'No records found.',
  loading = false,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const hasActions = Boolean(onEdit || onDelete);

  const filtered = useMemo(() => {
    if (!deferredQuery) return data;
    const normalized = deferredQuery.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(normalized)),
    );
  }, [data, deferredQuery]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="rounded-[28px] border border-slate-200/70 bg-white/80 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
          {description ? <p className="text-sm text-slate-500">{description}</p> : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 transition focus-within:border-slate-400 focus-within:text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:focus-within:text-slate-200">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} className="w-40 bg-transparent outline-none" aria-label={searchPlaceholder} />
          </label>
          {onAdd ? (
            <button type="button" onClick={onAdd} className="flex items-center gap-2 rounded-2xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300">
              <Plus size={16} />
              Add
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-slate-200/70 pb-3 text-sm text-slate-500 dark:border-slate-800">
        <span>{filtered.length} visible</span>
        <span>{data.length} total</span>
      </div>

      <div className="mt-4 overflow-x-auto">
        {loading ? (
          <div className="space-y-3 py-4">
            {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-10 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState title="No records yet" description={emptyMessage} action={onAdd ? <button type="button" onClick={onAdd} className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">Create first record</button> : undefined} />
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800">
                {columns.map((column) => (
                  <th key={String(column.key)} className="px-3 py-3 font-medium">{column.header}</th>
                ))}
                {hasActions ? <th className="px-3 py-3 font-medium">Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, index) => (
                <tr key={index} className="border-b border-slate-100 text-slate-700 transition-colors hover:bg-slate-50/80 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/60">
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-3 py-3">{column.render ? column.render(row) : String(row[column.key] ?? '-')}</td>
                  ))}
                  {hasActions ? (
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        {onEdit ? <button type="button" onClick={() => onEdit(row)} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Edit row"><Pencil size={16} /></button> : null}
                        {onDelete ? <button type="button" onClick={() => onDelete(row)} className="rounded-xl p-2 text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-950" aria-label="Delete row"><Trash2 size={16} /></button> : null}
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}
