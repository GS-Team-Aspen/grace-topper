const Sequelize = require('sequelize')
const db = require('../db')
const Item = require('./item')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      notEmpty: true
    }
  },
  salePrice: {
    type: Sequelize.FLOAT,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

OrderItem.setPrice = async orderId => {
  try {
    const orderItems = await OrderItem.findAll({
      where: {
        orderId
      }
    })
    const items = await Promise.all(
      orderItems.map(orderItem => Item.findByPk(orderItem.itemId))
    )
    await Promise.all(
      orderItems.map((item, i) => item.update({salePrice: items[i].price}))
    )
  } catch (error) {
    console.error(error, 'there was an error')
  }
}

module.exports = OrderItem
