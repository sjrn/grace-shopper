// components/cart-item.js
// TO-DO: Refactor cart.js component and use this also!


import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TableRow, TableRowColumn } from 'material-ui/Table'

import { deleteCartItem, updateCartItem } from '../store/cart'

/**
 * COMPONENT
 */
export const CartItem = (props) => {

  return props.product && (
    <div>

    </div>
  )
}

/**
 * CONTAINER
 */
const mapDispatchToProps = (dispatch) => {
  return {
    updateItemQuantity(quantity) {

    }
  }
}

export default connect(mapDispatchToProps)(CartItem)
