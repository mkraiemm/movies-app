import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { storageService } from '@/services/storage';

interface ImageUploadProps {
  value?: string;
  onChange: (imageId: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        const imageId = await storageService.saveImage(file);
        onChange(imageId);
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  // If value is a URL, use it directly; otherwise, try to get it from storage
  const imageUrl = value?.startsWith('http') 
    ? value 
    : value 
      ? storageService.getImage(value) 
      : null;

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg aspect-square flex items-center justify-center cursor-pointer transition-colors ${
        isDragActive ? 'border-[#2ecc71] bg-[#2ecc71]/10' : 'border-slate-600 hover:border-slate-500'
      }`}
    >
      <input {...getInputProps()} />
      {imageUrl ? (
        <div className="relative w-full h-full group">
          <img
            src={imageUrl}
            alt="Movie poster"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
            <p className="text-white text-sm">Click or drop to change image</p>
          </div>
        </div>
      ) : (
        <div className="text-center text-slate-400">
          <Upload className="w-8 h-8 mx-auto mb-2" />
          <p>Drop or browse image here</p>
        </div>
      )}
    </div>
  );
}