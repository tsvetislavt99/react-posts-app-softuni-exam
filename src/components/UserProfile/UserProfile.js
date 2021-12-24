import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import postService from '../../services/postService';
import TopPostCard from './TopPostCard/TopPostCard';

function UserProfile() {
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
                  <h5 className='my-3'>John Smith</h5>
                  <p className='text-muted mb-1'>Full Stack Developer</p>
                  <p className='text-muted mb-4'>Bay Area, San Francisco, CA</p>
                  <div className='d-flex justify-content-center mb-2'>
                    <button
                      type='button'
                      className='btn btn-outline-primary ms-1'>
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-8'>
              <div className='card mb-4'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>First Name</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>Johnatan</p>
                    </div>
                  </div>
                  <hr />

                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Last Name</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>Smith</p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Email</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>example@example.com</p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Aritcles posted</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>14</p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Top Post</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>
                        <Link to='/'>Why do monkeys pee? </Link>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Address</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>
                        Bay Area, San Francisco, CA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <h5 className='col-md-12 my-3' style={{ textAlign: 'center' }}>
              Top Posts
            </h5>
          </div>
          <div className='row'>
            {topPosts.map((post) => (
              <TopPostCard post={post} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default UserProfile;
