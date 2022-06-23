import Icon from "./Icon";

const Amenities = ({ spot }) => {
  const essential = spot.Amenities.filter(a => a.essential);
  const nonEssential = spot.Amenities.filter(a => !a.essential);

  return ( 
      <div className='campspot__infoCards'>
        <div className='infoCard'>
          <h3 className='infoCard__heading'>Campsite Area</h3>
          <div className='infoCard__info'>
            <div className='infoCard__icon'>
              <Icon iconTitle={spot.SpotType.type} />
            </div>
            <p>{spot.SpotType.type}</p>
          </div>
          <div className='infoCard__info'>
            <div className='infoCard__icon'>
              <i className="lar la-user"></i>
            </div>
            <p>Up to {spot.maxCapacity} guests per site</p>
          </div>
        </div>
        <div className='infoCard'>
          <h3 className='infoCard__heading'>Essential</h3>
          {essential.map((amenity) => (
            <div key={amenity.id} className='infoCard__info'>
              <div className='infoCard__icon'>
                <Icon iconTitle={amenity.title} />
              </div>
              <p>{amenity.title}</p>
            </div>
          ))}
        </div>
        <div className='infoCard'>
          <h3 className='infoCard__heading'>Amenities</h3>
          {nonEssential.map((amenity) => (
            <div key={amenity.id} className='infoCard__info'>
              <div className='infoCard__icon'>
                <Icon iconTitle={amenity.title} />
              </div>
              <p>{amenity.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Amenities;