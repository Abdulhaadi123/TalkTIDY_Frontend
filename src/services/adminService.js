import axios from './api';

export const getAdminStats = () => axios.get('/admin/stats');
