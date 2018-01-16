import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Products from './products';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart'
import SearchBar from './search-bar';
import Categories from './categories';
import title from 'material-ui/svg-icons/editor/title';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */

const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props


  return (

    <div>
      {/* TODO: Redirect to home page upon title click */}
      <AppBar
        title="Grace Shoppa"
        style={{backgroundColor: 'black',height: 70}}
        iconElementLeft={
          <Link to='/home/'>
            <div className='drum-size'>🥁</div>
          </Link>

        }
        iconElementRight={
          <div className="header-right">
            <div className='navbar-search'><SearchBar></SearchBar></div>
            <div className="navbar-buttons">
              <Link to="/login">
                <RaisedButton 
                  labelStyle={{ fontSize: '12px'}} 
                  className="navbar-button" 
                  label="Login"
                  ></RaisedButton>
              </Link>
              <Link to="/signup">
                <RaisedButton 
                  labelStyle={{ fontSize: '12px'}} 
                  className="navbar-button" 
                  label="Sign up"
                  ></RaisedButton>
              </Link>
              <Link to='/cart'>
                <RaisedButton 
                  labelStyle={{ fontSize: '12px'}}
                  className="navbar-button" 
                  icon={<ShoppingCartIcon />}
                  label={`(${props.cartAmount})`}
                  ></RaisedButton>
              </Link> 
            </div>
          </div>
        }
      />
      
      <nav>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
             
            </div>
        }
      </nav>
      <hr />
      <div className = "main-section">
        <Categories/>
        {children}
      </div>  
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    cartAmount: state.cart.length,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
