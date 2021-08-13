import  {path, prop} from 'ramda'
import {createRouteByConfig} from '../lib/create-router-by-config.js'
import {processPreHooks} from '../lib/process-pre-hooks.js'
import {getDataFromQueryBuilder} from '../lib/get-data-from-query-builder.js'
import {processPostHooks} from '../lib/process-post-hooks.js'
import {createHandleErrorResponse} from '../lib/handle-error-response.js'

export const createOneRecordRoute = createRouteByConfig({
    path: '/one',
    method: 'post',
    callback: ({model, options}) => async (request, response) => {
        try {
            const preHook = path(['hook', 'pre', 'createOne'])(options)
            const postHook = path(['hook', 'post', 'createOne'])(options)
            const {query, extra} = processPreHooks({model, request, response})(preHook)
            const newRecord = new model(prop('body', query))
            const {_id} = await newRecord.save()
            console.log({_id})
            query.filter = {_id}
            const queryBuilder = model.findById(prop('filter', query))
            const data = await getDataFromQueryBuilder({queryBuilder, query})
            await processPostHooks({model, response, request, query, data, extra})(postHook)
        }catch (e) {
            const handleErrorResponse = createHandleErrorResponse(response)
            handleErrorResponse(e)
        }

    },
})