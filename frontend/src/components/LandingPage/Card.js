import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Card = ({ id }) => {
  const spotType = useSelector((state) => state.spotTypes.byId[id])
  const type = spotType.type.replace(/\s/g, '-');

  let imageUrl;
  switch (spotType.type) {
    case 'Tent camping':
      imageUrl = 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640352272/upcamp_assets/photo-1537225228614-56cc3556d7ed_uein7i.jpg';
      break;
    case 'RV park':
      imageUrl = 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640351773/upcamp_assets/photo-1581498854421-c4c958f21ebd_jihjdj.jpg';
      break;
    case 'Cabin':
      imageUrl = 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640352321/upcamp_assets/photo-1587061949409-02df41d5e562_awupm3.jpg';
      break;
    case 'Treehouse':
      imageUrl ='https://res.cloudinary.com/djogxk6nz/image/upload/v1640382820/upcamp_assets/photo-1618767689160-da3fb810aad7_wpw0uo.jpg';
      break;
    case 'Glamping':
      imageUrl = 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640352687/upcamp_assets/photo-1624254495476-db6cc8b77e98_misugf.jpg';
      break;
    default:
      return null;
  }

  return (
    <div className={spotType.type === 'Tent camping' || spotType.type === 'RV park' ? 'card card--wide' : 'card'}>
      <Link className='card__link' to={`/s/${type}`}>
          <img className='card__image' src={imageUrl} alt='camping-type' />
          <h3 className='card__text'>{spotType.type} sites</h3>
      </Link>
    </div>
  )
};

export default Card;