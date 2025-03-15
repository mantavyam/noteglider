
import axios from 'axios';

// API base URL - change this to the URL of your backend server
const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const generatePDF = async (
  markdownFile: File, 
  imagesZip: File, 
  customUrl?: string
) => {
  const formData = new FormData();
  formData.append('markdown_file', markdownFile);
  formData.append('images_zip', imagesZip);
  
  if (customUrl) {
    formData.append('custom_url', customUrl);
  }
  
  try {
    const response = await api.post('/generate-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const checkBackendStatus = async () => {
  try {
    const response = await api.get('/status');
    return response.data;
  } catch (error) {
    console.error('Error checking backend status:', error);
    return { status: 'offline', message: 'Backend service is not available' };
  }
};

export default api;
