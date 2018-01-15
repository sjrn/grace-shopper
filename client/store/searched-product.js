// store/selected-product.js

import axios from 'axios';

// Action types
const GET_SEARCHED_PRODUCT = 'GET_SEARCHED_PRODUCT';

// Action creators
export function getSearchedProductAction(product) {
  return {
    type: GET_SEARCHED_PRODUCT,
    searchedProduct: product
  };
}

// Thunk creators
export function getSearchedProduct(productId,history) {
  return function thunk(dispatch) {
    return 
      axios.get(`/api/products/${productId}`)
      .then(res => res.data)
      .then(product => {
        const action = getSearchedProductAction(product);
        dispatch(action);
        history.push(`/products/${productId}`)
      })
      .catch(console.error);
  }
}

// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_SEARCHED_PRODUCT:
      return action.searchedProduct;
    default:
      return state;
  }
}