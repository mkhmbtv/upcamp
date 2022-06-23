import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import ImageSlider from "./ImageSlider";
import SpotInfo from "./SpotInfo";
import Amenities from "./Amenities";
import BookingForm from "../BookingForm";
import SpotReviews from "../SpotReviews";
import MapContainer from "../Maps";
import './SpotDetail.css';

const SpotDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.byId[id]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (spot && spot.Images) setIsLoaded(true);
  }, [spot]);

  if (!isLoaded) return null;
  
  const center = {
    lat: spot.latitude,
    lng: spot.longitude,
  };

  return (
    <section className='campspot'>
      <ImageSlider images={spot.Images} />
      <div className='campspot__overview'>
        <BookingForm spotId={spot.id} price={spot.pricePerNight} maxGuests={spot.maxCapacity} />
        <SpotInfo spot={spot} />
        <Amenities spot={spot} />
        <SpotReviews spotId={spot.id} />
      </div>
      <div className='campspot__map'>
        <div className='campspot__basicBox'>
          <div className='campspot__boxGrey'>
            <div className='campspot__basic'>
              <span>Property</span>
              <span>{spot.name}</span>
            </div>
            <div className='campspot__basic'>
              <span>State</span>
              <span>{spot.state}</span>
            </div>
            <div className='campspot__basic'>
              <span>Country</span>
              <span>{spot.country}</span>
            </div>
          </div>
          <div className='campspot__boxWhite campspot__basic'>
            <span>${spot.pricePerNight}/night</span>
          </div>
        </div>
        <MapContainer center={center} />
      </div>
    </section>
  )
};

export default SpotDetail;