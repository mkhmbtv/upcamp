import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getSessionUser } from "../../store/session";
import ProfileButton from "./ProfileButton";
import './Navigation.css';

const Navigation = () => {
  const sessionUser = useSelector(getSessionUser);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <li className='navbar__item'>
          <NavLink to='/login'>Log In</NavLink>
        </li>
        <li className='navbar__item'>
          <NavLink to='/signup'>Sign Up</NavLink>
        </li>
      </>
    );
  }

  return (
    <nav className='navbar'>
      <NavLink to='/' className='navbar__logo'>UPCAMP</NavLink>
      <ul className='navbar__list'>
        {sessionLinks}
      </ul>
    </nav>
  )
};

export default Navigation;