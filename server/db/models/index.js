'use strict';

const db = require("../db")
const User = require('./user')
const Product = require('./product')
const OrderProducts = require('./orderProducts')
const Review = require('./review')
const Category = require('./category')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Product.hasMany(Review)
User.hasMany(Review)

Product.belongsTo(Category)
Category.hasMany(Product)

User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderProducts })
Product.belongsToMany(Order, { through: OrderProducts })


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Product,
  Review,
  Category,
  Order,
  OrderProducts
}
