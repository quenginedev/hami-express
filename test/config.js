const {config} = require('dotenv')
const path = require('path')
config({path: path.resolve(process.cwd(), './test/.env.local')})

module.exports = {
	MONGODB_URI: process.env.MONGODB_URI,
	SERVER_PORT: process.env.SERVER_PORT,
}
