import {compose, defaultTo, isNil, not, path, prop, when} from 'ramda'
import {createRouteByConfig} from './create-router-by-config.js'
import {processPreHooks} from './process-pre-hooks.js'
import {getDataFromQueryBuilder} from './get-data-from-query-builder.js'

export const getManyRecordRoute = createRouteByConfig({
    path: '/many',
    method: 'get',
    callback: ({model, options}) =>  async (request, response) => {
        const preHook = path(['hook', 'pre', 'one'])(options)
        const {query, extra} = processPreHooks({model, request, response})(preHook)
        const data = await getDataFromQueryBuilder(model.find(prop('filter'), query))

        // TODO add post hook

        res.json(data)
    }
})