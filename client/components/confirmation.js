// components/confirmation.js


import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


/**
 * COMPONENT
 */
export const Confirmation = (props) => {
  return (
    <div>
      <h3>Your order is on the way!</h3>
      <Link to='/'> Go back to home </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapDispatchToProps)(Confirmation)
