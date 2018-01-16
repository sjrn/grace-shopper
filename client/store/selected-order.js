// store/selected-order.js

import axios from 'axios';

// Action types
const GET_SELECTED_ORDER = 'GET_SELECTED_ORDER';

// Action creators
export function getSelectedOrderAction(order) {
  return {
    type: GET_SELECTED_ORDER,
    selectedOrder: order
  };
}

// Thunk creators
export function getSelectedOrder(orderId) {
  return function thunk(dispatch) {
    return axios.get(`/api/orders/${orderId}`)
      .then(res => res.data)
      .then(order => {
        const action = getSelectedOrderAction(order);
        dispatch(action);
      })
      .catch(console.error);
  }
}

// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_SELECTED_ORDER:
      return action.selectedOrder;
    default:
      return state;
  }
}
