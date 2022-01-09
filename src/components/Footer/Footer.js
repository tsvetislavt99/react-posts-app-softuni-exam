//Others
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer
      className='page-footer bg-image'
      style={{ backgroundImage: 'url(/assets/img/world_pattern.svg)' }}>
      <div className='container'>
        <div style={{ justifyContent: 'center' }} className='row mb-5'>
          <div className='col-lg-3 py-3'>
            <h3>Reactive Blog</h3>
            <p>A Blog for people that love React!</p>

            <div className='social-media-button'>
              <Link to='/404'>
                <span className='mai-logo-facebook-f'></span>
              </Link>
              <Link to='/404'>
                <span className='mai-logo-twitter'></span>
              </Link>
              <Link to='/404'>
                <span className='mai-logo-google-plus-g'></span>
              </Link>
              <Link to='/404'>
                <span className='mai-logo-instagram'></span>
              </Link>
              <Link to='/404'>
                <span className='mai-logo-youtube'></span>
              </Link>
            </div>
          </div>
        </div>

        <p className='text-center' id='copyright'>
          &copy; This site is made with educational purpose only! No rights
          reserved!{' '}
          <a
            href='https://github.com/tsvetislavt99'
            target='_blank'
            rel='noreferrer'>
            tsvetislavt99
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
