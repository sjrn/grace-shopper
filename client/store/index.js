import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import user from './user'
import products from './products';
import cart from './cart';
import reviews from './reviews'
import selectedProduct from './selected-product';
import selectedOrder from './selected-order';
import categories from './categories';
import orders from './orders';

const reducer = combineReducers({
	user,
	products,
	reviews,
  selectedProduct,
	selectedOrder,
	categories,
  cart,
  orders
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './cart'
export * from './products'
export * from './orders'
export * from './reviews'
