import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { writeReview } from '../../store/reviews';
import './SpotReviewForm.css';

const SpotReviewForm = ({ spotId, handleClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [recommended, setRecommended] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const review = {
      spotId,
      title,
      body,
      recommended,
    };
    
    return dispatch(writeReview(review))
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
          <button className='btn reviewForm__btn'>Submit review</button>
        </form>
      </div>
    </div>
    
  )
};

export default SpotReviewForm;