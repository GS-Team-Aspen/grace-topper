const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('review', {
    rating: {
	type: Sequelize.BOOLEAN,
	allowNull: false,
    },
    description: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
	    notEmpty: true,
	    len: [15, 500],
	}
    }
});
