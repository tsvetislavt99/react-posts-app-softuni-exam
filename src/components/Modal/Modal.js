import './Modal.css';

const Modal = ({
  show,
  close,
  title,
  message,
  buttonText,
  callback,
  type,
  footerless,
  children,
}) => {
  const selectAndClose = (e) => {
    callback(e);
    close();
  };

  return (
    <>
      {show ? (
        <div className='background-modal' aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  {title}
                </h5>
                <button type='button' onClick={close} className='close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              {message ? <div className='modal-body'>{message}</div> : null}
              {children ? (
                <div
                  className='modal-body modal-body-children'
                  onClick={selectAndClose}>
                  {children}
                </div>
              ) : null}
              {footerless ? null : (
                <div className='modal-footer'>
                  <button
                    onClick={close}
                    type='button'
                    className='btn btn-outline-primary'>
                    Cancel
                  </button>

                  <button
                    onClick={callback ? callback : null}
                    className={`btn btn-outline-${type}`}>
                    {buttonText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
