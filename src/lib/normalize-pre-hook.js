import {compose, defaultTo, path} from 'ramda'

export const normalizePreHook = ({model, request, response,}) => {
    const filter = compose(defaultTo({}), path(['query', 'filter']))(request)
    const sort = compose(defaultTo(null), path(['query', 'sort']))(request)
    const limit = compose(defaultTo(null), path(['query', 'limit']))(request)
    const body = compose(defaultTo(null), path(['body']))(request)
    const parmas = compose(defaultTo({}), path(['params']))(request)
    const extra = {}
    const query = {
        filter,
        sort,
        limit,
        body,
        parmas
    }

    return {model, request, response, query, extra}
}