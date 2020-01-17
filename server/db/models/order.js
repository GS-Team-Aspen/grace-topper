const Sequelize = require('sequelize')
const OrderItem = require('./orderItem')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'carted',
    validate: {
      isIn: [['shipped', 'delivered', 'cancelled', 'carted']]
    }
  }
})

Order.addHook('beforeUpdate', order => {
  if (order.status === 'shipped') {
    OrderItem.setPrice(order.id)
  }
})

// Order.addHook('beforeUpdate')

module.exports = Order
