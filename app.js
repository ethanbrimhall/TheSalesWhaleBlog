const path = require('path');
const http = require('http');
const express = require('express');

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.render('index.html');
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server Started on port 3000');
});
