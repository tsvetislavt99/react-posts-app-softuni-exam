import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import postService from '../../services/postService';
import PostCard from '../PostCard/PostCard';

import { AuthContext } from '../../contexts/AuthContext';
import authService from '../../services/authService';

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState({
    isLoading: true,
  });
  const [topPost, setTopPost] = useState({
    isLoading: true,
  });
  const [userInfo, setUserInfo] = useState({
    isLoading: true,
  });

  useEffect(() => {
    postService.getMyPosts().then((posts) => {
      setMyPosts(posts);
    });
    postService.getMyTopPost().then((post) => {
      setTopPost(...post);
    });
    authService.getUser(user.userId).then((user) => {
      setUserInfo(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.userId]);

  if (myPosts.isLoading || topPost.isLoading || userInfo.isLoading) {
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
                  <h5 className='my-3'>
                    {userInfo.firstName} {userInfo.lastName}
                  </h5>
                  <p className='text-muted mb-1'>
                    {userInfo.jobTitle ? userInfo.jobTitle : '-'}
                  </p>
                  <p className='text-muted mb-4'>
                    {userInfo.address ? userInfo.address : '-'}
                  </p>
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
                      <p className='text-muted mb-0'>{userInfo.firstName}</p>
                    </div>
                  </div>
                  <hr />

                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Last Name</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>{userInfo.lastName}</p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Email</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>{userInfo.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Aritcles posted</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>
                        {userInfo.posts?.length}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Top Post</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>
                        <Link to={`/blog/${topPost._id}`}>{topPost.title}</Link>
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
                        {userInfo.address ? userInfo.address : '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <h5 className='col-md-12 my-3' style={{ textAlign: 'center' }}>
              My Posts
            </h5>
          </div>
          <div className='row'>
            {myPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default UserProfile;
