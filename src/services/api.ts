import axios from 'axios';

export const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 180000, // Increased timeout to 3 minutes for large file processing
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
    console.log('Starting PDF generation with:', {
      markdownName: markdownFile.name,
      markdownSize: markdownFile.size,
      zipName: imagesZip.name,
      zipSize: imagesZip.size,
      hasCustomUrl: !!customUrl
    });
    
    const response = await api.post('/generate-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        console.log('Upload progress:', progressEvent.loaded / (progressEvent.total || 1) * 100);
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error generating PDF:', error);
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.detail || 'Unknown server error';
      throw new Error(`PDF generation failed: ${errorMessage}`);
    } else if (error instanceof Error) {
      throw new Error(`PDF generation failed: ${error.message}`);
    }
    throw new Error('PDF generation failed: Unknown error occurred');
  }
};

export const generateCompilation = async (
  markdownFile: File,
  imagesZip: File,
  youtubeData?: { url: string; date: string }[],
  customUrl?: string
) => {
  const formData = new FormData();
  formData.append('markdown_file', markdownFile);
  formData.append('images_zip', imagesZip);
  
  if (youtubeData && youtubeData.length > 0) {
    formData.append('youtube_data', JSON.stringify(youtubeData));
  }
  
  if (customUrl) {
    formData.append('custom_url', customUrl);
  }

  try {
    console.log('Starting compilation generation with:', {
      markdownName: markdownFile.name,
      markdownSize: markdownFile.size,
      zipName: imagesZip.name,
      zipSize: imagesZip.size,
      youtubeEntries: youtubeData?.length || 0,
      hasCustomUrl: !!customUrl
    });
    
    const response = await api.post('/generate-compilation', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        console.log('Upload progress:', progressEvent.loaded / (progressEvent.total || 1) * 100);
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error generating compilation:', error);
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.detail || 'Unknown server error';
      throw new Error(`Compilation generation failed: ${errorMessage}`);
    } else if (error instanceof Error) {
      throw new Error(`Compilation generation failed: ${error.message}`);
    }
    throw new Error('Compilation generation failed: Unknown error occurred');
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
