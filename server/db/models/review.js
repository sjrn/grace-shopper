// db/models/review.js

const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	rating: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		validate: {
			min: 0,
			max: 5
		}
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	body: {
		type: Sequelize.TEXT,
		allowNull: false
	}
})

module.exports = Review
