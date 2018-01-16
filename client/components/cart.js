// components/cart.js

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { deleteCartItem, updateCartItem } from '../store/cart'

//  Create list of menu items for quantity select field
let menuItemList = [];

for (let i = 1; i < 10; i++) {
  menuItemList.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
}

/**
 * COMPONENT
 */
export const Cart = (props) => {
  let items = []
  if (props.cartItems && props.products){
    props.cartItems.forEach((cartItem) => {
      let foundProd = props.products.find(prod => prod.id === cartItem.productId)

      if (foundProd) {
        items.push({
          id: foundProd.id,
          name: foundProd.name,
          price: foundProd.price,
          quantity: cartItem.quantity
        })
      }
    })
  }

  return props.cartItems && props.products && (
    <div>
      <h2>You have {props.cartItems.length} items in your cart</h2>
      <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Product Name</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>Quantity</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
           {
            items.map((product) => (
              <TableRow key={product.id}>
                <TableRowColumn>
                  <Link to={`/products/${product.id}`}>
                    {product.name}
                  </Link>
                </TableRowColumn>
                <TableRowColumn>{product.price}</TableRowColumn>
                <TableRowColumn>
                  <SelectField value={product.quantity} onChange={(event, index, value) => {
                    props.updateCartItemQuantity(product, value)
                  }}>
                    {menuItemList}
                  </SelectField>
                </TableRowColumn>
                <TableRowColumn>
                  <RaisedButton backgroundColor="salmon" label='X' onClick={() => {
                    props.deleteItemFromCart(product.id)
                  }} />
                </TableRowColumn>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
        <Link to="/checkout" >
          <RaisedButton label="Checkout" primary={true} style={{margin: 12}} />
        </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    products: state.products,
    cartItems: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItemFromCart(itemId) {
      dispatch(deleteCartItem(itemId))
    },
    updateCartItemQuantity(rowItem, value) {
      let item = {
        productId: rowItem.id,
        quantity: value
      }

      dispatch(updateCartItem(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
