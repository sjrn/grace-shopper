import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

var arr = [{
    name: 'coffe1',
    img: 'https://cdn.pixabay.com/photo/2016/04/26/16/58/coffe-1354786_960_720.jpg',
    price: '$ 8.00'
},{
    name: 'coffe2',
    img: 'http://g03.a.alicdn.com/kf/HTB1hvNUIFXXXXbBXFXXq6xXFXXX2/3D-Diamond-Embroidery-Paintings-Rhinestone-Pasted-diy-Diamond-painting-cross-Stitch-font-b-coffe-b-font.jpg',
    price: '$ 7.25'
},{
    name: 'coffe3',
    img: 'http://7-themes.com/data_images/out/63/6985455-a-cup-of-hot-coffe.jpg',
    price: '$ 5.00'
},{
    name: 'coffe4',
    img: 'https://orig00.deviantart.net/6037/f/2011/115/b/3/coffe_by_natasha555-d3eugg0.jpg',
    price: '$ 6.00'
}]
/**
 * COMPONENT
 */
export const Products = (props) => {
  

  return (
    <div>
      <h2>Temp Product List</h2>
      {
        arr.map(product => {
            return (
                <h1 key={product.name}>{product.name}</h1>
            )
        })
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapState)(Products)
