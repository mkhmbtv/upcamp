import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import * as sessionActions from "../../store/session";

const ProfileButton = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(sessionActions.getSessionUser);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout()).then(() => navigate('/'));
  };

  return (
    <>
      <button className='profileBtn' onClick={openMenu}>
        <i className="las la-user-circle"></i>
      </button>
      {showMenu && (
        <ul className='profileDropdown'>
          <li className='profileDropdown__item profileDropdown__item--userInfo'>
            <strong>{user.firstName} {user.lastName}</strong>
            <br />
            <span>{user.email}</span>
          </li>
          <li className='profileDropdown__item'>
            <Link to={`/${sessionUser.id}/bookings`}>Trips</Link>
          </li>
          <li className='profileDropdown__item'>
            <button onClick={logout}>Log out</button>
          </li>
        </ul>
      )}
    </>
  );
};

export default ProfileButton;