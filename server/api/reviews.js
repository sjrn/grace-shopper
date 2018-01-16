// api/reviews.js

const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  // Fetch all submitted reviews
  Review.findAll().
  	then(reviews => res.json(reviews))
  	.catch(next)
})

router.post('/', (req, res, next) => {
	let newReview = req.body;

  // Add a new review
  res.send("HELLOOOO")
})