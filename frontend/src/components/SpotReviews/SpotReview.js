import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { getSessionUser } from '../../store/session';
import EditSpotReviewFormModal from '../EditSpotReviewForm';

const SpotReview = ({ reviewId }) => {
  const review = useSelector((state) => state.reviews.byId[reviewId]);
  const sessionUser = useSelector(getSessionUser);
  const dispatch = useDispatch();
  
  const date = new Date(review.createdAt.split(' ')[0]).toLocaleString('en-us', { day: 'numeric', month: 'long', year: 'numeric' });

  const handleDelete = () => {
    return dispatch(deleteReview(review.spotId, review.id));
  };
  
  return (
    <div className='review'>
      <img className='review__reviewerAvatar' src="https://img.icons8.com/color/96/000000/test-account.png" alt='author pic' />
      <div className='review__content'>
        <h4 className='review__title'>{review.title}</h4>
        <div className='review__info'>
          <div>
            <div className='review__opinion'>
              {review.recommended ? <i className="las la-thumbs-up"></i> : <i className="las la-thumbs-down"></i>}
              <div>
                <span className='review__authorName'>{review.User.firstName} {review.User.lastName.charAt(0)}.</span>
                {review.recommended ? 'recommends this listing.' : "doesn't recommend this listing."}
              </div>
            </div>
          </div>
          <span className='review__date'>
            {date}
          </span>
        </div>
        <div className='review__body'>
          <p>{review.body}</p>
        </div>
        {sessionUser && sessionUser.id === review.User.id && (
          <div className='review__buttons'>
            <EditSpotReviewFormModal review={review} />
            <button 
              className='btn btn--secondary btn--small btn--red'
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotReview;