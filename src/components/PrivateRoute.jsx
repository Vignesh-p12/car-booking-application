import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role === 'admin' && user.email !== 'admin@gmail.com') return <Navigate to="/user" />;
  if (role === 'user' && user.email === 'admin@gmail.com') return <Navigate to="/admin" />;
  return children;
};

export default PrivateRoute;
