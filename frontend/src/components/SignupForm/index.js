import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

const SignupForm = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const user = {
      firstName,
      lastName,
      username,
      email,
      password
    };

    return dispatch(sessionActions.signup(user))
      .then(() => navigate('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className='signupForm'>
      <div className='signupForm__container'>
        <h2 className='signupForm__header'>
          Join Upcamp
          <br />
          <small className='signupForm__header--sub'>Discover the best camping near me</small>
        </h2>
        <form className='signupForm__form' onSubmit={handleSubmit}>
          <ul className='signupForm__errors'>
            {errors.map((err, i) => (
              <li key={i} className='signupForm__error'>{err}</li>
            ))}
          </ul>
          <div className='signupForm__input-group'>
            <input
              className='signupForm__input'
              type='text'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder='First name'
              required
            />
            <input
              className='signupForm__input'
              type='text'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder='Last name'
              required
            />
          </div>
          <input
            className='signupForm__input'
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder='Username'
            required
          />
          <input
            className='signupForm__input'
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Email address'
            required
          />
          <input
            className='signupForm__input'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Password'
            required
          />
          <button className='btn signupForm__btn' type='submit'>Join Upcamp</button>
        </form>
      </div>
      <div className='signupForm__footer'>
        Have an account?
        <button className='btn signupForm__link' onClick={onClick}>Sign In</button>
      </div>
    </div>
  )
};

export default SignupForm;