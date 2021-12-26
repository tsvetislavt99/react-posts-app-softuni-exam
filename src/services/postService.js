const getTopThree = async () => {
  return fetch(
    'https://softuni-react-exam-backend.herokuapp.com/posts/topPosts'
  ).then((res) => res.json());
};

const getTopThreeWithout = async (id) => {
  return fetch(`http://localhost:3001/${id}/posts/topPosts`).then((res) =>
    res.json()
  );
};

const getPostById = async (postId) => {
  return fetch(`http://localhost:3001/posts/${postId}/details`).then((res) =>
    res.json()
  );
};

const getAllPosts = async () => {
  return fetch(`http://localhost:3001/posts/all`).then((res) => res.json());
};

const createPost = async (postData) => {
  return fetch(`http://localhost:3001/posts/create`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(postData),
  });
};

const postService = {
  getTopThree,
  getPostById,
  getTopThreeWithout,
  getAllPosts,
  createPost,
};

export default postService;
