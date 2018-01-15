import React from 'react'
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

export const Categories = (props) => {
  return props.categories&&(
      
        <div className="category-container">
        
               <ul>
                {props.categories.map(category=>{
                    return(
                      // console.log('category.id:', category.id)
                      <NavLink key={category.id} to={`products/category/${category.id}`}> 
                        <li key={category.id}>{category.name}</li>
                      </NavLink>
                    )
                       
                })}
                </ul>
        </div>
    )
    }

const mapStateToProps = (state) => {
    return {
      categories: state.categories
    }
  }


  
  export default connect(mapStateToProps)(Categories)