import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Layout from '../components/layouts/Layout';
import AuthLayout from '../components/layouts/AuthLayout';
import AdminLayout from '../components/layouts/AdminLayout';
import Dashboard from '../components/admin/Dashboard';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import ProductList from '../components/products/productList';
import ProductDetail from '../components/products/ProductDetail';
import Cart from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />
      }
    ]
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <App />,
      },
      {
        path: 'products',
        element: <ProductList />,
      },
      {
        path: 'products/:id',
        element: <ProductDetail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />,
      },
    ],
  },
]);

export default router;