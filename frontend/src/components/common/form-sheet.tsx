import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FormSheetProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function FormSheet({ open, title, description, onClose, children, className }: FormSheetProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };


    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4" role="dialog" aria-modal="true" aria-labelledby="form-sheet-title">
      <button type="button" aria-label="Close dialog" className="absolute inset-0" onClick={onClose} />
      <motion.div ref={dialogRef} tabIndex={-1} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className={cn('relative z-10 w-full max-w-2xl rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_30px_100px_-30px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900', className)} onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 id="form-sheet-title" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">{title}</h3>
            {description ? <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p> : null}
          </div>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close form"><X size={18} /></button>
        </div>
        <div className="mt-6">{children}</div>
      </motion.div>
    </div>
  );
}

