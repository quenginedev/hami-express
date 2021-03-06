const {path, prop} = require('ramda')
const {createRouteByConfig} = require('../lib/create-router-by-config.js')
const {processPreHooks} = require('../lib/process-pre-hooks.js')
const {QueryBuilder} = require('../lib/get-data-from-query-builder.js')
const {processPostHooks} = require('../lib/process-post-hooks.js')
const {createHandleErrorResponse} = require('../lib/handle-error-response.js')
exports.getOneRecordRoute = createRouteByConfig({
    path: '/one',
    method: 'get',
    callback: ({model, options}) => async (request, response) => {
        try {
            const preHook = path(['hook', 'pre', 'getOne'])(options)
            const postHook = path(['hook', 'post', 'getOne'])(options)
            const {query, extra} = processPreHooks({model, request, response})(preHook)
            const queryBuilder = model.findOne(prop('filter', query))
            const data = await QueryBuilder({queryBuilder, query})
            await processPostHooks({model, response, request, query, data, extra})(postHook)
        } catch (e) {
            const handleErrorResponse = createHandleErrorResponse(response)
            handleErrorResponse(e)
        }
    },
})