import { useSelector } from "react-redux";
import SpotReview from "./SpotReview";
import './SpotReviews.css';

const SpotReviews = ({ spotId }) => {
  const spotReviews = useSelector((state) => state.spots.byId[spotId].Reviews);

  return (
    <div className='reviews'>
      <h3 className='reviews__count'>{spotReviews.length} {spotReviews.length === 1 ? 'Review' : 'Reviews'}</h3>
      {spotReviews.map((reviewId) => (
        <SpotReview key={reviewId} reviewId={reviewId} />
      ))}
    </div>
  );
};

export default SpotReviews;