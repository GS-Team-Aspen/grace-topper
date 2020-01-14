const User = require('./user')
const Address = require('./address')
const Cart = require('./cart')
const Category = require('./category')
const Item = require('./item')
const Order = require('./order')
const Review = require('./review')
const OrderItem = require('./orderItem')

//Item User relation through Cart
Item.belongsToMany(User, {through: Cart, foreignKey: 'userId'})
User.belongsToMany(Item, {through: Cart, foreignKey: 'itemId'})

//Order Item relation through OrderItem
Order.belongsToMany(Item, {through: OrderItem, foreignKey: 'itemId'})
Item.belongsToMany(Order, {through: OrderItem, foreignKey: 'orderId'})

//Item User relation through Review
User.belongsToMany(Item, {through: Review, foreignKey: 'itemId'})
Item.belongsToMany(User, {through: Review, foreignKey: 'userId'})

Order.belongsTo(User)
User.hasMany(Order)

Item.belongsTo(Category)

Address.belongsTo(User)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Review,
  Order,
  Item,
  Category,
  Cart,
  Address
}
