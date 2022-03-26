import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import Spot from './Spot';
import './Spots.css';

const Spots = () => {
  const dispatch = useDispatch();
  const spotIds = useSelector((state) => state.spots.allIds);
  
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);
  
  return (
    <section className='spots'>
      <h2 className='spots__heading'>All campsites</h2>
      <div className='spots__list'>
        {spotIds.map((spotId) => (
          <Spot key={spotId} spotId={spotId} />
        ))}
      </div>
    </section>
  );
};

export default Spots;