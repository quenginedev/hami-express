const {UserModel} = require('./models/user-model')
const {TweetModel} = require('./models/tweet-model')

module.exports = [
	{model: UserModel},
	{model: TweetModel},
]
