import {compose, path} from 'ramda'
import express from 'express'
import {getOneRecordRoute} from '../queries/get-one-record-route.js'
import {getManyRecordRoute} from '../queries/get-many-record-route.js'
import {getByIdRecordRoute} from '../queries/get-by-id-record-route.js'
import {createOneRecordRoute} from '../ mutations/create-one-record-route.js'
import {createManyRecordRoute} from '../ mutations/create-many-record-route.js'
import {updateOneRecordRoute} from '../ mutations/update-one-record-route.js'
import {updateManyRecordRoute} from '../ mutations/update-many-record-route.js'

const router = express.Router()

export const createRoute = (app) => ({model}) => {
    const name = path(['collection', 'collectionName'], model)
    const {router: composedRouter} = compose(
        getByIdRecordRoute,
        getOneRecordRoute,
        getManyRecordRoute,
        createOneRecordRoute,
        createManyRecordRoute,
        updateOneRecordRoute,
        updateManyRecordRoute,
    )({router, model})
    return app.use(`/${name}`, composedRouter)
}