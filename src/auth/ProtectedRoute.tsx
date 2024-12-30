import { useFileContext } from '@/context/FileContext'
import { Outlet, Navigate } from 'react-router';

export default function ProtectedRoute() {
  const { isAuthenticated } = useFileContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
