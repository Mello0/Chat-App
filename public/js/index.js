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
    var formattedTime = moment(message.createdAt).format('h:mm a');

    console.log('Message received: ', message);
    console.log('Formatted time: ', formattedTime);
    var li = jQuery('<li></li>'); // create li element
    li.text(message.from + ' ' + formattedTime + ' : ' + message.text);
    jQuery('#messages').append(li);
});

// select message-form
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault(); // prevent default submit event

    var textMessage = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: textMessage.val()
    }, function(message) {
        textMessage.val('');
    });
});