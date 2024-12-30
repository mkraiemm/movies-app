import { api } from './api';
import { compress } from '@/lib/imageCompression';

export const storageService = {
  async saveImage(file: File, oldImageId?: string): Promise<string> {
    try {
      // Compress the image before storing
      const compressedFile = await compress(file);
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async () => {
          try {
            const base64String = reader.result as string;
            
            // If updating, include the old image ID to replace it
            const response = await api.post('/storage/images', { 
              data: base64String,
              oldImageId 
            });
            
            return resolve(response.id);
          } catch (error) {
            reject(new Error('Failed to save image'));
          }
        };
        
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(compressedFile);
      });
    } catch (error) {
      console.error('Image storage error:', error);
      throw error;
    }
  },

  async getImage(id: string): Promise<string | null> {
    try {
      const response = await api.get(`/storage/images/${id}`);
      return response.data;
    } catch {
      return null;
    }
  }
};