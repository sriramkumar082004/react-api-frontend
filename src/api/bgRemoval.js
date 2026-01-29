import api from './axios';

export const removeBackground = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/utils/remove-bg', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob', // Important for image response
  });
  return response.data;
};
