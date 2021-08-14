const {always, compose, cond, dissoc, ifElse, isNil, map, pluck, prop, T, type, when} = require('ramda')

exports.processPostHooks = (context) => (hook) => {
    when(isNil, () => hook = (context) => context)(hook)
    compose(
        ({response, data}) => {
            response.json(data)
        },
        hook,
    )(context)
}