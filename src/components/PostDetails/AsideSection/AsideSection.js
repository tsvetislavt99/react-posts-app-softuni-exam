function AsideSection({ categories }) {
  return (
    <div className='col-lg-4'>
      <div className='widget'>
        <div className='widget-box'>
          <h4 className='widget-title'>Categories</h4>
          <div className='divider'></div>
          <ul className='categories'>
            {categories
              ? categories.map((category, i) => <li key={i}>{category}</li>)
              : ''}
          </ul>
        </div>

        <div className='widget-box'>
          <h4 className='widget-title'>Recent Posts By Author</h4>
          <div className='divider'></div>

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

          <div className='blog-item'>
            <a className='post-thumb' href=''>
              <img src='../assets/img/blog/blog-2.jpg' alt='' />
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

          <div className='blog-item'>
            <a className='post-thumb' href=''>
              <img src='../assets/img/blog/blog-3.jpg' alt='' />
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
        </div>
      </div>
    </div>
  );
}

export default AsideSection;
