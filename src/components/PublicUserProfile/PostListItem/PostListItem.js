import { Link } from 'react-router-dom';

function PostListItem() {
  return (
    <>
      <div className='row'>
        <div className='col-sm-3'>
          <p className='mb-0'>Title</p>
        </div>
        <div className='col-sm-9'>
          <p className='text-muted mb-0'>
            <Link to='/'>Post Title here</Link>
          </p>
        </div>
      </div>
      <br />
      <div className='row'>
        <div className='col-sm-3'>
          <p className='mb-0'>Rating</p>
        </div>
        <div className='col-sm-3'>
          <p className='text-muted mb-0'>8</p>
        </div>
        <div className='col-sm-3'>
          <p className='mb-0'>Comments</p>
        </div>
        <div className='col-sm-3'>
          <p className='text-muted mb-0'>8</p>
        </div>
      </div>
      <hr />
    </>
  );
}

export default PostListItem;
