const { csrfFetch } = require('./csrf');

const SET_SPOTS = 'spots/setSpots';
const ADD_ONE_SPOT = 'spots/addOneSpot';

const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    spots,
  };
};

const addOneSpot = (spot) => {
  return {
    type: ADD_ONE_SPOT,
    spot,
  };
};

export const getSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  const data = await res.json();
  dispatch(setSpots(data.spots));
  return res;
};

export const getOneSpot = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`);
  const data = await res.json();
  dispatch(addOneSpot(data.spot));
  return res;
};

const initialState = {
  byId: {},
  allIds: [],
};

const spotsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_SPOTS:
      newState = { ...state };
      action.spots.forEach((spot) => {
        newState.byId[spot.id] = spot;
      });
      newState.allIds = Object.keys(newState.byId);
      return newState;
    case ADD_ONE_SPOT:
      newState = {
        ...state,
        byId: {
          ...state.byId,
          [action.spot.id]: action.spot,
        },
      };
      newState.allIds = Object.keys(newState.byId);
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;