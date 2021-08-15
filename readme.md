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
* Live events [  onUpdate, onCreate, onDelete ] ( yet to be implemented ) 🥺

## Getting started

```js
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const {createHami} = require('hami-express')

const startServer = async () => {
    await mongoose.connect(prop('MONGODB_URL', config), {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })

    const app = express()
    const hami = createHami(app)
    hami(routes)

    app.listen(SERVER_PORT, () => {
        console.log(`Server started on port ${SERVER_PORT}`)
    })
}

```

We first pass in the express app into createHami like so `const hami = createHami(app)`. This will setup hami up so that
can can be ready to start genrating routes for your mongoose models `hami(routes)`

### creating up a routes

```js
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    displayName: String,
    dateOfBirth: Date,
    phoneNumber: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('user', UserSchema)

export default [{model: UserModel, options: {...}}, ...]
```

### POST Create One

users/one

Bodyraw (json)

```json
{
  "email": "testUser2@hami.com",
  "password": "password@123"
}
```

### POST Create Many

users/many

Bodyraw (json)

```json
[
  {
    "email": "testUser3@hami.com",
    "password": "password@123"
  },
  {
    "email": "testUser4@hami.com",
    "password": "password@123"
  }
]
```

### GET Get One

/users/one

### GETGet Many

/users/many

### PUT Update One

/users/one?email=testuser@hami.com

Request Params

`email = testuser@hami.com`

Bodyraw (json)

```json
{
  "phoneNumber": "232323232323232323"
}
```

### PUT Update One Copy

`/users/one?email=testuser@hami.com`

Request Params

`email = testuser@hami.com`

Bodyraw (json)

```json
{
  "phoneNumber": "232323232323232323"
}
```

### DEL Delete Many

/users/one

### DELDelete One

/users/one
