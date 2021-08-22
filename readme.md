# Hami Express 🔨

Hami ( to give ) is a module that uses mongoose models to create CRUD rest endpoints as well as socket events using
express.js. This creates endpoints such as

* Get one record ✔️
* Get many records ✔️
* Get record by ID ✔️
* Get records count 🧪
* Create One record ✔️
* Create Many records ✔️
* Update One record ✔️
* Update many records ✔️
* Delete one record ✔️
* Delete many records ✔️
* Live events [  onUpdate, onCreate, onDelete ] ✔️🧪
* hooks [ pre, post ]
* custom routes
* sync

## Getting started

We first pass in the express app into createHami like so `const hami = createHami(app)`. This will setup hami up so that
can be ready to start generating routes and live events for your mongoose models `hami(routes)`

### Creating Models

`/models/user-model.js`

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

Note `hamiSchema({...})` is a helper function that adds timestamps for `createdAt`, `updatedAt` and `deletedAt`. eg.

```js
const record = hamiSchema({...})
```

is the same as

```js
const record = new Schema({
    ...,
   deletedAt: {type: Date}
}, {timestamp: true})
```

### Creating Routes

`/routes.js`

```js
const {UserModel} = require('./models/user-model')

module.exports = [
   {model: UserModel},
]
```

### Using HamiExpress

```js
const express = require('express')
const {connect} = require('mongoose')
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
   
    // required to parse json payload
	app.use(bodyParser.json())

	// creating routes on hami
	// returns http server
	const hami = createHami(app)
	const server = hami(routes)
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

# Generated routes

## Get records

### 1. users/one

* Method - `GET`
* queryParams - `{ filter: MongoDbQuery }`

### 2. users/count

* Method - `GET`
* Query - `{ filter: MongoDbQuery  }`

### 3. users/many

* Method - `GET`
* Query - `{ filter: MongoDbQuery, sort: MongooseSortObject, limit: Number  }`

### 4. users/:id

* Method - `GET`
* Param - `RecordID`

## Create records

### 5. users/one

* Method - `POST`
* body - `Record`

### 6. users/many

* Method - `POST`
* body - `[Record]`

## Update records

### 7. users/one

* Method - `UPDATE`
* Query - `{ filter: MongoDbQuery  }`
* body - `Record`

### 8. users/many

* Method - `UPDATE`
* Query - `{ filter: MongoDbQuery, sort: MongooseSortObject, limit: Number  }`
* body - `UpdateRecord`

## Delete records

### 9. users/one

* Method - `DELETE`
* Query - `{ filter: MongoDbQuery  }`

### 10. users/many

* Method - `DELETE`
* Query - `{ filter: MongoDbQuery  }`

# Todo 😉

### Websocket documentation

### Client library

* ![JS](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrandlogovector.com%2Fwp-content%2Fuploads%2F2020%2F08%2FJavascript-JS-Logo-150x150.png&f=1&nofb=1)
* ![Dart](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fraw.github.com%2Fmaksimr%2Fdvm%2Fmaster%2Fdart-logo.png&f=1&nofb=1)
