const {compose, path} = require('ramda')
const express = require('express')
const {getOneRecordRoute} = require('../queries/get-one-record-route.js')
const {getManyRecordRoute} = require('../queries/get-many-record-route.js')
const {getByIdRecordRoute} = require('../queries/get-by-id-record-route.js')
const {createOneRecordRoute} = require('../ mutations/create-one-record-route.js')
const {createManyRecordRoute} = require('../ mutations/create-many-record-route.js')
const {updateOneRecordRoute} = require('../ mutations/update-one-record-route.js')
const {updateManyRecordRoute} = require('../ mutations/update-many-record-route.js')

const router = express.Router()

exports.createRoute = (app) => ({model}) => {
    const name = path(['collection', 'collectionName'], model)
    // console.log(model.schema.paths['displayName'].instance)
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