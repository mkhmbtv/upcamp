import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReview } from '../../store/reviews';

const EditSpotReviewForm = ({ review, handleClose }) => {
  const [title, setTitle] = useState(review.title);
  const [body, setBody] = useState(review.body);
  const [recommended, setRecommended] = useState(review.recommended);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const updatedReview = {
      ...review,
      title,
      body,
      recommended,
    };

    return dispatch(editReview(updatedReview))
      .then(() => handleClose())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className='reviewForm'>
      <div className='reviewForm__container'>
        <h2 className='reviewForm__heading'>Share your experience</h2>
        <form className='reviewForm__form' onSubmit={handleSubmit}>
          <ul className='reviewForm__errors'>
            {errors.map((err, i) => (
              <li key={i} className='reviewForm__error'>{err}</li>
            ))}
          </ul>
          <input
            className='reviewForm__title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
          />
          <textarea
            className='reviewForm__body'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='Talk about your experience'
            rows={10}
          />
          <label className='reviewForm__recommended'>
            Would you recommend this campspot?
            <input
              className='reviewForm__checkbox'
              type='checkbox'
              defaultChecked={recommended}
              onChange={() => setRecommended(!recommended)}
            />
          </label>
          <button className='btn btn--primary'>Submit review</button>
        </form>
      </div>
    </div>

  )
};

export default EditSpotReviewForm;

