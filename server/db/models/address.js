const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('address', {
  street: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
      notEmpty: true,
      len: [5, 5]
    }
  }
})
