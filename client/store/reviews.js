// store/reviews.js

import axios from 'axios'

// Action types
const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

// Action creators
export function getReviewsAction(reviews) {
  return {
    type: GET_REVIEWS,
    reviews
  }
}

export function addReviewAction(review) {
  return {
    type: ADD_REVIEW,
    review
  }
}

// Thunk creators
export function getReviewList() {
  return function thunk(dispatch) {
    return axios.get('/api/reviews/')
      .then(res => res.data)
      .then(reviews => {
        const action = getReviewsAction(reviews)
        dispatch(action)
      })
      .catch(console.error)
  }
}

export function addReview(review) {
  return function thunk(dispatch) {
    return axios.post('/api/reviews', review)
      .then(res => res.data)
      .then(createdReview => {
        const action = addReviewAction(createdReview)
        dispatch(action)
      })
      .catch(console.error)
  }
}

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return [...state, action.review]
    default:
      return state;
  }
}
