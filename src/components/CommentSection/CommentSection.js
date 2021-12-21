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
            <div className='mt-2'>
              <div className='d-flex flex-row p-3'>
                <img
                  alt='user_avatar'
                  src='https://i.imgur.com/zQZSWrt.jpg'
                  width='40'
                  height='40'
                  className='rounded-circle mr-3'
                />
                <div className='w-100'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex flex-row align-items-center'>
                      <span className='mr-2'>Brian selter</span>
                      <small className='c-badge'>Top Comment</small>
                    </div>
                    <small>12h ago</small>
                  </div>
                  <p className='text-justify comment-text mb-0'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                  </p>
                  <div className='d-flex flex-row user-feed'>
                    <span className='wish'>
                      <span className='mai-heart mr-2'></span>24
                    </span>
                    <span className='ml-3'>
                      <span
                        style={{ color: 'red' }}
                        className='mai-thumbs-down mr-2'></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
