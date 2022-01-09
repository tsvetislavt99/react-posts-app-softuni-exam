//CSS
import './PostDetails.css';

//Other
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import parse from 'html-react-parser';
import postService from '../../services/postService';
import { AuthContext } from '../../contexts/AuthContext';

//Components
import CommentSection from '../CommentSection/CommentSection';
import AsideSection from './AsideSection/AsideSection';

function PostDetails() {
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const [rating, setRating] = useState(0);
  const [post, setPost] = useState({
    isLoading: true,
  });

  useEffect(() => {
    postService
      .getPostById(postId)
      .then((receivedPost) => {
        setPost({ ...receivedPost, isLoading: false });
        return receivedPost;
      })
      .then((res) => {
        setRating(res.rating);
      });

    return () => {
      setPost({
        isLoading: true,
      });
    };
  }, [postId]);

  const onLikeHandler = () => {
    postService
      .likePost(post._id)
      .then((res) => setRating((oldRating) => res.newRating))
      //TODO: Add notification
      .catch((error) => console.log(error));
  };

  const onDislikeHandler = () => {
    postService
      .dislikePost(post._id)
      .then((res) => {
        setRating((oldRating) => res.newRating);
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
                      <Link to='/404'>
                        {post.author?.firstName} {post.author?.lastName}
                      </Link>
                    </div>
                    {user.userId ? (
                      <div className='d-flex flex-row user-feed'>
                        <span className='wish'>
                          <button
                            style={{ color: '#84d9f8' }}
                            onClick={onLikeHandler}
                            className='mai-heart mr-2 like-button'></button>
                        </span>
                        {rating}
                        <span className='ml-3'>
                          <button
                            style={{ color: '#ff4943' }}
                            onClick={onDislikeHandler}
                            className='mai-thumbs-down mr-2 like-button'></button>
                        </span>
                      </div>
                    ) : (
                      <div className='d-flex flex-row user-feed'>
                        Post Rating: {rating}
                      </div>
                    )}
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

              <CommentSection postId={postId} comments={post.comments} />
            </div>
            <AsideSection postId={postId} categories={post.categories} />
          </div>
        </div>
      </div>
    );
  }
}

export default PostDetails;
