const {subscribe} = require('pubsub-js')
const {compose, filter, isNil, length, lt, map, not, when, type} = require('ramda')
const {pipeAsync, traversePromises} = require('ramda-async')

exports.createEventListener = socket => ({ LISTEN_EVENT, EMIT_EVENT }) => {
	socket.on(LISTEN_EVENT, args => {
		subscribe(LISTEN_EVENT, async (event, payload) => {
			console.time('socket processing')
			const data = await pipeAsync(
				map((item) => item.where(args).exec()),
				traversePromises,
				filter(compose(not, isNil))
			)(payload)
			when(
				compose(lt(0), length),
				data => {
					socket.emit(EMIT_EVENT, {event: EMIT_EVENT, data})
					console.timeEnd('socket processing')
				}
			)(data)
		})
	})
}
