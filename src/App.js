//CSS
import './App.css';

//Other
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

//Components
import Loading from './components/Loading/Loading';
import Notification from './components/Notification/Notification';
const About = lazy(() => import('./components/About/About'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Header = lazy(() => import('./components/Header/Header'));
const Home = lazy(() => import('./components/Home/Home'));
const Catalog = lazy(() => import('./components/Catalog/Catalog'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const PostDetails = lazy(() => import('./components/PostDetails/PostDetails'));
const Register = lazy(() => import('./components/Register/Register'));
const Login = lazy(() => import('./components/Login/Login'));
const UserProfile = lazy(() => import('./components/UserProfile/UserProfile'));
const PublicUserProfile = lazy(() =>
  import('./components/PublicUserProfile/PublicUserProfile')
);
const CreatePost = lazy(() => import('./components/CreatePost/CreatePost'));
const Logout = lazy(() => import('./components/Logout/Logout'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Suspense fallback={<Loading />}>
          <div className='App'>
            <Notification />
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
              <Route path='/loading' element={<Loading />} />
              <Route path='*' element={<NotFound />} />
            </Routes>

            <Footer />
          </div>
        </Suspense>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
