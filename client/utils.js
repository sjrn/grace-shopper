// utils.js

'use strict'

import React from 'react'
import StarsIcon from 'material-ui/svg-icons/action/stars'

// Star icon JSX-styling
const starStyle = {
  visible: {
    color: 'gold'
  },
  notVisible: {
    color: 'black'
  }
}

// displayStarRating
export function displayStarRating(rating) {
  const rateVal = Number(rating)
  let starIconList = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rateVal)
      starIconList.push(<StarsIcon id={`add-star-${i}`} key={i} style={starStyle.visible} />)
    else
      starIconList.push(<StarsIcon id={`add-star-${i}`} key={i} style={starStyle.notVisible} />)
  }

  return starIconList
}