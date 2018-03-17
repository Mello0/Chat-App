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
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
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