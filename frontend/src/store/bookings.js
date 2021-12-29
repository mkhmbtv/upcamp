import { csrfFetch } from './csrf';

const LOAD_BOOKINGS = 'bookings/loadBookings';
const ADD_ONE_BOOKING = 'bookings/addOneBooking';

const load = (bookings) => {
  return {
    type: LOAD_BOOKINGS,
    bookings
  }
};

const addOneBooking = (booking) => {
  return {
    type: ADD_ONE_BOOKING,
    booking,
  };
};

export const getBookings = () => async (dispatch) => {
  const res = await csrfFetch('/api/bookings');
  const data = await res.json();

  if (res.ok) {
    dispatch(load(data.bookings));
  }
  return data;
};

export const book = (booking) => async (dispatch) => {
  const { spotId, numGuests, startDate, endDate } = booking;
  
  const res = await csrfFetch('/api/bookings', {
    method: 'POST',
    body: JSON.stringify({
      spotId,
      numGuests,
      startDate,
      endDate,
    }),
  });

  const data = await res.json();
  dispatch(addOneBooking(data.booking));
  return res;
};

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_BOOKINGS:
      action.bookings.forEach(booking => {
        newState[booking.id] = booking;
      })
      return newState;
    case ADD_ONE_BOOKING:
      newState[action.booking.id] = action.booking;
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;