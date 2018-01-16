'use strict';
const router = require('express').Router()
const { Order, Product } = require('../db/models')
const nodemailer = require('nodemailer')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll() // TO-DO: We'll need prod info also (eager loading)?
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const orderId = Number(req.params.id);
  Order.findById(orderId) // TO-DO: We'll need prod info also (eager loading)?
    .then(foundOrder => res.json(foundOrder))
    .catch(next);
});

router.get('/:email', (req, res, next) => {
  const email = req.params.email
  Order.findAll( // TO-DO: We'll need prod info also (eager loading)?
    { where: {
      email: email
    }})
    .then(orders => res.json(orders))
    .catch(next);
})


router.post('/', (req, res, next) => {
  // TO-DO: Remove the order items from req.session.cart
  // Persist that data in Orders table
  // 'Then', send an emai!
  // clear the req.session.cart to []. From front end?


  let cartItemsPromises = []
  let finalProducts = []
  let finalOrderItemsPromises = []

  req.body.cart.forEach((item) => {
    cartItemsPromises.push(Product.findById(item.productId))
  })

  Promise.all(cartItemsPromises)
    .then(cartItems => {
      cartItems.forEach(item => {
        const theProd = req.body.cart.find(cartItem => {
          return Number(cartItem.productId) === Number(item.id)})

        item.quantity = Number(theProd.quantity)
        finalProducts.push(item)
      })})
    .then(() => {
      req.body.sessionId = req.sessionID
      return Order.create(req.body)})
    .then(createdOrder => {
      finalProducts.forEach(prod => {
        finalOrderItemsPromises.push(createdOrder.addProduct(prod
          , { through: { quantity: prod.quantity, purchasePrice: prod.price } }
        ))
        return finalOrderItemsPromises
      })
    })
    .then(() => {
      req.session.cart = []
      return Promise.all(finalOrderItemsPromises)
    })
    .then(() => sendEmail(req, res, next))
    .then(() => {
      req.session.cart = []
    })
    .then(() => res.sendStatus(200)) //do we need json content for reducer, etc.?
    .catch(next)
})

// helper functions:
function sendEmail(req, res, next) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass  // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: req.body.from, // sender address
      to: req.body.to, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.text, // plain text body
      html: req.body.html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // return console.log(error);
        next(err)
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      res.sendStatus(200)

    });
  });
}
