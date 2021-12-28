import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <div className='col-lg-4 py-3 wow fadeInUp'>
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
          <div className='post-date'>
            Posted on {post.dateOfCreation.substring(0, 10)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
