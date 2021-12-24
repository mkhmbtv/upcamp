import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpotTypes } from '../../store/spots';
import Card from './Card';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spotTypes = useSelector((state) => state.spots.types);

  useEffect(() => {
    dispatch(getSpotTypes());
  }, [dispatch]);

  return (
    <div>
      <header className='header'>
        <div className='header__textBox'>
          <h1 className='headingPrimary'>
            <span className='headingPrimary--main'>Find yourself outside.</span>
            <span className='headingPrimary--sub'>Discover and book tent camping, RV parks, cabins, treehouses and glamping.</span>
          </h1>
        </div>
        <Link to='/spots' className='btn'>Discover our spots</Link>
      </header>
      <div>
        <h3>Find your next getaway</h3>
        <div className='cards'>
          {spotTypes.map(spotType => (
            <Card key={spotType.id} type={spotType.type} id={spotType.id} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default LandingPage;