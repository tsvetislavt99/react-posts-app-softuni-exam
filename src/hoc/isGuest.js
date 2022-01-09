import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const isGuest = (Component) => {
  const WrapperComponent = (props) => {
    const { isAuthenticated } = useAuthContext();

    return isAuthenticated ? (
      <Navigate to='/profile' />
    ) : (
      <Component {...props} />
    );
  };

  return WrapperComponent;
};

export default isGuest;
