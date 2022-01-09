import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpotImages } from '../../store/images';

const Spot = ({ spotId }) => {
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.byId[spotId]);
  const image = useSelector((state) => Object.values(state.images.byId).find((image) => image.spotId === spot.id));

  useEffect(() => {
    if (!image) dispatch(getSpotImages(spot.id));
  }, [dispatch, image, spot]);

  if (!image) return null;
  
  return (
      <div className='spot'>
        <Link className='spot__link' to={`/spots/${spot.id}`}>
          <img className='spot__image' src={image.url} alt='camp' />
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