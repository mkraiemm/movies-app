import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { storageService } from '@/services/storage';

interface ImageUploadProps {
  value?: string;
  onChange: (imageId: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    async function loadImage() {
      if (value) {
        if (value.startsWith('http')) {
          setPreview(value);
        } else {
          const data = await storageService.getImage(value);
          if (data) {
            setPreview(data);
          }
        }
      }
    }
    loadImage();
  }, [value]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        // Pass the current image ID if it exists and isn't a URL
        const oldImageId = value && !value.startsWith('http') ? value : undefined;
        const imageId = await storageService.saveImage(file, oldImageId);
        onChange(imageId);
        
        // Create a preview immediately after upload
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  }, [onChange, value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg aspect-[3/4] flex items-center justify-center cursor-pointer transition-colors ${
        isDragActive ? 'border-[#2ecc71] bg-[#2ecc71]/10' : 'border-slate-600 hover:border-slate-500'
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative w-full h-full group">
          <img
            src={preview}
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