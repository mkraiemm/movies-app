import { compress } from '@/lib/imageCompression';

const STORAGE_KEY = 'movie_images';
const CHUNK_SIZE = 512 * 1024; // 512KB chunks

interface StoredImage {
  id: string;
  chunks: string[];
}

export const storageService = {
  async saveImage(file: File): Promise<string> {
    try {
      // Compress the image before storing
      const compressedFile = await compress(file);
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          try {
            const base64String = reader.result as string;
            const chunks = [];
            
            // Split base64 string into chunks
            for (let i = 0; i < base64String.length; i += CHUNK_SIZE) {
              chunks.push(base64String.slice(i, i + CHUNK_SIZE));
            }

            const id = Date.now().toString();
            const images: StoredImage[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

            // Remove oldest images if we're approaching quota
            while (images.length > 10) {
              images.shift();
            }

            images.push({ id, chunks });

            // Store chunks
            localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
            return resolve(id);
          } catch (error) {
            reject(new Error('Failed to save image: Storage quota exceeded'));
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

  getImage(id: string): string | null {
    try {
      const images: StoredImage[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const image = images.find(img => img.id === id);
      
      if (!image) return null;

      // Combine chunks back into full base64 string
      return image.chunks.join('');
    } catch {
      return null;
    }
  }
};