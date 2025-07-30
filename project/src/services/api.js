import axios from 'axios';

// Create axios instance with base URL from environment
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const apiService = {
  // Upload files (resume and job description)
  uploadFiles: async (resumeFile, jobDescFile = null, jobDescText = null) => {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    
    if (jobDescFile) {
      formData.append('jd_file', jobDescFile);
    }
    
    if (jobDescText) {
      formData.append('jd_text', jobDescText);
    }

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Generate summaries for resume and job description
  generateSummaries: async (resumeText, jdText) => {
    const response = await api.post('/summarize', {
      resume_text: resumeText,
      jd_text: jdText,
    });
    return response.data;
  },

  // Extract skills from resume and job description
  extractSkills: async (resumeText, jdText) => {
    const response = await api.post('/extract-skills', {
      resume_text: resumeText,
      jd_text: jdText,
    });
    return response.data;
  },

  // Match skills between resume and job description
  matchSkills: async (resumeText, jdText) => {
    const response = await api.post('/match-skills', {
      resume_text: resumeText,
      jd_text: jdText,
    });
    return response.data;
  },

  // Generate cover letter
  generateCoverLetter: async (resumeSummary, jdSummary) => {
    const response = await api.post('/generate-cover-letter', {
      resume_summary: resumeSummary,
      jd_summary: jdSummary,
    });
    return response.data;
  },
};

export default api;
