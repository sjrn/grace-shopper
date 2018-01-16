// components/orders.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Subheader from 'material-ui/Subheader'
import { getOrderList } from '../store'

/**
 * COMPONENT
 */
class Orders extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadOrders();
  }

  render() {
    return this.props.orders && (
      <div>
        <h3>All Orders</h3>
        {
          this.props.orders.map((order) => (
              <Link key={order.id} to={`/orders/${order.id}`}>
              <li>{order.id} - Order E-mail: {order.email}</li>
            </Link>
          ))}
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrders() {
      dispatch(getOrderList());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders)
