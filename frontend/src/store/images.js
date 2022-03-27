// import { csrfFetch } from './csrf';
import { ADD_ONE_SPOT } from './spots';

// const SET_SPOT_IMAGES = 'images/setSpotImages';

// const setSpotImages = (images) => {
//   return {
//     type: SET_SPOT_IMAGES,
//     images,
//   }
// }

// export const getSpotImages = (spotId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}/images`);
//   const data = await res.json();
//   if (res.ok) dispatch(setSpotImages(data.images));
//   return res;
// };

const initialState = {
  byId: {},
  allIds: [],
};

const imagesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case ADD_ONE_SPOT:
      const images = {}
      action.payload.images.forEach((image) => {
        images[image.id] = image;
      });
      newState = { ...state, byId: { ...state.byId, ...images} };
      newState.allIds = Object.keys(newState.byId);
      return newState;
    default:
      return state;
  }
};

export default imagesReducer;