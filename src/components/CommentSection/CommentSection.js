//Other
import { useContext, useState, useRef } from 'react';
import postService from '../../services/postService';
import { AuthContext } from '../../contexts/AuthContext';
import { NotificationContext, types } from '../../contexts/NotificationContext';

//Components
import Comment from './Comment/Comment';

function CommentSection({ comments, postId }) {
  const { user } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const [newComments, setNewComments] = useState(comments);
  const [isValid, setIsValid] = useState({ errors: {} });
  const commentRef = useRef(null);

  const onCommentSubmitHandler = (e) => {
    e.preventDefault();
    const errors = {};
    const formData = new FormData(e.target);
    const commentText = formData.get('comment');
    if (commentText.length < 6) {
      errors['comment'] = 'Comment should not be empty';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    } else {
      postService
        .addComment(postId, commentText)
        .then((res) => {
          postService
            .getComments(postId)
            .then((fetchedComments) => {
              setNewComments(fetchedComments);
              showNotification(`Successfully posted comment!`, types.success);
            })
            .catch((error) => {
              console.log(error);
            });
          commentRef.current.value = '';
        })
        .catch((error) => console.log(error));
    }
  };

  const onCommentChangeHandler = (e) => {
    let errors = {};
    if (e.target.value.length > 5) {
      errors['postImage'] = null;
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    }
  };

  return (
    <div style={{ padding: '0' }} className='container mb-5'>
      <div className='row height d-flex justify-content-center align-items-center'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='d-flex flex-row align-items-center p-3 form-color'>
              {user.userId ? (
                <form
                  onSubmit={onCommentSubmitHandler}
                  style={{ display: 'flex', width: '100%' }}>
                  <img
                    alt='user_avatar'
                    src={user.userAvatar}
                    width='50'
                    className='rounded-circle mr-2'
                  />
                  <input
                    type='text'
                    className={
                      isValid.errors['comment']
                        ? 'form-control notValid mr-2'
                        : 'form-control mr-2'
                    }
                    name='comment'
                    ref={commentRef}
                    onChange={onCommentChangeHandler}
                    placeholder='Enter your comment...'
                  />

                  <button
                    style={{ padding: '10px 10px', borderRadius: '30px' }}
                    type='submit'
                    className='btn btn-outline-primary ms-1 '>
                    Submit
                  </button>
                </form>
              ) : (
                ''
              )}
            </div>
          </div>
          {isValid.errors['comment'] && (
            <p className='mt-1 comment-warning'>
              Comment should be at least 6 symbols!
            </p>
          )}
        </div>
        {newComments
          .sort(
            (c1, c2) =>
              new Date(c2.dateOfCreation) - new Date(c1.dateOfCreation)
          )
          .map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
      </div>
    </div>
  );
}

export default CommentSection;
