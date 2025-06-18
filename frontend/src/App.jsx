import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage'; 
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

import {Loader} from 'lucide-react';

const App = () => {
  // Check authentication status on app load
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser) {
    return <div className='flex items-center justify-center h-screen'>
      <Loader className='animate-spin h-10 w-10 text-blue-500' />
      <span className='ml-2'>Checking authentication...</span>
    </div>; // Show a loading state while checking auth
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage />: <Navigate to="/" /> } />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
