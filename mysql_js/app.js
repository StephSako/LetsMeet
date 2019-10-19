var express = require('express');
var app = express();

var EventController = require('./EventController');
app.use('/events', EventController);

module.exports = app;