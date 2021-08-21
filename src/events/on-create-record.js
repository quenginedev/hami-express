const {createEventListener} = require('./create-event-listener')

exports.onCreateRecord = ({socket, collectionName}) => {
	const LISTEN_EVENT = `${collectionName}:create`
	const EMIT_EVENT = `${collectionName}:created`
	const eventListener = createEventListener(socket)
	eventListener({LISTEN_EVENT, EMIT_EVENT})
}
