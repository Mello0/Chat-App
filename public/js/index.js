// FRONT-END SCRIPT

var socket = io();  // initiating requests from the client to the server and keep the connection open

function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child'); // select the last list-item in the list
    // Heights properties
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight(); // previous list-item

    if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

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
    scrollToBottom();
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