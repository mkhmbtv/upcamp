import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../../store/bookings';
import Booking from './Booking';
import UserProfile from './UserProfile';
import './Bookings.css';

const Bookings = () => {
  const bookings = useSelector((state) => Object.values(state.bookings));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  
  return (
    <section className='dashboard'>
      <UserProfile />
      <div className='dashboard__bookings'>
        <h2>Trips</h2>
        {bookings.map((booking) => (
          <Booking key={booking.id} booking={booking} />
        ))}
      </div>
    </section>
  );
};

export default Bookings;