//Other
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import isAuth from '../../hoc/isAuth';
import { types, NotificationContext } from '../../contexts/NotificationContext';

function Logout() {
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);

  const { logout } = useAuthContext();
  useEffect(() => {
    authService.logout().then(() => {
      logout();
      showNotification('Successfully logged out!', types.success);
      navigate('/');
    });
  }, [logout, navigate, showNotification]);

  return null;
}

export default isAuth(Logout);
