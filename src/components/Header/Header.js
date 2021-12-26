import { useLocation, NavLink } from 'react-router-dom';
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
          <NavLink to='/' className='navbar-brand'>
            <span className='text-primary'>React</span>ive Blog
          </NavLink>

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
              <li className='nav-item'>
                <NavLink className='nav-link' to='/'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/blog'>
                  Blog
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/about-us'>
                  About
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/contact-us'>
                  Contact
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/register'>
                  Sign up
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/profile'>
                  Profile
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/public-profile'>
                  Public Profile
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/create'>
                  Create a post
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='btn btn-primary ml-lg-2' to='/login'>
                  Sign in
                </NavLink>
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
