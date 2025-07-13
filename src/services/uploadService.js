import axios from './api'; // your existing axios config

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const uploadText = (data) =>
  axios.post('/upload', data, authHeader());

export const deleteUpload = (id) =>
  axios.delete(`/upload/${id}`, authHeader());

export const uploadFile = async (file, onUploadProgress) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('/upload/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    onUploadProgress: (event) => {
      const percent = Math.round((event.loaded * 100) / event.total);
      onUploadProgress(percent);
    },
  });

  return response.data.fileUrl; // ✅ Safely return file URL for React
};

export const getUserUploads = () => axios.get('/upload/my', authHeader());
export const getAllUploads = () => axios.get('/upload', authHeader());
