const BASE_URL = 'https://softuni-react-exam-backend.herokuapp.com/auth';

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

const editAvatar = async (avatar, userId) => {
  const res = await fetch(`${BASE_URL}/users/edit/${userId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ avatar }),
  });

  const resJson = await res.json();

  if (res.ok) {
    return resJson;
  } else {
    throw resJson;
  }
};

const deleteProfile = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/delete/${userId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
  });

  const resJson = await res.json();

  if (res.ok) {
    return resJson;
  } else {
    throw resJson;
  }
};

const getUser = async (userId) => {
  return await fetch(`${BASE_URL}/users/with-posts/${userId}`, {
    credentials: 'include',
  }).then((res) => res.json());
};

const userService = {
  editProfile,
  getUser,
  deleteProfile,
  editAvatar,
};

export default userService;
