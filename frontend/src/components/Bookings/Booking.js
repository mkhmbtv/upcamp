import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking } from '../../store/bookings';
import EditBookingFormModal from '../EditBookingFormModal';
import SpotReviewFormModal from '../SpotReviewFormModal';
import { getOneSpot } from '../../store/spots';

const parseDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-us', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
};

const Booking = ({ bookingId, upcoming, past }) => {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.bookings.byId[bookingId]);
  const spot = useSelector((state) => state.spots.byId[booking.spotId]);
  const images = useSelector((state) => state.images.byId);
  
  const [imageUrl, setImageUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getOneSpot(booking.spotId));
  }, [dispatch, booking]);

  useEffect(() => {
    if (booking && spot && images) {
      if (spot.Images) {
        setImageUrl(images[spot.Images[0]].url);
        setIsLoaded(true);
      }
    }
  }, [booking, spot, images]);

  const startDate = parseDate(booking.startDate);
  const endDate = parseDate(booking.endDate);

  if (!isLoaded) return null;
  
  return (
    <div className='booking'>
      <img className='booking__img' src={imageUrl} alt='campspot view' />
      <div className='booking__info'>
        <Link className='booking__spotLink' to={`/spots/${booking.spotId}`}><h3 className='booking__spotName'>{spot.name}</h3></Link>
        <p className='booking__location'>
          in <span>{spot.city}, {spot.state}</span>
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
          {upcoming ? (
            <div>
              <EditBookingFormModal booking={booking} spot={spot} />
              <button 
                className='btn bookingForm__btn btn--small btn--red'
                onClick={() => dispatch(cancelBooking(booking.id))}
              >
                Cancel
              </button>
            </div>
            )
            : <SpotReviewFormModal spotId={booking.spotId} />
          }
          <Link to={`/spots/${booking.spotId}`} className='btn btn--min'>Trip page</Link>
        </div>
      </div>
    </div>
  );
};

export default Booking;