var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Hello world. I\'ve changed file!');
});

var port = process.env.port;

app.listen(port);