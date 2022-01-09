//Other
import { useState, useEffect } from 'react';
import postService from '../../services/postService';

//Components
import PostListItem from './PostListItem/PostListItem';

function PublicUserProfile() {
  const [topPosts, setTopPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    postService.getTopThree().then((posts) => {
      setTopPosts((oldPosts) => [...oldPosts, ...posts]);
      setIsLoading((isLoading) => !isLoading);
    });
  }, []);

  console.log(topPosts);

  if (isLoading) {
    return <h1>Loading......</h1>;
  } else {
    return (
      <section style={{ backgroundColor: '#eee' }}>
        <div className='container py-5'>
          <div className='row'>
            <div className='col-lg-4'>
              <div className='card mb-4'>
                <div className='card-body text-center'>
                  <img
                    src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                    alt='avatar'
                    className='rounded-circle img-fluid'
                    style={{ width: '150px' }}
                  />
                  <h5 className='my-3'>Joh22n Smith</h5>
                  <p className='text-muted mb-1'>Full Stack Developer</p>
                  <p className='text-muted mb-4'>
                    Bay 22Area, San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
            <div className='col-lg-8'>
              <div className='card mb-4'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <p className='mb-0 text-center'>Posts</p>
                    </div>
                  </div>
                  <hr />
                  <PostListItem />
                  <PostListItem />
                  <PostListItem />
                  <PostListItem />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PublicUserProfile;
