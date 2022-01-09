//Other
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postService from '../../services/postService';

//Components
import PostCard from '../PostCard/PostCard';

function Home() {
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    postService
      .getTopThree()
      .then((posts) => setTopPosts((oldPosts) => [...oldPosts, ...posts]));
  }, []);

  return (
    <div className='page-section'>
      <div className='container'>
        <div className='text-center wow fadeInUp'>
          <div className='subhead'>Our Blog</div>
          <h2 className='title-section'>Read Latest News</h2>
          <div className='divider mx-auto'></div>
        </div>

        <div className='row mt-5'>
          {topPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}

          <div className='col-12 mt-4 text-center wow fadeInUp'>
            <Link to='/blog' className='btn btn-primary'>
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
