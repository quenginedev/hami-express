const {createRouteByConfig} = require('../lib/create-router-by-config.js')
const {path, prop} = require('ramda')
const {createHandleErrorResponse} = require('../lib/handle-error-response.js')
const {processPreHooks} = require('../lib/process-pre-hooks.js')
const {processPostHooks} = require('../lib/process-post-hooks.js')

exports.deleteOneRecordRoute =  createRouteByConfig({
    path: '/one',
    method: 'delete',
    callback: ({model, options}) => async (request, response) =>{
        try {
            const preHook = path(['hook', 'pre', 'deleteOne'])(options)
            const postHook = path(['hook', 'post', 'deleteOne'])(options)
            const {query, extra} = processPreHooks({model, request, response})(preHook)
            const deletedRecord = await model.findOneAndDelete(prop('filter', query))
            await processPostHooks({model, response, request, query, data: deletedRecord, extra})(postHook)
        }catch (e) {
            const handleErrorResponse = createHandleErrorResponse(response)
            handleErrorResponse(e)
        }
    }
})

