const {compose, cond, dissoc, isNil, map, not, prop, T, type, when} = require('ramda')

const recordToJsonAndStripVersion = compose(dissoc('__v'), data => data.toJSON())

exports.QueryBuilder = async ({queryBuilder, query}) => {
    when(compose(not, isNil), sort => queryBuilder = queryBuilder.sort(sort))(prop('sort', query))
    when(compose(not, isNil), limit => queryBuilder = queryBuilder.limit(limit))(prop('limit', query))
    console.log({sort: prop('sort')(query)})
    const data = await queryBuilder.exec()
    return cond([
        [data => type(data) === 'Array', map(recordToJsonAndStripVersion)],
        [data => type(data) === 'Object', recordToJsonAndStripVersion],
        [T, data => data],
    ])(data)
}
