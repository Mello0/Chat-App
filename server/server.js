const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname + '/../public'); // static folder path
const port = process.env.PORT || 3000;  // for heroku

app.use(express.static(publicPath));
 
var server = http.createServer(app);     // create server using http 
var io = socketIO(server);      // param = server in which to use socketio

// register event listeners
io.on('connection', (socket) => {
    console.log('User connected, id: ' + socket.id);
    // socket.emit : sending msg to client (sending msg)
    // socket.on : receiving msg from client (listening to inc. msgs)

    // Welcome message from admin
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

    // User joined message broadcasted
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message) => {
        console.log('Create Message (received from client): ', message);
    
        io.emit('newMessage', generateMessage(message.from, message.text)); 
    });

    socket.on('disconnect', () => {
        console.log('User of id ' + socket.id + ' disconnected.');
    });
}); 

server.listen(port, () => {    // createServer is implicit in listen comand
    console.log('Listening to port ' + port);
});