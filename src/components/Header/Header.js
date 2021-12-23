import { useLocation, Link } from 'react-router-dom';
import './Header.css';
import Banner from './Banner/Banner';

function Header() {
  const location = useLocation();

  const isHome = () => {
    return location.pathname;
  };

  console.log(location.pathname);

  return (
    <header>
      <nav
        className='navbar navbar-expand-lg navbar-light bg-white sticky'
        data-offset='500'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            <span className='text-primary'>React</span>ive Blog
          </Link>

          <button
            className='navbar-toggler'
            data-toggle='collapse'
            data-target='#navbarContent'
            aria-controls='navbarContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='navbar-collapse collapse' id='navbarContent'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item active'>
                <Link className='nav-link' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/blog'>
                  Blog
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/about-us'>
                  About
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/contact-us'>
                  Contact
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='contact.html'>
                  Contact
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='btn btn-primary ml-lg-2' to='#'>
                  Free Analytics
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Banner isHome={isHome()} />
    </header>
  );
}

export default Header;
