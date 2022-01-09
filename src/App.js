//CSS
import './App.css';

//Other
import { Routes, Route } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';
import { AuthProvider } from './contexts/AuthContext';

//Components
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import Contact from './components/Contact/Contact';
import PostDetails from './components/PostDetails/PostDetails';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import UserProfile from './components/UserProfile/UserProfile';
import PublicUserProfile from './components/PublicUserProfile/PublicUserProfile';
import CreatePost from './components/CreatePost/CreatePost';
import Logout from './components/Logout/Logout';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about-us' element={<About />} />
            <Route path='/blog' element={<Catalog />} />
            <Route path='/contact-us' element={<Contact />} />
            <Route path='/blog/:postId' element={<PostDetails />} />
            <Route path='/register/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/public-profile' element={<PublicUserProfile />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

          <Footer />
        </div>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
