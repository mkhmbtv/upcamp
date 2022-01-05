import Icon from "./Icon";

const InfoCard = ({ heading, items, guestNum, type }) => {

  if (heading === 'Campsite Area') {
    return (
      <div className='infoCard'>
        <h3 className='infoCard__heading'>{heading}</h3>
        <div className='infoCard__info'>
          <div className='infoCard__icon'>
            <Icon iconTitle={type} />
          </div>
          <p>{type}</p>
        </div>
        <div className='infoCard__info'>
          <div className='infoCard__icon'>
            <i className="lar la-user"></i>
          </div>
          <p>Up to {guestNum} guests per site</p>
        </div>
      </div>
    );
  }
  
  return ( 
    <div className='infoCard'>
      <h3 className='infoCard__heading'>{heading}</h3>
      {items.map((item) => (
        <div key={item.id} className='infoCard__info'>
          <div className='infoCard__icon'>
            <Icon iconTitle={item.title} />
          </div>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;