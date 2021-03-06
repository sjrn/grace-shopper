const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
	const productId = Number(req.params.id);

	// Find single product using its ID
	Product.findById(productId)
		.then(foundProduct => res.json(foundProduct))
		.catch(next);
});

// router.get('/category/:id', (req,res,next)=>{
// 	const categoryId = Number(req.params.id);

// 	Product.findAll({
// 		where:{
// 			categoryId: categoryId
// 		}
// 	})
// 	.then(products => res.json(products))
//     .catch(next)
// })

