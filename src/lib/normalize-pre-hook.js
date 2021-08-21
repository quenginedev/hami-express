const {compose, defaultTo, path, cond, not, isNil, T, isEmpty, or, and} = require('ramda')

const toJSON = cond([
    [and(compose(not, or(isNil, isEmpty)), ), JSON.parse],
    [T, r => r],
])

exports.normalizePreHook = ({model, request, response}) => {
    const filter = compose(defaultTo({}), toJSON, path(['query', 'filter']))(request)
    const sort = compose(defaultTo(null), toJSON, path(['query', 'sort']))(request)
    const limit = compose(defaultTo(null), path(['query', 'limit']))(request)
    const body = compose(defaultTo(null), path(['body']))(request)
    const params = compose(defaultTo({}), path(['params']))(request)
    const extra = {}
    const query = {
        filter,
        sort,
        limit,
        body,
        params,
    }

    return {model, request, response, query, extra}
}

