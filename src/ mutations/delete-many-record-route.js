const {createRouteByConfig} = require('../lib/create-router-by-config.js')
const {path, prop} = require('ramda')
const {createHandleErrorResponse} = require('../lib/handle-error-response.js')
const {processPreHooks} = require('../lib/process-pre-hooks.js')

exports.deleteManyRecordRoute =  createRouteByConfig({
    path: '/many',
    method: 'delete',
    callback: ({model, options}) => async (request, response) =>{
        try {
            const preHook = path(['hook', 'pre', 'deleteMany'])(options)
            const {query, extra} = processPreHooks({model, request, response})(preHook)
            const deletedRecords = await model.deleteMany(prop('filter', query))
            response.json(deletedRecords)
        }catch (e) {
            const handleErrorResponse = createHandleErrorResponse(response)
            handleErrorResponse(e)
        }
    }
})

