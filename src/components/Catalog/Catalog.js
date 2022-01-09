//CSS
import './Catalog.css';

//Others
import { useState, useEffect } from 'react';
import postService from '../../services/postService';

//Components
import PostCard from '../PostCard/PostCard';

function Catalog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    postService.getAllPosts().then((newPosts) => {
      setPosts((oldPosts) => [...oldPosts, ...newPosts]);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className='page-section'>
      <div className='container wow fadeInLeft'>
        <div className='row'>
          <div className='col-sm-10'>
            <form action='#' className='form-search-blog'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <select id='categories' className='custom-select bg-light'>
                    <option>All Categories</option>
                    <option value='travel'>Travel</option>
                    <option value='lifestyle'>LifeStyle</option>
                    <option value='healthy'>Healthy</option>
                    <option value='food'>Food</option>
                  </select>
                </div>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter keyword..'
                />
              </div>
            </form>
          </div>
          <div className='col-sm-2 text-sm-right'>
            <button className='btn btn-secondary'>
              Filter <span className='mai-filter'></span>
            </button>
          </div>
        </div>

        <div className='row my-5'>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
