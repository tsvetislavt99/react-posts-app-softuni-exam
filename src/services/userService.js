const BASE_URL = 'https://softuni-react-exam-backend.herokuapp.com/auth';

///users/edit/:userId

//TODO: Think about how avatar change will work
const editProfile = async ({
  firstName,
  lastName,
  jobTitle,
  address,
  userId,
}) => {
  const res = await fetch(`${BASE_URL}/users/edit/${userId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, jobTitle, address }),
  });

  const resJson = await res.json();

  if (res.ok) {
    return resJson;
  } else {
    throw resJson;
  }
};

const getUser = async (userId) => {
  return await fetch(`${BASE_URL}/users/${userId}`, {
    credentials: 'include',
  }).then((res) => res.json());
};

const userService = {
  editProfile,
  getUser,
};

export default userService;
