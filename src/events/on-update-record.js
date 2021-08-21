const {createEventListener} = require('./create-event-listener')

exports.onUpdateRecord = ({socket, collectionName}) => {
	const LISTEN_EVENT = `${collectionName}:update`
	const EMIT_EVENT = `${collectionName}:updated`
	const eventListener = createEventListener(socket)
	eventListener({LISTEN_EVENT, EMIT_EVENT})
}
