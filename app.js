'use strict'
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const socketio = require('socket.io');
// const makesRouter = require('./routes');
const router = require('./routes').router;
const models = require('./models');

// boilerplate setup
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

// log middleware with morgan
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// models.User.sync()
// .then(function(){
//   console.log('User table created!');
//   return models.Page.sync();
// })
// .then(function(){
//   console.log('Page table created!');
//   app.listen(3000, function () {
//     console.log('Server is listening on port 3000!');
//   });
// })
// .catch(console.error.bind(console));


models.db.sync({ force: true })
.then(function () {
    console.log('All tables created!');
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error.bind(console));


// const server = app.listen(3000, () => console.log("listening on port 3000"));
// const io = socketio.listen(server);

app.use(express.static(path.join(__dirname, "/public")));

// modular routing that uses io
app.use('/', router);
// app.use('/', makesRouter);
