import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSpots } from '../../store/spots';
import { getSpotTypes } from '../../store/spotTypes';
import Spot from './Spot';
import './Spots.css';

const Spots = () => {
  const { typeId } = useParams();
  const dispatch = useDispatch();
  const spots = useSelector((state) => {
    return typeId
      ? Object.values(state.spots.byId).filter(spot => spot.spotTypeId === Number(typeId))
      : Object.values(state.spots.byId); 
  });
  const type = useSelector((state) => state.spotTypes.byId[typeId]);

  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  useEffect(() => {
    if (typeId) {
      dispatch(getSpotTypes());
    }
  }, [dispatch, typeId]);

  useEffect(() => {
    if (spots) setIsLoaded(true);
  }, [spots]);

  if (!isLoaded) return null;
  
  return (
    <section className='spots'>
      <h2 className='spots__heading'>{type? `${type.type} sites` : 'All campsites'}</h2>
      <div className='spots__list'>
        {spots.map((spot) => (
          <Spot key={spot.id} spot={spot} />
        ))}
      </div>
    </section>
  );
};

export default Spots;