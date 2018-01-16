// store/orders.js

import axios from 'axios';

// Action types
const GET_ORDERS = 'GET_ORDERS';

// Action creators
export function getOrdersAction(ordersList) {
  return {
    type: GET_ORDERS,
    orders: ordersList
  };
}

// Thunk creators
export function getOrderList() {
  return function thunk(dispatch) {
    return axios.get('/api/orders/')
      .then(res => res.data)
      .then(orders => {
        const action = getOrdersAction(orders);
        dispatch(action);
      })
      .catch(console.error);
  }
}

export function checkoutCart(email, history) {
  return function thunk(dispatch) {
    return axios.post('/api/orders', email)
      .then(res => res.data)
      .then(() => console.log('Email was sent successfully'))
      .catch(console.error)
  }
}

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
