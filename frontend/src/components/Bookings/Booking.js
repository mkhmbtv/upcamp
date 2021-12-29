

const Booking = ({ booking }) => {
  
  const imageUrl = booking.spot.images[0].url;
  return (
    <div className='bookingCard'>
      <img src={imageUrl} alt='' />
      <h3>{booking.spot.name}</h3>
      <p>in {booking.spot.city}, {booking.spot.state}</p>
      <div className='bookingCard__btnGroup'>
        <button>Edit</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default Booking;