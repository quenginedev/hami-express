const {createRouteByConfig} = require('../lib/create-router-by-config.js')
const {path, prop} = require('ramda')
const {createHandleErrorResponse} = require('../lib/handle-error-response.js')
const {processPreHooks} = require('../lib/process-pre-hooks.js')
const {QueryBuilder} = require('../lib/get-data-from-query-builder.js')
const {processPostHooks} = require('../lib/process-post-hooks.js')
const {publish} = require('pubsub-js')

exports.deleteManyRecordRoute =  createRouteByConfig({
    path: '/many',
    method: 'delete',
    callback: ({model, options}) => async (request, response) =>{
        try {
            const preHook = path(['hook', 'pre', 'deleteMany'])(options)
            const postHook = path(['hook', 'post', 'deleteOne'])(options)
            const {query, extra} = processPreHooks({model, request, response})(preHook)
            await model.updateMany(prop('filter', query), { deletedAt: new Date() })
            const queryBuilder = model.find(prop('filter', query))
            const data = await QueryBuilder({queryBuilder, query})
            await processPostHooks({model, response, request, query, data, extra})(postHook)
            const collectionName = path(['collection', 'collectionName'])(model)
            publish(`${collectionName}:delete`, data)
        }catch (e) {
            const handleErrorResponse = createHandleErrorResponse(response)
            handleErrorResponse(e)
        }
    }
})

