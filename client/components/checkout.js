// components/checkout.js

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { checkoutCart } from '../store/orders';
import { resetCartAction } from '../store/cart';


/**
 * COMPONENT
 */
class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddr: ""
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)

  }

  handleEmailChange(event) {
    console.log("Current email addr on local state:", event.target.value)
    this.setState({emailAddr: event.target.value})
  }

  render() {
    return this.props.cart && (
      <div>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.checkoutOrder(this.props.cart, this.state.emailAddr)
        }} >
          <TextField
            defaultValue=""
            floatingLabelText="Email"
            onChange={this.handleEmailChange}
          /><br />
          <RaisedButton type="submit" label="Submit" style={{ margin: 12 }} />
        </form>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkoutOrder(cart, email) {
      dispatch(checkoutCart(
        {
          cart,

          from: 'grace.shoppa@grace.shoppa.com',
          to: email,
          subject: 'Order confirmation',
          text: 'Your order is on the way!', // TO-DO: Format output to reflect cart?
          html: '<b>Your order is on the way!</b>'
        }))
        dispatch(resetCartAction())
        ownProps.history.push('/confirmation') // check if error occurred?
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
