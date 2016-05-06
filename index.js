require('dotenv').load();

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/voice', require('./lib/voice'));
app.post('/status', require('./lib/status')(io));
app.post('/mute', require('./lib/mute'));

io.on('connection', (socket) => {
  console.log('a user connected');
 
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log('listening on *:3000');
});