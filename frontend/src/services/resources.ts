import api from '@/lib/axios';

async function getAll<T>(path: string) {
  const { data } = await api.get<T[]>(path);
  return data;
}

async function createOne<T, D>(path: string, payload: D) {
  const { data } = await api.post<T>(path, payload);
  return data;
}

async function updateOne<T, D>(path: string, id: number, payload: D) {
  const { data } = await api.put<T>(`${path}/${id}`, payload);
  return data;
}

async function deleteOne(path: string, id: number) {
  const { data } = await api.delete(path + `/${id}`);
  return data;
}

export const departmentService = {
  list: () => getAll<any>('/departments/'),
  create: (payload: any) => createOne<any, any>('/departments/', payload),
  update: (id: number, payload: any) => updateOne<any, any>('/departments/', id, payload),
  remove: (id: number) => deleteOne('/departments', id),
};

export const courseService = {
  list: () => getAll<any>('/courses/'),
  create: (payload: any) => createOne<any, any>('/courses/', payload),
  update: (id: number, payload: any) => updateOne<any, any>('/courses/', id, payload),
  remove: (id: number) => deleteOne('/courses', id),
};

export const studentService = {
  list: (search = '') => getAll<any>(`/students/?search=${encodeURIComponent(search)}`),
  create: (payload: any) => createOne<any, any>('/students/', payload),
  update: (id: number, payload: any) => updateOne<any, any>('/students/', id, payload),
  remove: (id: number) => deleteOne('/students', id),
};

export const facultyService = {
  list: () => getAll<any>('/faculty/'),
  create: (payload: any) => createOne<any, any>('/faculty/', payload),
  update: (id: number, payload: any) => updateOne<any, any>('/faculty/', id, payload),
  remove: (id: number) => deleteOne('/faculty', id),
};

export const attendanceService = {
  list: () => getAll<any>('/attendance/'),
  create: (payload: any) => createOne<any, any>('/attendance/', payload),
  update: (id: number, payload: any) => updateOne<any, any>('/attendance/', id, payload),
  remove: (id: number) => deleteOne('/attendance', id),
};

export const examService = {
  list: () => getAll<any>('/exams/'),
  create: (payload: any) => createOne<any, any>('/exams/', payload),
  update: (id: number, payload: any) => updateOne<any, any>('/exams/', id, payload),
  remove: (id: number) => deleteOne('/exams', id),
};

export const resultService = {
  list: () => getAll<any>('/results/'),
  create: (payload: any) => createOne<any, any>('/results/', payload),
  update: (id: number, payload: any) => updateOne<any, any>('/results/', id, payload),
  remove: (id: number) => deleteOne('/results', id),
};

export const feeService = {
  list: () => getAll<any>('/fees/'),
  create: (payload: any) => createOne<any, any>('/fees/', payload),
  update: (id: number, payload: any) => updateOne<any, any>('/fees/', id, payload),
  remove: (id: number) => deleteOne('/fees', id),
};

export const timetableService = {
  list: () => getAll<any>('/timetables/'),
  create: (payload: any) => createOne<any, any>('/timetables/', payload),
  update: (id: number, payload: any) => updateOne<any, any>('/timetables/', id, payload),
  remove: (id: number) => deleteOne('/timetables', id),
};

export const assignmentService = {
  list: () => getAll<any>('/assignments/'),
  create: (payload: any) => createOne<any, any>('/assignments/', payload),
  update: (id: number, payload: any) => updateOne<any, any>('/assignments/', id, payload),
  remove: (id: number) => deleteOne('/assignments', id),
};
