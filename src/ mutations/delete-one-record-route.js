const {createRouteByConfig} = require('../lib/create-router-by-config.js')
const {path, prop} = require('ramda')
const {createHandleErrorResponse} = require('../lib/handle-error-response.js')
const {processPreHooks} = require('../lib/process-pre-hooks.js')
const {processPostHooks} = require('../lib/process-post-hooks.js')
const {QueryBuilder} = require('../lib/get-data-from-query-builder.js')
const {publish} = require('pubsub-js')

exports.deleteOneRecordRoute =  createRouteByConfig({
    path: '/one',
    method: 'delete',
    callback: ({model, options}) => async (request, response) =>{
        try {
            const preHook = path(['hook', 'pre', 'deleteOne'])(options)
            const postHook = path(['hook', 'post', 'deleteOne'])(options)
            const {query, extra} = processPreHooks({model, request, response})(preHook)
            const queryBuilder = model.findOneAndUpdate(prop('filter', query), { deletedAt: new Date() }, { new: true })
            const data = await QueryBuilder({queryBuilder, query})
            await processPostHooks({model, response, request, query, data, extra})(postHook)
            const collectionName = path(['collection', 'collectionName'])(model)
            publish(`${collectionName}:delete`, [queryBuilder])
        }catch (e) {
            const handleErrorResponse = createHandleErrorResponse(response)
            handleErrorResponse(e)
        }
    }
})

