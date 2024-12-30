import { useState } from 'react';
import { CustomInput } from '@/components/ui/custom/input';
import { CustomButton } from '@/components/ui/custom/button';
import { ImageUpload } from './ImageUpload';
import type { Movie } from '@/types/movie';

const DEFAULT_MOVIE_POSTER = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&auto=format&fit=crop&q=60';

interface MovieFormProps {
  movie?: Movie;
  onSubmit: (movie: Omit<Movie, 'id'>) => void;
  onDelete?: () => void;
  onCancel: () => void;
}

export function MovieForm({ movie, onSubmit, onDelete, onCancel }: MovieFormProps) {
  const [title, setTitle] = useState(movie?.title || '');
  const [publishingYear, setPublishingYear] = useState(
    movie?.publishingYear || new Date().getFullYear()
  );
  const [poster, setPoster] = useState(movie?.poster || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      title, 
      publishingYear, 
      poster: poster || DEFAULT_MOVIE_POSTER
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-8 text-white">
        {movie ? 'Edit movie' : 'Add a new movie'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          {/* Desktop: Image on left, Mobile: Image after inputs */}
          <div className="lg:order-1 order-2">
            <ImageUpload value={poster} onChange={setPoster} />
          </div>
          
          {/* Desktop: Inputs and buttons on right, Mobile: Inputs first */}
          <div className="space-y-6 lg:order-2 order-1">
            <CustomInput
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-[#15374c] border-0"
            />
            <CustomInput
              type="number"
              placeholder="Publishing year"
              value={publishingYear}
              onChange={(e) => setPublishingYear(Number(e.target.value))}
              required
              className="w-full bg-[#15374c] border-0"
            />
            
            {/* Desktop: Horizontal button layout */}
            <div className="hidden lg:flex gap-4 pt-4">
              <CustomButton 
                type="button" 
                variant="secondary" 
                onClick={onCancel}
                className="bg-[#15374c] hover:bg-[#15374c]/90"
              >
                Cancel
              </CustomButton>
              <CustomButton 
                type="submit"
                className="bg-[#2ecc71] hover:bg-[#2ecc71]/90"
              >
                {movie ? 'Update' : 'Submit'}
              </CustomButton>
              {onDelete && (
                <CustomButton 
                  type="button" 
                  variant="destructive"
                  className="ml-auto !bg-red-500 hover:!bg-red-600"
                  onClick={onDelete}
                >
                  Delete
                </CustomButton>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical button layout */}
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="grid grid-cols-2 gap-3">
            <CustomButton 
              type="button" 
              variant="secondary" 
              onClick={onCancel}
              className="h-12 bg-[#15374c] hover:bg-[#15374c]/90"
            >
              Cancel
            </CustomButton>
            <CustomButton 
              type="submit"
              className="h-12 bg-[#2ecc71] hover:bg-[#2ecc71]/90"
            >
              {movie ? 'Update' : 'Submit'}
            </CustomButton>
          </div>
          
          {onDelete && (
            <CustomButton 
              type="button" 
              variant="destructive"
              className="h-12 bg-red-500 hover:bg-red-600 w-full"
              onClick={onDelete}
            >
              Delete
            </CustomButton>
          )}
        </div>
      </form>
    </div>
  );
}