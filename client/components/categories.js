import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export const Categories = (props) => {
  return props.categories&&(
      
        <div className="category-container">
        
               <ul>
                {props.categories.map(category=>{
                    return(
                      <Link key={category.id} to={`/products/category/${category.id}`}> 
                        <li key={category.id}>{category.name}</li>
                      </Link>
                    )
                       
                })}
                </ul>
                <Link to={"/products"}>All Products</Link>

        </div>
    )
    }

const mapStateToProps = (state) => {
    return {
      categories: state.categories
    }
  }


  
  export default connect(mapStateToProps)(Categories)