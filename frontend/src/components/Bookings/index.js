import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { getBookings } from '../../store/bookings';
import Booking from './Booking';
import UserProfile from './UserProfile';
import './Bookings.css';

const Bookings = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.bookings.allIds);
  
  const upcomingTrips = useSelector((state) => {
    return state.bookings.allIds.filter((bookingId) => new Date(state.bookings.byId[bookingId].endDate) >= new Date());
  });
  const pastTrips = useSelector((state) => {
    return state.bookings.allIds.filter((bookingId) => new Date(state.bookings.byId[bookingId].endDate) < new Date());
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  if (!sessionUser) return <Navigate to='/' />
  
  return (
    <section className='dashboard'>
      <UserProfile />
      <div className='dashboard__bookings'>
        <Link className='dashboard__info' to='#'>
          <div className='dashboard__tripsCount'>{bookings.length}</div>
          <div className='dashboard__trips'>Trips</div>
        </Link>
        {bookings.length > 0 
          ? (<div>
              <h2 className='dashboard__heading'>Upcoming Trips</h2>
              <div style={{marginBottom: '4rem'}}>
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
            </div>)
          : <p style={{color: 'var(--color-grey-dark-1)'}}>No past trips. Let's <Link className='dashboard__link' to='/spots'>get you outside!</Link></p>
        }
      </div>
    </section>
  );
};

export default Bookings;