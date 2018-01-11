const router = require('express').Router()
// const { Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  // Product.findAll()
  //   .then(products => res.json(products))
  //   .catch(next)
  res.json(req.session.cart)
})

router.post('/', (req, res, next) => {
  try {
    req.session.cart.push(req.body)
    res.sendStatus(201)
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
