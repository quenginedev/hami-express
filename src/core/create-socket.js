const {compose, not, isNil, or, isEmpty, path, forEach, ifElse} = require('ramda')
const {createServer} = require('http')
const {onCreateRecord} = require('../events/on-create-record')
const {onUpdateRecord} = require('../events/on-update-record')
const {onDeleteRecord} = require('../events/on-delete-record')

const isNilOrEmpty = or(isNil, isEmpty)

exports.createSocket = (app, {routes, options}) => {
	const Server = path(['socketServer'], options)
	return ifElse(
		compose(not, isNilOrEmpty),
		initializeSocket(app, Server),
		() => app
	)(routes)
}

const initializeSocket = (app, Server) => (routes) => {
	const httpServer = createServer(app)
	const io = Server(httpServer, {
		transports: ['websocket']
	})
	console.time('Creating socket')
	io.on('connection', socket => {
		forEach(createEvents(socket))(routes)
	})
	console.timeEnd('Creating socket')
	return httpServer
}

const createEvents = socket => ({model}) => {
	const collectionName = path(['collection', 'collectionName'])(model)
	onCreateRecord({socket, collectionName})
	onUpdateRecord({socket, collectionName})
	onDeleteRecord({socket, collectionName})
}
