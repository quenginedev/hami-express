const {compose, path} = require('ramda')
const express = require('express')
const {getOneRecordRoute} = require('../queries/get-one-record-route.js')
const {getManyRecordRoute} = require('../queries/get-many-record-route.js')
const {getByIdRecordRoute} = require('../queries/get-by-id-record-route.js')
const {createOneRecordRoute} = require('../ mutations/create-one-record-route.js')
const {createManyRecordRoute} = require('../ mutations/create-many-record-route.js')
const {updateOneRecordRoute} = require('../ mutations/update-one-record-route.js')
const {updateManyRecordRoute} = require('../ mutations/update-many-record-route.js')
const {deleteOneRecordRoute} = require('../ mutations/delete-one-record-route.js')
const {deleteManyRecordRoute} = require('../ mutations/delete-many-record-route.js')
const {getRecordCountRoute} = require('../queries/get-record-count-route')

exports.createRoute = (app) => ({model}) => {
    const router = express.Router()
    const name = path(['collection', 'collectionName'], model)
    const {router: composedRouter} = compose(
        getByIdRecordRoute,
        getOneRecordRoute,
        getRecordCountRoute,
        getManyRecordRoute,
        createOneRecordRoute,
        createManyRecordRoute,
        updateOneRecordRoute,
        updateManyRecordRoute,
        deleteOneRecordRoute,
        deleteManyRecordRoute,
    )({router, model})
    return app.use(`/${name}`, composedRouter)
}
