import Icon from "./Icon";

const InfoCard = ({ heading, items, guestNum, spotType }) => {
  if (heading === 'Campsite Area') {
    return (
      <div className='infoCard'>
        <h3 className='infoCard__heading'>{heading}</h3>
        <div className='infoCard__info'>
          <div className='infoCard__icon'>
            <Icon iconTitle={spotType} />
          </div>
          <p>{spotType}</p>
        </div>
        <div className='infoCard__info'>
          <div className='infoCard__icon'>
            <i className="lar la-user"></i>
          </div>
          <p>Up to {guestNum} guests per site</p>
        </div>
        <div className='infoCard__info'>
          <div className='infoCard__icon'>
            <i class="las la-parking"></i>
          </div>
          <p>Park at listing</p>
        </div>
      </div>
    )
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