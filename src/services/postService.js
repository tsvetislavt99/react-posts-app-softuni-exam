const BASE_URL = 'http://localhost:3001';

const getTopThree = async () => {
  return fetch(`${BASE_URL}/posts/topPosts`).then((res) => res.json());
};

const getTopThreeWithout = async (postId) => {
  return await fetch(`${BASE_URL}/posts/${postId}/topPosts`).then((res) =>
    res.json()
  );
};

const getPostById = async (postId) => {
  return fetch(`${BASE_URL}/posts/${postId}/details`).then((res) => res.json());
};

const getAllPosts = async () => {
  return fetch(`${BASE_URL}/posts/all`).then((res) => res.json());
};

const createPost = async (postData) => {
  const post = {
    title: postData.postTitle,
    categories: Array.from(postData.categories.replaceAll(' ', '').split(',')),
    imageUrl: postData.postImage,
    description: postData.postBody,
  };
  return fetch(`${BASE_URL}/posts/create`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(post),
  });
};

const addComment = async (postId, commentText) => {
  const comment = { comment: commentText };
  const res = await fetch(`${BASE_URL}/posts/${postId}/comment`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(comment),
  });

  const resJson = await res.json();

  if (res.ok) {
    return resJson;
  } else {
    throw resJson;
  }
};

const getComments = async (postId) => {
  const res = await fetch(`${BASE_URL}/posts/${postId}/getComments`);

  const resJson = await res.json();

  if (res.ok) {
    return resJson;
  } else {
    throw resJson;
  }
};

const likeComment = async (commentId) => {
  const res = await fetch(`${BASE_URL}/posts/comments/${commentId}/upvote`, {
    credentials: 'include',
  });

  const resJson = await res.json();

  if (res.ok) {
    return resJson;
  } else {
    throw resJson;
  }
};

const dislikeComment = async (commentId) => {
  const res = await fetch(`${BASE_URL}/posts/comments/${commentId}/downvote`, {
    credentials: 'include',
  });

  const resJson = await res.json();

  if (res.ok) {
    return resJson;
  } else {
    throw resJson;
  }
};

const postService = {
  getTopThree,
  getPostById,
  getTopThreeWithout,
  getAllPosts,
  createPost,
  addComment,
  getComments,
  likeComment,
  dislikeComment,
};

export default postService;
