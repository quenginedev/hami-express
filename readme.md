# Hami Server JS 🔨

Hami is a module that uses mongoose models to create CRUD rest endpoints as well as socket events using express.js under the hood.

### Using Hami

```js
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import {createHami} from 'hamijs'

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

    app.listen(SERVER_PORT, ()=>{
        console.log(`Server started on port ${SERVER_PORT}`)
    })
}

```

We first pass in the express app into createHami like so `const hami = createHami(app)`. This will setup hami up so that can can be ready to start genrating routes for your mongoose models `hami(routes)`

### creating up a routes

```js
import mongoose from 'mongoose'

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

export default [
    { model: UserModel }  
]
```
