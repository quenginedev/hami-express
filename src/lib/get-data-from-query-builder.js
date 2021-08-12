import {compose, isNil, not, prop, when} from 'ramda'

export const getDataFromQueryBuilder = async (queryBuilder) => {
    when(compose(not, isNil), sort => queryBuilder = queryBuilder.sort(sort))(prop('sort', query))
    when(compose(not, isNil), limit => queryBuilder = queryBuilder.limit(limit))(prop('limit', query))
    return await queryBuilder.exec()
}