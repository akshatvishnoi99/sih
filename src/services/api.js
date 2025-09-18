import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Health check function
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eco-platform-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear local storage
      localStorage.removeItem('eco-platform-token');
      localStorage.removeItem('eco-platform-user');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name, email, password, role, additionalFields = {}) => {
    const requestData = { name, email, password, role, ...additionalFields };
    const response = await api.post('/auth/register', requestData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Student API calls
export const studentAPI = {
  getDashboard: async () => {
    const response = await api.get('/student/dashboard');
    return response.data;
  },

  getChallenges: async () => {
    const response = await api.get('/student/challenges');
    return response.data;
  },

  getQuizzes: async () => {
    const response = await api.get('/student/quizzes');
    return response.data;
  },

  // Updated API endpoints with proper routing
  submitQuiz: async (quizId, answers) => {
    const response = await api.post(`/student/quizzes/${quizId}/submit`, { answers });
    return response.data;
  },

  completeChallenge: async (challengeId, evidence) => {
    const response = await api.post(`/student/challenges/${challengeId}/complete`, { evidence });
    return response.data;
  },

  // Leaderboard functions
  getLeaderboard: async (type = 'global', limit = 10) => {
    const params = new URLSearchParams();
    params.append('type', type); // 'global' or 'school'
    params.append('limit', limit.toString());
    
    const response = await api.get(`/student/leaderboard?${params}`);
    return response.data;
  },

  getStudentRank: async (type = 'global') => {
    const params = new URLSearchParams();
    params.append('type', type); // 'global' or 'school'
    
    const response = await api.get(`/student/rank?${params}`);
    return response.data;
  },

  // Get detailed student profile with real statistics
  getProfile: async () => {
    const response = await api.get('/student/profile');
    return response.data;
  },

  // Get student's recent activity history
  getActivity: async (limit = 10) => {
    const response = await api.get(`/student/activity?limit=${limit}`);
    return response.data;
  }
};

// School API calls
export const schoolAPI = {
  // Public endpoint - get list of registered schools
  getRegisteredSchools: async () => {
    const response = await api.get('/school/list');
    return response.data;
  },

  // Get real school dashboard data
  getDashboard: async () => {
    const response = await api.get('/school/dashboard');
    return response.data;
  },

  getActivities: async () => {
    const response = await api.get('/school/activities');
    return response.data;
  },

  createActivity: async (activityData) => {
    const response = await api.post('/school/activities', activityData);
    return response.data;
  },

  updateActivity: async (activityId, activityData) => {
    const response = await api.put(`/school/activities/${activityId}`, activityData);
    return response.data;
  },

  deleteActivity: async (activityId) => {
    const response = await api.delete(`/school/activities/${activityId}`);
    return response.data;
  },

  // Challenge management
  createChallenge: async (challengeData) => {
    const response = await api.post('/school/challenges', challengeData);
    return response.data;
  },

  getChallenges: async () => {
    const response = await api.get('/school/challenges');
    return response.data;
  },

  getChallengeStats: async (challengeId) => {
    const response = await api.get(`/school/challenges/${challengeId}/stats`);
    return response.data;
  },

  // Quiz management
  createQuiz: async (quizData) => {
    const response = await api.post('/school/quizzes', quizData);
    return response.data;
  },

  getQuizzes: async () => {
    const response = await api.get('/school/quizzes');
    return response.data;
  },

  getQuizStats: async (quizId) => {
    const response = await api.get(`/school/quizzes/${quizId}/stats`);
    return response.data;
  },

  // Reporting
  generateReport: async () => {
    const response = await api.get('/school/report');
    return response.data;
  }
};

// NGO API calls
export const ngoAPI = {
  getDashboard: async () => {
    const response = await api.get('/ngo/dashboard');
    return response.data;
  },

  getCampaigns: async () => {
    const response = await api.get('/ngo/campaigns');
    return response.data;
  },

  createCampaign: async (campaignData) => {
    const response = await api.post('/ngo/campaigns', campaignData);
    return response.data;
  },

  getResources: async () => {
    const response = await api.get('/ngo/resources');
    return response.data;
  },

  createResource: async (resourceData) => {
    const response = await api.post('/ngo/resources', resourceData);
    return response.data;
  }
};

export default api;
