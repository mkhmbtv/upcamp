import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpotImages } from '../../store/images';

const Spot = ({ spot }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(getSpotImages(spot.id))
      .then(res => setImages(res));
  }, [dispatch, spot.id]);

  useEffect(() => {
    if (images) setIsLoaded(true);
  }, [images]);

  if (!isLoaded) return null;
  
  return (
      <div className='spot'>
        <Link className='spot__link' to={`/spots/${spot.id}`}>
          <img className='spot__image' src={images[0].url} alt='camp' />
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