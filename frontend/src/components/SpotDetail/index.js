import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import ImageSlider from "./ImageSlider";
import SpotInfo from "./SpotInfo";
import InfoCard from "./InfoCard";
import BookingForm from "../BookingForm";
import './SpotDetail.css';

const SpotDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const campspot = useSelector((state) => state.spots.list[id]);
 
  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch, id]);

  if (!(campspot && campspot.user)) return null;

  const essentials = campspot.amenities.filter(a => a.essential);
  const amenities = campspot.amenities.filter(a => !a.essential);
  
  return (
    <section className='campspot'>
      <ImageSlider images={campspot.images} />
      <div className='campspot__overview'>
        <BookingForm spotId={campspot.id} price={campspot.pricePerNight} maxGuests={campspot.maxCapacity} />
        <SpotInfo campspot={campspot} />
        <div className='campspot__infoCards'>
          <InfoCard heading='Campsite Area' guestNum={campspot.maxCapacity} spotType={campspot.spotType.type} />
          <InfoCard heading='Essentials' items={essentials} />
          <InfoCard heading='Amenities' items={amenities} />
        </div>
      </div>
    </section>
  )
};

export default SpotDetail;