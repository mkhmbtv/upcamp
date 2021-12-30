import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { editBooking } from '../../store/bookings';
import 'react-datepicker/dist/react-datepicker.css';

const EditBookingForm = ({ booking, handleClose }) => {
  const guestNums = [...Array(booking.spot.maxCapacity).keys()].map(i => i + 1);
  const dispatch = useDispatch();
  
  const parsedStartDate = moment(booking.startDate).toDate();
  const parsedEndDate = moment(booking.endDate).toDate();
  const [startDate, setStartDate] = useState(parsedStartDate);
  const [endDate, setEndDate] = useState(parsedEndDate);
  const [numGuests, setNumGuests] = useState(booking.numGuests);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const updatedBooking = {
      ...booking,
      startDate,
      endDate,
      numGuests,
    };

    return dispatch(editBooking(updatedBooking))
      .then(() => handleClose())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form className='bookingForm' onSubmit={handleSubmit}>
      <div className='bookingForm__header'>
        <span className='bookingForm__price'>${booking.spot.pricePerNight}</span>
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
        <button className='btn bookingForm__btn' type='submit'>Edit Booking</button>
      </div>
    </form>
  );
};

export default EditBookingForm;