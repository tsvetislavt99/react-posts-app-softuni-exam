//CSS
import './Catalog.css';

//Others
import { useState, useEffect } from 'react';
import postService from '../../services/postService';

//Components
import PostCard from '../PostCard/PostCard';

function Catalog() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (posts.length === 0) {
      postService.getAllPosts().then((newPosts) => {
        setPosts((oldPosts) => [...oldPosts, ...newPosts]);
      });
    }
  }, [posts.length, search]);

  const filterPosts = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { query } = Object.fromEntries(formData);
    console.log(query);
    postService.getAllPosts(query).then((newPosts) => {
      console.log(newPosts);
      setPosts((oldPosts) => [...newPosts]);
      setSearch((oldSearch) => !oldSearch);
    });

    setSearch((oldSearch) => !oldSearch);
  };

  console.log(posts);

  return (
    <div className='page-section'>
      <div className='container wow fadeInLeft'>
        <div className='row'>
          <div className='col-sm-10'>
            <form
              method='GET'
              onSubmit={filterPosts}
              className='form-search-blog'>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter keyword..'
                  name='query'
                />
              </div>
              <div className='col-sm-2 text-sm-right'>
                <button type='submit' className='btn btn-primary'>
                  Search
                </button>
              </div>
            </form>
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
