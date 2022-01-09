import { useEffect } from 'react';
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
      ? state.spots.allIds.filter((id) => state.spots.byId[id].spotTypeId === Number(typeId))
      : state.spots.allIds;
  });
  const type = useSelector((state) => state.spotTypes.byId[typeId]);
  
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  useEffect(() => {
    if (typeId && !type) {
      dispatch(getSpotTypes());
    }
  }, [dispatch, typeId, type]);
  
  return (
    <section className='spots'>
      <h2 className='spots__heading'>{type? `${type.type} sites` : 'All campsites'}</h2>
      <div className='spots__list'>
        {spots.map((spotId) => (
          <Spot key={spotId} spotId={spotId} />
        ))}
      </div>
    </section>
  );
};

export default Spots;