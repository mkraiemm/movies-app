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
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  logout: () => void;
}

export const authService = {
  login: async (email: string, password: string, remember = false): Promise<User | null> => {
    try {
      const response = await api.post('/auth/login', { email, password }) as AuthResponse;
      
      if (remember) {
        // Set expiration to 24 hours from now
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 24);
        localStorage.setItem('tokenExpiration', expiration.toISOString());
      }
      
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
    localStorage.removeItem('tokenExpiration');
  },

  getCurrentUser: (): User | null => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const expiration = localStorage.getItem('tokenExpiration');

    if (!token || !userStr) {
      return null;
    }

    // Check expiration if it exists
    if (expiration) {
      const expirationDate = new Date(expiration);
      if (expirationDate < new Date()) {
        // Token has expired, clear everything
        authService.logout();
        return null;
      }
    }

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
};

export const AuthContext = createContext<AuthState>({
  user: null,
  login: async () => false,
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);