import { Navigate } from 'react-router-dom';
import { useAuth } from './src/context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If the user is not authenticated, redirect them to login
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the element
  return element;
};

export default PrivateRoute;
