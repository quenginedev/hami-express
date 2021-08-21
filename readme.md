# Hami Express 🔨

Hami ( to give ) is a module that uses mongoose models to create CRUD rest endpoints as well as socket events using
express.js under the hood. This creates endpoints such as

* Get one record ✅
* Get many records ✅
* Get record by ID ✅
* Create One record ✅
* Create Many records ✅
* Update One record ✅
* Update many records ✅
* Delete one record ✅
* Delete many records ✅
* Live events [  onUpdate, onCreate, onDelete ] ✅

## Getting started

```js
const express = require('express')
const {connect} = require('mongoose')
const socketServer = require('socket.io')
const bodyParser = require('body-parser')
const {createHami} = require('hami-express')
const routes = require('./routes')

const startTestServer = async () => {
	// connecting to mongodb URI
	await connect(MONGODB_URI, {
		useCreateIndex: true,
		useFindAndModify: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})

	const app = express()
	app.use(bodyParser.json())

	// creating routes on hami
	// returns http server
	const hami = createHami(app)
	const server = hami(routes, {socketServer})
	return server
}

startTestServer()
	.then(server => {
		server.listen(SERVER_PORT, () => {
			console.log('Server started on port', SERVER_PORT)
		})
	})
	.catch(err => {
		console.error(err)
	})


```

We first pass in the express app into createHami like so `const hami = createHami(app)`. This will setup hami up so that
can be ready to start generating routes and live events for your mongoose models `hami(routes)`

### creating up a routes

```js
const {model} = require('mongoose')
const {hamiSchema} = require('hami-express')

const UserSchema = hamiSchema({
	displayName: String,
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true}
})

exports.UserModel = model('user', UserSchema)
```

### Generated routes

1. users/one

   * Method - `GET`
   * queryParams - `{ filter: MongoDbQuery }`
2. users/many

   * Method - `GET`
   * Query - `{ filter: MongoDbQuery, sort: MongooseSortObject, limit: Number  }`
3. users/:id

   * Method - `GET`
   * Param - `RecordID`
4. users/one

   * Method - `POST`
   * body - `Record`
5. users/many

   * Method - `POST`
   * body - `[Record]`
6. users/one

   * Method - `UPDATE`
   * Query - `{ filter: MongoDbQuery  }`
   * body - `Record`
7. users/many

   * Method - `UPDATE`
   * Query - `{ filter: MongoDbQuery, sort: MongooseSortObject, limit: Number  }`
   * body - `UpdateRecord`
8. users/one

   * Method - `DELETE`
   * Query - `{ filter: MongoDbQuery  }`
9. users/many

   * Method - `DELETE`
   * Query - `{ filter: MongoDbQuery  }`

# Todo 😉

### Websocket documentation

### Client library
