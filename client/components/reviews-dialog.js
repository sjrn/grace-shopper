// components/reviews-dialog.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'
import StarsIcon from 'material-ui/svg-icons/action/stars'

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
					<List>
					{
						reviews.map(review => (
							<ListItem 
								key={review.id}
								primaryText={review.title + " by " + review.email}
								secondaryText={review.body}
								secondaryTextLines={2}
							/>
						))
					}
					</List>
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
