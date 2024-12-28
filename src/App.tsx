import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Movies } from '@/pages/Movies';
import { CreateMovie } from '@/pages/CreateMovie';
import { EditMovie } from '@/pages/EditMovie';
import { LoginForm } from '@/components/auth/LoginForm';
import { AuthProvider } from '@/providers/AuthProvider';
import { useAuth } from '@/services/auth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/new"
            element={
              <ProtectedRoute>
                <CreateMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:id/edit"
            element={
              <ProtectedRoute>
                <EditMovie />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;