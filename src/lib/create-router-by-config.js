const {path: to} = require('ramda')
exports.createRouteByConfig =
	({path = '/', method = 'get', callback}) =>
		({router, model}) => {
			router[method](path, callback({model}))
			return {router, model}
		}
