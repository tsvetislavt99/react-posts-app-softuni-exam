//CSS
import './PublicUserProfile.css';

//Other
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Components
import PostListItem from './PostListItem/PostListItem';
import Loading from '../Loading/Loading';
import userService from '../../services/userService';

function PublicUserProfile() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({
    isLoading: true,
  });

  useEffect(() => {
    userService.getUser(userId).then((user) => {
      console.log(user.posts);
      setUserDetails({ ...user, isLoading: false });
    });
  }, [userId]);

  if (userDetails.isLoading) {
    return <Loading />;
  } else {
    return (
      <section style={{ backgroundColor: '#eee' }}>
        <div className='container py-5'>
          <div className='row'>
            <div className='col-lg-4'>
              <div className='card mb-4'>
                <div className='card-body text-center'>
                  <img
                    src={userDetails.avatar}
                    alt='avatar'
                    className='rounded-circle img-fluid'
                    style={{ width: '150px' }}
                  />
                  <h5 className='my-3'>{`${userDetails.firstName} ${userDetails.lastName}`}</h5>
                  <p className='text-muted mb-1'>{`${userDetails.jobTitle}`}</p>
                  <p className='text-muted mb-4'>{`${userDetails.address}`}</p>
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
                  {userDetails.posts.length !== 0 ? (
                    userDetails.posts.map((post) => (
                      <PostListItem key={post._id} post={post} />
                    ))
                  ) : (
                    <h3 className='no-posts-user'>
                      The user does not have posts yet :(
                    </h3>
                  )}
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
