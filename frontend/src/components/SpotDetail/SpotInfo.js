import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from '../../store/users';

const SpotInfo = ({ campspot }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.byId[campspot.userId]);
  
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (!user) return null;
  
  return (
    <div className='campspot__info'>
      <Link className='campsite__locationLink' to='/spots'>{campspot.state}, {campspot.country}</Link>
      <h1 className='campspot__name'>{campspot.name}</h1>
      <div className='campspot__hostAndDescription'>
        <div className='campspot__host'>
          <img className='campspot__userpic' src="https://img.icons8.com/color/96/000000/test-account.png" alt='user pic' />
          <div className='campspot__hostName'>
            <span>Hosted By</span>
            <span>{user.firstName} {user.lastName}</span>
          </div>
        </div>
        <div className='campspot__description'>{campspot.description}</div>
      </div>
    </div>
  );
};

export default SpotInfo;