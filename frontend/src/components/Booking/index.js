import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';

const Booking = ({ spotId, price, maxGuests }) => {
  const guestNums = [ ...Array(maxGuests).keys() ].map(i => i + 1);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numGuests, setNumGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

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
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
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
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
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
          <select id='guests' value={numGuests} onChange={(e) => setNumGuests(e.target.value)}>
            {guestNums.map((num) => (
              <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
          <div className='booking__btnContainer'>
            <button className='btn booking__btn' type='submit'>Instant Book</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Booking;