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

const postService = {
  getTopThree,
  getPostById,
  getTopThreeWithout,
};

export default postService;
