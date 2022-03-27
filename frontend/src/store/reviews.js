import { csrfFetch } from "./csrf";
import { ADD_ONE_SPOT } from "./spots";

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

const removeReview = (spotId, reviewId) => {
  return {
    type: REMOVE_REVIEW,
    payload: { 
      spotId,
      reviewId,
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
  if (res.ok) dispatch(setReview(data.review, spotId));
  return res;
};

export const editReview = ({ id, spotId, title, body, recommended }) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body,
      recommended,
    }),
  });

  const data = await res.json();
  if (res.ok) dispatch(setReview(data.review, spotId));
  return res;
};

export const deleteReview = (spotId, reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
  if (res.ok) dispatch(removeReview(spotId, reviewId));
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
      action.payload.reviews.forEach((review) => {
        reviews[review.id] = review;
      });
      newState = { ...state, byId: { ...state.byId, ...reviews } };
      newState.allIds = Object.keys(newState.byId);
      return newState;
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
    case REMOVE_REVIEW:
        newState = { ...state };
        delete newState.byId[action.payload.reviewId];
        newState.allIds = Object.keys(newState.byId);
        return newState;
    default:
      return state;
  }
};

export default reviewsReducer;