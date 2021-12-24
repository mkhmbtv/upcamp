import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { restoreUser } from './store/session';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation/>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
   </>
  );
}

export default App;
