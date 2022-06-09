const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname+'/public')));

io.on("connection", function (socket) {
    socket.on("newUser", function(username) {
        socket.broadcast.emit("update", username + " joined the conversation");
    });
    socket.on("exitUser", function(username) {
        socket.broadcast.emit("update", username + " left the conversation");
    });
    socket.on("chat", function(message) {
        socket.broadcast.emit("chat", message);
    });
});

server.listen(5000, function(){
    console.log("Servet Listening on port 5000");
});