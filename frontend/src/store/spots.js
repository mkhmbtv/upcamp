import { csrfFetch } from "./csrf";

const SET_SPOTS = 'spots/setSpots';
const ADD_ONE_SPOT = 'spots/addOneSpot';
const SET_REVIEW ='spots/setReview';
const REMOVE_REVIEW = 'spots/removeReview';

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

const setReview = (review, spotId) => {
  return {
    type: SET_REVIEW,
    payload: {
      review,
      spotId,
    },
  };
};

const deleteReview = (spotId) => {
  return {
    type: REMOVE_REVIEW,
    payload: spotId,
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
    case SET_REVIEW:
      newState = {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.spotId]: {
            ...state.byId[action.payload.spotId],
            reviews: [...state.byId[action.payload.spotId].reviews, action.payload.review],
          },
        },
      };
      newState.allIds = Object.keys(newState.byId);
      return newState;
    case REMOVE_REVIEW:
      newState = {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.spotId]: {
            ...state.byId[action.payload.spotId],
            reviews: state.byId[action.payload.spotId].reviews.filter((review) => review.id !== action.payload.spotId),
          },
        }
      }
      newState.allIds = Object.keys(newState.byId);
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;