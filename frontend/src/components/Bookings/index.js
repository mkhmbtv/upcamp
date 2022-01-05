import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBookings } from '../../store/bookings';
import Booking from './Booking';
import UserProfile from './UserProfile';
import './Bookings.css';

const Bookings = () => {
  const bookings = useSelector((state) => state.bookings.allIds);
  const upcomingTrips = useSelector((state) => {
    return state.bookings.allIds.filter((bookingId) => new Date(state.bookings.byId[bookingId].startDate) > new Date());
  });
  const pastTrips = useSelector((state) => {
    return state.bookings.allIds.filter((bookingId) => new Date(state.bookings.byId[bookingId].startDate) < new Date());
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  
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
            upcomingTrips.map((tripId) => (
              <Booking key={tripId} bookingId={tripId} upcoming={true} />
            ))
          )}
        </div>
        <h2 className='dashboard__heading'>Past trips</h2>
        <div>
          {pastTrips.length > 0 && (
            pastTrips.map((tripId) => (
              <Booking key={tripId} bookingId={tripId} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Bookings;