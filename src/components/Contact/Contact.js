//CSS
import './Contact.css';

//Other
import GoogleMapComponent from '../GoogleMap/GoogleMapComponent';

function Contact() {
  return (
    <div className='page-section contact-us'>
      <div className='container wow fadeInUp'>
        <div className='row text-center align-items-center'>
          <div className='col-lg-4 py-3'>
            <div className='display-4 text-center text-primary'>
              <span className='mai-pin'></span>
            </div>
            <p className='mb-3 font-weight-medium text-lg'>Address</p>
            <p className='mb-0 text-secondary'>
              203 Fake St. Mountain View, San Francisco, California, USA
            </p>
          </div>
          <div className='col-lg-4 py-3'>
            <div className='display-4 text-center text-primary'>
              <span className='mai-call'></span>
            </div>
            <p className='mb-3 font-weight-medium text-lg'>Phone</p>
            <p className='mb-0'>
              <a href='#' className='text-secondary'>
                +1 232 3235 324
              </a>
            </p>
            <p className='mb-0'>
              <a href='#' className='text-secondary'>
                +00 1122 3344 5566
              </a>
            </p>
          </div>
          <div className='col-lg-4 py-3'>
            <div className='display-4 text-center text-primary'>
              <span className='mai-mail'></span>
            </div>
            <p className='mb-3 font-weight-medium text-lg'>Email Address</p>
            <p className='mb-0'>
              <a href='#' className='text-secondary'>
                support@react-blog.com
              </a>
            </p>
            <p className='mb-0'>
              <a href='#' className='text-secondary'>
                hello@react-blog.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <hr className='hr-form-pins' />
      <div className='container mt-4 wow fadeInUp'>
        <div className='row'>
          <div className='col-lg-6 mb-5 mb-lg-0'>
            <form action='#' className='contact-form py-5 px-lg-5'>
              <h2 className='mb-4 font-weight-medium text-secondary'>
                Get in touch
              </h2>
              <div className='row form-group'>
                <div className='col-md-6 mb-3 mb-md-0'>
                  <label className='text-black' htmlFor='fname'>
                    First Name
                  </label>
                  <input type='text' id='fname' className='form-control' />
                </div>
                <div className='col-md-6'>
                  <label className='text-black' htmlFor='lname'>
                    Last Name
                  </label>
                  <input type='text' id='lname' className='form-control' />
                </div>
              </div>

              <div className='row form-group'>
                <div className='col-md-12'>
                  <label className='text-black' htmlFor='email'>
                    Email
                  </label>
                  <input type='email' id='email' className='form-control' />
                </div>
              </div>

              <div className='row form-group'>
                <div className='col-md-12'>
                  <label className='text-black' htmlFor='subject'>
                    Subject
                  </label>
                  <input type='text' id='subject' className='form-control' />
                </div>
              </div>

              <div className='row form-group'>
                <div className='col-md-12'>
                  <label className='text-black' htmlFor='message'>
                    Message
                  </label>
                  <textarea
                    name='message'
                    id='message'
                    cols='30'
                    rows='5'
                    className='form-control'
                    placeholder='Write your notes or questions here...'></textarea>
                </div>
              </div>

              <div className='row form-group mt-4'>
                <div className='col-md-12'>
                  <input
                    type='submit'
                    value='Send Message'
                    className='btn btn-primary'
                  />
                </div>
              </div>
            </form>
          </div>
          <div className='col-lg-6 mb-5 mb-lg-0 map'>
            <div className='maps-container'>
              <GoogleMapComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
