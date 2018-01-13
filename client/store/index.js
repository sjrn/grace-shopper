import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import user from './user'
import products from './products';
import selectedProduct from './selected-product';
import searchedProduct from './searched-product';
import categories from './categories';

const reducer = combineReducers({
	user,
	products,
	selectedProduct,
	searchedProduct,
	categories
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
// export * from '.products'
// export * from './selected-product'
// export * from './searched-product'