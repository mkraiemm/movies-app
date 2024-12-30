import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/custom/loading-spinner';
import { storageService } from '@/services/storage';
import { useState, useEffect } from 'react';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

export function MovieCard({ movie, onEdit }: MovieCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadImage() {
      try {
        if (movie.poster.startsWith('http')) {
          setImageUrl(movie.poster);
        } else {
          const data = await storageService.getImage(movie.poster);
          if (data) {
            setImageUrl(data);
          }
        }
      } catch (error) {
        console.error('Failed to load image:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadImage();
  }, [movie.poster]);

  return (
    <HoverCard openDelay={200} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Card 
          className="overflow-hidden bg-transparent border-0 cursor-pointer transition-transform hover:scale-105"
          onClick={() => onEdit(movie)}
        >
          <div className="space-y-2">
            <div className="relative aspect-[3/4] bg-[#15374c] rounded-lg">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/60">
                  Failed to load image
                </div>
              )}
            </div>
            <div className="px-1">
              <h3 className="text-white font-medium truncate">{movie.title}</h3>
              <p className="text-sm text-gray-400">{movie.publishingYear}</p>
            </div>
          </div>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-80 bg-[#1a3b4f]/90 backdrop-blur-sm border-0 p-0 rounded-lg overflow-hidden"
        side="right"
        align="start"
        sideOffset={20}
        alignOffset={-50}
      >
        <div className="h-40 bg-[#15374c]">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-white/60">
              Failed to load image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-white">{movie.title}</h3>
          <p className="text-sm text-gray-300">{movie.publishingYear}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}