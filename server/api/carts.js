'use strict';
const nodemailer = require('nodemailer')
const router = require('express').Router()
// const { Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  // Retrieve an unauthenticated user's cart
  res.json(req.session.cart)
})

router.post('/checkout', (req, res, next) => {
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
    let deletedItem = req.session.cart.splice(itemIndex, 1)
    console.log("Deleted items:", deletedItem)
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
