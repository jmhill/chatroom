$(document).ready(function() {
	var socket = io();
	var input = $('input');
	var messages = $('#messages');

	var userName = prompt('What is your name?');

	var addMessage = function (message) {
		messages.append('<div>' + message + '</div>');
	};
	
	if (userName) {
		socket.emit('login', userName);
	}

	input.on('keydown', function(event) {
		if (event.keyCode != 13) {
			return;
		}

		var message = userName + ': ' + input.val();
		addMessage(message);
		socket.emit('message', message);
		input.val('');
	});

	socket.on('message', addMessage);

});