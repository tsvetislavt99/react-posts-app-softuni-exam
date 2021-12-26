import './CreatePost.css';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

function CreatePost() {
  const [isValid, setIsValid] = useState({ fields: {}, errors: {} });

  const submitHandler = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const formData = new FormData(e.currentTarget);
      const { postTitle, postImage, postBody, categories } =
        Object.fromEntries(formData);
    } else {
    }
  };

  const handleValidation = () => {
    const fields = isValid.fields;
    const errors = {};
    let formIsValid = true;

    if (!fields['postTitle']) {
      formIsValid = false;
      errors['postTitle'] = 'Post Title is required!';
    }

    if (!fields['postImage']) {
      formIsValid = false;
      errors['postImage'] = 'Post Image is required!';
    }

    if (!fields['categories']) {
      formIsValid = false;
      errors['categories'] = 'At least one category is required!';
    }

    if (!fields['postBody']) {
      formIsValid = false;
      errors['postBody'] = 'Post Body is required!';
    }

    setIsValid((oldIsValid) => {
      return { ...oldIsValid, ...{ errors: errors } };
    });
    return formIsValid;
  };

  const onTitleChangeHandler = (e) => {
    let errors = {};
    if (e.target.value.length < 9) {
      errors['postTitle'] = 'Post Title should be at least 9 characters long!';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    } else {
      const fields = isValid.fields;
      fields[e.target.name] = e.target.name;
      errors['postTitle'] = null;
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors }, ...fields };
      });
    }
  };

  const onImageChangeHandler = (e) => {
    let errors = {};
    let regExp = new RegExp(
      /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
    );
    if (!regExp.test(e.target.value)) {
      errors['postImage'] = 'Post Image should be a valid URL Address!';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    } else {
      const fields = isValid.fields;
      fields[e.target.name] = e.target.name;
      errors['postImage'] = null;
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors }, ...fields };
      });
    }
  };

  const onCategoriesChangeHandler = (e) => {
    let errors = {};
    let regExp = new RegExp(/^([a-z0-9\s]+,)*([a-z0-9\s]+){1}$/i);
    if (!regExp.test(e.target.value)) {
      errors['categories'] =
        'Categories should be separated by a comma (","). Example: "React, Redux, Vue, Functional, etc."';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    } else {
      const fields = isValid.fields;
      fields[e.target.name] = e.target.name;
      errors['categories'] = null;
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors }, ...fields };
      });
    }
  };

  const onBlogBodyChangeHandler = (e) => {
    let errors = {};

    if (e.target.contentDocument.body.innerHTML.length < 75) {
      errors['postBody'] = 'Post Body should be at least 50 characters long!';
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors } };
      });
    } else {
      const fields = isValid.fields;
      fields['postBody'] = 'postBody';
      errors['postBody'] = null;
      setIsValid((oldIsValid) => {
        return { ...oldIsValid, ...{ errors: errors }, ...fields };
      });
    }
  };

  return (
    <div className='container register-container wow fadeInLeft'>
      <div className='row d-flex justify-content-center align-items-center h-100'>
        <div className='col-lg-12 col-xl-11'>
          <div className='text-black'>
            <div className='card-body p-md-8'>
              <div className='row justify-content-center'>
                <div className='col-md-10 col-lg-6 col-xl-12 order-2 order-lg-1'>
                  <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                    Create a post
                  </p>
                  <form
                    method='POST'
                    onSubmit={submitHandler}
                    className='mx-1 mx-md-4'>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <div className='flex-fill mb-0'>
                        <label className='form-label ml-3' htmlFor='postTitle'>
                          Post Title
                        </label>
                        <input
                          name='postTitle'
                          className={
                            isValid.errors['postTitle']
                              ? 'form-control notValid'
                              : 'form-control'
                          }
                          placeholder='Why do we love functional components?'
                          onChange={onTitleChangeHandler}
                        />
                        {isValid.errors['postTitle'] && (
                          <p
                            className='ml-3 error-message'
                            style={{ color: 'red' }}>
                            {isValid.errors['postTitle']}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <div className='flex-fill mb-0'>
                        <label className='form-label ml-3' htmlFor='postImage'>
                          Post Image (URL)
                        </label>
                        <input
                          name='postImage'
                          className={
                            isValid.errors
                              ? isValid.errors['postImage']
                                ? 'form-control notValid'
                                : 'form-control'
                              : 'form-control'
                          }
                          placeholder='https://i.imgur.com/.....'
                          onChange={onImageChangeHandler}
                        />
                        {isValid.errors['postImage'] && (
                          <p
                            className='ml-3 error-message'
                            style={{ color: 'red' }}>
                            {isValid.errors['postImage']}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <div className='form-outline flex-fill mb-0'>
                        <label className='form-label ml-3' htmlFor='categories'>
                          Categories
                        </label>
                        <input
                          name='categories'
                          className={
                            isValid.errors['categories']
                              ? 'form-control notValid'
                              : 'form-control'
                          }
                          placeholder='React, Redux, JavaScript, TypeScript, Hook'
                          onChange={onCategoriesChangeHandler}
                        />
                        {isValid.errors['categories'] && (
                          <p
                            className='ml-3 error-message'
                            style={{ color: 'red' }}>
                            {isValid.errors['categories']}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <div className='form-outline flex-fill mb-0'>
                        <label className='form-label ml-3' htmlFor='postBody'>
                          Post Body
                        </label>
                        <Editor
                          outputFormat='text'
                          initialValue={`<p>What Marilyn Monroe said about React Class Components...</p><br><q>I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But I would never use a Class Component where a Functional Component would work too</q>`}
                          apiKey='k4ykrzndxxwzl8895maze4u62ivkz83x3a01o0fti6ih5vip'
                          textareaName='postBody'
                          onChange={onBlogBodyChangeHandler}
                          init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                              'advlist autolink lists link image',
                              'charmap print preview anchor help',
                              'searchreplace visualblocks code',
                              'insertdatetime media table paste wordcount',
                            ],
                            toolbar:
                              'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help',
                            body_class: 'postBody',
                          }}
                        />
                        {isValid.errors['postBody'] && (
                          <p
                            className='ml-3 error-message'
                            style={{ color: 'red' }}>
                            {isValid.errors['postBody']}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                      <button type='submit' className='btn btn-primary btn-lg'>
                        Create Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
