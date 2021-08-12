import {compose, forEach, path} from 'ramda'
import {createRoute} from './create-route.js'

export const createHami = (app) => (routes = []) => {
    forEach(compose(
        //Todo Add socket
        createRoute(app)
    ), routes)
    return app
}