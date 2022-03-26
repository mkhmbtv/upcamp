import { csrfFetch } from './csrf';
const SET_AMENITIES = 'amenities/setAmenities';

const setAmenities = (amenities) => {
  return {
    type: SET_AMENITIES,
    amenities,
  }
};


export const getSpotAmenities = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/amenities`);
  const data = await res.json();
  dispatch(setAmenities(data.amenities));
  return res;
}


const initialState = {
  byId: {},
  allIds: [],
};

const amenitiesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_AMENITIES:
      newState = { ...state };
      action.amenities.forEach((amenity) => {
        newState.byId[amenity.id] = amenity;
      });
      newState.allIds = Object.keys(newState.byId);
      return newState
    default:
      return state;
  }
};

export default amenitiesReducer;