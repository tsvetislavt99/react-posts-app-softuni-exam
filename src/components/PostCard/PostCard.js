function PostCard({ post }) {
  console.log(post);
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
            <a href='#'>{post.title}</a>
          </h5>
          <div className='post-date'>
            Posted on <a href='#'>{post.dataOfCreation}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
