// FRONT-END SCRIPT 

var socket = io();  // initiating requests from the client to the server and keep the connection open

// built-in event listeners
socket.on('connect', function() {
    console.log('Connected to server.');

    socket.emit('createMessage', {
        from: 'Mello',
        text: 'Hey!'
    })
});

socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

// custom event listeners
socket.on('newMessage', function(newMessage){
    console.log('Message received: ', newMessage);
});