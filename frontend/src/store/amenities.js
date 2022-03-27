import { ADD_ONE_SPOT } from './spots';

const initialState = {
  byId: {},
  allIds: [],
};

const amenitiesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case ADD_ONE_SPOT:
      const amenities = {}
      action.payload.amenities.forEach((amenity) => {
        amenities[amenity.id] = amenity;
      });
      newState = { ...state, byId: { ...state.byId, ...amenities }};
      newState.allIds = Object.keys(newState.byId);
      return newState
    default:
      return state;
  }
};

export default amenitiesReducer;