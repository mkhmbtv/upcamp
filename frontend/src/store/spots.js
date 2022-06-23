import { csrfFetch } from "./csrf";
import { SET_REVIEW, REMOVE_REVIEW } from "./reviews";

const SET_SPOTS = 'spots/setSpots';
export const ADD_ONE_SPOT = 'spots/addOneSpot';

const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    spots,
  };
};

const addOneSpot = (spot, reviews) => {
  return {
    type: ADD_ONE_SPOT,
    payload: {
      spot,
      reviews
    }
  };
};

export const getSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  const data = await res.json();
  dispatch(setSpots(data.spots));
  return data;
};

export const getOneSpot = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`);
  const data = await res.json();
  dispatch(addOneSpot(data.spot, data.reviews));
  return data;
};

export const getSpotsByType = (spotType) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotType}`);
  const data = await res.json();
  dispatch(setSpots(data.spots));
  return data;
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
          [action.payload.spot.id]: action.payload.spot,
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
            Reviews: Array.from(
              new Set([...state.byId[action.payload.spotId].Reviews, action.payload.review.id])
            ),
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
            Reviews: state.byId[action.payload.spotId].Reviews.filter((id) => id !== action.payload.reviewId),
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