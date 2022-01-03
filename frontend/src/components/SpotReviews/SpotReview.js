const SpotReview = ({ review }) => {
  const date = new Date(review.createdAt.split(' ')[0]).toLocaleString('en-us', { day: 'numeric', month: 'long', year: 'numeric' });
  
  return (
    <div className='review'>
      <img className='review__reviewerAvatar' src="https://img.icons8.com/color/96/000000/test-account.png" alt='user pic' />
      <div className='review__content'>
        <h4 className='review__title'>{review.title}</h4>
        <div className='review__info'>
          <div>{review.recommended && (
            <div className='review__recommended'>
              <i className="las la-thumbs-up"></i>
              <div>
                <span className='review__authorName'>{review.user.firstName} {review.user.lastName.charAt(0)}.</span> recommends this listing
              </div>
            </div>
          )}</div>
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