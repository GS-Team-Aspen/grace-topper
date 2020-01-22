const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('address', {
  street: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zipCode: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true,
      len: [5, 5]
    }
  }
})
