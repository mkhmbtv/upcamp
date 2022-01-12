import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import ImageSlider from "./ImageSlider";
import SpotInfo from "./SpotInfo";
import InfoCard from "./InfoCard";
import BookingForm from "../BookingForm";
import SpotReviews from "../SpotReviews";
import MapContainer from "../Maps";
import './SpotDetail.css';

const SpotDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const campspot = useSelector((state) => state.spots.byId[id]);
  const amenities = useSelector((state) => state.amenities.byId);
  const images = useSelector((state) => state.images.byId);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getOneSpot(id))
  }, [dispatch, id]);

  useEffect(() => {
    if (campspot && campspot.Images) setIsLoaded(true);
  }, [campspot]);

  if (!isLoaded) return null;

  const spotImages = campspot.Images.map((imgId) => images[imgId]);
  const spotAmenities = campspot.Amenities.map((amenityId) => amenities[amenityId]);
  const essentials = spotAmenities.filter((amenity) => amenity.essential);
  const other = spotAmenities.filter((amenity) => !amenity.essential);
  const center = {
    lat: campspot.latitude,
    lng: campspot.longitude,
  };

  return (
    <section className='campspot'>
      <ImageSlider images={spotImages} />
      <div className='campspot__overview'>
        <BookingForm spotId={campspot.id} price={campspot.pricePerNight} maxGuests={campspot.maxCapacity} />
        <SpotInfo campspot={campspot} />
        <div className='campspot__infoCards'>
          <InfoCard heading='Campsite Area' guestNum={campspot.maxCapacity} type={campspot.SpotType.type} />
          <InfoCard heading='Essentials' items={essentials} isLoaded={isLoaded}/>
          <InfoCard heading='Amenities' items={other} isLoaded={isLoaded}/>
        </div>
        <SpotReviews spotId={campspot.id} />
      </div>
      <div className='campspot__map'>
        <div className='campspot__basicBox'>
          <div className='campspot__boxGrey'>
            <div className='campspot__basic'>
              <span>Property</span>
              <span>{campspot.name}</span>
            </div>
            <div className='campspot__basic'>
              <span>State</span>
              <span>{campspot.state}</span>
            </div>
            <div className='campspot__basic'>
              <span>Country</span>
              <span>{campspot.country}</span>
            </div>
          </div>
          <div className='campspot__boxWhite campspot__basic'>
            <span>${campspot.pricePerNight}/night</span>
          </div>
        </div>
        <MapContainer center={center} />
      </div>
    </section>
  )
};

export default SpotDetail;