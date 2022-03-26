import { csrfFetch } from './csrf';

const SET_SPOT_IMAGES = 'images/setSpotImages';

const setSpotImages = (images) => {
  return {
    type: SET_SPOT_IMAGES,
    images,
  }
}

export const getSpotImages = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`);
  const data = await res.json();
  if (res.ok) dispatch(setSpotImages(data.images));
  return data.images;
};

const initialState = {
  byId: {},
  allIds: [],
};

const imagesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_SPOT_IMAGES:
      newState = { ...state };
      action.images.forEach((image) => {
        newState.byId[image.id] = image;
      });
      newState.allIds = Object.keys(newState.byId);
      return newState;
    default:
      return state;
  }
};

export default imagesReducer;