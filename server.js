var express = require('express')
var { MongoClient, ObjectId } = require('mongodb')
var passport = require('passport')
var { UniqueTokenStrategy } = require('passport-unique-token')
var path = require('path')

var app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, './build')))
app.use(passport.initialize())

// TODO: Get this from an environment variable or .env file
const devUri = "mongodb+srv://wantodo:mongodb@cluster0.fwmjy.mongodb.net/?retryWrites=true&w=majority"
const uri = process.env.MONGODB_URI || devUri
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Shared reference to the database
let database

function getUser(token) {
  return database.collection('users').findOne({ accessCode: token })
}

passport.use(new UniqueTokenStrategy(async (token, done) => {
  try {
    const user = await getUser(token)
    if (!user) {
      return done(null, false)
    }

    return done(null, user)
  } catch(err) {
    return done(err)
  }
}))

// passportjs complains that it can't serializer user into a session
// (perhaps because I'm not using the passport.session() middleware) so
// disable sessions.
const authenticate = passport.authenticate('token', { session: false })

/**
 * Important note about Express route handlers and async / await: If the route
 * handler is an async function and you call await doSomething(), if
 * doSomething() rejects or throws, Express will handler it. So you don't need
 * to wrap the 'await' in a try/catch statement.
 */

app.post("/api/login", authenticate, (request, response) => {
  response.send({ token: request.user.accessCode })
})

app.get("/api/random", async function (request, response) {
  const exclude = request.query.exclude
  let pipeline = [
    { $sample: { size: 1 } }, // Get a random document
  ]

  if (exclude) {
    pipeline = [
      // Only include documents where _id doesn't equal `exclude`
      { $match: { _id: { $ne: ObjectId(exclude) } } }
    ].concat(pipeline)
  }

  const result = await database.collection('wants')
    .aggregate(pipeline)
    .toArray()

  if (result.length < 1) {
    response.status(404).send({ error: 'Not found'})
  } else {
    response.send(result[0])
  }
});

app.get("/api/want", async function (request, response) {
  const wants = await database.collection('wants').find({}).toArray()
  response.send(wants)
})

app.post("/api/want", async function (request, response) {
  const newWant = { description: request.body.description }
  // This automatically sets _id in newWant
  await database.collection('wants').insertOne(newWant)
  response.send(newWant)
});

app.patch("/api/want/:id", async function (request, response) {
  const { _id, ...updatedWant } = request.body
  let queryId

  try {
    queryId = ObjectId(request.params.id)
  } catch(e) {
    // invalid ObjectId
    response.status(400).send({
      error: 'Invalid id'
    })
    return
  }

  const result = await database.collection('wants')
    .updateOne({ _id: queryId }, { $set: updatedWant })

  if (result.matchedCount == 0) {
    response.status(404).send({
      error: `Want ${request.params.id} does not exist`
    })
  } else {
    response.send({
      _id: request.params.id,
      ...updatedWant
    })
  }
})

app.delete("/api/want/:id", async function(request, response) {
  let queryId

  try {
    queryId = ObjectId(request.params.id)
  } catch(e) {
    // invalid ObjectId
    response.status(400).send({
      error: 'Invalid id'
    })
    return
  }

  const result = await database.collection('wants')
    .deleteOne({ _id: queryId })
  response.status(200).send({ _id: request.params.id })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build'))
})

// TODO: use process.env.PORT instead of hardcoding the port
// See https://dev.to/glitch/create-react-app-and-express-together-on-glitch-28gi
// To explain why we're listening on 3001 (not the default 3000 or some other port)
// TL;DR We have a proxy that sends /api requests to port 3001

// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

// In production, Heroku assigns the port and adds it to env. In local
// development, the app will listen on port port 3001. By adding "proxy": ... to
// package.json, I can run a react server locally to host the frontend, and
// react will proxy API requests to localhost:3001.
var listener = app.listen(process.env.PORT || 3001, async function () {
  try {
    await client.connect()
    database = client.db('wantodo')
  } catch (e) {
    console.log('Error Connecting to MongoDB Atlas')
    console.log(e)
  }

  console.log('Your app is listening on port ' + listener.address().port);
});
