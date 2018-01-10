// components/single-product.js

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

/**
 * COMPONENT
 */
export const SingleProduct = (props) => {

  return props.products && (
    <div>
    	<Card>
		    <CardHeader
		      title="URL Avatar"
		      subtitle="Subtitle"
		      avatar="images/jsa-128.jpg"
		    />
		    <CardMedia
		      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
		    >
		      <img src={product.imageUrl} alt="" />
		    </CardMedia>
		    <CardTitle title="Card title" subtitle="Card subtitle" />
		    <CardText>
		      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
		      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
		      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
		    </CardText>
		    <CardActions>
		      <FlatButton label="Action1" />
		      <FlatButton label="Action2" />
		    </CardActions>
		  </Card>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
  	products: state.products,
    product: state.selectedProduct
  };
};

export default connect(mapStateToProps)(SingleProduct)
