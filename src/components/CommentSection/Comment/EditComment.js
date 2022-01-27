//CSS
import './Comment.css';

//Other
import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import postService from '../../../services/postService';

//Components
import Modal from '../../Modal/Modal';

const EditComment = ({ commentData, toggleIsBeingEdited }) => {
  const { user } = useContext(AuthContext);
  const [isValid, setIsValid] = useState({ errors: {} });
  const submitEl = useRef(null);
  const [modal, setModal] = useState(false);

  const onCommentSubmitHandler = (e) => {
    e.preventDefault();
    const errors = {};
    const formData = new FormData(e.target);
    const commentText = formData.get('comment');
    if (commentText.length < 5) {
      errors['comment'] = 'Comment should not be empty';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    } else {
      postService
        .editComment(commentData._id, commentText)
        .then((res) => {
          //TODO: Add notification
        })
        .catch((error) => console.log(error));
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleIsBeingEditedAndSubmit = () => {
    toggleIsBeingEdited(true);
    submitEl.current.click();
  };

  const onCommentChangeHandler = (e) => {
    let errors = {};
    if (e.target.value.length > 5) {
      errors['postImage'] = null;
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    } else {
      errors['comment'] = 'Comment should not be empty';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    }
  };

  return (
    <div className='col-md-12  m-3'>
      <div style={{ display: 'flex' }} className='p-3'>
        <img
          alt='user_avatar'
          src={commentData.author?.avatar}
          width='40'
          height='40'
          className='rounded-circle mr-3'
        />
        <div className='w-100'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex flex-row align-items-center'>
              <span className='mr-2'>
                {commentData.author?.firstName} {commentData.author?.lastName}
              </span>
            </div>
            <small>{commentData.dateOfCreation.substring(0, 10)}</small>
            {commentData.author?._id === user.userId ? (
              <>
                <small>
                  {isValid.errors['comment'] ? (
                    <button
                      style={{ color: '#696969' }}
                      className='mai-save mr-2 like-button'
                      disabled></button>
                  ) : (
                    <button
                      onClick={toggleModal}
                      style={{ color: '#34BA78' }}
                      className='mai-save mr-2 like-button'></button>
                  )}
                  <button
                    onClick={toggleIsBeingEdited}
                    style={{ color: '#FE4942' }}
                    className='mai-arrow-undo mr-2 like-button'></button>
                </small>
              </>
            ) : null}
          </div>
          <form onSubmit={onCommentSubmitHandler} method='POST'>
            <input
              onChange={onCommentChangeHandler}
              style={{ width: '100%' }}
              name='comment'
              defaultValue={commentData.comment}
              className='text-justify edit-comment-input comment-text mb-0'
              autoFocus
            />
            {isValid.errors['comment'] && (
              <p className='comment-warning'>
                Comment should be at least 6 symbols!
              </p>
            )}
            <button ref={submitEl} type='submit' style={{ display: 'none' }} />
            <Modal
              show={modal}
              close={toggleModal}
              title='Are you sure you want to save these changes?'
              message='Save changes message'
              buttonText='Save Changes'
              type='success'
              callback={toggleIsBeingEditedAndSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
