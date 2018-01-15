import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import history from '../history';
import {browserHistory } from 'react-router';
import { getSearchedProduct } from '../store/searched-product';
import { getProductList } from '../store/products';
import { getSelectedProduct } from '../store/selected-product'
import products from './products';

class SearchBar extends Component {

constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
}

handleSubmit(evt){
    evt.preventDefault();
    this.props.products.filter((product)=>{
        if(product.name === evt.target.item.value){
            this.props.propsSubmit(product.id, history)
            history.push(`/products/${product.id}`)
        }
    })
   
}



render(){
  return (
        <div className="search-bar">
            <form onSubmit={this.handleSubmit}>
                <input
                    name= "item"
                    type="text"
                    placeholder="Enter A Product Name"
                />
               <button>go to the product page</button>
               
            </form>
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
      products: state.products,
    }
  }

const mapDispatchToProps = (dispatch)=>{
    return {
        propsSubmit(id, history){
            dispatch(getSelectedProduct(id))
            }
        }
}
   
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)