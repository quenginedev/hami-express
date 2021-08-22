const {path, prop} = require('ramda')
const {createRouteByConfig} = require('../lib/create-router-by-config.js')
const {processPreHooks} = require('../lib/process-pre-hooks.js')
const {processPostHooks} = require('../lib/process-post-hooks.js')
const {createHandleErrorResponse} = require('../lib/handle-error-response.js')

exports.getRecordCountRoute = createRouteByConfig({
    path: '/count',
    method: 'get',
    callback: ({model, options}) => async (request, response) => {
        try {
            const preHook = path(['hook', 'pre', 'getMany'])(options)
            const postHook = path(['hook', 'post', 'getMany'])(options)
            const {query, extra} = processPreHooks({model, request, response})(preHook)
            const data = await model.countDocuments(prop('filter')(query))
            await processPostHooks({model, response, request, query, data, extra})(postHook)
        } catch (e) {
            const handleErrorResponse = createHandleErrorResponse(response)
            handleErrorResponse(e)
        }
    },
})
