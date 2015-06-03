var socket_io = require('socket.io');
var http = require('http');
var express = require('express');
var app = express();

app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function(socket) {
	console.log('Client connected.');

	socket.on('message', function(message) {
		console.log('Message received: ', message);
		socket.broadcast.emit('message', message);
	});

	socket.on('login', function(user) {
		console.log(user + ' just logged in');
		var loginMessage = user + ' just logged in';
		io.sockets.emit('message', loginMessage);
		socket.on('disconnect', function() {
			var disconnectMessage = user + ' just logged out.';
			socket.broadcast.emit('message', disconnectMessage);
		});
	});
});

server.listen(8080);