import { useEffect, useState } from 'react';
import postService from '../../../services/postService';

function AsideSection(postId) {
  const [post, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  return (
    <div className='col-lg-4'>
      <div className='widget'>
        <div className='widget-box'>
          <form action='#' className='search-widget'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter keyword..'
            />
            <button type='submit' className='btn btn-primary btn-block'>
              Search
            </button>
          </form>
        </div>

        <div className='widget-box'>
          <h4 className='widget-title'>Category</h4>
          <div className='divider'></div>

          <ul className='categories'>
            <li>
              <a href='#'>LifeStyle</a>
            </li>
            <li>
              <a href='#'>Food</a>
            </li>
            <li>
              <a href='#'>Healthy</a>
            </li>
            <li>
              <a href='#'>Sports</a>
            </li>
            <li>
              <a href='#'>Entertainment</a>
            </li>
          </ul>
        </div>

        <div className='widget-box'>
          <h4 className='widget-title'>Recent Post</h4>
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

        <div className='widget-box'>
          <h4 className='widget-title'>Tag Cloud</h4>
          <div className='divider'></div>

          <div className='tag-clouds'>
            <a href='#' className='tag-cloud-link'>
              Projects
            </a>
            <a href='#' className='tag-cloud-link'>
              Design
            </a>
            <a href='#' className='tag-cloud-link'>
              Travel
            </a>
            <a href='#' className='tag-cloud-link'>
              Brand
            </a>
            <a href='#' className='tag-cloud-link'>
              Trending
            </a>
            <a href='#' className='tag-cloud-link'>
              Knowledge
            </a>
            <a href='#' className='tag-cloud-link'>
              Food
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsideSection;
