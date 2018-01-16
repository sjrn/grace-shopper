// components/single-product.js

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import StarsIcon from 'material-ui/svg-icons/action/stars'

import { getSelectedProduct } from '../store/selected-product'
import { addCartItem, updateCartItem } from '../store/cart'
import { displayStarRating } from '../utils'
import DisplayReviewsDialog from './reviews-dialog'
import AddReviewDialog from './add-review-dialog'

//  Create list of menu items for quantity select field
let menuItemList = []

for (let i = 1; i < 10; i++) {
  menuItemList.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)
}

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
		const productId = this.props.match.params.id

    this.props.loadSelectedProduct(productId)

    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
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
    this.setState({
      quantity: Number(value)
    })
  }

	render() {

    const productReviews = this.props.reviews.filter(review =>
      review.productId === this.props.product.id)
    const productAvgRating = productReviews.length > 0 ?
    Math.floor((productReviews.reduce((sum, review) => {
        return sum + review.rating
        }, 0)) / productReviews.length)
      : 0

	  return this.props.product && (
	    <div className="product-container">
	    	<Card>
			    <CardHeader
			      title={this.props.product.name}
			      subtitle={
              <div>
                <br/><Divider /><br/>
                <div className="rating-container">
                  {displayStarRating(productAvgRating)}
                  {`  (Avg. rating: ${productAvgRating})`}
                </div>
              </div>
            }
			    />
			    <CardMedia>
			      <img src={this.props.product.imageUrl} />
			    </CardMedia>
			    <CardTitle title={this.props.product.name} subtitle="PLACEHOLDER" />
			    <CardText>
			      {this.props.product.description}
			    </CardText>
			    <CardActions className="product-container">
            <div className="rating-container">
              <AddReviewDialog product={this.props.product} />
              <DisplayReviewsDialog />
            </div>
			    </CardActions>
			  </Card>
        <div className="add-to-cart-container">
          <SelectField
            floatingLabelText="Quantity"
            value={this.state.quantity}
            onChange={this.handleQuantityChange}
          >
            {menuItemList}
          </SelectField>
          <RaisedButton id="add-to-cart-button" onClick={this.handleAddItem} label="Add To Cart" />
        </div>
	    </div>
	  );
	}
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    product: state.selectedProduct,
    cart: state.cart,
    reviews: state.reviews
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
