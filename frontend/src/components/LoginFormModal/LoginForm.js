import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthModal';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const { setShowLoginForm, setShowSignupForm } = useAuth();

  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const showSignup = () => {
    setShowLoginForm(false);
    setShowSignupForm(true)
  };

  const demoLogin = () => {
    dispatch(sessionActions.demoLogin());
    setShowLoginForm(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowLoginForm(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
    
  };

  return (
    <div className='loginForm'>
      <div className='loginForm__container'>
        <h2 className='loginForm__header'>
          Welcome back!
          <br />
          <small className='loginForm__header--sub'>Let's get you outside</small>
        </h2>
        <button 
          className='btn btn--primary loginForm__btn--demo'
          onClick={demoLogin}
        >
          Demo User
        </button>
        <div className='loginForm__strike'>
          or
        </div>
        <form className='loginForm__form' onSubmit={handleSubmit}>
          <ul className='loginForm__errors'>
            {errors.map((err, i) => (
              <li key={i} className='loginForm__error'>{err}</li>
            ))}
          </ul>
          <input
            className='loginForm__input'
            type='text'
            onChange={(e) => setCredential(e.target.value)}
            value={credential}
            placeholder='Username or Email Adress'
            required
          />
          <input
            className='loginForm__input'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Password'
            required
          />
          <button className='btn btn--primary' type='submit'>Log In</button>
        </form>
      </div>
      <div className='loginForm__footer'>
        Don't have an Upcamp account?
        <button className='btn loginForm__link' onClick={showSignup}>Sign Up</button>
      </div>
    </div>
  )
};

export default LoginForm;