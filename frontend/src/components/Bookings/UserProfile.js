import { useSelector } from "react-redux";
import { getSessionUser } from "../../store/session";

const UserProfile = () => {
  const sessionUser = useSelector(getSessionUser);
  const signupDate = new Date(sessionUser.createdAt.split(' ')[0]).toLocaleString('en-us', { month: 'short', year: 'numeric' });

  return (
    <div className='userProfile'>
      <div className='userProfile__block'>
        <div className='userProfile__header'>
          <img className='userProfile__avatar' src="https://img.icons8.com/color/96/000000/test-account.png" alt='user pic' />
          <h3 className='userProfile__name'>{sessionUser.firstName} {sessionUser.lastName}.</h3>
        </div>
        <div className='userProfile__basicInfo'>
          <i className="las la-heart"></i>
          Upcamper since {signupDate}
        </div>
      </div>
      <div className='userProfile__block'>
        <p className='userProfile__trusted'>Trusted Upcamper</p>
        <div className='userProfile__basicInfo'>
          <i className="las la-check-circle"></i>
          Email address
        </div>
      </div>
    </div>
  );
};

export default UserProfile;