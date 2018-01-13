// components/single-product.js

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { getSelectedProduct } from '../store/selected-product';
import { addCartItem, updateCartItem } from '../store/cart'

/**
 * COMPONENT
 */
class SingleProduct extends Component {

	constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
	}

	componentDidMount() {
		const productId = this.props.match.params.id;

    this.props.loadSelectedProduct(productId);

    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleAddItem (event) {

    let newCartItem = {
      productId: this.props.product.id,
      quantity: this.state.quantity
    }

    // If item already exists in the cart, update
    // the existing cart item by adding the selected
    // quantity, otherwise create a new cart item
    let itemIndex = this.props.cart.findIndex(item => item.productId === this.props.product.id)
    if(itemIndex === -1) {
      this.props.addNewItemToCart(newCartItem)
    } else {
      newCartItem.quantity += this.props.cart[itemIndex].quantity
      this.props.updateItemInCart(newCartItem)
    }
  }

  handleQuantityChange (event, index, value) {
    console.log('Selected quantity is now ', value)
    this.setState({
      quantity: Number(value)
    })
  }


	render() {
	  return this.props.product && (
	    <div>
	    	<Card>
			    <CardHeader
			      title={this.props.product.name}
			      subtitle="PLACEHOLDER CATEGORY AND RATING"
			    />
			    <CardMedia>
			      <img src={this.props.product.imageUrl} />
			    </CardMedia>
			    <CardTitle title={this.props.product.name} subtitle="PLACEHOLDER" />
			    <CardText>
			      {this.props.product.description}
			    </CardText>
			    <CardActions>
			      <FlatButton label="Action1" />
			      <FlatButton label="Action2" />
			    </CardActions>
			  </Card>
        {/* TEMP: Button for adding new item */}
        <FlatButton id="add-to-cart-button" onClick={this.handleAddItem} label="Add To Cart" />
        <SelectField
          floatingLabelText="Quantity"
          value={this.state.quantity}
          onChange={this.handleQuantityChange}
        >
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={6} primaryText="6" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={2} primaryText="2" />
        </SelectField>
        <Link to="/cart" >Go to Cart!</Link>
	    </div>
	  );
	}
}

// function createQuanitityDropdown() {
//   render() {
//     retrun(<h1> </h1>)
//   }
// }

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    product: state.selectedProduct,
    cart: state.cart
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadSelectedProduct(productId) {
			dispatch(getSelectedProduct(productId));
    },
    addNewItemToCart(item) {
      dispatch(addCartItem(item))
    },
    updateItemInCart(item) {
      dispatch(updateCartItem(item))
    }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
