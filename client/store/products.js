// store/products.js

import axios from 'axios';

// Action types
const GET_PRODUCTS = 'GET_PRODUCTS';

// Action creators
export function getProductsAction(productsList) {
  return {
    type: GET_PRODUCTS,
    products: productsList
  };
}

// Thunk creators
export function getProductList() {
  return function thunk(dispatch) {
    return axios.get('/api/products/')
      .then(res => res.data)
      .then(products => {
        const action = getProductsAction(products);
        dispatch(action);
      })
      .catch(console.error);
  }
}

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
