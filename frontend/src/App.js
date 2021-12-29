import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';

import { restoreUser } from './store/session';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import Spots from './components/Spots';
import SpotDetail from './components/SpotDetail';
import Bookings from './components/Bookings';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  return isLoaded && (
    <>
      <div id='content'>
        {pathname === '/' ? null : <Navigation />}
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/spots' element={<Spots />} />
          <Route path='/spots/types/:typeId' element={<Spots />} />
          <Route path='/spots/:id' element={<SpotDetail />} />
          <Route path='/:userId/bookings' element={<Bookings />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
