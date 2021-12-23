const { csrfFetch } = require('./csrf');

const LOAD_SPOTS = 'spots/loadSpots';

const load = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  const data = await res.json();
  console.log(data.spots)
  dispatch(load(data.spots));
  return res;
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_SPOTS:
      action.payload.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;