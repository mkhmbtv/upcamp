import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { book } from '../../store/bookings';
import { getSessionUser } from '../../store/session';
import { useAuth } from '../../context/AuthModal';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingForm.css';

const BookingForm = ({ spotId, price, maxGuests }) => {
  const { setShowLoginForm } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionUser = useSelector(getSessionUser);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numGuests, setNumGuests] = useState(1);
  const [errors, setErrors] = useState([]);

  const guestNums = [...Array(maxGuests).keys()].map(i => i + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sessionUser) {
      setShowLoginForm(true);
      return;
    }

    setErrors([]);
    const booking = {
      spotId,
      startDate,
      endDate,
      numGuests,
    };
    
    return dispatch(book(booking))
      .then(() => navigate('/bookings'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
 
  return (
    <form className='bookingForm' onSubmit={handleSubmit}>
      <div className='bookingForm__header'>
        <span className='bookingForm__price'>${price}</span>
        <span className='bookingForm__perNight'>per night ({numGuests} {numGuests === 1 ? 'guest' : 'guests'})</span>
      </div>
      <div className='bookingForm__dates'>
        <div className='bookingForm__dateInput'>
          <label htmlFor='date'>
            Check in
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            dateFormat="yyyy/MM/dd"
            placeholderText='Select date'
            id='date'
          />
        </div>
        <div className='bookingForm__dateInput'>
          <label htmlFor='date'>
            Check out
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={new Date()}
            dateFormat="yyyy/MM/dd"
            placeholderText='Select date'
            id='date'
          />
        </div>
      </div>
      <div className='bookingForm__selectMenu'>
        <label htmlFor='guests'>
          Guests
        </label>
        <select
          id='guests'
          value={numGuests}
          onChange={(e) => setNumGuests(e.target.value)}
        >
          {guestNums.map((num) => (
            <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
          ))}
        </select>
      </div>
      <ul className='bookingForm__errors'>
        {errors.map((err, i) => (
          <li key={i} className='bookingForm__error'>{err}</li>
        ))}
      </ul>
      <div className='bookingForm__btnContainer'>
        <button className='btn btn--secondary' type='submit'>Instant Book</button>
      </div>
    </form>
  );
};

export default BookingForm;