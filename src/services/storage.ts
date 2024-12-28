// This simulates file storage. In a real app, you'd upload to a server
const STORAGE_KEY = 'movie_images';

interface StoredImage {
  id: string;
  data: string; // Base64 encoded image
}

export const storageService = {
  // Store image as base64
  saveImage: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        const images: StoredImage[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const id = Date.now().toString();
        
        images.push({
          id,
          data: reader.result as string
        });
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
        resolve(id);
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      
      reader.readAsDataURL(file);
    });
  },

  // Get image by ID
  getImage: (id: string): string | null => {
    const images: StoredImage[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const image = images.find(img => img.id === id);
    return image?.data || null;
  }
};