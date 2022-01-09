import { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';

const initialAuthState = {
  userId: '',
  userEmail: '',
  userAvatar: '',
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);

  const login = (authData) => {
    setCookie('userInfo', {
      ...authData,
    });
  };

  const logout = () => {
    removeCookie('userInfo');
  };

  return (
    <AuthContext.Provider
      value={{
        user: cookies.userInfo || initialAuthState,
        isAuthenticated: Boolean(cookies?.userInfo),
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authState = useContext(AuthContext);

  return authState;
};
