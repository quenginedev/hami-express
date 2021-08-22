const {map, path, prop} = require('ramda')
const {createRouteByConfig} = require('../lib/create-router-by-config.js')
const {processPreHooks} = require('../lib/process-pre-hooks.js')
const {QueryBuilder} = require('../lib/get-data-from-query-builder.js')
const {processPostHooks} = require('../lib/process-post-hooks.js')
const {createHandleErrorResponse} = require('../lib/handle-error-response.js')
const {publish} = require('pubsub-js')

exports.createManyRecordRoute = createRouteByConfig({
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
            const queryBuilder = model.find(prop('filter', query))
            const data = await QueryBuilder({queryBuilder, query})
            await processPostHooks({model, response, request, query, data, extra})(postHook)
            const collectionName = path(['collection', 'collectionName'])(model)
            publish(`${collectionName}:create`, data)
        } catch (e) {
            const handleErrorResponse = createHandleErrorResponse(response)
            handleErrorResponse(e)
        }
    },
})
