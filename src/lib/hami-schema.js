const { Schema } = require('mongoose')
const {prop, compose, defaultTo} = require('ramda')

const defaultDeleteTimer = 60 * 60

exports.hamiSchema = (schema, options = {})=> new Schema({
	...schema,
	deletedAt: {
		type: Date,
		expires:  compose(
			defaultTo(defaultDeleteTimer),
			prop('expiresAt')
		)(options)
	}
}, {
	timestamps: true
})
