import { PageShell } from '@/components/common/page-shell';
import { SectionCard } from '@/components/common/section-card';

export function SettingsPage() {
  return (
    <PageShell title="Settings" description="Configure the campus experience and preferences.">
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Preferences" description="Customize how the workspace behaves.">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">Notifications and alerts can be configured per role.</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">Theme preferences are persisted automatically.</div>
          </div>
        </SectionCard>
        <SectionCard title="Security" description="Authentication and session controls.">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">JWT-based sessions are stored locally after login.</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">Logout clears the access token and returns to the login experience.</div>
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
