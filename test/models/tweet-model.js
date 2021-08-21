const { model } = require('mongoose')
const { hamiSchema } = require('../../index')

const TweetSchema = hamiSchema({
	user: String,
	message: String
})

exports.TweetModel = model('tweet', TweetSchema)
