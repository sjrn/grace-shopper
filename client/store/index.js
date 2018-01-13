import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import user from './user'
import products from './products';
import cart from './cart';
import selectedProduct from './selected-product';
import searchedProduct from './searched-product';
import categories from './categories';

const reducer = combineReducers({
	user,
	products,
	selectedProduct,
	searchedProduct,
	categories,
  	cart
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
