import { Link} from 'react-router-dom';
import EditBookingFormModal from '../EditBookingFormModal';

const Booking = ({ booking }) => {
  if (!booking.spot) return null;
  const imageUrl = booking.spot.images[0].url;

  return (
    <div className='booking'>
      <img className='booking__img' src={imageUrl} alt='campspot view' />
      <div className='booking__info'>
        <Link className='booking__spotLink' to={`/spots/${booking.spotId}`}><h3 className='booking__spotName'>{booking.spot.name}</h3></Link>
        <p className='booking__location'>
          in <span>{booking.spot.city}, {booking.spot.state}</span>
        </p>
        <div className='booking__btnGroup'>
          <div>
            <EditBookingFormModal booking={booking} />
            <button className='btn bookingForm__btn btn--small btn--red'>Cancel</button>
          </div>
          <Link to={`/spots/${booking.spotId}`} className='btn btn--min'>Trip page</Link>
        </div>
      </div>
    </div>
  );
};

export default Booking;