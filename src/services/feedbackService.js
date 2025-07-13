import axios from './api';

export const getPresentationFeedback = async (type, content) => {
  console.log('Feedback service - Type:', type);
  console.log('Feedback service - Content:', type === 'text' ? content.substring(0, 100) + '...' : 'File');

  try {
    if (type === 'text') {
      console.log('Sending text feedback request');

      const response = await axios.post('http://127.0.0.1:8000/api/feedback/', {
        type: 'text',
        content: content
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Text feedback response:', response);
      return response;

    } else if (type === 'file') {
      console.log('Sending file feedback request');
      console.log('File details:', {
        name: content.name,
        size: content.size,
        type: content.type
      });

      const formData = new FormData();
      formData.append('type', 'file');
      formData.append('file', content);

      // Debug log form entries
      for (let pair of formData.entries()) {
        console.log('FormData entry:', pair[0], pair[1]);
      }

      const response = await axios.post('http://127.0.0.1:8000/api/feedback/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });

      console.log('File feedback response:', response);
      return response;
    }
  } catch (error) {
    console.error('Feedback API error:', error);
    console.error('Error response data:', error.response?.data);
    console.error('Error status:', error.response?.status);
    if (error.response) {
      console.error('Response headers:', error.response.headers);
      console.error('Response config:', error.response.config);
    }
    throw error;
  }
};
