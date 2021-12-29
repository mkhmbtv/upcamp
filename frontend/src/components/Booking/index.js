import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { addBooking } from '../../store/bookings';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';

const Booking = ({ spotId, price, maxGuests }) => {
  const guestNums = [ ...Array(maxGuests).keys() ].map(i => i + 1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numGuests, setNumGuests] = useState(1);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const booking = {
      spotId,
      startDate,
      endDate,
      numGuests,
    };
    
    return dispatch(addBooking(booking))
      .then(() => navigate('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
 
  return (
    <div className='booking'>
      <form className='booking__form' onSubmit={handleSubmit}>
        <div className='booking__header'>
          <span className='booking__price'>${price}</span>
          <span className='booking__perNight'>per night ({numGuests} {numGuests === 1 ? 'guest' : 'guests'})</span>
        </div>
        <div className='booking__dates'>
          <div className='booking__dateInput'>
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
          <div className='booking__dateInput'>
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
        <div className='booking__selectMenu'>
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
        <ul className='booking__errors'>
          {errors.map((err, i) => (
            <li key={i} className='booking__error'>{err}</li>
          ))}
        </ul>
        <div className='booking__btnContainer'>
          <button className='btn booking__btn' type='submit'>Instant Book</button>
        </div>
      </form>
    </div>
  );
};

export default Booking;