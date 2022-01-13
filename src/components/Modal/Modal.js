import './Modal.css';

const Modal = ({ show, close, title, message, buttonText, callback, type }) => {
  return (
    <>
      {show ? (
        <div className='background-modal' onClick={close} aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  {title}
                </h5>
                <button type='button' className='close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              {message ? <div className='modal-body'>{message}</div> : null}
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
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
