import { Link } from 'react-router-dom';

function TopPostCard({ post }) {
  console.log(post);
  return (
    <div className='col-md-4'>
      <div className='card-blog'>
        <div className='header'>
          <div className='post-thumb'>
            <img src={post.imageUrl} alt='' />
          </div>
        </div>
        <div className='body'>
          <h5 className='post-title'>
            <Link to={`/blog/${post._id}`}>{post.title}</Link>
          </h5>
          <div className='post-date'>Posted on {post.dataOfCreation}</div>
        </div>
      </div>
    </div>
  );
}

export default TopPostCard;
