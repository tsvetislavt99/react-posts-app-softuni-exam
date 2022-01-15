import './UserProfile.css';

//Other
import { useState, useEffect, lazy, Suspense, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import postService from '../../services/postService';
import { useAuthContext } from '../../contexts/AuthContext';
import userService from '../../services/userService';
import isAuth from '../../hoc/isAuth';
import { types, NotificationContext } from '../../contexts/NotificationContext';

//Components
import Loading from '../Loading/Loading';
import authService from '../../services/authService';
import AvatarSelect from './AvatarSelect';
const Modal = lazy(() => import('../Modal/Modal'));
const EditProfile = lazy(() => import('./EditProfile'));
const PostCard = lazy(() => import('../PostCard/PostCard'));

function UserProfile() {
  const { user, logout } = useAuthContext();
  const { showNotification } = useContext(NotificationContext);
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
  const [modal, setModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [updateAvatar, setUpdateAvatar] = useState(false);

  const navigate = useNavigate();

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
  }, [user.userId, isBeingEdited, updateAvatar]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleAvatarModal = () => {
    setAvatarModal(!avatarModal);
  };

  const getAvatarName = (e) => {
    const avatarName = e.target.src.substring(e.target.src.indexOf('/', 7));
    userService.editAvatar(avatarName, user.userId).then(() => {
      setUpdateAvatar(!updateAvatar);
    });
  };

  const editHandler = () => {
    setIsBeingEdited((oldIsBeingEdit) => !oldIsBeingEdit);
  };

  const deleteHandler = () => {
    const id = user.userId;
    userService
      .deleteProfile(id)
      .then(() => {
        logout();
        authService.logout().then(() => {
          showNotification('Successfully deleted profile!', types.success);
          navigate('/');
        });
      })
      .catch((error) => {
        showNotification(error.message, types.error);
      });
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
                <div className='col-sm-3 profile-control'>
                  <button
                    type='button'
                    onClick={editHandler}
                    className='btn btn-outline-primary ms-1 '>
                    Edit Profile
                  </button>
                </div>
                <div className='col-sm-3 profile-control'>
                  <button
                    style={{ padding: '8px 20px' }}
                    type='button'
                    onClick={toggleModal}
                    className='btn btn-outline-danger ms-1 '>
                    Delete Profile
                  </button>
                  <Modal
                    show={modal}
                    close={toggleModal}
                    title='Are you sure you want to delete your profile?'
                    message='Delete message'
                    buttonText='Delete'
                    type='danger'
                    callback={deleteHandler}
                  />
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
                  <div className='card-body text-center'>
                    <div className='img-edit'>
                      <button
                        onClick={toggleAvatarModal}
                        className='change-avatar'>
                        <img
                          src={userInfo.avatar}
                          alt='avatar'
                          className='rounded-circle img-fluid avatar'
                          style={{ width: '150px' }}
                        />
                      </button>
                    </div>
                    <Modal
                      show={avatarModal}
                      close={toggleAvatarModal}
                      title='Test?'
                      buttonText='Test'
                      type='info'
                      callback={getAvatarName}
                      footerless={true}>
                      <AvatarSelect />
                    </Modal>
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
