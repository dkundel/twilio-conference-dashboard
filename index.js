require('dotenv').load();

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// configuring middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// configure routes
app.post('/mute', require('./lib/mute'));
app.all('/voice', require('./lib/voice'));

// start server
server.listen(port, () => {
  console.log('listening on *:3000');
});