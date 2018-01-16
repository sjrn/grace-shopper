'use strict';
// const nodemailer = require('nodemailer')
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

    res.status(201).json(req.body)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.delete('/:productId', (req, res, next) => {
  try {
    // Determine which element to remove
    const productId = Number(req.params.productId)
    let itemIndex = req.session.cart.findIndex(item => item.productId === productId)
    // TODO: change to filter instead of splice
    let deletedItem = req.session.cart.splice(itemIndex, 1)
    res.status(200).json(deletedItem[0])
  } catch (error) {
    res.sendStatus(500)
  }
})

router.put('/:productId', (req, res, next) => {
  try {
    const productId = Number(req.params.productId)
    let itemIndex = req.session.cart.findIndex(item => item.productId === productId)
    req.session.cart[itemIndex].quantity = req.body.quantity
    res.status(200).json(req.session.cart[itemIndex])
  } catch (error) {
    res.sendStatus(500)
  }
})

// router.get('/:id', (req, res, next) => {
//   const productId = Number(req.params.id);

//   // Find single product using its ID
//   Product.findById(productId)
//     .then(foundProduct => res.json(foundProduct))
//     .catch(next);
// });

