import {compose, cond, dissoc, ifElse, isNil, map, pluck, prop, type, when} from 'ramda'

export const processPostHooks = (context) => (hook) => {
    when(isNil, () => hook = (context) => context)(hook)
    compose(
        compose(
            ({response, data}) => {
                response.json(data)
            },
            // ctx => {
            //     cond([
            //         [() => type(ctx.data) === 'Object', () => {
            //             ctx.data = dissoc('__v', prop('data', ctx))
            //         }],
            //         [() => type(ctx.data) === 'Array', () => {
            //             ctx.data = map(record => dissoc('__v', record), prop('data', ctx))
            //         }],
            //         [()=>]
            //     ])(ctx)
            //     return ctx
            // },
        ),
        hook,
    )(context)
}