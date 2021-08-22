const {subscribe} = require('pubsub-js')
const {compose, filter, isNil, length, lt, map, not, when, type, prop, defaultTo} = require('ramda')
const {pipeAsync, traversePromises} = require('ramda-async')
const {Query} = require('mingo')

exports.createEventListener = socket => ({ LISTEN_EVENT, EMIT_EVENT }) => {
	socket.on(LISTEN_EVENT, args => {
		const filter = compose(defaultTo({}),prop('filter'))(args)
		const sort = compose(defaultTo({}),prop('sort'))(args)
		subscribe(LISTEN_EVENT, async (event, payload) => {
			console.time('socket processing')
			const query = new Query(filter)
			const data = compose(
				map(val=>val),
				collection => query.find(collection).sort(sort)
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
