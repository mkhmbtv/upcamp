import { Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import EditBookingFormModal from '../EditBookingFormModal';
import { cancelBooking } from '../../store/bookings';
import SpotReviewFormModal from '../SpotReviewFormModal';

const parseDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-us', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
};

const Booking = ({ booking, upcoming, past }) => {
  const dispatch = useDispatch();
  if (!booking.spot) return null;

  const imageUrl = booking.spot.images[0].url;
  const startDate = parseDate(booking.startDate);
  const endDate = parseDate(booking.endDate);
  
  return (
    <div className='booking'>
      <img className='booking__img' src={imageUrl} alt='campspot view' />
      <div className='booking__info'>
        <Link className='booking__spotLink' to={`/spots/${booking.spotId}`}><h3 className='booking__spotName'>{booking.spot.name}</h3></Link>
        <p className='booking__location'>
          in <span>{booking.spot.city}, {booking.spot.state}</span>
        </p>
        <div className='booking__details'>
          <div className='booking__detail'>
            <p className='booking__detail--name'>Trip dates</p>
            <p className='booking__detail--content'>{startDate} to {endDate}</p>
          </div>
          <div className='booking__detail'>
            <p className='booking__detail--name'>Group size</p>
            <p className='booking__detail--content'>Confirmed for {booking.numGuests} people</p>
          </div>
        </div>
        <div className='booking__btnGroup'>
          {upcoming && (
            <div>
              <EditBookingFormModal booking={booking} />
              <button 
                className='btn bookingForm__btn btn--small btn--red'
                onClick={() => dispatch(cancelBooking(booking.id))}
              >
                Cancel
              </button>
            </div>
          )}
          {past && (
            <SpotReviewFormModal spotId={booking.spotId} />
          )}
          <Link to={`/spots/${booking.spotId}`} className='btn btn--min'>Trip page</Link>
        </div>
      </div>
    </div>
  );
};

export default Booking;