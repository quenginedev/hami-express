const {compose, isNil, when} = require('ramda')

exports.processPostHooks = (context) => (hook) => {
    when(isNil, () => hook = (context) => context)(hook)
    compose(
        ({response, data}) => {
            response.json(data)
        },
        hook,
    )(context)
}