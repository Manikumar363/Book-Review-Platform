import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => {
    return api.post('/users/register', userData);
  },
  
  login: (credentials) => {
    return api.post('/users/login', credentials);
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  getCurrentUser: () => {
    return api.get('/users/profile');
  },

  updateProfile: (userData) => {
    return api.put('/users/profile', userData);
  }
};

// Books API
export const booksAPI = {
  getBooks: (filters) => {
    return api.get('/books', { params: filters });
  },

  getBookById: (id) => {
    return api.get(`/books/${id}`);
  },

  createBook: (bookData) => {
    return api.post('/books', bookData);
  },

  updateBook: (id, bookData) => {
    return api.put(`/books/${id}`, bookData);
  },

  deleteBook: (id) => {
    return api.delete(`/books/${id}`);
  }
};

// Reviews API
export const reviewsAPI = {
  getReviews: (filters) => {
    return api.get('/reviews', { params: filters });
  },

  getBookReviews: (bookId, page = 1, limit = 10) => {
    return api.get(`/reviews`, {
      params: { bookId, page, limit }
    });
  },

  createReview: (reviewData) => {
    return api.post('/reviews', reviewData);
  },

  updateReview: (id, reviewData) => {
    return api.put(`/reviews/${id}`, reviewData);
  },

  deleteReview: (id) => {
    return api.delete(`/reviews/${id}`);
  }
};

export default api;