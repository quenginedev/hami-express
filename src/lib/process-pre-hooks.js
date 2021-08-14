const {compose, isNil, mergeRight, when} = require('ramda')
const {normalizePreHook} = require('./normalize-pre-hook.js')

exports.processPreHooks = (context) => (hook) => {
    when(isNil, () => hook = (context) => context)(hook)
    const {query, extra} = compose(
        hook,
        normalizePreHook,
    )(context)
    return mergeRight(context, {query, extra})
}