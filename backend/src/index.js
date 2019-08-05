const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();
const server = require('http').Server(app);
// real time
const io = require('socket.io')(server);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

// permitir que todo tipo de aplicacao acesse nosso back-end
app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);
