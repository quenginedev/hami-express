import {path, prop} from 'ramda'
import {createRouteByConfig} from '../lib/create-router-by-config.js'
import {processPreHooks} from '../lib/process-pre-hooks.js'
import {getDataFromQueryBuilder} from '../lib/get-data-from-query-builder.js'
import {processPostHooks} from '../lib/process-post-hooks.js'
import {createHandleErrorResponse} from '../lib/handle-error-response.js'

export const getManyRecordRoute = createRouteByConfig({
    path: '/many',
    method: 'get',
    callback: ({model, options}) => async (request, response) => {
        try {
            console.log('getting many')
            const preHook = path(['hook', 'pre', 'getMany'])(options)
            const postHook = path(['hook', 'post', 'getMany'])(options)
            const {query, extra} = processPreHooks({model, request, response})(preHook)
            const queryBuilder = model.find(prop('filter', query))
            const data = await getDataFromQueryBuilder({queryBuilder, query})
            await processPostHooks({model, response, request, query, data, extra})(postHook)
        } catch (e) {
            const handleErrorResponse = createHandleErrorResponse(response)
            handleErrorResponse(e)
        }
    },
})