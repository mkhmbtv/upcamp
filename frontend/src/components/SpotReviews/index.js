import { useSelector } from "react-redux";
import SpotReview from "./SpotReview";
import './SpotReviews.css';

const SpotReviews = ({ spotId }) => {
  const spotReviews = useSelector((state) => Object.values(state.spots.byId[spotId].reviews));

  return (
    <div className='reviews'>
      <h3 className='reviews__count'>{spotReviews.length} Reviews</h3>
      {spotReviews.map((review) => (
        <SpotReview key={review.id} review={review} />
      ))}
    </div>
  );
};

export default SpotReviews;