import './UserProfile.css';

import { useState, useContext } from 'react';
import userService from '../../services/userService';
import { types, NotificationContext } from '../../contexts/NotificationContext';

import { Link } from 'react-router-dom';

const EditProfile = ({ user, setIsBeingEdited, userInfo, topPost }) => {
  const { showNotification } = useContext(NotificationContext);
  const [isValid, setIsValid] = useState({
    errors: {},
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    let { firstName, lastName, jobTitle, address } =
      Object.fromEntries(formData);

    if (!jobTitle) {
      jobTitle = '-';
    }

    if (!address) {
      address = '-';
    }

    userService
      .editProfile({
        firstName,
        lastName,
        jobTitle,
        address,
        userId: user.userId,
      })
      .then((res) => {
        showNotification('Account details edited succeffully!', types.success);
        setIsBeingEdited((oldIsBeingEdit) => !oldIsBeingEdit);
      })
      .catch((error) => {
        setIsBeingEdited((oldIsBeingEdit) => !oldIsBeingEdit);

        return showNotification(error.message, types.error);
      });
  };

  const onFirstNameChangeHandler = (e) => {
    const nameRegExp = new RegExp(/^[a-z ,.'-]+$/i);
    let errors = {};
    console.log(e.target.value);

    if (nameRegExp.test(e.target.value)) {
      errors['firstName'] = null;
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    } else if (e.target.value.length < 2 || e.target.value.length > 50) {
      errors['firstName'] = 'Name should be between 2 and 50 characters!';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors }, valid: false };
      });
    } else {
      errors['firstName'] =
        'Name should not include numbers and special characters!';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors }, valid: false };
      });
    }
  };

  return (
    <div className='col-lg-8'>
      <div className='card mb-4'>
        <form method='POST' onSubmit={submitHandler}>
          <div className='card-body'>
            <div className='row'>
              <div className='col-sm-3'>
                <p className='mb-0'>First Name</p>
              </div>
              <div className='col-sm-9'>
                <input
                  onChange={onFirstNameChangeHandler}
                  type='text'
                  id='firstName'
                  name='firstName'
                  className='mb-0 edit-profile-input'
                  defaultValue={`${userInfo.firstName}`}
                  autoFocus
                />
                {isValid.errors['firstName'] && (
                  <p className='error-message' style={{ color: 'red' }}>
                    {isValid.errors['firstName']}
                  </p>
                )}
              </div>
            </div>
            <hr />

            <div className='row'>
              <div className='col-sm-3'>
                <p className='mb-0'>Last Name</p>
              </div>
              <div className='col-sm-9'>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  className='mb-0 edit-profile-input'
                  defaultValue={userInfo.lastName}
                />
              </div>
            </div>
            <hr />
            <div className='row'>
              <div className='col-sm-3'>
                <p className='mb-0'>Job Title</p>
              </div>
              <div className='col-sm-9'>
                <input
                  type='text'
                  id='jobTitle'
                  name='jobTitle'
                  className='mb-0 edit-profile-input'
                  defaultValue={userInfo.jobTitle ? userInfo.jobTitle : '-'}
                />
              </div>
            </div>
            <hr />
            <div className='row'>
              <div className='col-sm-3'>
                <p className='mb-0'>Address</p>
              </div>
              <div className='col-sm-9'>
                <input
                  type='text'
                  id='address'
                  name='address'
                  className='mb-0 edit-profile-input'
                  defaultValue={userInfo.address ? userInfo.address : '-'}
                />
              </div>
            </div>
            <hr />
            <div className='row'>
              <div className='col-sm-3'>
                <p className='mb-0'>Aritcles posted</p>
              </div>
              <div className='col-sm-9'>
                <p className='mb-0 '>{userInfo.posts?.length}</p>
              </div>
            </div>
            <hr />
            <div className='row'>
              <div className='col-sm-3'>
                <p className='mb-0'>Top Post</p>
              </div>
              <div className='col-sm-9'>
                <p className='mb-0'>
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
                  type='submit'
                  style={{ padding: '8px 20px' }}
                  className='btn btn-outline-primary ms-1'>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
