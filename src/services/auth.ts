import { createContext, useContext } from 'react';
import { api } from './api';

export interface User {
  id: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await api.post('/auth/login', { email, password }) as AuthResponse;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response.user;
    } catch {
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export const AuthContext = createContext<AuthState>({
  user: null,
  login: async () => false,
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);