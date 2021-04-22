var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const PORT = 9876;

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
});

io.on('connection', socket => {
    console.log('user connected');

    socket.on('message', (data) => {
        console.log(data);
        io.sockets.emit('broadcast', data)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



server.listen(PORT, ()=> {
    console.log(`server listening on port ${PORT}`);
})