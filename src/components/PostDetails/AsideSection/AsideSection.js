import { useEffect, useState } from 'react';
import postService from '../../../services/postService';
import BlogItem from './BlogItem/BlogItem';

function AsideSection({ categories, postId }) {
  const [topPosts, setTopPosts] = useState();

  useEffect(() => {
    postService
      .getTopThreeWithout(postId)
      .then((receivedPosts) => setTopPosts(receivedPosts));
  }, [postId]);

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
          <h4 className='widget-title'>Hot Posts</h4>
          <div className='divider'></div>

          {topPosts
            ? topPosts.map((post) => <BlogItem key={post._id} post={post} />)
            : ''}
        </div>
      </div>
    </div>
  );
}

export default AsideSection;
