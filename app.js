'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// upload routes
var user_routes = require('./routes/user');
var message_routes = require('./routes/message');
var request_routes = require('./routes/requestWeekUser');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'public')));

// habilitar la carpeta public
// app.use(express.static(path.resolve(__dirname, '/dist/')));
// Index Route

app.get('*', (req, res) => {
    res.sendFile( path.join( __dirname, 'angular-src/dist/angular-src/index.html'))
})

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

// routes
app.use('/api', user_routes);
app.use('/api', message_routes);
app.use('/api', request_routes);

// exports
module.exports = app;