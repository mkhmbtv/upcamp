import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import ImageSlider from "./ImageSlider";
import SpotInfo from "./SpotInfo";
import './SpotDetail.css';

const SpotDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const campspot = useSelector((state) => state.spots.list[id]);
 
  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch, id]);

  if (!(campspot && campspot.user)) return null;
  
  return (
    <section className='campspot'>
      <ImageSlider images={campspot.images} />
      <div className='campspot__overview'>
        <SpotInfo campspot={campspot} />
      </div>
    </section>
  )
};

export default SpotDetail;