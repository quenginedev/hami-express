import {compose, isNil, not, path, prop, when} from 'ramda'
import {createRouteByConfig} from './create-router-by-config.js'
import {processPreHooks} from './process-pre-hooks.js'
import {getDataFromQueryBuilder} from './get-data-from-query-builder.js'

export const getOneRecordRoute = createRouteByConfig({
    path: '/one',
    method: 'get',
    callback: ({model, options}) => async (request, response) => {
        const preHook = path(['hook', 'pre', 'one'])(options)
        const {query, extra} = processPreHooks({model, request, response})(preHook)
        const data = await getDataFromQueryBuilder(model.findOne(prop('filter'), query))

        compose(
            ({response, data}) => {
                response.json(data)
            },
            // TODO add post hook
        )({model, response, request, query, data, extra})

    },
})