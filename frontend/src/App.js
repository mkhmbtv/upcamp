import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';

import { restoreUser } from './store/session';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import SpotsList from './components/SpotsList';
import Spot from './components/Spot';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  return isLoaded && (
    <>
      {pathname === '/' ? null : <Navigation />}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/spots' element={<SpotsList />} />
        <Route path='/spots/types/:typeId' element={<SpotsList byType={true} />} />
        <Route path='/spots/:id' element={<Spot />} />
      </Routes>
      <Footer />
   </>
  );
}

export default App;
