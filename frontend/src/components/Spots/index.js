import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSpots, getSpotTypes } from '../../store/spots';
import Spot from './Spot';
import './Spots.css';

const Spots
 = () => {
  const { typeId } = useParams();
  const dispatch = useDispatch();
  const spots = useSelector((state) => {
    return typeId
      ? Object.values(state.spots.list).filter(spot => spot.spotTypeId === Number(typeId))
      : Object.values(state.spots.list); 
  });
  const type = useSelector((state) => state.spots.types.find(type => type.id === Number(typeId)));
  
  useEffect(() => {
    if (typeId) {
      dispatch(getSpotTypes());
    } 
    dispatch(getSpots());
  }, [dispatch, typeId]);

  return (
    <section className='spots'>
      <h2 className='spots__heading'>{type? `${type.type} sites` : 'All campsites'}</h2>
      <div className='spots__list'>
        {spots.map((spot) => (
          <Spot key={spot.id} spot={spot} />
        ))}
      </div>
    </section>
  )
};

export default Spots
;