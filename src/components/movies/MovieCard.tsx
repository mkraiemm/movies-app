import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Card } from '@/components/ui/card';
import { storageService } from '@/services/storage';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

export function MovieCard({ movie, onEdit }: MovieCardProps) {
  // Get image URL from storage if it's an ID, otherwise use the URL directly
  const imageUrl = movie.poster.startsWith('http') 
    ? movie.poster 
    : storageService.getImage(movie.poster);

  return (
    <HoverCard openDelay={200} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Card 
          className="overflow-hidden bg-transparent border-0 cursor-pointer transition-transform hover:scale-105"
          onClick={() => onEdit(movie)}
        >
          <div className="space-y-2">
            <div className="relative aspect-[3/4]">
              <img
                src={imageUrl || movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover rounded-lg"
              />
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
        <img
          src={imageUrl || movie.poster}
          alt={movie.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="font-medium text-white">{movie.title}</h3>
          <p className="text-sm text-gray-300">{movie.publishingYear}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}