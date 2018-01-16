// components/add-review-dialog.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router-dom'
import Slider from 'material-ui/Slider';
import StarsIcon from 'material-ui/svg-icons/action/stars'
import TextField from 'material-ui/TextField'

import { addReview } from '../store'
import { displayStarRating } from '../utils'

// Star icon JSX-styling
// TODO: put in a utils file
const starStyle = {
  visible: {
    color: 'gold'
  },
  notVisible: {
    color: 'black'
  }
}

/**
 * COMPONENT
 */
class AddReviewDialog extends Component {
	constructor(props) {
		super(props)

		this.state = {
      visible: false,
      starRating: 0
		}

		this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSliderChange = this.handleSliderChange.bind(this)
	}

	handleOpen() {
		this.setState({visible: true})
	}
	handleClose() {
		this.setState({visible: false})
  }
  
  handleSubmit(event) {
    event.preventDefault()

    // Create new review

    let newReview = {
      email: event.target.emailAddrField.value,
      rating: Number(this.state.starRating),
      title: event.target.reviewTitleField.value,
      body: event.target.reviewBodyField.value,
      productId: this.props.product.id
    }

    this.props.addNewReview(newReview)
  }

  handleSliderChange(event, value) {
    // Update rating based on user's slider selection
    const rating = Number(value)

    this.setState({starRating: rating})
  }

	render() {

		const actions = [
			<RaisedButton label="Close" onClick={this.handleClose}/>
    ]
    
    return (
      <div>
        <FlatButton label="Add Review" onClick={this.handleOpen} />
        <Dialog
					title={`Adding a new review for ${this.props.product.name}...`}
					actions={actions}
					modal={false}
					open={this.state.visible}
					onRequestClose={this.handleClose}
				>
          <div id='star-rating' className='rating-slider-container'>
            How many stars will you give {this.props.product.name}?
            <Slider step={1} min={0} max={5} value={0} 
              onChange={this.handleSliderChange}/>
            Selected rating - {this.state.starRating}
          </div>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="emailAddrField"
              floatingLabelText="Email Address"
              rows={1}
            />
            <TextField
              name="reviewTitleField"
              floatingLabelText="Review Title"
              rows={1}
            />
            <TextField
              name="reviewBodyField"
              floatingLabelText="Review Body"
              multiLine={true}
              rows={2}
            />
            <button type="submit" onClick={this.handleClose}>
              Add Review
            </button>
          </form>
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
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewReview(review) {
      dispatch(addReview(review))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewDialog)
