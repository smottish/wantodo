var express = require('express');
var app = express();

// TODO: Implement backend using lodb. See:
// https://glitch.com/~low-db

app.get("/api/want", function (request, response) {
  // TODO: return a random "want"
  response.send({ want: 'testing 123'})
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