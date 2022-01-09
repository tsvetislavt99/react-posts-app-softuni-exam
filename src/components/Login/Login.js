//CSS
import './Login.css';

//Other
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import isGuest from '../../hoc/isGuest';

//Components
import Notification from '../Notification/Notification';

function Login() {
  const { login } = useAuthContext();
  const [isValid, setIsValid] = useState({ fields: {}, errors: {} });
  const [showError, setShowError] = useState({
    state: false,
    errorMessage: '',
  });
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);
    if (handleValidation()) {
      authService
        .login(email, password)
        .then((authData) => {
          login(authData);
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
          setShowError({ state: true, errorMessage: error.message });
          setTimeout(() => {
            setShowError({ state: false, errorMessage: '' });
          }, 1000);
        });
    } else {
      setShowError({
        state: true,
        errorMessage: 'Invalid e-mail or password!',
      });
      setTimeout(() => {
        setShowError({ state: false, errorMessage: '' });
      }, 2000);
    }
  };

  const handleValidation = () => {
    const fields = isValid.fields;
    const errors = {};
    let formIsValid = true;

    if (!fields['email']) {
      formIsValid = false;
      errors['email'] = 'E-mail address is required!';
    }

    if (!fields['password']) {
      formIsValid = false;
      errors['password'] = 'Password is required!';
    }

    setIsValid((oldIsValid) => {
      return { ...oldIsValid, ...{ errors: errors } };
    });

    return formIsValid;
  };

  const onEmailChangeHandler = (e) => {
    const emailRegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    let errors = {};

    if (!emailRegExp.test(e.target.value)) {
      errors['email'] = 'Please enter a valid e-mail address!';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    } else {
      const fields = isValid.fields;
      fields[e.target.name] = e.target.name;
      errors['email'] = null;
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors }, ...fields };
      });
    }
  };

  const onChangeHandler = (e) => {
    const fields = isValid.fields;
    fields[e.target.name] = e.target.name;
    setIsValid((oldIsValid) => {
      return { ...oldIsValid, ...fields };
    });
  };

  return (
    <>
      {showError.state ? (
        <Notification variant={'danger'}>{showError.errorMessage}</Notification>
      ) : (
        ''
      )}

      <div className='container-fluid h-custom login-container wow fadeInRight'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-md-8 col-lg-8 col-xl-4'>
            <form method='POST' onSubmit={submitHandler}>
              <div className='form-outline mb-4'>
                <label className='form-label ml-3' htmlFor='email'>
                  Email address
                </label>
                <input
                  onChange={onEmailChangeHandler}
                  type='email'
                  id='email'
                  name='email'
                  className={
                    isValid.errors['email']
                      ? 'form-control form-control-lg notValid'
                      : 'form-control form-control-lg'
                  }
                  placeholder='Enter a valid email address'
                />
                {isValid.errors['email'] && (
                  <p className='ml-3 error-message' style={{ color: 'red' }}>
                    {isValid.errors['email']}
                  </p>
                )}
              </div>

              <div className='form-outline mb-3'>
                <label className='form-label ml-3' htmlFor='password'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  onChange={onChangeHandler}
                  className={
                    isValid.errors['password']
                      ? 'form-control form-control-lg notValid'
                      : 'form-control form-control-lg'
                  }
                  placeholder='Enter password'
                />
                {isValid.errors['password'] && (
                  <p className='ml-3 error-message' style={{ color: 'red' }}>
                    {isValid.errors['password']}
                  </p>
                )}
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
    </>
  );
}

export default isGuest(Login);
