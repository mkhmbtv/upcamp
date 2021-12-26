const { csrfFetch } = require('./csrf');

const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT_TYPES = 'spots/loadSpotTypes';
const ADD_ONE_SPOT = 'spots/addOneSpot';

const load = (list) => {
  return {
    type: LOAD_SPOTS,
    list,
  };
};

const loadTypes = (types) => {
  return {
    type: LOAD_SPOT_TYPES,
    types,
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
  dispatch(load(data.spots));
  return res;
};

export const getOneSpot = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`);
  const data = await res.json();
  dispatch(addOneSpot(data.spot));
  return res;
};

export const getSpotTypes = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/types');
  const data = await res.json();
  dispatch(loadTypes(data.types));
  return res;
};

const initialState = {
  list: {},
  types: []
};

const spotsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_SPOTS:
      action.list.forEach((spot) => {
        newState.list[spot.id] = spot;
      });
      return newState;
    case LOAD_SPOT_TYPES:
      newState.types = action.types;
      return newState;
    case ADD_ONE_SPOT:
      newState.list[action.spot.id] = action.spot;
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;