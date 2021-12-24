import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

const LoginForm = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => navigate('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
  };

  const handleDemoLogin = () => {
    setErrors([]);
    setCredential('demo@user.io');
    setPassword('password');
  }

  return (
    <div className='loginForm'>
      <div className='loginForm__container'>
        <h2 className='loginForm__header'>
          Welcome back!
          <br />
          <small className='loginForm__header--sub'>Let's get you outside</small>
        </h2>
        <button className='btn loginForm__btn loginForm__btn--demo' onClick={handleDemoLogin}>Demo User</button>
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
          <button className='btn loginForm__btn' type='submit'>Log In</button>
        </form>
      </div>
      <div className='loginForm__footer'>
        Don't have an Upcamp account?
        <button className='btn loginForm__link' onClick={onClick}>Sign Up</button>
      </div>
    </div>
  )
};

export default LoginForm;