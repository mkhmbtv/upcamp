import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../../store/bookings';
import { getSessionUser } from '../../store/session';
import Booking from './Booking';

const Bookings = () => {
  const sessionUser = useSelector(getSessionUser);
  const bookings = useSelector((state) => Object.values(state.bookings));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  
  const signupDate = new Date(sessionUser.createdAt.split(' ')[0]).toLocaleString('en-us', { month: 'short', year: 'numeric' });
  return (
    <section className='dashboard'>
      <div className='dahsboard__user'>
        <div>
          <img src="https://img.icons8.com/color/96/000000/test-account.png" alt='user pic' />
          <h2>{sessionUser.firstName} {sessionUser.lastName}</h2>
        </div>
        <div>
          <i className="las la-heart"></i>
          Upcamper since {signupDate}
        </div>
      </div>
      <div className='dashboard__bookings'>
        <h4>Trips</h4>
        {bookings.map((booking) => (
          <Booking key={booking.id} booking={booking} />
        ))}
      </div>
    </section>
  );
};

export default Bookings;