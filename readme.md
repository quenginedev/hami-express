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

`/models/record-model.js`

```js
const {model} = require('mongoose')
const {hamiSchema} = require('hami-express')

const RecordSchema = hamiSchema({
	displayName: String,
	group: { type:String, enum: ['average', 'awesome'], default: '' }
})

exports.RecordModel = model('record', RecordSchema)
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
const {RecordModel} = require('./models/record-model')

module.exports = [
   {model: RecordModel},
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

### 1. records/one

* Method - `GET`
* Query - `{ filter: MongoDbQuery }`

### 2. records/count

* Method - `GET`
* Query - `{ filter: MongoDbQuery  }`

### 3. records/many

* Method - `GET`
* Query - `{ filter: MongoDbQuery, sort: MongooseSortObject, limit: Number  }`

### 4. records/:id

* Method - `GET`
* Param - `RecordID`

## Create records

### 5. records/one

* Method - `POST`
* body - `Record`

### 6. records/many

* Method - `POST`
* body - `[Record]`

## Update records

### 7. records/one

* Method - `UPDATE`
* Query - `{ filter: MongoDbQuery  }`
* body - `Record`

### 8. records/many

* Method - `UPDATE`
* Query - `{ filter: MongoDbQuery, sort: MongooseSortObject, limit: Number  }`
* body - `UpdateRecord`

## Delete records

### 9. records/one

* Method - `DELETE`
* Query - `{ filter: MongoDbQuery  }`

### 10. records/many

* Method - `DELETE`
* Query - `{ filter: MongoDbQuery  }`

# Websocket using Socket.IO

This feature is experimental since I do not know how to achieve this without passing arguments for filtering the events, But if you know of a better way don't hesitate sharing or creating a PR.

### Server
First you will need to inject socket.io into hami as a dependency as socketServer.
```js
const socketServer = require('socket.io')
const {createHami} = require('hami-express')

...

const hami = createHami(app)
const server = hami(routes, { socketServer })

...
```

### Client
There are three types of events you can subscribe to. These are

1. records:create - When a record is created
2. records:update - When a record is updated
3. records:delete - When a record is deleted

To listen to events, you must first emit a message to your hami-express server which subscribes you for getting events.
The format for the events are the model names in plural and the hook. Example, if the model name is 
`bakery` and the hook you want is `create`, Then the event would be `bakeries:create`.
A `MongoDBQuery` can be passed as an argument to filter what events to receive.

Now, to listen to the event, calling on `records:created`, will send you an event when a record is being created. Note to listen to the event, 
use the past tense of the hook. Bellow is the mapping for the listeners

1. records:create = records:created
2. records:update = records:updated
3. records:delete = records:deleted

Example
```js
const listenToRecords = async (callback) => {
    const socket = io(HAMI_EXPRESS_URL)
    // Subscribe
    socket.on('connect', ()=>{
        socket.emit('records:create', { group: { $eq: 'awesome' } })
    })
    // Listen
    socket.on('records:created', callback)
    // To disconnect when done listening 
    return socket.disconnect
}

const stopListeningToRecords = listenToRecords(({event, data})=>{
	console.log(event) // records:created
    console.log(data) // [ Records ]
})

// disconnect
stopListeningToRecords()
```

Note, the same version of socket.io used on the server should be the same used on the client. 
Otherwise, the socket connection won't work. 

# Todo 😉

### Client libraries [ Coming soon ]

* ![JS](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrandlogovector.com%2Fwp-content%2Fuploads%2F2020%2F08%2FJavascript-JS-Logo-150x150.png&f=1&nofb=1)
* ![Dart](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fraw.github.com%2Fmaksimr%2Fdvm%2Fmaster%2Fdart-logo.png&f=1&nofb=1)
