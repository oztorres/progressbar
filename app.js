var express = require('express')
var http = require("http");
var socketio = require("socket.io");
var pug = require('pug')

var app = express()
var server = http.createServer(app); //http server
var io = socketio.listen(server);

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/', function (req, res) {
  res.render('view', {title: 'Progress Bar App', progressValue:56});
})


io.sockets.on('connection', function(socket) {
	socket.on('send data', function(data) {
		console.log('client sent:', data);
		io.sockets.emit('data', 70);
	});
});


var port = process.env.PORT || 3000;
server.listen(port);

console.log("running at port "+port);