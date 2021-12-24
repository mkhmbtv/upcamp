import { useNavigate } from "react-router-dom";


const Card = ({ id, type }) => {
  const navigate = useNavigate();

  let imageUrl;
  switch (type) {
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
      imageUrl ='https://res.cloudinary.com/djogxk6nz/image/upload/v1640352550/upcamp_assets/photo-1550355191-aa8a80b41353_pva0p3.jpg';
      break;
    case 'Glamping':
      imageUrl = 'https://res.cloudinary.com/djogxk6nz/image/upload/v1640352687/upcamp_assets/photo-1624254495476-db6cc8b77e98_misugf.jpg';
      break;
    default:
      return null;
  }

  return (
    <div className='card' onClick={() => navigate(`/spots/types/${id}`)}>
      <div>
        <img className='card__image' src={imageUrl} alt='camping-type' />
      </div>
      <h3>{type} spots</h3>
    </div>
  )
};

export default Card;