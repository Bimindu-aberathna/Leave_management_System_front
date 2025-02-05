import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { role, isAuthenticated } = useSelector((state) => state.app);

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no specific roles are required, allow access to authenticated users
  if (!requiredRoles) {
    return children;
  }

  const allowedRoles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  // Check if user's role ID matches any of the required roles
  if (!allowedRoles.includes(role.id)) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

// PropTypes for better type checking
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRoles: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ])
};

export default ProtectedRoute;