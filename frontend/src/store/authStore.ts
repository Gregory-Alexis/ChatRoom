import { create } from 'zustand';
import axios from 'axios';
import { AuthStore } from '../models/AuthStore';

const AUTH_API_URL = 'http://localhost:5000/api/auth';

axios.defaults.withCredentials = true;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  signup: async (username: string, email: string, password: string) => {
    set({ isLoading: true });

    try {
      const response = await axios.post(`${AUTH_API_URL}/signup`, {
        username,
        email,
        password,
      });

      set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 'Something went wrong';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });

    try {
      const response = await axios.post(`${AUTH_API_URL}/login`, {
        email,
        password,
      });

      set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 'Something went wrong';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isAuthenticated: false, isLoading: true });

    try {
      await axios.post(`${AUTH_API_URL}/logout`);
      set({ isAuthenticated: false, user: null, isLoading: false, error: null });
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 'Something went wrong';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: false });

    try {
      const response = await axios.get(`${AUTH_API_URL}/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: true });
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 'Something went wrong';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
}));
