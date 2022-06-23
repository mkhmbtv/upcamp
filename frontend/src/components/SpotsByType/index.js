import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSpotsByType } from '../../store/spots';
import Spot from '../Spots/Spot';

const SpotsByType = () => {
  const { type } = useParams();
  const spotTypeName = type.replace(/-/g, ' ');
  const [isLoaded, setIsLoaded] = useState(false);
  
  const dispatch = useDispatch();
  const spotIds = useSelector((state) => {
    return state.spots.allIds.filter((id) => state.spots.byId[id].SpotType.type === spotTypeName);
  });

  useEffect(() => {
    if (spotIds.length) {
      setIsLoaded(true);
      return;
    }
    dispatch(getSpotsByType(spotTypeName));
  }, [dispatch, spotTypeName, spotIds]);

  if (!isLoaded) return null;

  return (
    <section className='spots'>
      <h2 className='spots__heading'>{spotTypeName}</h2>
      <div className='spots__list'>
        {spotIds.map((spotId) => (
          <Spot key={spotId} spotId={spotId} />
        ))}
      </div>
    </section>
  );
};

export default SpotsByType;