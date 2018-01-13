// store/selected-product.js

import axios from 'axios';
import history from '../history';

// Action types
const GET_SELECTED_PRODUCT = 'GET_SELECTED_PRODUCT';

// Action creators
export function getSelectedProductAction(product) {
  return {
    type: GET_SELECTED_PRODUCT,
    selectedProduct: product
  };
}

// Thunk creators
export function getSelectedProduct(productId) {
  return function thunk(dispatch) {
    return axios.get(`/api/products/${productId}`)
      .then(res => res.data)
      .then(product => {
        const action = getSelectedProductAction(product);
        dispatch(action);
      })
      .catch(console.error);
  }
}

// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_SELECTED_PRODUCT:
      return action.selectedProduct;
    default:
      return state;
  }
}
