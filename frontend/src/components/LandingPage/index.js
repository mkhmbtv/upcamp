import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpotTypes } from '../../store/spotTypes';
import Navigation from '../Navigation';
import Card from './Card';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spotTypeIds = useSelector((state) => state.spotTypes.allIds);

  useEffect(() => {
    dispatch(getSpotTypes());
  }, [dispatch]);

  return (
    <>
      <header className='header'>
        <Navigation isLanding={true} />
        <div className='header__textBox'>
          <h1 className='header__heading'>
            <span className='header__heading--main'>Find yourself outside.</span>
            <span className='header__heading--sub'>Discover and book tent camping, RV parks, cabins, treehouses and glamping.</span>
          </h1>
          <Link to='/spots' className='btn btn--white'>Discover our campsites</Link>
        </div>
      </header>
      <section className='sectionTypes'>
        <h2>Find your next getaway</h2>
        <div className='cards'>
          {spotTypeIds.map(spotTypeId => (
            <Card key={spotTypeId} id={spotTypeId} />
          ))}
        </div>
      </section>
    </>
  )
};

export default LandingPage;