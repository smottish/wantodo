var express = require('express')
var { MongoClient, ObjectId } = require('mongodb')
var shortid = require('shortid')
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('./db.json')
var db = low(adapter)
var app = express()
var path = require('path')

app.use(express.json())
app.use(express.static(path.join(__dirname, './build')))

// TODO: Get this from an environment variable or .env file
const uri = "mongodb+srv://wantodo:mongodb@cluster0.fwmjy.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Shared reference to the database
let database

// lowdb docs: https://github.com/typicode/lowdb
// example project: https://glitch.com/~low-db
db.defaults({
  wants: [
    { id: shortid.generate(), description: "Learn a new language" },
    { id: shortid.generate(), description: "Run a marathon" },
    { id: shortid.generate(), description: "Code my own app" }
  ]
}).write()

/**
 * Important note about Express route handlers and async / await: If the route
 * handler is an async function and you call await doSomething(), if
 * doSomething() rejects or throws, Express will handler it. So you don't need
 * to wrap the 'await' in a try/catch statement.
 */

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

app.get("/api/want", function (request, response) {
  const wants = db.get('wants').value()
  response.send(wants)
})

app.post("/api/want", async function (request, response) {
  const newWant = { description: request.body.description }
  // This automatically sets _id in newWant
  await database.collection('wants').insertOne(newWant)
  response.send(newWant)
});

// TODO SM (2020-08-02): Is there a performance hit to calling db.get() twice?
// Is there a better way to update a want if it exists and return an error otherwise?
app.patch("/api/want/:id", function (request, response, next) {
  const { id, ...updatedWant } = request.body

  if (!db.get('wants').find({ id: request.params.id }).value()) {
    const err = new Error()
    err.status = 404
    err.message = `Want ${request.params.id} does not exist`
    next(err)
    return;
  }

  db.get('wants')
    .find({ id: request.params.id })
    .merge(updatedWant)
    .write()

  response.send({ id, ...updatedWant })
})

app.delete("/api/want/:id", function(request, response) {
  const id = request.params.id
  const want = db
    .get('wants')
    .find({ id })
    .value()

  if (!want) {
    response.status(404).send({ id, message: 'Not found' })
  } else {
    db.get('wants')
      .remove({ id })
      .write()
    response.send(want)
  }
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
