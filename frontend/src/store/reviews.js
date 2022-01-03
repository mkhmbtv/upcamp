// const SET_REVIEW = 'reviews/setReview';

// const setReview = (review, spotId) => {
//   return {
//     type: SET_REVIEW,
//     payload: {
//       review,
//       spotId,
//     },
//   };
// };

// const initialState = {
//   byId: {},
//   allIds: [],
// };

// const reviewsReducer = (state = initialState, action) => {
//     let newState = {};
//   switch (action.type) {
//     case SET_REVIEWS:
//       newState = { ...state, [action.payload.review.id] };
      
//     default:
//       return state;
//   }
// };

// export default reviewsReducer;