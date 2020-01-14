const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('item', {
    name: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
	    notEmpty: true,
	}
    },
    price: {
	type: Sequelize.FLOAT,
	allowNull: false,
	validate: {
	    notEmpty: true,
	    min: 0,
	}
    },
    stock: {
	type: Sequelize.INTEGER,
	allowNull: false,
	validate: {
	    notEmpty: true,
	    min: 0,
	}
    },
    description: {
	type: Sequelize.STRING,
	validate: {
	    notEmpty: true,
	}
    },
    imageUrl: {
	type: Sequelize.STRING,
	defaultValue: 'defaultValue',
    },
});
