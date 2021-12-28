import './Register.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import Notification from '../Notification/Notification';
import { AuthContext } from '../../contexts/AuthContext';

function Register() {
  const { login } = useContext(AuthContext);
  const [isValid, setIsValid] = useState({ fields: {}, errors: {} });
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { firstName, lastName, email, password, rePassword } =
      Object.fromEntries(formData);
    if (handleValidation(password, rePassword)) {
      authService
        .register({
          firstName,
          lastName,
          email,
          password,
          rePassword,
        })
        .then((authData) => {
          login(authData);
          navigate('/login');
        })
        .catch((error) => {
          console.log(error);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 1000);
        });
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  const handleValidation = (password, rePassword) => {
    const fields = isValid.fields;
    const errors = {};
    let formIsValid = true;

    if (!fields['firstName']) {
      formIsValid = false;
      errors['firstName'] = 'First Name is required!';
    }

    if (!fields['lastName']) {
      formIsValid = false;
      errors['lastName'] = 'Last Name is required!';
    }

    if (!fields['email']) {
      formIsValid = false;
      errors['email'] = 'E-mail address is required!';
    }

    if (!fields['password']) {
      formIsValid = false;
      errors['password'] = 'Password is required!';
    }

    if (!fields['rePassword']) {
      formIsValid = false;
      errors['rePassword'] = 'Repeat Password address is required!';
    }

    if (!fields['terms']) {
      formIsValid = false;
      errors['terms'] =
        'You need to agree with the Terms & Conditions to register!';
    }

    var passWordRegExp = new RegExp(
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))/
    );

    if (password.length < 8) {
      formIsValid = false;
      errors['password'] = 'Password should be at least 8 symbols long!';
    }

    if (!passWordRegExp.test(password)) {
      formIsValid = false;
      errors['password'] =
        'Password should contain at least 1: Lowercase letter, Upercase letter, Numeric character, Special character';
    }

    if (password !== rePassword) {
      formIsValid = false;
      errors['rePassword'] = 'Password and Repeat Password should match!';
    }

    setIsValid((oldIsValid) => {
      return { ...oldIsValid, ...{ errors: errors } };
    });

    return formIsValid;
  };

  const onFirstNameChangeHandler = (e) => {
    const nameRegExp = new RegExp(/^[a-z ,.'-]+$/i);
    let errors = {};

    if (nameRegExp.test(e.target.value)) {
      const fields = isValid.fields;
      fields[e.target.name] = e.target.name;
      errors['firstName'] = null;
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors }, ...fields };
      });
    } else if (e.target.value.length < 2 || e.target.value.length > 50) {
      errors['firstName'] = 'Name should be between 2 and 50 characters!';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    } else {
      errors['firstName'] =
        'Name should not include numbers and special characters!';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    }
  };

  const onLastNameChangeHandler = (e) => {
    const nameRegExp = new RegExp(/^[a-z ,.'-]+$/i);
    let errors = {};

    if (
      nameRegExp.test(e.target.value) &&
      e.target.value.length > 1 &&
      e.target.value.length < 50
    ) {
      const fields = isValid.fields;
      fields[e.target.name] = e.target.name;
      errors['lastName'] = null;
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors }, ...fields };
      });
    } else if (e.target.value.length < 2 || e.target.value.length > 50) {
      errors['lastName'] = 'Name should be between 2 and 50 characters!';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    } else {
      errors['lastName'] =
        'Name should not include numbers and special characters!';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    }
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
      {showError ? (
        <>
          <Notification variant={'danger'}>
            Sign up failed! Please check your input!
          </Notification>
        </>
      ) : (
        ''
      )}
      <div className='container register-container wow fadeInLeft'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-lg-12 col-xl-11'>
            <div className='text-black'>
              <div className='card-body p-md-5'>
                <div className='row justify-content-center'>
                  <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                    <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                      Sign up
                    </p>

                    <form
                      method='POST'
                      onSubmit={submitHandler}
                      className='mx-1 mx-md-4'>
                      <div className='d-flex flex-row align-items-center mb-4'>
                        <i className='fas fa-user fa-lg me-3 fa-fw'></i>
                        <div className='form-outline flex-fill mb-0'>
                          <label
                            className='form-label ml-3'
                            htmlFor='firstName'>
                            First Name
                          </label>
                          <input
                            onChange={onFirstNameChangeHandler}
                            type='text'
                            id='firstName'
                            name='firstName'
                            className={
                              isValid.errors['firstName']
                                ? 'form-control notValid'
                                : 'form-control'
                            }
                          />
                          {isValid.errors['firstName'] && (
                            <p
                              className='ml-3 error-message'
                              style={{ color: 'red' }}>
                              {isValid.errors['firstName']}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='d-flex flex-row align-items-center mb-4'>
                        <i className='fas fa-user fa-lg me-3 fa-fw'></i>
                        <div className='form-outline flex-fill mb-0'>
                          <label className='form-label ml-3' htmlFor='lastName'>
                            Last Name
                          </label>
                          <input
                            onChange={onLastNameChangeHandler}
                            type='text'
                            id='lastName'
                            name='lastName'
                            className={
                              isValid.errors['lastName']
                                ? 'form-control notValid'
                                : 'form-control'
                            }
                          />
                          {isValid.errors['lastName'] && (
                            <p
                              className='ml-3 error-message'
                              style={{ color: 'red' }}>
                              {isValid.errors['lastName']}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className='d-flex flex-row align-items-center mb-4'>
                        <i className='fas fa-envelope fa-lg me-3 fa-fw'></i>
                        <div className='form-outline flex-fill mb-0'>
                          <label className='form-label ml-3' htmlFor='email'>
                            Your Email
                          </label>
                          <input
                            type='email'
                            id='email'
                            name='email'
                            onChange={onEmailChangeHandler}
                            className={
                              isValid.errors['email']
                                ? 'form-control notValid'
                                : 'form-control'
                            }
                          />
                          {isValid.errors['email'] && (
                            <p
                              className='ml-3 error-message'
                              style={{ color: 'red' }}>
                              {isValid.errors['email']}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className='d-flex flex-row align-items-center mb-4'>
                        <i className='fas fa-lock fa-lg me-3 fa-fw'></i>
                        <div className='form-outline flex-fill mb-0'>
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
                                ? 'form-control notValid'
                                : 'form-control'
                            }
                          />
                          {isValid.errors['password'] && (
                            <p
                              className='ml-3 error-message'
                              style={{ color: 'red' }}>
                              {isValid.errors['password']}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className='d-flex flex-row align-items-center mb-4'>
                        <i className='fas fa-key fa-lg me-3 fa-fw'></i>
                        <div className='form-outline flex-fill mb-0'>
                          <label
                            className='form-label ml-3'
                            htmlFor='rePassword'>
                            Repeat your password
                          </label>
                          <input
                            type='password'
                            id='rePassword'
                            name='rePassword'
                            onChange={onChangeHandler}
                            className={
                              isValid.errors['rePassword']
                                ? 'form-control notValid'
                                : 'form-control'
                            }
                          />
                          {isValid.errors['rePassword'] && (
                            <p
                              className='ml-3 error-message'
                              style={{ color: 'red' }}>
                              {isValid.errors['rePassword']}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className='form-check d-flex justify-content-left mb-5'>
                        <input
                          className='form-check-input me-2'
                          type='checkbox'
                          value={true}
                          id='terms'
                          name='terms'
                          onChange={onChangeHandler}
                        />
                        <label className='form-check-label' htmlFor='terms'>
                          I agree all statements in{' '}
                          <a href='/about-us'>Terms of service</a>
                        </label>
                        {isValid.errors['terms'] && (
                          <p
                            className='ml-3 error-message'
                            style={{ color: 'red' }}>
                            {isValid.errors['terms']}
                          </p>
                        )}
                      </div>

                      <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                        <button
                          type='submit'
                          className='btn btn-primary btn-lg'>
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                      className='img-fluid'
                      alt='register_img'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
