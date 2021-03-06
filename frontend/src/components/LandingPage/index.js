import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation';
import Card from './Card';
import './LandingPage.css';

const spotTypes = ['Tent camping', 'RV park', 'Cabin', 'Treehouse', 'Glamping'];

const LandingPage = () => {
  const navigate = useNavigate();

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
      <section className='types'>
        <h2>Find your next getaway</h2>
        <div className='cards'>
          {spotTypes.map(type => (
            <Card key={type} spotType={type} />
          ))}
        </div>
      </section>
      <section className='promo'>
        <div className='promo__container'>
          <img className='promo__image' src='https://res.cloudinary.com/djogxk6nz/image/upload/v1641582575/upcamp_assets/photo-1464207687429-7505649dae38_mvwxsj.jpg' alt='peaple camping' />
          <div className='promo__box'>
            <h3 className='promo__heading'>Experiences are better than things.</h3>
            <p className='promo__text'>This year, send the gift of the outdoors to your friends &amp; family.</p>
            <button 
              className='btn promo__btn'
              onClick={() => navigate('/spots')}
            >
              Gift now
            </button>
          </div>
        </div>
      </section>
    </>
  )
};

export default LandingPage;