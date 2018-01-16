// components/products.js

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router-dom'
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import AddShoppingCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import { addCartItem, updateCartItem } from '../store/cart'
import history from '../history';


const styles = {
  root: {
    display: 'flex', 
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    col: 4,
    width: 500,
    height: 450,
    overflowY: 'auto',
   
  },
}
/**
 * COMPONENT
 */
// export const Products = (props) => {
class Products extends Component {  
  constructor(props) {
    super(props)

    this.handleAddItem = this.handleAddItem.bind(this)
  }

  handleAddItem (id) {
    let newCartItem = {
      productId: id,
      quantity: 1
    }

    // If item already exists in the cart, update
    // the existing cart item by adding the selected
    // quantity, otherwise create a new cart item
    let itemIndex = this.props.cart.findIndex(item => item.productId === id)
    if(itemIndex === -1) {
      this.props.addNewItemToCart(newCartItem)
    } else {
      newCartItem.quantity += this.props.cart[itemIndex].quantity
      this.props.updateItemInCart(newCartItem)
    }
  }

render(){
  console.log("this.props",this.props)
  return this.props.products && (
    <div>
      <GridList cellHeight={180} style={styles.gridList}>
        <Subheader>Product List</Subheader>
          {
            this.props.products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <GridTile
                title={product.name}
                actionIcon={
                // <Link to="/cart">
                <AddShoppingCartIcon color='orange' 
                    onClick=
                    {() => this.handleAddItem(product.id)}
                />}>
                <img src={product.imageUrl} />
              </GridTile>
            </Link>
          ))}
      </GridList>
    </div>
  )
}}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    products: state.products,
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    addNewItemToCart(item) {
      dispatch(addCartItem(item))
    },
    updateItemInCart(item) {
      dispatch(updateCartItem(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
