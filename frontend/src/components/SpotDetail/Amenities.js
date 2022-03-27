import { useSelector } from "react-redux";
import Icon from "./Icon";

const Amenities = ({ spot }) => {
  const amenities = useSelector((state) => state.amenities.byId);
  const essential = spot.Amenities.filter(amenityId => amenities[amenityId].essential);
  const nonEssential = spot.Amenities.filter(amenityId => !amenities[amenityId].essential);

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
          {essential.map((amenityId) => (
            <div key={amenityId} className='infoCard__info'>
              <div className='infoCard__icon'>
                <Icon iconTitle={amenities[amenityId].title} />
              </div>
              <p>{amenities[amenityId].title}</p>
            </div>
          ))}
        </div>
        <div className='infoCard'>
          <h3 className='infoCard__heading'>Amenities</h3>
          {nonEssential.map((amenityId) => (
            <div key={amenityId} className='infoCard__info'>
              <div className='infoCard__icon'>
                <Icon iconTitle={amenities[amenityId].title} />
              </div>
              <p>{amenities[amenityId].title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Amenities;