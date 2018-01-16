// components/single-order.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSelectedOrder } from '../store/selected-order';


/**
 * COMPONENT
 */
class SingleOrder extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const orderId = this.props.match.params.id;
    this.props.loadSelectedOrder(orderId);
  }

  render() {
    return this.props.order && (
        <div>
          <h3> {`All products under order ${this.props.order.id}`} </h3>
          <li>{this.props.order.id}</li>
        </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    order: state.selectedOrder
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSelectedOrder(orderId) {
      dispatch(getSelectedOrder(orderId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
