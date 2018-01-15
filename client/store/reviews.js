// store/reviews.js

import axios from 'axios';

// Action types
const GET_REVIEWS = 'GET_REVIEWS';

// Action creators
export function getReviewsAction(reviews) {
  return {
    type: GET_REVIEWS,
    reviews
  }
}

// Thunk creators
export function getReviewList() {
  return function thunk(dispatch) {
    return axios.get('/api/reviews/')
      .then(res => res.data)
      .then(reviews => {
        const action = getReviewsAction(reviews);
        dispatch(action);
      })
      .catch(console.error);
  }
}

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
}
