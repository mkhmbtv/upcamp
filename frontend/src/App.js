import { Routes, Route } from 'react-router';
import LoginForm from './components/LoginForm';

function App() {
  return (
   <Routes>
     <Route path='/' element={<h1>Home</h1>} />
     <Route path='/login' element={<LoginForm />} />
   </Routes>
  );
}

export default App;
