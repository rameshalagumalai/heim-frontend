import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';
import { auth } from './firebase/firebase';
import DetailedWave from './pages/detailed-wave/DetailedWave';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import Home from './pages/home/Home';
import ListOfUsers from './pages/list-of-users/ListOfUsers';
import NewWave from './pages/new-wave/NewWave';
import Notifications from './pages/notifications/Notifications';
import Profile from './pages/profile/Profile';
import Search from './pages/search/Search';
import Login from './pages/signin/Login';
import Signup from './pages/signup/Signup';
import TagWaves from './pages/tag-waves/TagWaves';
import Playground from './Playground';
import { AppUserContextProvider } from './context/AppUserContext';

function App() {

  const [, loading] = useAuthState(auth);

  return (
    <div className="App">
    {
      loading ? 
        <Loading />
        :
        <AppUserContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={ <ProtectedRoute><Home /></ProtectedRoute> } />
            <Route path='/login' element={ <UnprotectedRoute><Login /></UnprotectedRoute> } />
            <Route path='/signup' element={ <UnprotectedRoute><Signup /></UnprotectedRoute> } />
            <Route path='/forgot-password' element={ <UnprotectedRoute><ForgotPassword /></UnprotectedRoute> } />
            <Route path='/search' element={ <ProtectedRoute><Search /></ProtectedRoute> } />
            <Route path='/new-wave' element={ <ProtectedRoute><NewWave /></ProtectedRoute> } />
            <Route path='/waves/:waveId' element={ <ProtectedRoute><DetailedWave /></ProtectedRoute> } />
            <Route path='/waves/:waveId/stars' element={ <ProtectedRoute><ListOfUsers /></ProtectedRoute> } />
            <Route path='/waves' element={ <ProtectedRoute><TagWaves /></ProtectedRoute> } />
            <Route path='/notifications' element={ <ProtectedRoute><Notifications /></ProtectedRoute> } />
            <Route path='/:userId' element={ <ProtectedRoute><Profile /></ProtectedRoute> } />
            <Route path='/:userId/followers' element={ <ProtectedRoute><ListOfUsers /></ProtectedRoute> } />
            <Route path='/:userId/following' element={ <ProtectedRoute><ListOfUsers /></ProtectedRoute> } />
            <Route path='/playground' element={ <Playground /> } />
          </Routes>
        </Router>
        </AppUserContextProvider>
    }
    </div>
  );
}

export default App;
