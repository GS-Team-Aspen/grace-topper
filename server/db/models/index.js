const User = require('./user')
const Address = require('./address')
const Category = require('./category')
const Item = require('./item')
const Order = require('./order')
const Review = require('./review')
const OrderItem = require('./orderItem')

//Order Item relation through OrderItem
Order.belongsToMany(Item, {through: OrderItem, foreignKey: 'orderId'})
Item.belongsToMany(Order, {through: OrderItem, foreignKey: 'itemId'})

User.hasMany(Review)
Review.belongsTo(User)

Item.hasMany(Review)
Review.belongsTo(Item)

Order.belongsTo(User)
User.hasMany(Order)

Item.belongsToMany(Category, {through: 'itemCategories'})
Category.belongsToMany(Item, {through: 'itemCategories'})

Address.belongsTo(User)
User.hasOne(Address)
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
  Address,
  OrderItem
}
