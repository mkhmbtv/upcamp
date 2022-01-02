import { csrfFetch } from './csrf';

const SET_SPOT_TYPES = 'spotTypes/setSpotTypes';

const setSpotTypes = (spotTypes) => {
  return {
    type: SET_SPOT_TYPES,
    spotTypes,
  };
};

export const getSpotTypes = () => async (dispatch) => {
  const res = await csrfFetch('/api/spot-types');
  const { types } = await res.json();
  if (res.ok) dispatch(setSpotTypes(types));
  return types;
};

const initialState = {
  byId: {},
  allIds: [],
};

const spotTypesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_SPOT_TYPES:
      newState = { ...state };
      action.spotTypes.forEach((spotType) => {
        newState.byId[spotType.id] = spotType;
      });
      newState.allIds = Object.keys(newState.byId);
      return newState;
    default:
      return state;
  }
};

export default spotTypesReducer;