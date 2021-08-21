const {MONGODB_URI, SERVER_PORT} = require('./config')
const express = require('express')
const {connect} = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const socketServer = require('socket.io')
const {createHami} = require('../')
const routes = require('./routes')

const startTestServer = async () => {
	console.log('connecting to mongodb URI')
	await connect(MONGODB_URI, {
		useCreateIndex: true,
		useFindAndModify: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	console.log('connection to mongodb successful')
	const app = express()
	app.use(bodyParser.json())
	app.use(morgan('dev'))
	const hami = createHami(app)
	console.time('creating routes on hami')
	const server = hami(routes, {socketServer})
	console.timeEnd('creating routes on hami')

	return server
}

startTestServer()
	.then(app => {
		app.listen(SERVER_PORT, () => {
			console.log('Server started on port', SERVER_PORT)
		})
	})
	.catch(err => {
		console.error(err)
	})
