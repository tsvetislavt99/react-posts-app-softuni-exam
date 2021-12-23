function BlogItem(post) {
  return (
    <div className='blog-item'>
      <a className='post-thumb' href=''>
        <img src='../assets/img/blog/blog-1.jpg' alt='' />
      </a>
      <div className='content'>
        <h6 className='post-title'>
          <a href='#'>Even the all-powerful Pointing has no control</a>
        </h6>
        <div className='meta'>
          <a href='#'>
            <span className='mai-calendar'></span> July 12, 2018
          </a>
          <a href='#'>
            <span className='mai-person'></span> Admin
          </a>
          <a href='#'>
            <span className='mai-chatbubbles'></span> 19
          </a>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
