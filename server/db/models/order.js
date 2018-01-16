const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // Should sessionId, userId and prodId be retrieved via table relations
  // For now, we'll use e-mail for both authenticated/unauthenticated users
  // (what will happen if e-mail changes)
  // This will be mainly relevant to unauthenticated users.
  // Authenticated users should normally get a userId from users table!
  sessionId: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  firstName: {
    type: Sequelize.STRING
  },
  middleName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  phoneNumber: {
    type: Sequelize.STRING
  },
  // Email will need to be captured for unauthenticated users.
  // For authenticated users, we can just get it from users table!
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  billingAddressOne: {
    type: Sequelize.STRING
  },
  billingAddressTwo: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zipCode: {
    type: Sequelize.STRING
  },
  purchaseDate: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Purchased'
  }
})

module.exports = Order
