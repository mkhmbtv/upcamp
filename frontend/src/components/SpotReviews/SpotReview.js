import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SpotReview = ({ reviewId }) => {
  const review = useSelector((state) => state.reviews.byId[reviewId]);
  const user = useSelector((state) => state.users.byId[review.userId]);
  const date = new Date(review.createdAt.split(' ')[0]).toLocaleString('en-us', { day: 'numeric', month: 'long', year: 'numeric' });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoaded(true);
    }
  }, [user]);
  
  if (!isLoaded) return null;

  return (
    <div className='review'>
      <img className='review__reviewerAvatar' src="https://img.icons8.com/color/96/000000/test-account.png" alt='user pic' />
      <div className='review__content'>
        <h4 className='review__title'>{review.title}</h4>
        <div className='review__info'>
          <div>
            <div className='review__opinion'>
              {review.recommended ? <i className="las la-thumbs-up"></i> : <i className="las la-thumbs-down"></i>}
              <div>
                <span className='review__authorName'>{user.firstName} {user.lastName.charAt(0)}.</span>
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
      </div>
    </div>
  );
};

export default SpotReview;