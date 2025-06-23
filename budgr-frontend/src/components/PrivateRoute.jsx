import { Navigate, Outlet } from 'react-router-dom';

/**
 * Protects routes: redirects to login if no JWT.
 */
const PrivateRoute = () => {
  const token = localStorage.getItem('jwt'); // adjust if token key is different
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
