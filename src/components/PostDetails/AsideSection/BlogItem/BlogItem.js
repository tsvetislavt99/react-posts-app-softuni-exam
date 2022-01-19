//Other
import { Link } from 'react-router-dom';

function BlogItem({ post }) {
  return (
    <div className='blog-item'>
      <Link className='post-thumb' to={`/blog/${post._id}`}>
        <img src={post.imageUrl} alt='' />
      </Link>
      <div className='content'>
        <h6 className='post-title'>
          <Link to={`/blog/${post._id}`}>{post.title}</Link>
        </h6>
        <div className='meta'>
          <p style={{ margin: 0 }}>
            <span className='mai-calendar'></span>{' '}
            {post.dateOfCreation.substring(0, 10)}
          </p>
          <Link to={`/public-profile/${post.author?._id}`}>
            <span className='mai-person'></span> {post.author.firstName}
          </Link>
          <span className='mai-chatbubbles'></span> {post.comments.length}
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
