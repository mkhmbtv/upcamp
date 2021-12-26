import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import ImageSlider from "./ImageSlider";
import './Spot.css';

const Spot = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.list[id]);

  useEffect(() => {
    dispatch(getOneSpot(id))
  }, [dispatch, id]);
  
  return (
    <div>
      {spot && (
        <ImageSlider images={spot.images} />
      )}
    </div>
  )
};

export default Spot;