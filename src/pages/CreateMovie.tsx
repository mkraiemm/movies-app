import { useNavigate } from 'react-router-dom';
import { MovieForm } from '@/components/movies/MovieForm';
import { PageLayout } from '@/components/layout/PageLayout';
import { moviesService } from '@/services/movies';
import type { Movie } from '@/types/movie';

export function CreateMovie() {
  const navigate = useNavigate();

  const handleSubmit = async (movieData: Omit<Movie, 'id'>) => {
    try {
      await moviesService.create(movieData);
      navigate('/', { replace: true }); // Use replace to force a fresh load of the movies list
    } catch (error) {
      console.error('Failed to create movie:', error);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-6">
        <MovieForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')}
        />
      </div>
    </PageLayout>
  );
}