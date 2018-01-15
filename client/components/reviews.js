// components/reviews.js

import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog';
import {GridList, GridTile} from 'material-ui/GridList';
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
	}

	handleOpen() {
		this.setState({visible: true})
	}

	handleClose() {
		this.setState({visible: false})
	}

	render() {
		
	}
}

export const Reviews = (props) => {

	const reviews = props.reviews ?
		props.reviews.filter(review => review.productId === props.product.id)
		:
		null

  return props.reviews && (
    <div>
      <GridList cellHeight={180} style={}>
        <Subheader>Product List</Subheader>
          {
            reviews.map((review) => {
							return (
								<div>
									<h2>SUP</h2>
								</div>
							)
						})
					}
      </GridList>
    </div>
  )
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

export default connect(mapStateToProps)(Reviews)
