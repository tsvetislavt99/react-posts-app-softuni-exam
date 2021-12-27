import { useContext } from 'react';
import Comment from './Comment/Comment';

import { AuthContext } from '../../contexts/AuthContext';

function CommentSection({ comments }) {
  const { user } = useContext(AuthContext);

  return (
    <div className='container mt-5 mb-5'>
      <div className='row height d-flex justify-content-center align-items-center'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='p-3'>
              <h6>Comments</h6>
            </div>
            <div className='mt-3 d-flex flex-row align-items-center p-3 form-color'>
              <img
                alt='user_avatar'
                src={user.userAvatar}
                width='50'
                className='rounded-circle mr-2'
              />
              <input
                type='text'
                className='form-control'
                placeholder='Enter your comment...'
              />
            </div>
          </div>
        </div>
        {comments.map((comment) => (
          <Comment key={comment._id} commentData={comment} />
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
