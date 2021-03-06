//CSS
import './Header.css';

//Other
import { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

//Components
import Banner from './Banner/Banner';
import GuestOptions from './GuestOptions';
import UserOptions from './UserOptions';

function Header() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isHome = () => {
    return location.pathname;
  };

  return (
    <header>
      <nav
        className='navbar navbar-expand-lg navbar-light bg-white'
        data-offset='500'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            <span className='text-primary'>React</span>
            <span style={{ color: '#8C89A7' }}>ive Blog</span>
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
            {user.userEmail ? <UserOptions /> : <GuestOptions />}
          </div>
        </div>
      </nav>

      <Banner isHome={isHome()} />
    </header>
  );
}

export default Header;
