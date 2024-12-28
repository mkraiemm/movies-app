import { api } from './api';
import type { Movie } from '@/types/movie';

export const moviesService = {
  getAll: async () => {
    return api.get('/movies') as Promise<Movie[]>;
  },
  
  getById: async (id: string) => {
    return api.get(`/movies/${id}`) as Promise<Movie>;
  },
  
  create: async (movie: Omit<Movie, 'id'>) => {
    return api.post('/movies', movie) as Promise<Movie>;
  },
  
  update: async (id: string, movie: Omit<Movie, 'id'>) => {
    return api.put(`/movies/${id}`, movie) as Promise<Movie>;
  },
  
  delete: async (id: string) => {
    return api.delete(`/movies/${id}`);
  }
};