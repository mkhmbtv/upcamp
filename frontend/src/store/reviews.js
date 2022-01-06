import { csrfFetch } from "./csrf";
import { ADD_ONE_SPOT } from './spots';

export const SET_REVIEW = 'reviews/setReview';
export const REMOVE_REVIEW = 'reviews/removeReview';

const setReview = (review, spotId) => {
  return {
    type: SET_REVIEW,
    payload: {
      review,
      spotId,
    },
  };
};

export const writeReview = ({ spotId, title, body, recommended }) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
      recommended,
    }),
  });

  const data = await res.json();
  dispatch(setReview(data.review, spotId));
  return res;
};

const initialState = {
  byId: {},
  allIds: [],
};

const reviewsReducer = (state = initialState, action) => {
    let newState = {};
  switch (action.type) {
    case ADD_ONE_SPOT:
      const reviews = {};
      action.payload.reviews.forEach((image) => {
        reviews[image.id] = image;
      });
      newState = { ...state, byId: { ...state.byId, ...reviews } };
      newState.allIds = Object.keys(newState.byId);
      return newState
    case SET_REVIEW:
      newState = {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.review.id]: action.payload.review
        }
      };
      newState.allIds = Object.keys(newState.byId);
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;