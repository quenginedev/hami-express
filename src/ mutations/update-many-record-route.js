import {map, path, prop} from 'ramda'
import {createRouteByConfig} from '../lib/create-router-by-config.js'
import {processPreHooks} from '../lib/process-pre-hooks.js'
import {getDataFromQueryBuilder} from '../lib/get-data-from-query-builder.js'
import {processPostHooks} from '../lib/process-post-hooks.js'
import {createHandleErrorResponse} from '../lib/handle-error-response.js'

export const updateManyRecordRoute = createRouteByConfig({
    path: '/many',
    method: 'put',
    callback: ({model, options}) => async (request, response) => {
        try {
            const preHook = path(['hook', 'pre', 'updateMany'])(options)
            const postHook = path(['hook', 'post', 'updateMany'])(options)
            const {query, extra} = processPreHooks({model, request, response})(preHook)
            const updatedRecords = await model.updateMany(prop('filter', query), prop('body', query))
            const updatedRecordsIds = map(({id}) => id, updatedRecords)
            query.filter = {_id: {$in: updatedRecordsIds}}
            const queryBuilder = model.findById(prop('filter', query))
            const data = await getDataFromQueryBuilder({queryBuilder, query})
            await processPostHooks({model, response, request, query, data, extra})(postHook)
        } catch (e) {
            const handleErrorResponse = createHandleErrorResponse(response)
            handleErrorResponse(e)
        }
    },
})