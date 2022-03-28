import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getSessionUser } from "../../store/session";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

const Navigation = ({ isLanding }) => {
  const sessionUser = useSelector(getSessionUser);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <li style={isLanding ? { color: '#fff'} : null} className='navbar__item'>
          <LoginFormModal />
        </li>
        <li style={isLanding ? { color: '#fff' } : null} className='navbar__item'>
          <SignupFormModal />
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