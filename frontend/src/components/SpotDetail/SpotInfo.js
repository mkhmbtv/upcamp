import { Link } from "react-router-dom";

const SpotInfo = ({ spot }) => {
  return (
    <div className='campspot__info'>
      <Link className='campsite__locationLink' to='/spots'>{spot.state}, {spot.country}</Link>
      <h1 className='campspot__name'>{spot.name}</h1>
      <div className='campspot__hostAndDescription'>
        <div className='campspot__host'>
          <img className='campspot__userpic' src="https://img.icons8.com/color/96/000000/test-account.png" alt='user pic' />
          <div className='campspot__hostName'>
            <span>Hosted By</span>
            <span>{spot.User.firstName} {spot.User.lastName}</span>
          </div>
        </div>
        <div className='campspot__description'>{spot.description}</div>
      </div>
    </div>
  );
};

export default SpotInfo;