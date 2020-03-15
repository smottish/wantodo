var express = require('express');

var app = express();
app.get("/api/want", function (request, response) {
  console.log('got want request!')
  response.send({ want: 'testing 123'})
});

// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
var listener = app.listen(3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});