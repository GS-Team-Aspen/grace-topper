const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['shipped', 'delivered', 'cancelled']]
    }
  }
})
