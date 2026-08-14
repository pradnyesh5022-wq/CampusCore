import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from '@/contexts/auth-context';
import { ThemeProvider } from '@/contexts/theme-context';
import { ErrorBoundary } from '@/components/common/error-boundary';
import { Sidebar } from '@/components/layout/sidebar';
import { TopNav } from '@/components/layout/top-nav';
import { LoadingState } from '@/components/common/loading-state';

const LoginPage = lazy(() => import('@/pages/login').then((module) => ({ default: module.LoginPage })));
const DashboardPage = lazy(() => import('@/pages/dashboard').then((module) => ({ default: module.DashboardPage })));
const FacultyDashboardPage = lazy(() => import('@/pages/faculty-dashboard').then((module) => ({ default: module.FacultyDashboardPage })));
const StudentDashboardPage = lazy(() => import('@/pages/student-dashboard').then((module) => ({ default: module.StudentDashboardPage })));
const DepartmentsPage = lazy(() => import('@/pages/admin/departments-page').then((module) => ({ default: module.DepartmentsPage })));
const CoursesPage = lazy(() => import('@/pages/admin/courses-page').then((module) => ({ default: module.CoursesPage })));
const StudentsPage = lazy(() => import('@/pages/admin/students-page').then((module) => ({ default: module.StudentsPage })));
const FacultyPage = lazy(() => import('@/pages/admin/faculty-page').then((module) => ({ default: module.FacultyPage })));
const AttendancePage = lazy(() => import('@/pages/admin/attendance-page').then((module) => ({ default: module.AttendancePage })));
const ExamsPage = lazy(() => import('@/pages/admin/exams-page').then((module) => ({ default: module.ExamsPage })));
const ResultsPage = lazy(() => import('@/pages/admin/results-page').then((module) => ({ default: module.ResultsPage })));
const FeesPage = lazy(() => import('@/pages/admin/fees-page').then((module) => ({ default: module.FeesPage })));
const TimetablePage = lazy(() => import('@/pages/admin/timetable-page').then((module) => ({ default: module.TimetablePage })));
const AssignmentsPage = lazy(() => import('@/pages/admin/assignments-page').then((module) => ({ default: module.AssignmentsPage })));
const AnalyticsPage = lazy(() => import('@/pages/admin/analytics-page').then((module) => ({ default: module.AnalyticsPage })));
const SettingsPage = lazy(() => import('@/pages/admin/settings-page').then((module) => ({ default: module.SettingsPage })));
const StudentAttendancePage = lazy(() => import('@/pages/student/attendance-page').then((module) => ({ default: module.StudentAttendancePage })));
const StudentResultsPage = lazy(() => import('@/pages/student/results-page').then((module) => ({ default: module.StudentResultsPage })));
const StudentAssignmentsPage = lazy(() => import('@/pages/student/assignments-page').then((module) => ({ default: module.StudentAssignmentsPage })));

function RouteFallback() {
  return (
    <div className="min-h-[50vh] rounded-[28px] border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <LoadingState />
    </div>
  );
}

function ProtectedLayout() {
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">Loading…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <div className="flex">
        <div className="lg:hidden">
          {mobileOpen ? <div className="fixed inset-0 z-40 bg-slate-950/40" onClick={() => setMobileOpen(false)} /> : null}
          <div className={mobileOpen ? 'fixed inset-y-0 left-0 z-50 w-72' : 'hidden'}>
            <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
          </div>
        </div>
        <div className="hidden lg:block">
          <Sidebar collapsed={false} onToggle={() => setMobileOpen((value) => !value)} />
        </div>
        <div className="flex-1 p-4 lg:p-6">
          <TopNav onMenuClick={() => setMobileOpen((value) => !value)} />
          <main className="mt-6">
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                {user.role === 'admin' ? <Route path="/dashboard" element={<DashboardPage />} /> : null}
                {user.role === 'admin' ? <Route path="/analytics" element={<AnalyticsPage />} /> : null}
                {user.role === 'admin' ? <Route path="/departments" element={<DepartmentsPage />} /> : null}
                {user.role === 'admin' ? <Route path="/courses" element={<CoursesPage />} /> : null}
                {user.role === 'admin' ? <Route path="/students" element={<StudentsPage />} /> : null}
                {user.role === 'admin' ? <Route path="/faculty" element={<FacultyPage />} /> : null}
                <Route path="/attendance" element={user.role === 'student' ? <StudentAttendancePage /> : <AttendancePage />} />
                {user.role === 'admin' ? <Route path="/exams" element={<ExamsPage />} /> : null}
                <Route path="/results" element={user.role === 'student' ? <StudentResultsPage /> : <ResultsPage />} />
                <Route path="/fees" element={<FeesPage />} />
                <Route path="/timetable" element={<TimetablePage />} />
                <Route path="/assignments" element={user.role === 'student' ? <StudentAssignmentsPage /> : <AssignmentsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                {user.role === 'faculty' ? <Route path="/faculty-dashboard" element={<FacultyDashboardPage />} /> : null}
                {user.role === 'student' ? <Route path="/student-dashboard" element={<StudentDashboardPage />} /> : null}
                <Route path="*" element={<Navigate to={user.role === 'faculty' ? '/faculty-dashboard' : user.role === 'student' ? '/student-dashboard' : '/dashboard'} replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster richColors position="top-right" />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
