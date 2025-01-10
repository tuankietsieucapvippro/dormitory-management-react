import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL
});

// Building APIs
export const buildingApi = {
  getAll: () => api.get('/toanha'),
  getById: (id: number) => api.get(`/toanha/${id}`),
  create: (data: any) => api.post('/toanha', data),
  update: (id: number, data: any) => api.patch(`/toanha/${id}`, data),
  delete: (id: number) => api.delete(`/toanha/${id}`),
  deleteRoom: (id: number) => api.delete(`/phong/${id}`)
};

// Room APIs
export const roomApi = {
  getAll: () => api.get('/phong'),
  getByBuilding: (buildingId: number) => api.get(`/phong/toanha/${buildingId}`),
  getById: (id: number) => api.get(`/phong/${id}`),
  create: (data: any) => api.post('/phong', data),
  update: (id: number, data: any) => api.patch(`/phong/${id}`, data),
  delete: (id: number) => api.delete(`/phong/${id}`)
};

// Student APIs
export const studentApi = {
  getAll: () => api.get('/sinhvien'),
  getById: (id: number) => api.get(`/sinhvien/${id}`),
  create: (data: any) => api.post('/sinhvien', data),
  update: (id: number, data: any) => api.patch(`/sinhvien/${id}`, data),
  delete: (id: number) => api.delete(`/sinhvien/${id}`)
};

// ElecWater APIs
export const elecWaterApi = {
  getAll: () => api.get('/diennuoc'),
  getById: (id: number) => api.get(`/diennuoc/${id}`),
  create: (data: any) => api.post('/diennuoc', data),
  update: (id: number, data: any) => api.patch(`/diennuoc/${id}`, data),
  delete: (id: number) => api.delete(`/diennuoc/${id}`)
};

// Audit Log APIs
export const auditLogApi = {
  getAll: () => api.get('/auditlog')
};

// Type Room APIs
export const typeRoomApi = {
  getAll: () => api.get('/loaiphong'),
  getById: (id: number) => api.get(`/loaiphong/${id}`),
  create: (data: any) => api.post('/loaiphong', data),
  update: (id: number, data: any) => api.patch(`/loaiphong/${id}`, data),
  delete: (id: number) => api.delete(`/loaiphong/${id}`)
}; 