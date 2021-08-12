import {compose, isNil, mergeRight, when} from 'ramda'
import {normalizePreHook} from './normalize-pre-hook.js'

export const processPreHooks = (context) => (hook) => {
    when(isNil, () => hook = (context) => context)(hook)
    const {query, extra} = compose(
        hook,
        normalizePreHook,
    )(context)
    return mergeRight(context, {query, extra})
}