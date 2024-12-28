import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MovieForm } from '@/components/movies/MovieForm';
import { PageLayout } from '@/components/layout/PageLayout';
import { moviesService } from '@/services/movies';
import type { Movie } from '@/types/movie';

export function EditMovie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (id) {
      const foundMovie = moviesService.getById(id);
      if (foundMovie) {
        setMovie(foundMovie);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleSubmit = (movieData: Omit<Movie, 'id'>) => {
    if (id) {
      moviesService.update(id, movieData);
    }
    navigate('/');
  };

  if (!movie) return null;

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-6">
        <MovieForm
          movie={movie}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')}
        />
      </div>
    </PageLayout>
  );
}