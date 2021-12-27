const BASE_URL = 'http://localhost:3001/auth';

const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const resJson = await res.json();

  if (res.ok) {
    return resJson;
  } else {
    throw resJson;
  }
};

const logout = async () => {
  return await fetch(`${BASE_URL}/logout`, { credentials: 'include' }).then(
    (res) => res.json()
  );
};

const register = async ({
  firstName,
  lastName,
  email,
  password,
  rePassword,
}) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, email, password, rePassword }),
  });

  const resJson = await res.json();

  if (res.ok) {
    return resJson;
  } else {
    throw resJson;
  }
};

const authService = {
  login,
  logout,
  register,
};

export default authService;
