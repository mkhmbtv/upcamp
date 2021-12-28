import { csrfFetch } from './csrf';

const LOAD_BOOKINGS = 'bookings/loadBookings';

const loadBookings = (bookings) => {
  return {
    type: LOAD_BOOKINGS,
    bookings
  }
};

export const load = () => async (dispatch) => {
  const res = await csrfFetch('/api/bookings');
  const data = await res.json();

  if (res.ok) {
    dispatch(loadBookings(data.bookings));
  }
  return data;
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
    default:
      return state;
  }
};

export default bookingsReducer;