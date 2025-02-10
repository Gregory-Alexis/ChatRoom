import { create } from 'zustand';
import axios from 'axios';
import { AuthStore } from '../models/AuthStore';

const API_URL = 'http://localhost:5173/api/auth';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  signup: async (username: string, email: string, password: string) => {
    set({ isLoading: true });

    try {
      const response = await axios.post(`${API_URL}/signup`, {
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
}));
