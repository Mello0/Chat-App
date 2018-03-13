// FRONT-END SCRIPT 

var socket = io();  // initiating requests from the client to the server and keep the connection open

// built-in event listeners
socket.on('connect', function() {
    console.log('Connected to server.');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

// custom event listeners
socket.on('newMessage', function(message){
    console.log('Message received: ', message);
    var li = jQuery('<li></li>'); // create li element
    li.text(message.from + ': ' + message.text);
    jQuery('#messages').append(li);
});

// select message-form
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault(); // prevent default submit event

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(message) {
        console.log('Got it. ', message);
    });
});