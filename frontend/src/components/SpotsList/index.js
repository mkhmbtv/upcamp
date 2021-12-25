import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSpots, getSpotTypes } from '../../store/spots';
import SpotBox from './SpotBox';
import './SpotsList.css';

const SpotsList = ({ byType }) => {
  const { typeId } = useParams();
  const dispatch = useDispatch();
  const spots = useSelector((state) => {
    return byType
      ? Object.values(state.spots.list).filter(spot => spot.spotTypeId === Number(typeId))
      : Object.values(state.spots.list); 
  });
  const type = useSelector((state) => state.spots.types.find(type => type.id === Number(typeId)));
  
  useEffect(() => {
    if (byType) {
      dispatch(getSpotTypes());
    } 
    dispatch(getSpots());
  }, [dispatch, byType]);

  return (
    <div className='spots'>
      <h2 className='spots__heading'>{type? `${type.type} sites` : 'All campsites'}</h2>
      <div className='spots__list'>
        {spots.map((spot) => (
          <SpotBox key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  )
};

export default SpotsList;