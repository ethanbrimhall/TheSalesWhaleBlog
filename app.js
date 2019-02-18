const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.render('index.html');
});

app.post('*', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
  });

  var mailOptionsHost = {
    to: 'realethanbrimhall@gmail.com',
    subject: 'Message from: ' + name,
    text: 'Name: ' + name + '\nEmail: ' + email + '\n\nMessage: ' + message
  };

  transporter.sendMail(mailOptionsHost, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

	res.redirect(res.req.params[0]);

});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server Started on port 3000');
});
