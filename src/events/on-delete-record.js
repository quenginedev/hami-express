const {createEventListener} = require('./create-event-listener')

exports.onDeleteRecord = ({socket, collectionName}) => {
	const LISTEN_EVENT = `${collectionName}:delete`
	const EMIT_EVENT = `${collectionName}:deleted`
	const eventListener = createEventListener(socket)
	eventListener({LISTEN_EVENT, EMIT_EVENT})
}
