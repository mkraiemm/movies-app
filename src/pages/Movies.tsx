import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { Header } from '@/components/layout/Header';
import { Pagination } from '@/components/layout/Pagination';
import { PageLayout } from '@/components/layout/PageLayout';
import { moviesService } from '@/services/movies';
import { useAuth } from '@/services/auth';
import type { Movie } from '@/types/movie';

const MOVIES_PER_PAGE = 8;

export function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    setMovies(moviesService.getAll());
  }, []);

  const totalPages = Math.max(1, Math.ceil(movies.length / MOVIES_PER_PAGE));
  const paginatedMovies = movies.slice(
    (currentPage - 1) * MOVIES_PER_PAGE,
    currentPage * MOVIES_PER_PAGE
  );

  const handleAdd = () => {
    navigate('/movies/new');
  };

  const handleEdit = (movie: Movie) => {
    navigate(`/movies/${movie.id}/edit`);
  };

  const handleDelete = (id: string) => {
    moviesService.delete(id);
    setMovies(moviesService.getAll());
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-6">
        <Header onLogout={handleLogout} onAdd={handleAdd} />
        
        <main className="py-8">
          <MovieGrid
            movies={paginatedMovies}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </PageLayout>
  );
}