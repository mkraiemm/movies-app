interface CompressOptions {
    maxWidth: number;
    maxHeight: number;
    quality: number;
  }
  
  export async function compress(
    file: File,
    options: CompressOptions = { maxWidth: 800, maxHeight: 800, quality: 0.8 }
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
  
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        const canvas = document.createElement('canvas');
        let { width, height } = img;
  
        // Calculate new dimensions while maintaining aspect ratio
        if (width > options.maxWidth) {
          height = Math.round((height * options.maxWidth) / width);
          width = options.maxWidth;
        }
        if (height > options.maxHeight) {
          width = Math.round((width * options.maxHeight) / height);
          height = options.maxHeight;
        }
  
        canvas.width = width;
        canvas.height = height;
  
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
  
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }
            resolve(new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            }));
          },
          'image/jpeg',
          options.quality
        );
      };
  
      img.onerror = () => reject(new Error('Failed to load image'));
    });
  }