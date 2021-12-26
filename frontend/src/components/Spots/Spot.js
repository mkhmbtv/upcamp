import { Link } from 'react-router-dom';

const Spot = ({ spot }) => {
  return (
      <div className='spot'>
        <Link className='spot__link' to={`/spots/${spot.id}`}>
          <img className='spot__image' src={spot.images[0].url} alt='camp' />
          <div className='spot__info'>
            <h3 className='spot__name'>{spot.name}</h3>
            <p className='spot__location'>{spot.city}, {spot.state}, {spot.country}</p>
            <p className='spot__price'>{spot.pricePerNight}$/night</p>
          </div>
      </Link>
      </div>
  );
};

export default Spot;