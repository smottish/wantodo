var express = require('express')
var shortid = require('shortid')
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('./db.json')
var db = low(adapter)
var app = express()
var path = require('path')

app.use(express.json())
app.use(express.static(path.join(__dirname, './build')))

// lowdb docs: https://github.com/typicode/lowdb
// example project: https://glitch.com/~low-db
db.defaults({
  wants: [
    { id: shortid.generate(), description: "Learn a new language" },
    { id: shortid.generate(), description: "Run a marathon" },
    { id: shortid.generate(), description: "Code my own app" }
  ]
}).write()

app.get("/api/random", function (request, response) {
  const exclude = request.query.exclude
  let wants = db.get('wants').cloneDeep().value()

  if (exclude) {
    wants = wants.filter((w) => w.id !== exclude )
  }

  const index = Math.floor(Math.random() * wants.length)
  response.send(wants[index])
});

app.get("/api/want", function (request, response) {
  const wants = db.get('wants').value()
  response.send(wants)
})

app.post("/api/want", function (request, response) {
  const newWant = { id: shortid.generate(), description: request.body.description }
  db.get('wants')
    .push(newWant)
    .write()
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
var listener = app.listen(3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
