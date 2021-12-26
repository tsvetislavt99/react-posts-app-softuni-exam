import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { AuthContext } from './components/contexts/AuthContext';
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

function App() {
  const [auth, setAuth] = useState({
    token: '',
    userEmail: '',
    userId: '',
  });
  const onLogin = (authData) => {
    setAuth(authData);
  };

  return (
    <AuthContext.Provider value={''}>
      <div className='App'>
        <Header userEmail={auth.userEmail} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/blog' element={<Catalog />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/blog/:postId' element={<PostDetails />} />
          <Route path='/register/' element={<Register />} />
          <Route path='/login' element={<Login onLogin={onLogin} />} />
          <Route path='/public-profile' element={<PublicUserProfile />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/create' element={<CreatePost />} />
        </Routes>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
