//Other
import { useState, useContext, useEffect } from 'react';
import postService from '../../../services/postService';
import { AuthContext } from '../../../contexts/AuthContext';

//Components
import EditComment from './EditComment';

//TODO: Add modal for deletion
function Comment({ comment }) {
  const { user } = useContext(AuthContext);
  const [commentData, setCommentData] = useState(comment);
  const [rating, setRating] = useState(commentData.rating);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    if (edited) {
      postService
        .getCommentById(comment._id)
        .then((res) => setCommentData(res))
        .catch((error) => {
          //TODO: Add notification
          console.log(error);
        });
    }
  }, [comment._id, edited, commentData]);

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

  const onDeleteHandler = () => {
    postService
      .deleteComment(commentData._id)
      .then((res) => {
        //TODO: Add notification
        setIsDeleted((oldIsDelete) => !oldIsDelete);
      })
      .catch((error) => console.log(error));
  };

  const toggleIsBeingEdited = (alreadyEdited = false) => {
    setIsBeingEdited((oldIsBeingEdited) => !oldIsBeingEdited);
    if (alreadyEdited) {
      setEdited(true);
      setTimeout(() => {
        setEdited(false);
      }, 1000);
    }
  };

  return isDeleted ? null : isBeingEdited ? (
    <EditComment
      toggleIsBeingEdited={toggleIsBeingEdited}
      commentData={commentData}
    />
  ) : (
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
              <>
                <small>
                  <button
                    onClick={toggleIsBeingEdited}
                    style={{ color: '#84D9F7' }}
                    className='mai-pencil mr-2 like-button'></button>
                  <button
                    onClick={onDeleteHandler}
                    style={{ color: '#FE4942' }}
                    className='mai-trash mr-2 like-button'></button>
                </small>
              </>
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
