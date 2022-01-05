import { csrfFetch } from './csrf';

const LOAD_BOOKINGS = 'bookings/loadBookings';
const ADD_ONE_BOOKING = 'bookings/addOneBooking';
const REMOVE_ONE_BOOKING = 'boookings/removeOneBooking';

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

const removeOneBooking = (id) => {
  return {
    type: REMOVE_ONE_BOOKING,
    id,
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

export const editBooking = (booking) => async (dispatch) => {
  const { spotId, numGuests, startDate, endDate } = booking;

  const res = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: 'PUT',
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

export const cancelBooking = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${id}`, { method: 'DELETE' });
  if (res.ok) dispatch(removeOneBooking(id));
};

const initialState = {
  byId: {},
  allIds: [],
};

const bookingsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_BOOKINGS:
      newState = { ...state };
      action.bookings.forEach(booking => {
        newState.byId[booking.id] = booking;
      })
      newState.allIds = Object.keys(newState.byId);
      return newState;
    case ADD_ONE_BOOKING:
      newState = {
        ...state,
        byId: {
          ...state.byId,
          [action.booking.id]: action.booking,
        },
      };
      newState.allIds = Object.keys(newState.byId);
      return newState;
    case REMOVE_ONE_BOOKING:
      newState = { ...state };
      delete newState.byId[action.id];
      newState.allIds = Object.keys(newState.byId);
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;