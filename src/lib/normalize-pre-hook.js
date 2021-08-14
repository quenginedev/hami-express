const {compose, defaultTo, path} = require('ramda')

exports.normalizePreHook = ({model, request, response,}) => {
    const filter = compose(defaultTo({}), path(['query', 'filter']))(request)
    const sort = compose(defaultTo(null), path(['query', 'sort']))(request)
    const limit = compose(defaultTo(null), path(['query', 'limit']))(request)
    const body = compose(defaultTo(null), path(['body']))(request)
    const params = compose(defaultTo({}), path(['params']))(request)
    const extra = {}
    const query = {
        filter,
        sort,
        limit,
        body,
        params
    }

    return {model, request, response, query, extra}
}