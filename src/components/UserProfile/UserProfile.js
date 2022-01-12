//Other
import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import postService from '../../services/postService';
import { useAuthContext } from '../../contexts/AuthContext';
import userService from '../../services/userService';
import isAuth from '../../hoc/isAuth';

//Components
import Loading from '../Loading/Loading';
const EditProfile = lazy(() => import('./EditProfile'));
const PostCard = lazy(() => import('../PostCard/PostCard'));

function UserProfile() {
  const { user } = useAuthContext();

  const [isBeingEdited, setIsBeingEdited] = useState(false);
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
      if (!posts) {
        setMyPosts(null);
      } else {
        setMyPosts(posts);
      }
    });
    postService.getMyTopPost().then((post) => {
      if (!post) {
        setTopPost(null);
      } else {
        setTopPost(...post);
      }
    });
    userService.getUser(user.userId).then((user) => {
      setUserInfo(user);
    });
  }, [user.userId, isBeingEdited]);

  const editHandler = () => {
    setIsBeingEdited((oldIsBeingEdit) => !oldIsBeingEdit);
  };

  const ProfileBox = () => {
    if (!isBeingEdited) {
      return (
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
                  <p className='mb-0'>Job Title</p>
                </div>
                <div className='col-sm-9'>
                  <p className='text-muted mb-0'>
                    {userInfo.jobTitle ? userInfo.jobTitle : '-'}
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
              <hr />
              <div className='row'>
                <div className='col-sm-3'>
                  <p className='mb-0'>Aritcles posted</p>
                </div>
                <div className='col-sm-9'>
                  <p className='text-muted mb-0'>{userInfo.posts?.length}</p>
                </div>
              </div>
              <hr />
              <div className='row'>
                <div className='col-sm-3'>
                  <p className='mb-0'>Top Post</p>
                </div>
                <div className='col-sm-9'>
                  <p className='text-muted mb-0'>
                    {topPost ? (
                      <Link to={`/blog/${topPost._id}`}>{topPost.title}</Link>
                    ) : (
                      <span>You have no posts yet :(</span>
                    )}
                  </p>
                </div>
              </div>
              <hr />

              <div className='row justify-content-md-center'>
                <div className='col-sm-3'>
                  <button
                    type='button'
                    onClick={editHandler}
                    className='btn btn-outline-primary ms-1'>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <EditProfile
          user={user}
          setIsBeingEdited={setIsBeingEdited}
          userInfo={userInfo}
          topPost={topPost}
        />
      );
    }
  };

  if (myPosts.isLoading || topPost?.isLoading || userInfo?.isLoading) {
    return <Loading />;
  } else {
    return (
      <Suspense fallback={<Loading />}>
        <section style={{ backgroundColor: '#eee' }}>
          <div className='container py-5'>
            <div className='row'>
              <div className='col-lg-4'>
                <div className='card mb-4'>
                  {' '}
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
                    <p className='text-muted mb-1'>{userInfo.email}</p>
                  </div>
                </div>
              </div>
              {<ProfileBox />}
            </div>
            <div className='row'>
              <h5 className='col-md-12 my-3' style={{ textAlign: 'center' }}>
                {myPosts.length === 0 ? '' : 'My Posts'}
              </h5>
            </div>
            <div className='row'>
              {myPosts
                ? myPosts.map((post) => <PostCard key={post._id} post={post} />)
                : ''}
            </div>
          </div>
        </section>
      </Suspense>
    );
  }
}

export default isAuth(UserProfile);
