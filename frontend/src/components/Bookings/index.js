import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  
  const upcomingTrips = bookings.filter((booking) => new Date(booking.endDate) > new Date());
  const pastTrips = bookings.filter((booking) => new Date(booking.endDate) < new Date());
  
  return (
    <section className='dashboard'>
      <UserProfile />
      <div className='dashboard__bookings'>
        <Link className='dashboard__info' to='#'>
          <div className='dashboard__tripsCount'>{bookings.length}</div>
          <div className='dashboard__trips'>Trips</div>
        </Link>
        <h2 className='dashboard__heading'>Upcoming Trips</h2>
        <div>
          {upcomingTrips.length > 0 && (
            upcomingTrips.map((trip) => (
              <Booking key={trip.id} booking={trip} upcoming={true} />
            ))
          )}
        </div>
        <h2 className='dashboard__heading'>Past trips</h2>
        <div>
          {pastTrips.length > 0 && (
            pastTrips.map((trip) => (
              <Booking key={trip.id} booking={trip} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Bookings;