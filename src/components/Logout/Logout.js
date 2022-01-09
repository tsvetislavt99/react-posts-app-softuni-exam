//Other
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useEffect } from 'react';

function Logout() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    authService.logout().then(() => {
      logout();
      navigate('/');
    });
  }, [logout, navigate]);

  return null;
}

export default Logout;
