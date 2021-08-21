const {compose, forEach} = require('ramda')
const {createRoute} = require('./create-route.js')
const {createSocket} = require('./create-socket')

exports.createHami = (app) => (routes = [], options) => {
    forEach(createRoute(app), routes)
    return createSocket(app, {routes , options})
}
