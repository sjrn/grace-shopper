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
    // this.state= {
    //     // productName:'',
    //     productId: ""
    // }
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}
// handleChange(evt){
//     var name = evt.target.value;
//     // this.setState({productName: name});
//     this.props.products.filter((product)=>{
//         if(product.name === name){
//             this.setState({productId:product.id})
//         }
//     })
//     console.log("******", this.state)
// }
// componentDidMount(){
//     this.props.loadProducts()
// }

handleSubmit(evt){
    evt.preventDefault();
    console.log("%%%%%%%",history)
    this.props.products.filter((product)=>{
        if(product.name === evt.target.item.value){
            // history.push(`/products/${product.id}`)
            console.log('PRODUCT ID', product.id)
            this.props.propsSubmit(product.id, history)
            history.push(`/products/${product.id}`)
        }
    })
   
}



render(){
    console.log('++++++++++++++++++++', this.props)
  return (
        <div className="search-bar">
            <form onSubmit={this.handleSubmit}>
                <input
                    // onChange= {this.handleChange}
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
    //   searchedProduct: state.searchedProduct
    }
  }

const mapDispatchToProps = (dispatch)=>{
    return {
        // loadProducts: function(){
        //     dispatch(getProductList())
        // },
        propsSubmit(id, history){
            // evt.preventDefault();
            // let id = this.state.productId
            console.log("****",id)
            console.log('history: ', history)
            dispatch(getSelectedProduct(id))
            }
        }
}
   
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)