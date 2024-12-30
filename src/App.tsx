import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Movies } from '@/pages/Movies';
import { CreateMovie } from '@/pages/CreateMovie';
import { EditMovie } from '@/pages/EditMovie';
import { LoginForm } from '@/components/auth/LoginForm';
import { AuthProvider } from '@/providers/AuthProvider';
import { useAuth } from '@/services/auth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    // Save the current location to redirect back after login
    const currentPath = window.location.pathname;
    if (currentPath !== '/login') {
      sessionStorage.setItem('redirectPath', currentPath);
    }
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
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