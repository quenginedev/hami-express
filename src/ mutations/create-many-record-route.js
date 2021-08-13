import {filter, map, path, prop} from 'ramda'
import {createRouteByConfig} from '../lib/create-router-by-config.js'
import {processPreHooks} from '../lib/process-pre-hooks.js'
import {getDataFromQueryBuilder} from '../lib/get-data-from-query-builder.js'
import {processPostHooks} from '../lib/process-post-hooks.js'
import {createHandleErrorResponse} from '../lib/handle-error-response.js'

export const createManyRecordRoute = createRouteByConfig({
    path: '/many',
    method: 'post',
    callback: ({model, options}) => async (request, response) => {
        try {
            const preHook = path(['hook', 'pre', 'createMany'])(options)
            const postHook = path(['hook', 'post', 'createMany'])(options)
            const {query, extra} = processPreHooks({model, request, response})(preHook)
            const newRecords = await model.insertMany(prop('body', query))
            const newRecordsIds = map(({_id}) => _id, newRecords)
            query.filter = {_id: {$in: newRecordsIds}}
            const queryBuilder = model.findById(prop('filter', query))
            const data = await getDataFromQueryBuilder({queryBuilder, query})
            await processPostHooks({model, response, request, query, data, extra})(postHook)
        } catch (e) {
            const handleErrorResponse = createHandleErrorResponse(response)
            handleErrorResponse(e)
        }
    },
})