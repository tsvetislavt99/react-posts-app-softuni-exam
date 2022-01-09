//CSS
import './Login.css';

//Other
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import { types, NotificationContext } from '../../contexts/NotificationContext';
import isGuest from '../../hoc/isGuest';

function Login() {
  const { login } = useAuthContext();
  const { showNotification } = useContext(NotificationContext);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    if (email === '' || password === '') {
      return showNotification('All fields are required!', types.warning);
    }
    authService
      .login(email, password)
      .then((authData) => {
        login(authData);
        showNotification('Successfully signed in!', types.success);

        navigate('/');
      })
      .catch((error) => {
        return showNotification(error.message, types.error);
      });
  };

  return (
    <div className='container-fluid h-custom login-container wow fadeInRight'>
      <div className='row d-flex justify-content-center align-items-center h-100'>
        <div className='col-md-8 col-lg-8 col-xl-4'>
          <form method='POST' onSubmit={submitHandler}>
            <div className='form-outline mb-4'>
              <label className='form-label ml-3' htmlFor='email'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='form-control form-control-lg'
                placeholder='Enter a valid email address'
              />
            </div>

            <div className='form-outline mb-3'>
              <label className='form-label ml-3' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='form-control form-control-lg'
                placeholder='Enter password'
              />
            </div>

            <div className='d-flex justify-content-between align-items-center'>
              <div className='form-check mb-0'>
                <input
                  className='form-check-input me-2'
                  type='checkbox'
                  value=''
                  id='form2Example3'
                />
                <label className='form-check-label' htmlFor='form2Example3'>
                  Remember me
                </label>
              </div>
              <a href='#!' className='text-body'>
                Forgot password?
              </a>
            </div>

            <div className='text-center text-lg-start mt-4 pt-2'>
              <button
                type='submit'
                className='btn btn-primary btn-lg'
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                Login
              </button>
              <p className='small fw-bold mt-2 pt-1 mb-0'>
                Don't have an account?{' '}
                <a href='/register' className='link-danger'>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className='col-md-9 col-lg-4 col-xl-5'>
          <img
            src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
            className='img-fluid'
            alt='register_image'
          />
        </div>
      </div>
    </div>
  );
}

export default isGuest(Login);
