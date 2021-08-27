const {model} = require('mongoose')
const {hamiSchema} = require('../../index')

const UserSchema = hamiSchema({
	displayName: String,
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
})

exports.UserModel = model('user', UserSchema)
