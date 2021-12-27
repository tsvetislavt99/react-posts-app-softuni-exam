function Comment({ commentData }) {
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
          </div>
          <p className='text-justify comment-text mb-0'>
            {commentData.comment}
          </p>
          <div className='d-flex flex-row user-feed'>
            <span className='wish'>
              <button
                style={{ color: '#84d9f8' }}
                className='mai-heart mr-2 like-button'></button>
              {commentData.rating}
            </span>
            <span className='ml-3'>
              <button
                style={{ color: '#ff4943' }}
                className='mai-thumbs-down mr-2 like-button'></button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
