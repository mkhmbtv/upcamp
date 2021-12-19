import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getSessionUser } from "../../store/session";
import ProfileButton from "./ProfileButton";

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
        <li>
          <NavLink to='/login'>Log In</NavLink>
        </li>
        <li>
          <NavLink to='/signup'>Sign Up</NavLink>
        </li>
      </>
    );
  }

  return (
    <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        {sessionLinks}
    </ul>
  )
};

export default Navigation;