const router = require('express').Router()
// const { Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  // Retrieve an unauthenticated user's cart
  res.json(req.session.cart)
})

router.post('/', (req, res, next) => {
  try {
    // Adding to an unauthenticated user's cart
    req.session.cart.push(req.body)
    console.log("req.session.cart after post:", req.session.cart)
    res.status(201).json(req.body)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.delete('/:productId', (req, res, next) => {
  const productId = Number(req.params.productId)

  // Determine which element to remove
})

// router.get('/:id', (req, res, next) => {
//   const productId = Number(req.params.id);

//   // Find single product using its ID
//   Product.findById(productId)
//     .then(foundProduct => res.json(foundProduct))
//     .catch(next);
// });
