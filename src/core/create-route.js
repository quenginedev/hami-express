import {compose, path} from 'ramda'
import express from 'express'
import {getOneRecordRoute} from '../lib/get-one-record-route.js'
import {getManyRecordRoute} from '../lib/get-many-record-route.js'

const router = express.Router()

export const createRoute = (app) => ({model}) => {
    const name = path(['collection', 'collectionName'], model)
    const {router: composedRouter} = compose(
        getOneRecordRoute,
        getManyRecordRoute
    )({router, model})
    return app.use(`/${name}`, composedRouter)
}