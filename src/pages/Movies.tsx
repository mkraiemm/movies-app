import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { Header } from '@/components/layout/Header';
import { Pagination } from '@/components/layout/Pagination';
import { PageLayout } from '@/components/layout/PageLayout';
import { CustomButton } from '@/components/ui/custom/button';
import { moviesService } from '@/services/movies';
import { useAuth } from '@/services/auth';
import type { Movie } from '@/types/movie';

const MOVIES_PER_PAGE = 8;

export function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchMovies = async () => {
    try {
      const data = await moviesService.getAll();
      setMovies(data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAdd = () => {
    navigate('/movies/new');
  };

  const handleEdit = (movie: Movie) => {
    navigate(`/movies/${movie.id}/edit`);
  };

  const handleDelete = async (id: string) => {
    try {
      await moviesService.delete(id);
      await fetchMovies(); // Refresh the list after deletion
      
      // Adjust current page if necessary
      const totalPages = Math.ceil((movies.length - 1) / MOVIES_PER_PAGE);
      if (currentPage > totalPages) {
        setCurrentPage(Math.max(1, totalPages));
      }
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-6">
          <Header onLogout={handleLogout} onAdd={handleAdd} />
          <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
            <p className="text-white">Loading...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (movies.length === 0) {
    return (
      <PageLayout>
        <div className="container mx-auto px-6">
          <Header onLogout={handleLogout} onAdd={handleAdd} />
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
            <h1 className="text-5xl font-bold text-white mb-16">Your movie list is empty</h1>
            <CustomButton 
              onClick={handleAdd} 
              className="w-[400px] h-14 bg-[#2ecc71] hover:bg-[#2ecc71]/90"
            >
              Add a new movie
            </CustomButton>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-6">
        <Header onLogout={handleLogout} onAdd={handleAdd} />
        
        <main className="py-8">
          <MovieGrid
            movies={movies.slice(
              (currentPage - 1) * MOVIES_PER_PAGE,
              currentPage * MOVIES_PER_PAGE
            )}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={Math.max(1, Math.ceil(movies.length / MOVIES_PER_PAGE))}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </PageLayout>
  );
}