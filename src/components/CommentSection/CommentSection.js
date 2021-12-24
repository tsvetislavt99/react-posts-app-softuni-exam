import Comment from './Comment/Comment';

function CommentSection() {
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
                src='https://i.imgur.com/zQZSWrt.jpg'
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
        <Comment />
      </div>
    </div>
  );
}

export default CommentSection;
