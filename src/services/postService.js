const getTopThree = async () => {
  return fetch(
    'https://softuni-react-exam-backend.herokuapp.com/posts/topPosts'
  ).then((res) => res.json());
};

const getPostById = async (postId) => {
  return fetch(`http://localhost:3001/posts/${postId}/details`).then((res) =>
    res.json()
  );
};

const postService = {
  getTopThree,
  getPostById,
};

export default postService;
