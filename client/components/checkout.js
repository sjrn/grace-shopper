// components/checkout.js

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import { checkoutCart } from '../store/orders'
import { resetCartAction } from '../store/cart'


/**
 * COMPONENT
 */
class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      emailAddr: "",
      billingAddressOne: "",
      billingAddressTwo: "",
      city: "",
      state: "",
      zipCode: ""
    }

    this.handleFormChange = this.handleFormChange.bind(this)

  }

  handleFormChange(event) {
    if(event.target.name === "email"){
      this.setState({ emailAddr: event.target.value })
    } else if (event.target.name === "firstName") {
      this.setState({ firstName: event.target.value })
    } else if (event.target.name === "middleName") {
      this.setState({ middleName: event.target.value })
    } else if (event.target.name === "lastName") {
      this.setState({ lastName: event.target.value })
    } else if (event.target.name === "phoneNumber") {
      this.setState({ phoneNumber: event.target.value })
    } else if (event.target.name === "billingAddressOne") {
      this.setState({ billingAddressOne: event.target.value })
    } else if (event.target.name === "billingAddressTwo") {
      this.setState({ billingAddressTwo: event.target.value })
    } else if (event.target.name === "city") {
      this.setState({ city: event.target.value })
    } else if (event.target.name === "state") {
      this.setState({ state: event.target.value })
    } else if (event.target.name === "zipCode") {
      this.setState({ zipCode: event.target.value })
    }
  }


  render() {
    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
    };
    return this.props.cart && (
      <div>
        <form onChange={this.handleFormChange} onSubmit={(event) => {
          event.preventDefault()
          this.props.checkoutOrder(this.props.cart, this.state)
        }} >

          <h3>Customer information</h3>
          <TextField
            hintText="First name"
            // errorText="This field is required"
            name="firstName"
          />
          <TextField
            hintText="Middle name"
            name="middleName"
          />
          <TextField
            hintText="Last name"
            // errorText="This field is required"
            name="lastName"
          />
          <br />

          <TextField
            hintText="Phone number"
            // errorText="This field is required"
            name="phoneNumber"
          />
          <TextField
            defaultValue=""
            // floatingLabelText="Email"
            hintText="Email"
            errorText="This field is required"
            name="email"
          />
          <h3>Payment information</h3>
          <TextField
            hintText="Cardholder name"
          />
          <br />
          <TextField
            hintText="Debit/Credit card number"
            type="password"
          />
          <br />
          <TextField
            hintText="Security code"
            type="password"
          />
          <br />
          <DatePicker
            floatingLabelText="Expiration date"
            // autoOk={this.state.autoOk}
            // minDate={this.state.minDate}
            // maxDate={this.state.maxDate}
            // disableYearSelection={this.state.disableYearSelection}
          />

          <h3>Billing/Shipping address</h3>
          {/* TO-DO: Those addresses could be different */}
          <Checkbox
            label="Billing address same as shipping address"
            checked={true}
            disabled={true}
            style={styles.checkbox}
          />
          <TextField
            hintText="Billing address 1"
            name="billingAddressOne"
          />
          <br />
          <TextField
            hintText="Billing address 2"
            name="billingAddressTwo"
          />
          <br />
          <TextField
            hintText="City"
            name="city"
          />
          <br />
          <TextField
            hintText="State"
            name="state"
          />
          <br />
          <TextField
            hintText="Zip code"
            name="zipCode"
          />
          <br />
          <RaisedButton type="submit" primary={false} label="Complete Checkout" style={{ margin: 12 }} />
          {/* <button type="submit"> Complete Checkout </button> */}


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
    checkoutOrder(cart, state) {
      dispatch(checkoutCart(
        {
          cart,

          firstName: state.firstName,
          middleName: state.middleName,
          lastName: state.lastName,
          phoneNumber: state.phoneNumber,
          billingAddressOne: state.billingAddressOne,
          billingAddressTwo: state.billingAddressTwo,
          city: state.city,
          state: state.state,
          zipCode: state.zipCode,

          email: state.emailAddr,
          from: 'grace.shoppa@grace.shoppa.com',
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
