import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const canSubmit = useMemo(() => email.trim().length > 0 && password.trim().length > 0, [email, password]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.12),_transparent_60%)] px-4 py-8 dark:bg-slate-950">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="w-full max-w-md rounded-[32px] border border-slate-200/70 bg-white/80 p-8 shadow-[0_35px_120px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            <Sparkles size={16} />
            CampusCore
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Secure campus access</h1>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">Sign in to continue to your college workspace with the confidence of a modern SaaS experience.</p>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
          Use your institution credentials to access the role-based workspace for administrators, faculty, or students.
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email address
            <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3 outline-none transition focus:border-slate-400 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:focus:bg-slate-900" placeholder="admin@campuscore.com" required />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
            <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3 outline-none transition focus:border-slate-400 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:focus:bg-slate-900" placeholder="••••••••" required />
          </label>

          {error ? <div aria-live="polite" className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300"><ShieldCheck size={16} className="mt-0.5" /><span>{error}</span></div> : null}

          <button type="submit" disabled={loading || !canSubmit} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
