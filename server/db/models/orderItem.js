const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('orderItem', {
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
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})
