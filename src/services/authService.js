export const login = async (email, password) => {
  const res = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    credentials: 'same-origin',
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
