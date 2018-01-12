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
import { addCartItem } from '../store/cart'
import store from '../store';

/**
 * COMPONENT
 */
class SingleProduct extends Component {

	constructor(props) {
    super(props)
    this.state = {
      quantity: 0
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

    this.props.addNewItemToCart(newCartItem)
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
          value={1}
          onChange={this.handleQuantityChange}
        >
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
        </SelectField>
	    </div>
	  );
	}
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    product: state.selectedProduct
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadSelectedProduct(productId) {
			dispatch(getSelectedProduct(productId));
    },
    addNewItemToCart(item) {
      dispatch(addCartItem(item))
    }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
