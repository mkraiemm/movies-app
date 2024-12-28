import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MovieForm } from '@/components/movies/MovieForm';
import { PageLayout } from '@/components/layout/PageLayout';
import { ConfirmDialog } from '@/components/ui/custom/confirm-dialog';
import { moviesService } from '@/services/movies';
import type { Movie } from '@/types/movie';

export function EditMovie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      if (id) {
        try {
          const data = await moviesService.getById(id);
          setMovie(data);
        } catch (error) {
          console.error('Failed to fetch movie:', error);
          navigate('/');
        }
      }
    }

    fetchMovie();
  }, [id, navigate]);

  const handleSubmit = async (movieData: Omit<Movie, 'id'>) => {
    if (id) {
      try {
        await moviesService.update(id, movieData);
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Failed to update movie:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (id && !isDeleting) {
      setIsDeleting(true);
      try {
        await moviesService.delete(id);
        setShowDeleteConfirm(false);
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Failed to delete movie:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (!movie) return null;

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-6">
        <MovieForm
          movie={movie}
          onSubmit={handleSubmit}
          onDelete={() => setShowDeleteConfirm(true)}
          onCancel={() => navigate('/')}
        />

        <ConfirmDialog
          open={showDeleteConfirm}
          onOpenChange={setShowDeleteConfirm}
          onConfirm={handleDelete}
          title="Delete Movie"
          description={
            <>
              Are you sure you want to delete <span className="font-medium text-white">{movie.title}</span>?
              <br />
              This action cannot be undone.
            </>
          }
          loading={isDeleting}
        />
      </div>
    </PageLayout>
  );
}