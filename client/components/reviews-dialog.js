// components/reviews-dialog.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class ReviewsDialog extends Component {
	constructor(props) {
		super(props)

		this.state = {
			visible: false
		}

		this.handleOpen = this.handleOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}

	handleOpen() {
		this.setState({visible: true})
	}

	handleClose() {
		this.setState({visible: false})
	}

	render() {

		const actions = [
			<RaisedButton label="Close" onClick={this.handleClose}/>
		]

		const reviews = this.props.reviews.filter(review =>
			review.productId === this.props.product.id)

		console.log("ReviewsDialog reviews in render:", reviews);

		return this.props.reviews && this.props.product && (
			<div>
				<FlatButton label="View Reviews" onClick={this.handleOpen} />
				<Dialog
					title={`Reviews for ${this.props.product.name}`}
					actions={actions}
					modal={false}
					open={this.state.visible}
					onRequestClose={this.handleClose}
					>
				</Dialog>
			</div>
		)
	}
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    product: state.selectedProduct,
    reviews: state.reviews
  }
}

export default connect(mapStateToProps)(ReviewsDialog)
