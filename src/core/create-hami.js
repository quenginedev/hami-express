const {compose, forEach, path} = require('ramda')
const {createRoute} = require('./create-route.js')

exports.createHami = (app) => (routes = []) => {
    forEach(compose(
        //Todo Add socket
        createRoute(app)
    ), routes)
    return app
}