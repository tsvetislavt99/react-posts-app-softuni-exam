import { NavLink } from 'react-router-dom';

function GuestOptions() {
  return (
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
        <NavLink className='nav-link' to='/login'>
          Sign in
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='btn btn-primary ml-lg-2' to='/register'>
          Sign up
        </NavLink>
      </li>
    </ul>
  );
}

export default GuestOptions;
