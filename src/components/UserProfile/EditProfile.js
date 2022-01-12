import './UserProfile.css';

import { useState, useContext } from 'react';
import userService from '../../services/userService';
import { types, NotificationContext } from '../../contexts/NotificationContext';

import { Link } from 'react-router-dom';

const EditProfile = ({ user, setIsBeingEdited, userInfo, topPost }) => {
  const { showNotification } = useContext(NotificationContext);
  const [isValid, setIsValid] = useState({
    valid: true,
    errors: {},
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (isValid.valid) {
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
          showNotification(
            'Account details edited succeffully!',
            types.success
          );
          setIsBeingEdited((oldIsBeingEdit) => !oldIsBeingEdit);
        })
        .catch((error) => {
          setIsBeingEdited((oldIsBeingEdit) => !oldIsBeingEdit);

          return showNotification(error.message, types.error);
        });
    } else {
      return showNotification('Please check your input!', types.error);
    }
  };

  const onFirstNameChangeHandler = (e) => {
    const nameRegExp = new RegExp(/^[a-z ,.'-]+$/i);

    if (nameRegExp.test(e.target.value)) {
      setIsValid((oldIsValid) => {
        const newErrors = oldIsValid.errors;
        newErrors['firstName'] = null;
        return { ...{ errors: newErrors }, valid: true };
      });
    } else if (e.target.value.length < 2 || e.target.value.length > 50) {
      setIsValid((oldIsValid) => {
        const newErrors = oldIsValid.errors;
        newErrors['firstName'] = 'Name should be between 2 and 50 characters!';
        return { ...{ errors: newErrors }, valid: false };
      });
    } else {
      setIsValid((oldIsValid) => {
        const newErrors = oldIsValid.errors;
        newErrors['firstName'] =
          'Name should not include numbers and special characters!';
        return { ...{ errors: newErrors }, valid: false };
      });
    }
  };

  const onLastNameChangeHandler = (e) => {
    const nameRegExp = new RegExp(/^[a-z ,.'-]+$/i);

    if (
      nameRegExp.test(e.target.value) &&
      e.target.value.length > 1 &&
      e.target.value.length < 50
    ) {
      setIsValid((oldIsValid) => {
        const newErrors = oldIsValid.errors;
        newErrors['lastName'] = null;
        return { ...{ errors: newErrors }, valid: true };
      });
    } else if (e.target.value.length < 2 || e.target.value.length > 50) {
      setIsValid((oldIsValid) => {
        const newErrors = oldIsValid.errors;
        newErrors['lastName'] = 'Name should be between 2 and 50 characters!';
        return { ...{ errors: newErrors }, valid: false };
      });
    } else {
      setIsValid((oldIsValid) => {
        const newErrors = oldIsValid.errors;
        newErrors['lastName'] =
          'Name should not include numbers and special characters!';
        return { ...{ errors: newErrors }, valid: false };
      });
    }
  };

  const onJobTitleChangeHandler = (e) => {
    if (e.target.value.length === 0) {
      setIsValid((oldIsValid) => {
        const newErrors = oldIsValid.errors;
        newErrors['jobTitle'] = null;
        return { ...{ errors: newErrors }, valid: true };
      });
    } else if (
      (e.target.value.length < 3 &&
        (e.target.value !== '-' || e.target.value === '')) ||
      e.target.value.length > 50
    ) {
      setIsValid((oldIsValid) => {
        const newErrors = oldIsValid.errors;
        newErrors['jobTitle'] = 'Invalid Job Title input!';
        return { ...{ errors: newErrors }, valid: false };
      });
    } else {
      setIsValid((oldIsValid) => {
        const newErrors = oldIsValid.errors;
        newErrors['jobTitle'] = null;
        return { ...{ errors: newErrors }, valid: true };
      });
    }
  };

  const onAddressChangeHandler = (e) => {
    if (e.target.value.length === 0) {
      setIsValid((oldIsValid) => {
        const newErrors = oldIsValid.errors;
        newErrors['jobTitle'] = null;
        return { ...{ errors: newErrors }, valid: true };
      });
    } else if (
      (e.target.value.length < 3 &&
        (e.target.value !== '-' || e.target.value === '')) ||
      e.target.value.length > 50
    ) {
      setIsValid((oldIsValid) => {
        const newErrors = oldIsValid.errors;
        newErrors['address'] = 'Invalid Address input!';
        return { ...{ errors: newErrors }, valid: false };
      });
    } else {
      setIsValid((oldIsValid) => {
        const newErrors = oldIsValid.errors;
        newErrors['address'] = null;
        return { ...{ errors: newErrors }, valid: true };
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
                  onChange={onLastNameChangeHandler}
                  type='text'
                  id='lastName'
                  name='lastName'
                  className='mb-0 edit-profile-input'
                  defaultValue={userInfo.lastName}
                />
                {isValid.errors['lastName'] && (
                  <p className='error-message' style={{ color: 'red' }}>
                    {isValid.errors['lastName']}
                  </p>
                )}
              </div>
            </div>
            <hr />
            <div className='row'>
              <div className='col-sm-3'>
                <p className='mb-0'>Job Title</p>
              </div>
              <div className='col-sm-9'>
                <input
                  onChange={onJobTitleChangeHandler}
                  type='text'
                  id='jobTitle'
                  name='jobTitle'
                  className='mb-0 edit-profile-input'
                  defaultValue={userInfo.jobTitle ? userInfo.jobTitle : '-'}
                />
                {isValid.errors['jobTitle'] && (
                  <p className='error-message' style={{ color: 'red' }}>
                    {isValid.errors['jobTitle']}
                  </p>
                )}
              </div>
            </div>
            <hr />
            <div className='row'>
              <div className='col-sm-3'>
                <p className='mb-0'>Address</p>
              </div>
              <div className='col-sm-9'>
                <input
                  onChange={onAddressChangeHandler}
                  type='text'
                  id='address'
                  name='address'
                  className='mb-0 edit-profile-input'
                  defaultValue={userInfo.address ? userInfo.address : '-'}
                />
                {isValid.errors['address'] && (
                  <p className='error-message' style={{ color: 'red' }}>
                    {isValid.errors['address']}
                  </p>
                )}
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
