import { useContext } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import './Header.css';
import Banner from './Banner/Banner';
import GuestOptions from './GuestOptions';
import UserOptions from './UserOptions';

import { AuthContext } from '../../contexts/AuthContext';

function Header() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isHome = () => {
    return location.pathname;
  };

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
            {user.userEmail ? <UserOptions /> : <GuestOptions />}
          </div>
        </div>
      </nav>

      <Banner isHome={isHome()} />
    </header>
  );
}

export default Header;
