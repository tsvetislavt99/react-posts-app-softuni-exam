//CSS
import './Banner.css';

//Other
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

function Banner({ isHome }) {
  const { user } = useContext(AuthContext);

  if (isHome === '/') {
    return (
      <div className='container'>
        <div className='page-banner home-banner'>
          <div className='row align-items-center flex-wrap-reverse h-100'>
            <div className='col-md-6 py-5 wow fadeInLeft'>
              <h1 className='mb-4'>A Blog for people that love React!</h1>
              <p className='text-lg text-grey mb-5'>
                Share some usefull React info with our community!
              </p>
              {user.userId ? (
                <Link to='/create' className='btn btn-primary btn-split'>
                  Create a post!
                  <div className='fab'>
                    <span className='mai-play'></span>
                  </div>
                </Link>
              ) : (
                <Link to='/login' className='btn btn-primary btn-split'>
                  Sign in to create a post!
                  <div className='fab'>
                    <span className='mai-play'></span>
                  </div>
                </Link>
              )}
            </div>
            <div className='col-md-6 py-5 wow zoomIn'>
              <div className='img-fluid text-center banner-spin'>
                <img
                  className='spinning-react-logo'
                  src='../assets/img/react.svg'
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Banner;
