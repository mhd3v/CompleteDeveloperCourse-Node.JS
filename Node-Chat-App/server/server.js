const path = require('path');
const http = require('http'); //built in node module, used by express to setup the server automatically
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, "../public");   //better way to do than the one below
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public');
console.log(publicPath);

var app = express();
var server = http.createServer(app);    //we're passing the app to the server so that we can have more control over the server. http.createServer is called when we use express's app.listen() 

var io = socketIO(server);  //we get web sockets server in io
var users = new Users();
app.use(express.static(publicPath));

//io.on is a special function. We will use socket.xx() for most of our functionality
//io.on('connect') DOESN'T exist
//socket.on('connect') is a valid event

io.on('connection', (socket) => { //register an event listener. Callback gets called with the socket
    console.log('New user connected!');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.room) || !isRealString(params.name)){
            return callback("Name and room name are required");
        }

        socket.join(params.room);   //get room name from params and put user in it. 
        users.removeUser(socket.id); //remove from any other rooms
        users.addUser(socket.id, params.name, params.room);


        //io.to('').emit   -> io.emit in a specific room
        //socket.broadcast.to('').emit -> broadcast in a specific room

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));   //what the joined user sees
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined the room`));  //what other user sees (except the joined user)

        callback();
    });

    socket.on('createMessage', (msg, callback) => {   //listening for create new message event from client. Callback is the callback function to be called on the client

        console.log('Creating message', msg);

        var user = users.getUser(socket.id);

        if(user && isRealString(msg.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name, msg.text));   //io.emit() emits an event to all the connections, socket.emit() emits an event to a single connection
        }

        callback('Server got your message');
        
        //============== Broadcasting events (send events to certain sockets) ===================   

        // socket.broadcast.emit('newMessage', {   //send event to all sockets except the socket that has called broadcast.emit
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });  
        
        //=======================================================================================
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user)
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => { //register an event listener. Callback gets called with the socket
        console.log('User was disconnected!');
        var user = users.removeUser(socket.id);

        if(user){ //if user removed
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat`));
        }
    });

});

server.listen(port, () => {         
    console.log(`Server is up on port ${port}`);
});