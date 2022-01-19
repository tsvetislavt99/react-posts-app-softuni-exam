//CSS
import './PostDetails.css';

//Other
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import parse from 'html-react-parser';
import postService from '../../services/postService';
import { AuthContext } from '../../contexts/AuthContext';

//Components
import CommentSection from '../CommentSection/CommentSection';
import AsideSection from './AsideSection/AsideSection';
import Modal from '../Modal/Modal';

function PostDetails() {
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [post, setPost] = useState({
    isLoading: true,
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    postService
      .getPostById(postId)
      .then((receivedPost) => {
        setPost({ ...receivedPost, isLoading: false });
        return receivedPost;
      })
      .then((res) => {
        setLikes(res.upvotes.length);
        setDislikes(res.downvotes.length);
      });

    return () => {
      setPost({
        isLoading: true,
      });
    };
  }, [postId]);

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const deletePostHandler = () => {
    postService
      .deletePost(post._id)
      .then((res) => {
        //TODO: Add notification
        navigate('/profile');
      })
      .catch((error) => {
        //TODO: Add notification
        console.log(error);
      });
  };

  const onLikeHandler = () => {
    postService
      .likePost(post._id)
      .then((res) => {
        setLikes((oldRating) => res.newRating);
        setDislikes((oldRating) => res.newOpositeRating);
      })
      //TODO: Add notification
      .catch((error) => console.log(error));
  };

  const onDislikeHandler = () => {
    postService
      .dislikePost(post._id)
      .then((res) => {
        setDislikes((oldRating) => res.newRating);
        setLikes((oldRating) => res.newOpositeRating);
      })
      //TODO: Add notification
      .catch((error) => console.log(error));
  };

  if (post.isLoading) {
    return (
      <div className='page-section pt-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='blog-single-wrap'>
                <div className='header'>
                  <div className='post-thumb skeleton'>
                    <img className='skeleton' src={post.imageUrl} alt='' />
                  </div>
                  <div className='meta-header'>
                    <div className='post-author'>
                      <div className='avatar'>
                        <img className='skeleton' src={post.imageUrl} alt='' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='post-title skeleton skeleton-heading'></div>
                <div className='post-meta'>
                  <div className='post-date'>
                    <span className='icon'>
                      <span className='mai-time-outline'></span>
                    </span>
                    yyyy-mm-dd
                  </div>
                  <div className='post-comment-count ml-2'>
                    <span className='icon'>
                      <span className='mai-chatbubbles-outline'></span>
                    </span>{' '}
                    Comments
                  </div>
                </div>
                <div className='post-content'>
                  <div className='skeleton skeleton-text'></div>
                  <div className='skeleton skeleton-text'></div>
                  <div className='skeleton skeleton-text'></div>
                  <div className='skeleton skeleton-text'></div>
                  <div className='skeleton skeleton-text'></div>
                  <div className='skeleton skeleton-text'></div>
                  <div className='skeleton skeleton-text'></div>
                </div>
              </div>
            </div>
            <AsideSection postId={postId} categories={null} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='page-section pt-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='blog-single-wrap'>
                <div className='header'>
                  <div className='post-thumb'>
                    <img src={post.imageUrl} alt='' />
                  </div>
                  <div className='meta-header'>
                    <div className='post-author'>
                      <div className='avatar'>
                        <img src={post.author?.avatar} alt='' />
                      </div>
                      <Link to={`/public-profile/${post.author?._id}`}>
                        {post.author?.firstName} {post.author?.lastName}
                      </Link>
                    </div>
                    {user.userId === post.author?._id ? (
                      <div className='d-flex edit-delete'>
                        <button
                          type='button'
                          className='mr-2 btn btn-outline-primary ms-1 '>
                          Edit
                        </button>
                        <button
                          onClick={toggleDeleteModal}
                          type='button'
                          className='btn btn-outline-danger ms-1 '>
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
                <h1 className='post-title'>{post.title}</h1>
                <div className='post-meta'>
                  <div className='post-date'>
                    <span className='icon'>
                      <span className='mai-time-outline'></span>
                    </span>{' '}
                    {post.dateOfCreation.substring(0, 10)}
                  </div>
                  <div className='post-comment-count ml-2'>
                    <span className='icon'>
                      <span className='mai-chatbubbles-outline'></span>
                    </span>{' '}
                    {post.comments.length} Comments
                  </div>
                </div>
                <div className='post-content'>
                  <p>{parse(post.description)}</p>
                </div>
              </div>
              {user.userId ? (
                <div className='d-inline-flex flex-row align-items-center p-3 like-dislike-buttons'>
                  <div>
                    <span className='likes'>{likes}</span>
                    <button
                      onClick={onLikeHandler}
                      type='button'
                      className='ml-4 mr-4 mai-heart btn btn-outline-primary ms-1 '></button>
                  </div>
                  <div>
                    <span className='dislikes'>{dislikes}</span>
                    <button
                      onClick={onDislikeHandler}
                      type='button'
                      className='ml-4 mr-4 mai-thumbs-down btn btn-outline-danger ms-1 '></button>
                  </div>
                </div>
              ) : (
                <div className='d-flex flex-row align-items-center p-3 like-dislike-buttons'>
                  <div>
                    <span className='likes'>Upvotes: </span>
                    <span className=' ml-4 likes'>{likes}</span>
                  </div>
                  <div>
                    <span className='dislikes'>Downvotes: </span>
                    <span className=' ml-4 dislikes'>{dislikes}</span>
                  </div>
                </div>
              )}
              <CommentSection postId={postId} comments={post.comments} />
            </div>
            <AsideSection postId={postId} categories={post.categories} />
          </div>
        </div>
        <Modal
          show={deleteModal}
          close={toggleDeleteModal}
          title={`Are you sure you want to delete ${post.title}?`}
          message='Delete message'
          buttonText='Delete'
          type='danger'
          callback={deletePostHandler}
        />
      </div>
    );
  }
}

export default PostDetails;
