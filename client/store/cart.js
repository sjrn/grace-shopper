// store/cart.js

import axios from 'axios'

// Action types
const GET_CART = 'GET_CART'
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

// Action creators
export function getCartAction(cart) {
  return {
    type: GET_CART,
    cart
  };
}

export function addCartItemAction(item) {
  return {
    type: ADD_CART_ITEM,
    item
  };
}

export function deleteCartItemAction(item) {
  return {
    type: DELETE_CART_ITEM,
    item
  };
}

// Thunk creators
export function getCartItems() {
  return function thunk(dispatch) {
    return axios.get('/api/carts/')
      .then(res => res.data)
      .then(cartItems => {
        const action = getCartAction(cartItems)
        dispatch(action)
      })
      .catch(console.error)
  }
}

export function addCartItem(item, history) {
  return function thunk(dispatch) {
    return axios.post('/api/carts/', item)
      .then(res => res.data)
      .then(addedItem => {
        const action = addCartItemAction(addedItem)
        dispatch(action)
      })
      .catch(console.error)
  }
}

export function deleteCartItem(item, history) {
  return function thunk(dispatch) {
    const productId = item.productId
    return axios.post(`/api/carts/${productId}`)
      .then(res => res.data)
      .then(deletedItem => {
        const action = deleteCartItemAction(deletedItem)
        dispatch(action)
      })
      .catch(console.error)
  }
}

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_CART_ITEM:
      return [...state, action.item]
    case DELETE_CART_ITEM:
      return state.filter((item) => {
        return item.productId !== action.item.productId
      })
    default:
      return state;
  }
}
