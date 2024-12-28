import { Plus } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom/button';
import { MovieCard } from './MovieCard';
import type { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
  onAdd: () => void;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

export function MovieGrid({ movies, onAdd, onEdit, onDelete }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}