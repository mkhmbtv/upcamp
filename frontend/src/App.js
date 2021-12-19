import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { restoreUser } from './store/session';
import LoginForm from './components/LoginForm';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
   <Routes>
     <Route path='/' element={<h1>Home</h1>} />
     <Route path='/login' element={<LoginForm />} />
   </Routes>
  );
}

export default App;
