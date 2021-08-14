const {map, path, prop} = require('ramda')
const {createRouteByConfig} = require('../lib/create-router-by-config.js')
const {processPreHooks} = require('../lib/process-pre-hooks.js')
const {QueryBuilder} = require('../lib/get-data-from-query-builder.js')
const {processPostHooks} = require('../lib/process-post-hooks.js')
const {createHandleErrorResponse} = require('../lib/handle-error-response.js')

exports.updateManyRecordRoute = createRouteByConfig({
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
            const data = await QueryBuilder({queryBuilder, query})
            await processPostHooks({model, response, request, query, data, extra})(postHook)
        } catch (e) {
            const handleErrorResponse = createHandleErrorResponse(response)
            handleErrorResponse(e)
        }
    },
})