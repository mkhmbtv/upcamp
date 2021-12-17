import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { login } from '../../store/session';

const LoginForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Navigate replace to='/' />
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(login({ credential, password }))
      .then(() => navigate('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
  };

  return (
    <div>
      <h2>
        Welcome Back!
        <br />
        <small>Let's get you outside</small>
      </h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
        <div>
          <label>
            Username or Email
            <input
              type='text'
              onChange={(e) => setCredential(e.target.value)}
              value={credential}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </label>
        </div>
        <button type='submit'>Log In</button>
      </form>
    </div>
  )
};

export default LoginForm;