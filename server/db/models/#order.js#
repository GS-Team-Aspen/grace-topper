const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'processing',
    validate: {
      isIn: [['shipped', 'delivered', 'cancelled', 'processing']]
    }
  }
})
