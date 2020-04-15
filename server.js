var express = require('express');
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('.data/db.json')
var db = low(adapter)
var app = express();

db.defaults({
  wants: [
    { id: 1, description: "learn a new language" },
    { id: 2, description: "run a marathon" },
    { id: 3, description: "code my own app" }
  ]
}).write()

app.get("/api/want", function (request, response) {
  const wants = db.get('wants').value()
  const index = Math.floor(Math.random() * wants.length)
  response.send(wants.)
});

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