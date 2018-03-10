const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

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
    socket.emit('newMessage', {
       from: 'Admin',
       text: 'Welcome to the chat',
       createdAt: new Date().getTime()
    });

    // User joined message broadcasted
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('Create Message (received from client): ', message);
    
        io.emit('newMessage', { // emit msg to all sockets
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }); 
        // socket.broadcast.emit('newMessage', {
        //     from: 'Mello',
        //     text: 'Hello there!',
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User of id ' + socket.id + ' disconnected.');
    });
}); 

server.listen(port, () => {    // createServer is implicit in listen comand
    console.log('Listening to port ' + port);
});