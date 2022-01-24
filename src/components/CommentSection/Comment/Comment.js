//Other
import { useState, useContext } from 'react';
import postService from '../../../services/postService';
import { AuthContext } from '../../../contexts/AuthContext';

function Comment({ commentData }) {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(commentData.rating);
  const onLikeHandler = () => {
    postService
      .likeComment(commentData._id)
      .then((res) => setRating(res.newRating))
      //TODO: Add notification
      .catch((error) => console.log(error));
  };

  const onDislikeHandler = () => {
    postService
      .dislikeComment(commentData._id)
      .then((res) => setRating(res.newRating))
      //TODO: Add notification
      .catch((error) => console.log(error));
  };

  return (
    <div className='col-md-12  m-3'>
      <div style={{ display: 'flex' }} className='p-3'>
        <img
          alt='user_avatar'
          src={commentData.author?.avatar}
          width='40'
          height='40'
          className='rounded-circle mr-3'
        />
        <div className='w-100'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex flex-row align-items-center'>
              <span className='mr-2'>
                {commentData.author?.firstName} {commentData.author?.lastName}
              </span>
            </div>
            <small>{commentData.dateOfCreation.substring(0, 10)}</small>
            {commentData.author?._id === user.userId ? (
              <small>
                <button
                  style={{ color: '#FE4942' }}
                  className='mai-trash mr-2 like-button'></button>
              </small>
            ) : null}
          </div>
          <p className='text-justify comment-text mb-0'>
            {commentData.comment}
          </p>
          {user.userId ? (
            <div className='d-flex flex-row user-feed'>
              <span className='wish'>
                <button
                  onClick={onLikeHandler}
                  style={{ color: '#84d9f8' }}
                  className='mai-heart mr-2 like-button'></button>
                {rating}
              </span>
              <span className='ml-3'>
                <button
                  onClick={onDislikeHandler}
                  style={{ color: '#ff4943' }}
                  className='mai-thumbs-down mr-2 like-button'></button>
              </span>
            </div>
          ) : (
            <div className='d-flex flex-row user-feed'>
              Comment Rating: {rating}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
