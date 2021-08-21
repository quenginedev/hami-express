const {compose, isNil, when} = require('ramda')

exports.processPostHooks = (context) => (hook) => {
    when(isNil, () => hook = (context) => context)(hook)
    return compose(
        ({response, data}) => {
            response.json(data)
            return data
        },
        hook,
    )(context)
}
