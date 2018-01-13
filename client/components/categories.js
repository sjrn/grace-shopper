import React from 'react'
import {connect} from 'react-redux';


export const Categories = (props) => {


    console.log('-------------------',props.categories)
  return props.categories&&(
        <div className="category-container">
            <ul>
           
            </ul>
        </div>
    )
    }

const mapStateToProps = (state) => {
    return {
      categories: state.categories
    }
  }

//   const mapDispatchToProps = () =>{
//     return {

//     }
//   }


  
  export default connect(mapStateToProps)(Categories)