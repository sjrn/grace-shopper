// components/add-review-dialog.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router-dom'
import StarsIcon from 'material-ui/svg-icons/action/stars'
import TextField from 'material-ui/TextField'

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

// starRatingSelection
function displayStarRating(rating) {
  const rateVal = Number(rating)
  let starIconList = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rateVal)
      starIconList.push(<StarsIcon id={`add-star-${i}`} key={i} style={starStyle.visible} />)
    else
      starIconList.push(<StarsIcon id={`add-star-${i}`} key={i} style={starStyle.notVisible} />)
  }

  return starIconList
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
    this.handleStarMouseOver = this.handleStarMouseOver.bind(this)
	}

	handleOpen() {
		this.setState({visible: true})
	}
	handleClose() {
		this.setState({visible: false})
  }
  
  handleSubmit() {
    // Create new review

  }

  handleStarMouseOver(event) {
    // Update rating based on user's selected star
    const rating = Number(event.target.id.split('add-star-')[1])
    displayStarRating(rating)

    this.setState({starRating: rating})
  }

	render() {

		const actions = [
      <RaisedButton label="Add Review" onClick={this.handleClose}/>,
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
          <div id='star-rating' onMouseOver={this.handleStarMouseOver}>
            {displayStarRating(3)}
          </div>
          <br />
          <TextField
            id="emailAddrField"
            floatingLabelText="Email Address"
            rows={1}
          /><br />
          <TextField
            id="reviewTitleField"
            floatingLabelText="Review Title"
            rows={1}
          /><br />
          <TextField
            id="reviewBodyField"
            floatingLabelText="Review Body"
            multiLine={true}
            rows={2}
          /><br />
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

export default connect(mapStateToProps)(AddReviewDialog)
