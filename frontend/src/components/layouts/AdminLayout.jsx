import { Navigate } from 'react-router-dom';
import Dashboard from '../admin/Dashboard';

import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { isAuthenticated, user } = useAuth();

  // Check if user is authenticated and is an admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard />
    </div>
  );
};

export default AdminLayout;