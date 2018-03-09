'use strict'
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const socketio = require('socket.io');
const makesRouter = require('./routes');

// boilerplate setup
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

// log middleware with morgan
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const server = app.listen(3000, () => console.log("listening on port 3000"));
const io = socketio.listen(server);

app.use(express.static(path.join(__dirname, "/public")));

// modular routing that uses io
app.use('/', makesRouter(io));
