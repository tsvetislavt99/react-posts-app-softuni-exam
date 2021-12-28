import { useContext, useState } from 'react';
import Comment from './Comment/Comment';
import postService from '../../services/postService';

import { AuthContext } from '../../contexts/AuthContext';

function CommentSection({ comments, postId }) {
  const [newComments, setNewComments] = useState(comments);
  const [isValid, setIsValid] = useState({ errors: {} });
  const { user } = useContext(AuthContext);

  const onCommentSubmitHandler = (e) => {
    e.preventDefault();
    const errors = {};
    const formData = new FormData(e.target);
    const commentText = formData.get('comment');
    if (commentText.length < 1) {
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
            .then((fetchedComments) => setNewComments(fetchedComments))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  const onCommentChangeHandler = (e) => {
    let errors = {};
    if (e.target.value.length > 0) {
      errors['postImage'] = null;
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    }
  };

  return (
    <div style={{ padding: '0' }} className='container mt-5 mb-5'>
      <div className='row height d-flex justify-content-center align-items-center'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='p-3'>
              <h6>Comments</h6>
            </div>
            <div className='mt-3 d-flex flex-row align-items-center p-3 form-color'>
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
                        ? 'form-control notValid'
                        : 'form-control'
                    }
                    name='comment'
                    onChange={onCommentChangeHandler}
                    placeholder='Enter your comment...'
                  />
                </form>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        {newComments
          .sort(
            (c1, c2) =>
              new Date(c2.dateOfCreation) - new Date(c1.dateOfCreation)
          )
          .map((comment) => (
            <Comment key={comment._id} commentData={comment} />
          ))}
      </div>
    </div>
  );
}

export default CommentSection;
