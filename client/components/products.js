// components/products.js

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router-dom'
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

/**
 * COMPONENT
 */
export const Products = (props) => {

  const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

  return props.products && (
    <div>
      <GridList cellHeight={180} style={styles.gridList}>
        <Subheader>Product List</Subheader>
          {
            props.products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <GridTile
                title={product.name}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}>
                <img src={product.imageUrl} />
              </GridTile>
            </Link>
          ))}
      </GridList>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products)
