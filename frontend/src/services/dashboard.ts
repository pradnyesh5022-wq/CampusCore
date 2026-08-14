import api from '@/lib/axios';

export async function getAdminDashboard() {
  return api.get('/dashboard/');
}

export async function getFacultyDashboard() {
  return api.get('/faculty-dashboard/');
}

export async function getStudentDashboard() {
  return api.get('/student-dashboard/');
}
