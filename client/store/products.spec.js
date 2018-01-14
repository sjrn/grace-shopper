/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import {getProductList} from './products'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {selectedProduct: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProductList', () => {
    it('eventually dispatches the GET_PRODUCTS action', () => {
      const fakeItems = [{
        name: "test drum",
        description: "lol",
        price: 1337,
        imageUrl: 'google.com'
      }]
      mockAxios.onGet('/api/products/').replyOnce(200, fakeItems)
      return store.dispatch(getProductList())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_PRODUCTS')
          expect(actions[0].user).to.be.deep.equal(fakeItems)
        })
    })
  })
})
