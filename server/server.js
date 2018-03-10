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

    
    socket.emit('newMessage',{
        from: 'Mouad',
        text: 'Hello world',
        createdAt: '123'
    });

    socket.on('createMessage', (newMessage) => {
        console.log('Create Message (received from client): ', newMessage);
    });
    
    socket.on('disconnect', () => {
        console.log('User of id ' + socket.id + ' disconnected.');
    });
}); 



server.listen(port, () => {    // createServer is implicit in listen comand
    console.log('Listening to port ' + port);
});