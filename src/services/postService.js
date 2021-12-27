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
  console.log(postData);
  const post = {
    title: postData.postTitle,
    categories: Array.from(postData.categories.replaceAll(' ', '').split(',')),
    imageUrl: postData.postImage,
    description: postData.postBody,
  };
  return fetch(`http://localhost:3001/posts/create`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(post),
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
