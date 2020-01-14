const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1
    }
  }
})
