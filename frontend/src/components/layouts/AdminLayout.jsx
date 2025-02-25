import { Outlet, Navigate } from 'react-router-dom';
import { useAuthHook } from '../../hooks/useAuthHook';
import Navbar from '../Navbar';
import Footer from '../Footer';

const AdminLayout = () => {
  const { isAuthenticated, user } = useAuthHook();
    console.log(isAuthenticated)
    console.log(user)
  // Check if user is authenticated and is an admin
  if (!isAuthenticated || !user?.role === 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
      <div className="min-h-screen bg-gray-50">
      
          <Outlet />
          
    </div>
  );
};

export default AdminLayout;