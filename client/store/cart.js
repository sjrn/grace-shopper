// store/cart.js

import axios from 'axios'

// Action types
const GET_CART = 'GET_CART'

// TO-DO: Maybe a desicated route to reset cart instead of doing it while
// checking out via post route in orders.js file?
const RESET_CART = 'RESET_CART'
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

// Action creators
export function getCartAction(cart) {
  return {
    type: GET_CART,
    cart
  };
}

export function resetCartAction() {
  return {
    type: RESET_CART
  };
}

export function addCartItemAction(item) {
  return {
    type: ADD_CART_ITEM,
    item
  };
}

export function updateCartItemAction(item) {
  return {
    type: UPDATE_CART_ITEM,
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

export function updateCartItem(item, history) {
  return function thunk(dispatch) {
    return axios.put(`/api/carts/${item.productId}`, item)
      .then(res => res.data)
      .then(updatedItem => {
        const action = updateCartItemAction(updatedItem)
        dispatch(action)
      })
      .catch(console.error)
  }
}

export function deleteCartItem(productId, history) {
  return function thunk(dispatch) {
    return axios.delete(`/api/carts/${productId}`)
      .then(res => res.data)
      .then(deletedItem => {
        console.log("Deleted item:", deletedItem)
        const action = deleteCartItemAction(deletedItem)
        dispatch(action)
      })
      .catch(console.error)
  }
}

// export function checkoutCart(email, history) {
//   return function thunk(dispatch) {
//     return axios.post('/api/carts/checkout', email)
//       .then(res => res.data)
//       .then(() => console.log('Email was sent successfully'))
//       .catch(console.error)
//   }
// }

// Reducer
export default function reducer(state = [], action) {
  //const itemIndex = state.findIndex(item => item.productId === action.item.productId)
  let newState;

  switch (action.type) {
    case GET_CART:
      return action.cart

    case RESET_CART:
      return []
    case ADD_CART_ITEM:
      return [...state, action.item]
    case UPDATE_CART_ITEM:
      newState = [...state]
      newState[findItemIndex(state, action.item.productId)].quantity = action.item.quantity
      console.log("updated cart before return:", newState)
      return newState
    case DELETE_CART_ITEM:
      return state.filter((item) => {
        return item.productId !== action.item.productId
      })
    default:
      return state;
  }
}

// helper functions
function findItemIndex(arr, id) {
  return arr.findIndex(item => item.productId === id)
}
