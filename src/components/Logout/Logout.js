//Other
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import isAuth from '../../hoc/isAuth';

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  useEffect(() => {
    authService.logout().then(() => {
      logout();
      navigate('/');
    });
  }, [logout, navigate]);

  return null;
}

export default isAuth(Logout);
